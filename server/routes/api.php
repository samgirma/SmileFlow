<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\AiChatController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/services', [ServiceController::class, 'index']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Ai Chat Bridge
    Route::post('/ai/chat', [AiChatController::class, 'chat']);

    // Role-specific protected routes
    Route::middleware('role:patient,receptionist,admin')->group(function () {
        Route::post('/appointments', [AppointmentController::class, 'store']);
    });
});
