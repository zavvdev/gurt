<?php

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
        Route::get('/session', [UserController::class, 'session']);
        Route::delete('/delete/:id', [UserController::class, 'delete']);
    });
});
