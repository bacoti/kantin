<?php

namespace App\Exports;

use App\Models\Order;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class SalesReportExport implements FromQuery, WithHeadings, WithMapping, WithStyles, WithColumnWidths
{
    protected $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
    * @return \Illuminate\Database\Query\Builder
    */
    public function query()
    {
        return Order::query()
            ->with('user')
            ->when($this->request->filled('start_date') && $this->request->filled('end_date'), function ($query) {
                $query->whereBetween('created_at', [
                    $this->request->start_date . ' 00:00:00',
                    $this->request->end_date . ' 23:59:59'
                ]);
            });
    }

    /**
    * @return array
    */
    public function headings(): array
    {
        return [
            'Order ID',
            'Nama Pelanggan',
            'Email Pelanggan',
            'Total Harga',
            'Tanggal Pesanan',
        ];
    }

    /**
    * @param mixed $order
    * @return array
    */
    public function map($order): array
    {
        return [
            $order->id,
            $order->user->name,
            $order->user->email,
            $order->total_price,
            $order->created_at->format('d-m-Y H:i:s'),
        ];
    }

    /**
    * @return array
    */
    public function columnWidths(): array
    {
        return [
            'A' => 10,
            'B' => 30,
            'C' => 30,
            'D' => 20,
            'E' => 25,
        ];
    }

    /**
    * @param Worksheet $sheet
    */
    public function styles(Worksheet $sheet)
    {
        // Style untuk baris header (baris 1)
        $sheet->getStyle('A1:E1')->applyFromArray([
            'font' => [
                'bold' => true,
                'color' => ['rgb' => 'FFFFFF'],
            ],
            'fill' => [
                'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                'startColor' => ['rgb' => '4A5568'],
            ],
        ]);

        // Style untuk format Rupiah di kolom D
        $sheet->getStyle('D')->getNumberFormat()->setFormatCode('"Rp "#,##0');
    }
}