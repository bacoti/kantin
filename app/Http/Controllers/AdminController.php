<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function dashboard(Request $request)
    {
        // Statistik dasar untuk dashboard
        $stats = [
            'total_users' => User::count(),
            'total_products' => Product::count(),
            'total_orders' => Order::count(),
            'total_revenue' => Order::sum('total_price'),
            'recent_orders' => Order::with(['user', 'orderDetails.product'])
                ->latest()
                ->take(5)
                ->get(),
        ];

        return inertia('Admin/Dashboard', [
            'auth' => [
                'user' => $request->user(),
            ],
            ...$stats
        ]);
    }
}
