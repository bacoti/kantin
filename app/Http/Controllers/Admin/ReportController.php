<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReportController extends Controller
{
    /**
     * Menampilkan halaman laporan penjualan.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        // Validasi input tanggal jika diperlukan
        $request->validate([
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        $orders = Order::with('user')
            ->when($request->filled('start_date') && $request->filled('end_date'), function ($query) use ($request) {
                // Pastikan untuk mencakup keseluruhan hari pada end_date
                $query->whereBetween('created_at', [$request->start_date . ' 00:00:00', $request->end_date . ' 23:59:59']);
            })
            ->latest()
            ->paginate(10)
            ->withQueryString(); // Menambahkan ini agar paginasi tetap membawa filter

        return Inertia::render('Admin/Reports/Index', [
            'orders' => $orders,
            'filters' => $request->only(['start_date', 'end_date']),
        ]);
    }

    /**
     * Mengambil data penjualan untuk visualisasi grafik.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSalesChartData(Request $request)
    {
        // Validasi input tanggal jika diperlukan
        $request->validate([
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        $salesData = Order::select(
            DB::raw('DATE(created_at) as date'),
            DB::raw('SUM(total_price) as total')
        )
        ->when($request->filled('start_date') && $request->filled('end_date'), function ($query) use ($request) {
            // Pastikan untuk mencakup keseluruhan hari pada end_date
            $query->whereBetween('created_at', [$request->start_date . ' 00:00:00', $request->end_date . ' 23:59:59']);
        }, function ($query) {
            // Default: tampilkan data 30 hari terakhir jika tidak ada filter
            $query->where('created_at', '>=', now()->subDays(30));
        })
        ->groupBy('date')
        ->orderBy('date', 'asc')
        ->get();

        return response()->json($salesData);
    }
}