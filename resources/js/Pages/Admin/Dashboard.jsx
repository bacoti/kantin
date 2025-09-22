import React from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";

export default function Dashboard({
    total_users,
    total_products,
    total_orders,
    total_revenue,
    recent_orders,
}) {
    const stats = [
        {
            title: "Total Users",
            value: total_users,
            icon: Users,
            description: "Registered users",
        },
        {
            title: "Total Products",
            value: total_products,
            icon: Package,
            description: "Available products",
        },
        {
            title: "Total Orders",
            value: total_orders,
            icon: ShoppingCart,
            description: "Completed orders",
        },
        {
            title: "Total Revenue",
            value: `Rp ${total_revenue?.toLocaleString() || 0}`,
            icon: DollarSign,
            description: "Total earnings",
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Admin Dashboard
                </h2>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <Card key={index}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {stat.title}
                                    </CardTitle>
                                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {stat.value}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {stat.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Recent Orders */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Orders</CardTitle>
                            <CardDescription>
                                Latest orders placed by customers
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recent_orders?.length > 0 ? (
                                    recent_orders.map((order) => (
                                        <div
                                            key={order.id}
                                            className="flex items-center justify-between p-4 border rounded-lg"
                                        >
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium">
                                                    Order #{order.id}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {order.user?.name} -{" "}
                                                    {new Date(
                                                        order.created_at
                                                    ).toLocaleDateString()}
                                                </p>
                                                <div className="flex flex-wrap gap-1">
                                                    {order.order_details?.map(
                                                        (detail) => (
                                                            <Badge
                                                                key={detail.id}
                                                                variant="secondary"
                                                                className="text-xs"
                                                            >
                                                                {
                                                                    detail
                                                                        .product
                                                                        ?.name
                                                                }{" "}
                                                                x
                                                                {
                                                                    detail.quantity
                                                                }
                                                            </Badge>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-medium">
                                                    Rp{" "}
                                                    {order.total_price?.toLocaleString()}
                                                </p>
                                                <Badge
                                                    variant={
                                                        order.status ===
                                                        "completed"
                                                            ? "default"
                                                            : "secondary"
                                                    }
                                                >
                                                    {order.status}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-muted-foreground text-center py-4">
                                        No orders yet
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
