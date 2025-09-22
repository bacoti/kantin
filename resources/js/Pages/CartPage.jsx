import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react"; // Import 'router'
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function CartPage({ auth }) {
    const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);

    const formatCurrency = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(number);
    };

    const totalHarga = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const handleCheckout = async () => {
        console.log("Starting checkout process...");
        console.log("Cart items:", cartItems);

        // Validasi sebelum checkout
        if (cartItems.length === 0) {
            alert("Keranjang Anda kosong. Tambahkan produk terlebih dahulu.");
            return;
        }

        // Validasi quantity
        const invalidItems = cartItems.filter((item) => item.quantity <= 0);
        if (invalidItems.length > 0) {
            alert(
                "Ada item dengan jumlah tidak valid. Periksa kembali keranjang Anda."
            );
            return;
        }

        console.log("Validation passed, sending request...");
        console.log("Current cookies:", document.cookie);
        console.log(
            "CSRF meta tag:",
            document.querySelector('meta[name="csrf-token"]')?.content
        );

        // Refresh CSRF token sebelum checkout
        console.log("Refreshing CSRF token...");
        await axios.get("/sanctum/csrf-cookie");

        setIsProcessing(true);
        axios
            .post("/api/orders-noauth", { cartItems })
            .then((response) => {
                console.log("Checkout success:", response.data);
                clearCart();
                // Redirect ke halaman sukses dengan data pesanan
                const orderId = response.data?.order_id;
                if (orderId) {
                    console.log(
                        "Redirecting to order success with order_id:",
                        orderId
                    );
                    // Gunakan route test tanpa auth untuk sementara
                    window.location.href = `/order/success-test/${orderId}`;
                } else {
                    console.error("No order_id in response:", response.data);
                    alert(
                        "Pesanan berhasil dibuat, tapi ada masalah dengan redirect. Silakan cek riwayat pesanan."
                    );
                    router.visit(route("orders.index"));
                }
            })
            .catch((error) => {
                console.error("Checkout error:", error);
                console.error("Error details:", {
                    status: error.response?.status,
                    statusText: error.response?.statusText,
                    data: error.response?.data,
                    headers: error.response?.headers,
                });

                let errorMessage = "Terjadi kesalahan saat membuat pesanan.";

                if (error.response) {
                    // Server responded with error status
                    console.log("Error response:", error.response);
                    if (error.response.status === 401) {
                        errorMessage =
                            "Sesi Anda telah berakhir. Silakan login kembali.";
                        // Redirect ke login
                        router.visit(route("login"));
                        return;
                    } else if (error.response.status === 422) {
                        errorMessage =
                            "Data pesanan tidak valid. Periksa kembali item di keranjang.";
                    } else if (error.response.status === 419) {
                        errorMessage =
                            "Token keamanan kadaluarsa. Silakan refresh halaman dan coba lagi.";
                    } else if (error.response.data?.message) {
                        errorMessage = error.response.data.message;
                    }
                } else if (error.request) {
                    // Network error
                    console.log("Network error:", error.request);
                    errorMessage =
                        "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.";
                }

                alert(errorMessage);
            })
            .finally(() => {
                setIsProcessing(false);
            });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Keranjang Belanja
                </h2>
            }
        >
            <Head title="Keranjang Belanja" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {cartItems.length === 0 ? (
                                <div className="text-center py-10">
                                    <p className="text-gray-500 text-xl">
                                        Keranjang Anda masih kosong.
                                    </p>
                                    <Link href={route("dashboard")}>
                                        <Button className="mt-4">
                                            Mulai Belanja
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div>
                                    {cartItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between border-b py-4"
                                        >
                                            <div className="flex items-center">
                                                <img
                                                    src={item.image_url}
                                                    alt={item.name}
                                                    className="w-20 h-20 object-cover rounded-md"
                                                />
                                                <div className="ml-4">
                                                    <h3 className="font-semibold text-lg">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-gray-600">
                                                        {formatCurrency(
                                                            item.price
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center border rounded-md">
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                item.quantity -
                                                                    1
                                                            )
                                                        }
                                                        className="px-3 py-1"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="px-4">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                item.quantity +
                                                                    1
                                                            )
                                                        }
                                                        className="px-3 py-1"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <Button
                                                    variant="destructive"
                                                    onClick={() =>
                                                        removeFromCart(item.id)
                                                    }
                                                >
                                                    Hapus
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="mt-6 text-right">
                                        <h3 className="text-2xl font-bold">
                                            Total: {formatCurrency(totalHarga)}
                                        </h3>
                                        <Button
                                            className="mt-4 text-lg px-8 py-6"
                                            onClick={handleCheckout}
                                            disabled={isProcessing}
                                        >
                                            {isProcessing
                                                ? "Memproses..."
                                                : "Lanjutkan ke Checkout"}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
