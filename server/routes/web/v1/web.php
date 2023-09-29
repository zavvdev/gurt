<?php

use App\Http\Controllers\Auth\Web\AuthController;
use App\Http\Controllers\Email\Web\EmailVerificationController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Auth

Route::post('/auth/register', [AuthController::class, 'register'])
    ->middleware('guest')
    ->name('register');

Route::post('/auth/login', [AuthController::class, 'login'])
    ->middleware('guest')
    ->name('login');

Route::post('/auth/forgot-password', [AuthController::class, 'forgotPassword'])
    ->middleware('guest')
    ->name('password.email');

Route::post('/auth/reset-password', [AuthController::class, 'resetPassword'])
    ->middleware('guest')
    ->name('password.store');

Route::post('/auth/logout', [AuthController::class, 'logout'])
    ->middleware('auth')
    ->name('logout');

// Email

Route::post('/email/verification-notification', [EmailVerificationController::class, 'sendEmailVerification'])
    ->middleware(['auth', 'throttle:6,1'])
    ->name('verification.send');

Route::get('/verify-email/{id}/{hash}', [EmailVerificationController::class, 'verifyEmail'])
    ->middleware(['auth', 'signed', 'throttle:6,1'])
    ->name('verification.verify');
