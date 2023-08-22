<?php

use App\Http\Controllers\Auth\Web\AuthController;
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
    ->name('web.auth.register');

Route::post('/auth/login', [AuthController::class, 'login'])
    ->middleware('guest')
    ->name('web.auth.login');

Route::post('/auth/forgot-password', [AuthController::class, 'forgotPassword'])
    ->middleware('guest')
    ->name('web.auth.password.email');

Route::post('/auth/reset-password', [AuthController::class, 'resetPassword'])
    ->middleware('guest')
    ->name('web.auth.password.store');

Route::get('/auth/verify-email/{id}/{hash}', [AuthController::class, 'verifyEmail'])
    ->middleware(['auth', 'signed', 'throttle:6,1'])
    ->name('web.auth.verification.verify');

Route::post('/auth/email/verification-notification', [AuthController::class, 'sendEmailVerification'])
    ->middleware(['auth', 'throttle:6,1'])
    ->name('web.auth.verification.send');

Route::post('/auth/logout', [AuthController::class, 'logout'])
    ->middleware('auth')
    ->name('web.auth.logout');
