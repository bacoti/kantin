import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import SalesChart from '@/Components/SalesChart';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Download } from 'lucide-react';

export default function Index({ auth, orders, filters }) {
    const { data, setData, get } = useForm({
        start_date: filters.start_date || '',
        end_date: filters.end_date || '',
    });

    const handleFilter = (e) => {
        e.preventDefault();
        get(route('admin.reports.index'), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Laporan Penjualan</h2>}
        >
            <Head title="Sales Report" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Filter Laporan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleFilter} className="flex items-end space-x-4">
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="start_date">Tanggal Mulai</Label>
                                    <Input
                                        type="date"
                                        id="start_date"
                                        value={data.start_date}
                                        onChange={(e) => setData('start_date', e.target.value)}
                                    />
                                </div>
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="end_date">Tanggal Selesai</Label>
                                    <Input
                                        type="date"
                                        id="end_date"
                                        value={data.end_date}
                                        onChange={(e) => setData('end_date', e.target.value)}
                                    />
                                </div>
                                <Button type="submit">Filter</Button>
                                <Button variant="outline" asChild>
                                    <a href={route('admin.reports.export-excel', { start_date: data.start_date, end_date: data.end_date })}>
                                        <Download className="mr-2 h-4 w-4" />
                                        Export
                                    </a>
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <SalesChart filters={data} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Detail Transaksi</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pelanggan</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Harga</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {orders.data.map((order) => (
                                        <tr key={order.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.user.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rp {order.total_price.toLocaleString('id-ID')}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString('id-ID')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
