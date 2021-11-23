<?php

use App\Http\Controllers\Admin\ExpenseSourceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return Helper::formatResponse($request->user());
});

Route::prefix('v1/admin')
    ->name('admin.')
    ->middleware('auth:sanctum')
    ->group(function(){
        Route::apiResource('expense-source', ExpenseSourceController::class)->except('show');
    });
