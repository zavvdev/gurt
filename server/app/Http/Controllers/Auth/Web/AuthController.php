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
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $createdUser = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
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
                'email' => $dto->email,
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
            switch ($status) {
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

        return $this->successResponse();
    }

    public function resetPassword(ResetPasswordRequest $request)
    {
        // Here we will attempt to reset the user's password. If it is successful we
        // will update the password on an actual user model and persist it to the
        // database. Otherwise we will parse the error and return the response.
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($request->password),
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($user));
            },
        );

        if ($status != Password::PASSWORD_RESET) {
            throw ValidationException::withMessages([
                'email' => [__($status)],
            ]);
        }

        return $this->successResponse([
            'status' => __($status),
        ]);
    }
}
