<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Order;
use App\Models\OrderDetail;

class OrderController extends Controller
{
    // FUNGSI BARU UNTUK MENGAMBIL RIWAYAT PESANAN
    public function indexTest(Request $request)
    {
        // For testing - return all orders without user filter
        $orders = Order::with('orderDetails.product')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($orders);
    }

    public function store(Request $request)
    {
        // For test endpoint, we'll create a dummy user if not authenticated
        $user = $request->user();
        if (!$user) {
            // Create or get a test user for development
            $user = \App\Models\User::firstOrCreate(
                ['email' => 'test@example.com'],
                [
                    'name' => 'Test User',
                    'password' => bcrypt('password'),
                    'email_verified_at' => now(),
                ]
            );
        }

        $request->validate([
            'cartItems' => 'required|array|min:1',
            'cartItems.*.id' => 'required|integer|exists:products,id',
            'cartItems.*.quantity' => 'required|integer|min:1|max:100',
            'cartItems.*.price' => 'required|numeric|min:0',
            'cartItems.*.name' => 'required|string|max:255',
        ]);

        $cartItems = $request->cartItems;
        $totalPrice = 0;

        // Validasi dan hitung total harga dari DATABASE (bukan frontend)
        foreach ($cartItems as $item) {
            // Pastikan harga sesuai dengan database untuk mencegah manipulasi
            $product = \App\Models\Product::find($item['id']);
            if (!$product) {
                return response()->json([
                    'message' => 'Produk tidak ditemukan.',
                    'product_id' => $item['id']
                ], 422);
            }

            // Gunakan harga dari database, bukan dari frontend
            $totalPrice += $product->price * $item['quantity'];
        }

        // Gunakan transaksi database untuk memastikan semua data tersimpan atau tidak sama sekali
        DB::beginTransaction();

        try {
            // 1. Buat Order utama
            $order = Order::create([
                'user_id' => $user->id,
                'total_price' => $totalPrice,
                'status' => 'pending',
            ]);

            // 2. Buat Order Detail untuk setiap item
            foreach ($cartItems as $item) {
                $product = \App\Models\Product::find($item['id']);
                OrderDetail::create([
                    'order_id' => $order->id,
                    'product_id' => $item['id'],
                    'quantity' => $item['quantity'],
                    'price' => $product->price, // Gunakan harga dari database
                ]);
            }

            DB::commit();

            return response()->json([
                'message' => 'Pesanan berhasil dibuat.',
                'order_id' => $order->id,
                'total_price' => $totalPrice,
                'status' => 'pending',
                'created_at' => $order->created_at->toISOString()
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Order creation failed: ' . $e->getMessage());
            return response()->json([
                'message' => 'Gagal membuat pesanan. Silakan coba lagi.',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }
}