<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

Route::middleware('auth:api')->group(function () {
    Route::post('/users/deposit', [UserController::class, 'updateDeposit']);
    Route::post('/users/reset', [UserController::class, 'resetDeposit']);
    Route::post('/users/buy', [UserController::class, 'buyProduct']);
    Route::apiResource('/products', ProductController::class);
});
