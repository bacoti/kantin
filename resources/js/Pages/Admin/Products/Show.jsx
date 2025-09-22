import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { ArrowLeft, Edit, Package, DollarSign, Hash } from 'lucide-react';

export default function Show({ product }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href={route('admin.products.index')}>
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Products
                            </Button>
                        </Link>
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            Product Details
                        </h2>
                    </div>
                    <Link href={route('admin.products.edit', product.id)}>
                        <Button>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Product
                        </Button>
                    </Link>
                </div>
            }
        >
            <Head title={`Product: ${product.name}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Product Image */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Product Image</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {product.image ? (
                                    <img
                                        src={`/storage/${product.image}`}
                                        alt={product.name}
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                ) : (
                                    <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                                        <Package className="w-16 h-16 text-gray-400" />
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Product Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Product Information</CardTitle>
                                <CardDescription>
                                    Detailed information about this product
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Hash className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">ID:</span>
                                    <span className="font-medium">{product.id}</span>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold">{product.name}</h3>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-2xl font-bold text-green-600">
                                        Rp {product.price.toLocaleString()}
                                    </span>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Package className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">Stock:</span>
                                    <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                                        {product.stock} units
                                    </Badge>
                                </div>

                                <div>
                                    <h4 className="font-medium mb-2">Description</h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>

                                <div className="pt-4 border-t">
                                    <div className="text-sm text-muted-foreground">
                                        Created: {new Date(product.created_at).toLocaleDateString()}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Last Updated: {new Date(product.updated_at).toLocaleDateString()}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}