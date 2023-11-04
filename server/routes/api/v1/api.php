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
        Route::get('/session', [UserController::class, 'getFromSession']);
        Route::delete('/session/delete', [UserController::class, 'deleteFromSession']);
        Route::get('/{id}', [UserController::class, 'getById']);
        Route::patch('/{id}', [UserController::class, 'updatePublicData']);
    });

    Route::prefix('profiles')->group(function () {
        Route::get('/user/{id}', [ProfileController::class, 'getByUserId']);
    });
});
