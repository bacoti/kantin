import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import Toast from "@/Components/Toast";
import Modal from "@/Components/Modal";

export default function Index({ auth, orders }) {
    const { flash } = usePage().props;
    const [toast, setToast] = useState(null);
    const [toastType, setToastType] = useState("success");

    const showToast = (message, type = "success") => {
        setToastType(type);
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    };

    // Check for flash messages when component mounts or updates
    useEffect(() => {
        if (flash && flash.success) {
            showToast(flash.success, "success");
        }
        if (flash && flash.error) {
            showToast(flash.error, "error");
        }
    }, [flash]);

    // Local copy of orders so UI dapat langsung diupdate tanpa reload
    const [ordersList, setOrdersList] = useState(orders.data || []);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [pendingChange, setPendingChange] = useState({
        orderId: null,
        newStatus: null,
    });
    const [processing, setProcessing] = useState(false);

    const handleStatusChange = (orderId, newStatus) => {
        // Buka modal konfirmasi sebelum benar-benar mengirim request
        setPendingChange({ orderId, newStatus });
        setConfirmOpen(true);
    };

    const confirmAndSend = () => {
        const { orderId, newStatus } = pendingChange;
        setConfirmOpen(false);
        setProcessing(true);

        // Gunakan router.put dengan only untuk partial reload
        router.put(
            route("manager.orders.updateStatus", { order: orderId }),
            { status: newStatus },
            {
                preserveScroll: true,
                only: ["orders", "flash"],
                onStart: () => {
                    console.log(
                        "Mengirim update status untuk order",
                        orderId,
                        newStatus
                    );
                },
                onSuccess: () => {
                    setProcessing(false);

                    // Update UI secara optimis
                    setOrdersList((prev) =>
                        prev.map((o) =>
                            o.id === orderId ? { ...o, status: newStatus } : o
                        )
                    );
                },
                onError: (errs) => {
                    console.error("Gagal memperbarui status:", errs);
                    setProcessing(false);

                    let msg = "Gagal memperbarui status.";
                    if (errs && typeof errs === "object") {
                        if (errs.status)
                            msg = Array.isArray(errs.status)
                                ? errs.status.join(" ")
                                : errs.status;
                        else if (errs.message) msg = errs.message;
                        else msg = Object.values(errs).flat().join(" ");
                    }
                    showToast(msg, "error");
                },
                onFinish: () => {
                    setProcessing(false);
                },
            }
        );
    };

    const getBadgeVariant = (status) => {
        switch (status) {
            case "pending":
                return "destructive";
            case "processing":
                return "secondary";
            case "completed":
                return "default";
            case "cancelled":
                return "outline";
            default:
                return "secondary";
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Manajemen Pesanan
                </h2>
            }
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
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Order ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Pelanggan
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Total
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tanggal
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {ordersList.map((order) => (
                                        <tr key={order.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                {order.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                {order.user.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                Rp{" "}
                                                {order.total_price.toLocaleString(
                                                    "id-ID"
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                {new Date(
                                                    order.created_at
                                                ).toLocaleString("id-ID")}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <Badge
                                                    variant={getBadgeVariant(
                                                        order.status
                                                    )}
                                                >
                                                    {order.status}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <Select
                                                    onValueChange={(value) =>
                                                        handleStatusChange(
                                                            order.id,
                                                            value
                                                        )
                                                    }
                                                    defaultValue={order.status}
                                                >
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Ubah Status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="pending">
                                                            Pending
                                                        </SelectItem>
                                                        <SelectItem value="processing">
                                                            Processing
                                                        </SelectItem>
                                                        <SelectItem value="completed">
                                                            Completed
                                                        </SelectItem>
                                                        <SelectItem value="cancelled">
                                                            Cancelled
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* toast rendered globally below */}
                        </CardContent>
                    </Card>
                    <Modal
                        show={confirmOpen}
                        onClose={() => setConfirmOpen(false)}
                    >
                        <div className="p-6">
                            <h3 className="text-lg font-medium">
                                Konfirmasi Ubah Status
                            </h3>
                            <p className="mt-2 text-sm text-gray-600">
                                Apakah Anda yakin ingin mengubah status pesanan?
                            </p>
                            <div className="mt-4 flex justify-end">
                                <Button
                                    variant="outline"
                                    onClick={() => setConfirmOpen(false)}
                                >
                                    Batal
                                </Button>
                                <Button
                                    className="ms-2"
                                    onClick={confirmAndSend}
                                    disabled={processing}
                                >
                                    {processing ? "Mengubah..." : "Ya, ubah"}
                                </Button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
            {/* Toast */}
            <Toast
                message={toast}
                type={toastType}
                onClose={() => setToast(null)}
            />
        </AuthenticatedLayout>
    );
}
