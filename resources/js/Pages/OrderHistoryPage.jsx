import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import axios from "axios";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export default function OrderHistoryPage({ auth }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios
            .get("/api/orders-history-test")
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                console.error("Error fetching order history:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const formatCurrency = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(number);
    };

    const formatDate = (dateString) => {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };
        return new Date(dateString).toLocaleDateString("id-ID", options);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Riwayat Pesanan
                </h2>
            }
        >
            <Head title="Riwayat Pesanan" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {loading ? (
                                <p>Memuat riwayat pesanan...</p>
                            ) : orders.length === 0 ? (
                                <p>Anda belum memiliki riwayat pesanan.</p>
                            ) : (
                                <Accordion
                                    type="single"
                                    collapsible
                                    className="w-full"
                                >
                                    {orders.map((order) => (
                                        <AccordionItem
                                            value={`item-${order.id}`}
                                            key={order.id}
                                        >
                                            <AccordionTrigger>
                                                <div className="flex justify-between w-full pr-4">
                                                    <span>
                                                        Pesanan #{order.id} -{" "}
                                                        {formatDate(
                                                            order.created_at
                                                        )}
                                                    </span>
                                                    <span className="font-semibold">
                                                        {formatCurrency(
                                                            order.total_price
                                                        )}
                                                    </span>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className="pl-4 border-l-2 ml-2">
                                                    <p className="mb-2">
                                                        Status:{" "}
                                                        <Badge>
                                                            {order.status}
                                                        </Badge>
                                                    </p>
                                                    <h4 className="font-semibold mb-2">
                                                        Detail Item:
                                                    </h4>
                                                    <ul>
                                                        {order.order_details.map(
                                                            (detail) => (
                                                                <li
                                                                    key={
                                                                        detail.id
                                                                    }
                                                                    className="flex justify-between mb-1"
                                                                >
                                                                    <span>
                                                                        {
                                                                            detail
                                                                                .product
                                                                                .name
                                                                        }{" "}
                                                                        (x
                                                                        {
                                                                            detail.quantity
                                                                        }
                                                                        )
                                                                    </span>
                                                                    <span>
                                                                        {formatCurrency(
                                                                            detail.price *
                                                                                detail.quantity
                                                                        )}
                                                                    </span>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
