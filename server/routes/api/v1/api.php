<?php

use App\Http\Controllers\Profile\ProfileController;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['middleware' => ['auth:sanctum', 'verified']], function () {
    Route::prefix('user')->group(function () {
        Route::get('/session', [UserController::class, 'getFromSession']);
        Route::delete('/delete', [UserController::class, 'delete']);
    });

    Route::prefix('profile')->group(function () {
        Route::get('/user/{id}', [ProfileController::class, 'getByUserId']);
    });
});
