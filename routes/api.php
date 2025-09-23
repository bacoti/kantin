<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Product;
use App\Http\Controllers\Api\OrderController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Di sinilah Anda dapat mendaftarkan rute API untuk aplikasi Anda. Rute-rute
| ini dimuat oleh RouteServiceProvider dan semuanya akan
| ditugaskan ke grup middleware "api".
|
*/

// Rute ini sudah ada dari Laravel Breeze/Sanctum untuk otentikasi
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// TAMBAHKAN RUTE INI:
// Ini adalah route publik yang kita buat untuk mengambil semua data produk
Route::get('/products', function () {
    return Product::all();
});

Route::middleware('auth:sanctum')->post('/orders', [OrderController::class, 'store']);
Route::middleware('auth:sanctum')->get('/orders', [OrderController::class, 'index']);

// Temporary test endpoint without auth
Route::post('/orders-test', [OrderController::class, 'store']);

// Test endpoint with web auth (session)
Route::middleware('web')->post('/orders-web', [OrderController::class, 'store']);

// Test endpoint completely without auth or CSRF
Route::withoutMiddleware([\App\Http\Middleware\VerifyCsrfToken::class])->post('/orders-noauth', [OrderController::class, 'store']);

// Test endpoint for order history without auth
Route::get('/orders-history-test', [OrderController::class, 'indexTest']);

// Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->name('admin.')->group(function () {
//     Route::get('/reports/sales-chart', [ReportController::class, 'getSalesChartData'])->name('reports.sales-chart');
// });