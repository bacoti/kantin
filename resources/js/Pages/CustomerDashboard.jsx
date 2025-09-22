import React from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { ShoppingBag, ShoppingCart, Clock, CheckCircle } from "lucide-react";

export default function Dashboard({ auth }) {
    const user = auth?.user;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Welcome back, {user?.name}!
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Browse Products
                                </CardTitle>
                                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold mb-2">
                                    Explore
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Discover our kantin menu
                                </p>
                                <Link href="/" className="mt-2 inline-block">
                                    <Button size="sm" variant="outline">
                                        Shop Now
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    My Cart
                                </CardTitle>
                                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold mb-2">
                                    View
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Check your shopping cart
                                </p>
                                <Link
                                    href={route("cart.index")}
                                    className="mt-2 inline-block"
                                >
                                    <Button size="sm" variant="outline">
                                        View Cart
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Order History
                                </CardTitle>
                                <Clock className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold mb-2">
                                    Track
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    View your past orders
                                </p>
                                <Link
                                    href={route("orders.index")}
                                    className="mt-2 inline-block"
                                >
                                    <Button size="sm" variant="outline">
                                        View Orders
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Profile
                                </CardTitle>
                                <CheckCircle className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold mb-2">
                                    Manage
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Update your account
                                </p>
                                <Link
                                    href={route("profile.edit")}
                                    className="mt-2 inline-block"
                                >
                                    <Button size="sm" variant="outline">
                                        Edit Profile
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Welcome Message */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Welcome to Kantin Digital! 🍽️</CardTitle>
                            <CardDescription>
                                Your favorite campus cafeteria, now online
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <p className="text-muted-foreground">
                                    Browse our delicious menu, add items to your
                                    cart, and place orders with ease. Track your
                                    orders and enjoy fast, convenient service!
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    <Link href="/">
                                        <Button>
                                            <ShoppingBag className="w-4 h-4 mr-2" />
                                            Start Shopping
                                        </Button>
                                    </Link>
                                    <Link href={route("orders.index")}>
                                        <Button variant="outline">
                                            <Clock className="w-4 h-4 mr-2" />
                                            View Order History
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
