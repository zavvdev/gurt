<?php

namespace App\Http\Controllers\Auth\Web;

use App\Enums\ValidationError;
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
                ValidationError::RecordNotFound,
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
        // We will send the password reset link to this user. Once we have attempted
        // to send the link, we will examine the response then see the message we
        // need to show to the user. Finally, we'll send out a proper response.
        $status = Password::sendResetLink(
            $request->only('email'),
        );

        if ($status != Password::RESET_LINK_SENT) {
            throw ValidationException::withMessages([
                'email' => [__($status)],
            ]);
        }

        return $this->successResponse([
            'status' => __($status),
        ]);
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
