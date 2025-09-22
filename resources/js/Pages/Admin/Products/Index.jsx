import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

export default function Index({ products }) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = (productId, productName) => {
        if (confirm(`Are you sure you want to delete "${productName}"? This action cannot be undone.`)) {
            destroy(route('admin.products.destroy', productId));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Product Management
                    </h2>
                    <Link href={route('admin.products.create')}>
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Product
                        </Button>
                    </Link>
                </div>
            }
        >
            <Head title="Product Management" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Products</CardTitle>
                            <CardDescription>
                                Manage your kantin products
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {products.data.length > 0 ? (
                                    <div className="grid gap-4">
                                        {products.data.map((product) => (
                                            <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                                                <div className="flex items-center space-x-4">
                                                    {product.image && (
                                                        <img
                                                            src={`/storage/${product.image}`}
                                                            alt={product.name}
                                                            className="w-16 h-16 object-cover rounded-lg"
                                                        />
                                                    )}
                                                    <div>
                                                        <h3 className="font-medium">{product.name}</h3>
                                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                                            {product.description}
                                                        </p>
                                                        <div className="flex items-center space-x-2 mt-1">
                                                            <Badge variant="secondary">
                                                                Rp {product.price.toLocaleString()}
                                                            </Badge>
                                                            <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                                                                Stock: {product.stock}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Link href={route('admin.products.show', product.id)}>
                                                        <Button variant="outline" size="sm">
                                                            <Eye className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link href={route('admin.products.edit', product.id)}>
                                                        <Button variant="outline" size="sm">
                                                            <Edit className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleDelete(product.id, product.name)}
                                                        disabled={processing}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-muted-foreground">No products found.</p>
                                        <Link href={route('admin.products.create')}>
                                            <Button className="mt-4">
                                                <Plus className="w-4 h-4 mr-2" />
                                                Add Your First Product
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Pagination */}
                            {products.last_page > 1 && (
                                <div className="flex justify-center mt-6">
                                    <div className="flex space-x-2">
                                        {products.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url}
                                                className={`px-3 py-2 text-sm border rounded ${
                                                    link.active
                                                        ? 'bg-blue-500 text-white border-blue-500'
                                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}