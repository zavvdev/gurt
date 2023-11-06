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
    Route::prefix('users')->group(function () {
        Route::get('/{id}', [UserController::class, 'getById']);
        Route::get('/me', [UserController::class, 'getMe']);
        Route::delete('/me', [UserController::class, 'deleteMe']);
        Route::patch('/me/public-data', [UserController::class, 'patchMyPublicData']);
    });

    Route::prefix('profiles')->group(function () {
        Route::get('/users/{id}', [ProfileController::class, 'getByUserId']);
        Route::patch('/me', [ProfileController::class, 'patchMe']);
        Route::post('/me/media', [ProfileController::class, 'createMyMedia']);
        Route::delete('/me/media', [ProfileController::class, 'deleteMyMedia']);
    });
});
