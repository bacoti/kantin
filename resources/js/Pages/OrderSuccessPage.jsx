import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function OrderSuccessPage({ auth, order }) {
    const formatCurrency = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(number);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Pesanan Berhasil</h2>}
        >
            <Head title="Pesanan Berhasil" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-8 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Terima Kasih!</h3>
                            <p className="text-gray-600 mb-6">Pesanan Anda telah berhasil kami terima dan akan segera diproses.</p>

                            {order && (
                                <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                                    <h4 className="font-semibold text-lg mb-4">Detail Pesanan</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Nomor Pesanan:</span>
                                            <span className="font-medium">#{order.id}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Tanggal:</span>
                                            <span className="font-medium">{formatDate(order.created_at)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Status:</span>
                                            <span className="font-medium capitalize">{order.status}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Total:</span>
                                            <span className="font-bold text-lg">{formatCurrency(order.total_price)}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <h5 className="font-medium mb-2">Item Pesanan:</h5>
                                        <ul className="space-y-1">
                                            {order.order_details.map(detail => (
                                                <li key={detail.id} className="flex justify-between text-sm">
                                                    <span>{detail.product.name} x{detail.quantity}</span>
                                                    <span>{formatCurrency(detail.price * detail.quantity)}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            <div className='flex justify-center space-x-4'>
                                <Link href={route('dashboard')}>
                                    <Button variant="outline">Kembali ke Menu</Button>
                                </Link>
                                <Link href={route('orders.index')}>
                                    <Button>Lihat Riwayat Pesanan</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}