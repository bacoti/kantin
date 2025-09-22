<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\HandleInertiaRequests; // Pastikan ini di-import
use App\Http\Middleware\AdminMiddleware; // Tambahkan import AdminMiddleware

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            HandleInertiaRequests::class, // Middleware untuk Inertia.js
        ]);

        // INI ADALAH BAGIAN KUNCI PERBAIKAN
        // Menambahkan middleware Sanctum ke grup 'api'.
        // Ini akan membuat Laravel mengenali sesi login dari frontend Anda.
        $middleware->api(prepend: [
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        ]);

        // Tambahkan alias untuk AdminMiddleware
        $middleware->alias([
            'admin' => AdminMiddleware::class,
        ]);

    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();

