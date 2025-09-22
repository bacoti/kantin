import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const [notification, setNotification] = useState('');

    useEffect(() => {
        axios.get('/api/products')
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
    }, []);

    const handleAddToCart = (product) => {
        addToCart(product);
        setNotification(`${product.name} ditambahkan ke keranjang!`);
        setTimeout(() => {
            setNotification('');
        }, 3000);
    };

    const formatCurrency = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(number);
    };

    if (loading) {
        return <p className="text-center text-gray-500">Memuat menu...</p>;
    }

    return (
        <div className="container mx-auto py-8">
            {notification && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
                    <span className="block sm:inline">{notification}</span>
                </div>
            )}

            <h2 className="text-3xl font-bold mb-6 text-gray-900">Menu Kantin</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <Card key={product.id} className="flex flex-col justify-between shadow-lg">
                        {/* BAGIAN INI YANG DIPERBAIKI */}
                        <CardHeader>
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-48 object-cover rounded-t-lg mb-4"
                            />
                            <CardTitle>{product.name}</CardTitle>
                            <CardDescription className="h-10">{product.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-xl font-semibold text-gray-800">
                                {formatCurrency(product.price)}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" onClick={() => handleAddToCart(product)}>
                                Tambah ke Keranjang
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}

