import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';

export default function Index({ auth, orders }) {

    const { data, setData, put, processing, errors } = useForm({
        status: '',
    });

    const handleStatusChange = (orderId, newStatus) => {
        put(route('manager.orders.updateStatus', { order: orderId, status: newStatus }), {
            preserveScroll: true,
        });
    };

    const getBadgeVariant = (status) => {
        switch (status) {
            case 'pending':
                return 'destructive';
            case 'processing':
                return 'secondary';
            case 'completed':
                return 'default';
            case 'cancelled':
                return 'outline';
            default:
                return 'secondary';
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manajemen Pesanan</h2>}
        >
            <Head title="Manajemen Pesanan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Daftar Pesanan Masuk</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pelanggan</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {orders.data.map((order) => (
                                        <tr key={order.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{order.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{order.user.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">Rp {order.total_price.toLocaleString('id-ID')}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(order.created_at).toLocaleString('id-ID')}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <Badge variant={getBadgeVariant(order.status)}>{order.status}</Badge>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <Select onValueChange={(value) => handleStatusChange(order.id, value)} defaultValue={order.status}>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Ubah Status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="pending">Pending</SelectItem>
                                                        <SelectItem value="processing">Processing</SelectItem>
                                                        <SelectItem value="completed">Completed</SelectItem>
                                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </td>
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