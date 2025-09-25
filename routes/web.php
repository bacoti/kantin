<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Manager\OrderController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function (Request $request) {
    // Redirect berdasarkan role user
    if ($request->user() && $request->user()->role === 'admin') {
        return redirect()->route('admin.dashboard');
    }

    // Default dashboard untuk customer
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Rute untuk halaman keranjang
Route::get('/cart', function () {
    return Inertia::render('CartPage');
})->middleware(['auth', 'verified'])->name('cart.index');

// Rute untuk halaman order sukses (dengan auth)
Route::get('/order/success/{order_id?}', function (Request $request, $order_id = null) {
    $order = null;
    if ($order_id) {
        $order = \App\Models\Order::with('orderDetails.product')
            ->where('id', $order_id)
            ->where('user_id', $request->user()->id)
            ->first();
    }

    return Inertia::render('OrderSuccessPage', [
        'order' => $order
    ]);
})->middleware(['auth', 'verified'])->name('order.success');

// Rute untuk halaman order sukses tanpa auth (untuk testing)
Route::get('/order/success-test/{order_id?}', function (Request $request, $order_id = null) {
    $order = null;
    if ($order_id) {
        $order = \App\Models\Order::with('orderDetails.product')
            ->where('id', $order_id)
            ->first(); // Tanpa filter user_id untuk testing
    }

    return Inertia::render('OrderSuccessPage', [
        'order' => $order
    ]);
})->name('order.success.test');

// Rute untuk halaman riwayat pesanan
Route::get('/my-orders', function () {
    return Inertia::render('OrderHistoryPage');
})->middleware(['auth', 'verified'])->name('orders.index');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin routes
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [App\Http\Controllers\AdminController::class, 'dashboard'])->name('dashboard');

    // Product management routes
    Route::resource('products', App\Http\Controllers\Admin\ProductController::class);

    Route::get('/reports', [\App\Http\Controllers\Admin\ReportController::class, 'index'])->name('reports.index');

    Route::get('/reports/sales-chart-data', [\App\Http\Controllers\Admin\ReportController::class, 'getSalesChartData'])->name('reports.sales-chart-data');

    Route::get('/reports/export-excel', [\App\Http\Controllers\Admin\ReportController::class, 'exportExcel'])->name('reports.export-excel');
});


Route::middleware(['auth', 'verified', 'manager'])->prefix('manager')->name('manager.')->group(function () {
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::put('/orders/{order}', [OrderController::class, 'updateStatus'])->name('orders.updateStatus');
});

require __DIR__.'/auth.php';
