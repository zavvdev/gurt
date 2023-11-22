<?php

use App\Http\Controllers\SessionUser\SessionUserController;
use App\Http\Controllers\Storage\StorageController;
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
    Route::get('/ping', function () {
        echo 'pong';
    });

    Route::prefix('me')->group(function () {
        Route::get('/', [SessionUserController::class, 'get']);
        Route::delete('/', [SessionUserController::class, 'delete']);
        Route::patch('/', [SessionUserController::class, 'patch']);
    });

    Route::prefix('users')->group(function () {
        Route::get('/{id}', [UserController::class, 'getById']);
    });

    Route::prefix('storage')->group(function () {
        Route::post('/file', [StorageController::class, 'uploadFile']);
    });
});
