<?php

namespace App\Http\Controllers\Admin;

use App\Exports\SalesReportExport; // <--- TAMBAHKAN INI
use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel; // <--- TAMBAHKAN INI

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        $orders = Order::with('user')
            ->when($request->filled('start_date') && $request->filled('end_date'), function ($query) use ($request) {
                $query->whereBetween('created_at', [$request->start_date . ' 00:00:00', $request->end_date . ' 23:59:59']);
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Reports/Index', [
            'orders' => $orders,
            'filters' => $request->only(['start_date', 'end_date']),
        ]);
    }

    public function getSalesChartData(Request $request)
    {
        $request->validate([
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        $salesData = Order::select(
            DB::raw('DATE(created_at) as date'),
            DB::raw('SUM(total_price) as total')
        )
        ->when($request->filled('start_date') && $request->filled('end_date'), function ($query) use ($request) {
            $query->whereBetween('created_at', [$request->start_date . ' 00:00:00', $request->end_date . ' 23:59:59']);
        }, function ($query) {
            $query->where('created_at', '>=', now()->subDays(30));
        })
        ->groupBy('date')
        ->orderBy('date', 'asc')
        ->get();

        return response()->json($salesData);
    }

    /**
     * Menangani ekspor laporan penjualan ke Excel.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function exportExcel(Request $request)
    {
        $fileName = 'Laporan_Penjualan_' . now()->format('d-m-Y_H-i-s') . '.xlsx';
        return Excel::download(new SalesReportExport($request), $fileName);
    }
}
