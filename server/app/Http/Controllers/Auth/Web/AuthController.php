<?php

namespace App\Http\Controllers\Auth\Web;

use App\Enums\ResponseMessage;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\Web\ForgotPasswordRequest;
use App\Http\Requests\Auth\Web\LoginRequest;
use App\Http\Requests\Auth\Web\RegisterRequest;
use App\Http\Requests\Auth\Web\ResetPasswordRequest;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    private function handlePasswordError($status)
    {
        switch ($status) {
            case Password::INVALID_USER:
                return $this->errorResponse(
                    Response::HTTP_CONFLICT,
                    ResponseMessage::UserNotFound,
                );
            case Password::INVALID_TOKEN:
                return $this->errorResponse(
                    Response::HTTP_CONFLICT,
                    ResponseMessage::InvalidToken,
                );
            case Password::RESET_THROTTLED:
                return $this->errorResponse(
                    Response::HTTP_TOO_EARLY,
                    ResponseMessage::TooEarly,
                );
            default:
                return $this->errorResponse(
                    Response::HTTP_CONFLICT,
                    ResponseMessage::Unexpected,
                );
        }
    }

    public function register(RegisterRequest $request)
    {
        $createdUser = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'username' => $request->username,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($createdUser));
        Auth::login($createdUser);

        return $this->successResponse();
    }

    public function login(LoginRequest $request)
    {
        $dto = $request->getData();
        $request->ensureIsNotRateLimited();

        if (!Auth::attempt(
            [
                'username' => $dto->email,
                'password' => $dto->password,
            ],
            $request->boolean('remember'),
        )) {
            RateLimiter::hit($request->throttleKey());

            return $this->errorResponse(
                Response::HTTP_UNPROCESSABLE_ENTITY,
                ResponseMessage::RecordNotFound,
            );
        }

        RateLimiter::clear($request->throttleKey());

        $request->session()->regenerate();

        return $this->successResponse();
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        Cookie::queue(Cookie::forget(config('session.cookie')));

        return $this->successResponse();
    }

    public function forgotPassword(ForgotPasswordRequest $request)
    {
        $status = Password::sendResetLink([
            'email' => $request->email,
        ]);

        if ($status != Password::RESET_LINK_SENT) {
            return $this->handlePasswordError($status);
        }

        return $this->successResponse();
    }

    public function resetPassword(ResetPasswordRequest $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return $this->errorResponse(
                Response::HTTP_CONFLICT,
                ResponseMessage::UserNotFound,
            );
        }

        if (Hash::check($request->password, $user->password)) {
            return $this->errorResponse(
                Response::HTTP_CONFLICT,
                ResponseMessage::SamePassword,
            );
        }

        $status = Password::reset(
            ResetPasswordRequest::from($request)->all(),
            function ($user) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($request->password),
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($user));
            },
        );

        if ($status != Password::PASSWORD_RESET) {
            return $this->handlePasswordError($status);
        }

        return $this->successResponse();
    }
}
