<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('user')->latest()->paginate(10);

        return Inertia::render('Manager/Orders/Index', [
            'orders' => $orders
        ]);
    }

    public function updateStatus(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:pending,processing,completed,cancelled',
        ]);

        $order->update(['status' => $request->status]);

        // Untuk Inertia requests, kembalikan back() dengan flash message
        return back()->with('success', 'Status pesanan berhasil diperbarui.');
    }
}
