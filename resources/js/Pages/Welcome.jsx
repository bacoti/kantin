import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { 
    ShoppingCart, 
    Clock, 
    Users, 
    Star, 
    ChefHat, 
    Smartphone,
    CheckCircle,
    ArrowRight,
    Coffee,
    Utensils,
    MapPin
} from 'lucide-react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const features = [
        {
            icon: <ShoppingCart className="w-8 h-8 text-orange-600" />,
            title: "Pesan Online",
            description: "Pesan makanan favorit Anda dengan mudah melalui platform digital"
        },
        {
            icon: <Clock className="w-8 h-8 text-green-600" />,
            title: "Hemat Waktu",
            description: "Tidak perlu antri lama, pesan sekarang dan ambil sesuai jadwal"
        },
        {
            icon: <Smartphone className="w-8 h-8 text-blue-600" />,
            title: "Mudah Digunakan",
            description: "Interface yang sederhana dan mudah digunakan untuk semua kalangan"
        }
    ];

    const menuHighlights = [
        {
            icon: <Coffee className="w-6 h-6 text-amber-600" />,
            name: "Minuman Segar",
            description: "Berbagai pilihan minuman segar dan kopi premium"
        },
        {
            icon: <Utensils className="w-6 h-6 text-red-600" />,
            name: "Makanan Hangat",
            description: "Hidangan hangat dan lezat siap saji setiap hari"
        },
        {
            icon: <ChefHat className="w-6 h-6 text-purple-600" />,
            name: "Menu Spesial",
            description: "Menu spesial chef dengan cita rasa yang unik"
        }
    ];

    const stats = [
        { number: "500+", label: "Pelanggan Puas" },
        { number: "50+", label: "Menu Variatif" },
        { number: "24/7", label: "Layanan Online" },
        { number: "4.8", label: "Rating Bintang" }
    ];

    return (
        <>
            <Head title="Kantin Digital - Pesan Makanan Online" />
            
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
                {/* Header */}
                <header className="relative z-10 bg-white/80 backdrop-blur-sm shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            {/* Logo */}
                            <div className="flex items-center space-x-2">
                                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                                    <ChefHat className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">Kantin Digital</h1>
                                    <p className="text-xs text-gray-600">Pesan Online, Ambil Cepat</p>
                                </div>
                            </div>

                            {/* Navigation */}
                            <nav className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link href={route('dashboard')}>
                                        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                                            Dashboard
                                        </Button>
                                    </Link>
                                ) : (
                                    <div className="flex items-center space-x-3">
                                        <Link href={route('login')}>
                                            <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50">
                                                Masuk
                                            </Button>
                                        </Link>
                                        <Link href={route('register')}>
                                            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                                                Daftar
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative py-20 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Content */}
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                                        Pesan Makanan
                                        <span className="text-orange-500"> Favorit Anda</span>
                                    </h2>
                                    <p className="text-xl text-gray-600 leading-relaxed">
                                        Nikmati kemudahan memesan makanan dan minuman di kantin dengan sistem digital yang modern dan praktis.
                                    </p>
                                </div>

                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        <span>Tanpa Antri</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        <span>Pembayaran Mudah</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        <span>Menu Lengkap</span>
                                    </div>
                                </div>

                                {!auth.user && (
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Link href={route('register')}>
                                            <Button size="lg" className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-3">
                                                Mulai Pesan Sekarang
                                                <ArrowRight className="w-5 h-5 ml-2" />
                                            </Button>
                                        </Link>
                                        <Link href={route('login')}>
                                            <Button size="lg" variant="outline" className="w-full sm:w-auto border-orange-200 text-orange-600 hover:bg-orange-50 text-lg px-8 py-3">
                                                Sudah Punya Akun?
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Hero Image/Illustration */}
                            <div className="relative">
                                <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-3xl p-8 shadow-2xl">
                                    <div className="text-center space-y-6">
                                        <div className="w-32 h-32 bg-orange-500 rounded-full flex items-center justify-center mx-auto">
                                            <Utensils className="w-16 h-16 text-white" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-bold text-gray-900">Menu Hari Ini</h3>
                                            <p className="text-gray-600">Lebih dari 50+ pilihan menu lezat</p>
                                        </div>
                                        
                                        {/* Sample Menu Items */}
                                        <div className="grid grid-cols-2 gap-4 mt-6">
                                            {['Nasi Gudeg', 'Es Teh Manis', 'Ayam Bakar', 'Kopi Susu'].map((item, index) => (
                                                <div key={index} className="bg-white rounded-lg p-3 shadow-md">
                                                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                                        <Star className="w-4 h-4 text-orange-500" />
                                                    </div>
                                                    <p className="text-sm font-medium text-gray-700">{item}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">
                                        {stat.number}
                                    </div>
                                    <div className="text-gray-600 font-medium">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Mengapa Memilih Kantin Digital?
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Kami menghadirkan solusi modern untuk kebutuhan makan dan minum Anda dengan teknologi terdepan
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                    <CardHeader className="text-center pb-4">
                                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                            {feature.icon}
                                        </div>
                                        <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-center">
                                        <CardDescription className="text-gray-600 text-base">
                                            {feature.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Menu Highlights */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Kategori Menu Favorit
                            </h2>
                            <p className="text-xl text-gray-600">
                                Pilihan menu terbaik yang selalu diminati pelanggan
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {menuHighlights.map((menu, index) => (
                                <div key={index} className="group cursor-pointer">
                                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                                        <div className="flex items-center space-x-4 mb-4">
                                            <div className="w-12 h-12 bg-white rounded-lg shadow-md flex items-center justify-center">
                                                {menu.icon}
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900">{menu.name}</h3>
                                        </div>
                                        <p className="text-gray-600">{menu.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                {!auth.user && (
                    <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                                        Siap Untuk Memulai?
                                    </h2>
                                    <p className="text-xl text-orange-100 max-w-2xl mx-auto">
                                        Bergabunglah dengan ribuan pengguna yang sudah merasakan kemudahan berbelanja di kantin digital
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                    <Link href={route('register')}>
                                        <Button size="lg" className="w-full sm:w-auto bg-white text-orange-500 hover:bg-gray-100 text-lg px-8 py-3">
                                            Daftar Gratis Sekarang
                                            <ArrowRight className="w-5 h-5 ml-2" />
                                        </Button>
                                    </Link>
                                    <Link href={route('login')}>
                                        <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10 text-lg px-8 py-3">
                                            Sudah Punya Akun
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-4 gap-8">
                            {/* Brand */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                                        <ChefHat className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-xl font-bold">Kantin Digital</span>
                                </div>
                                <p className="text-gray-400">
                                    Solusi modern untuk kebutuhan makan dan minum Anda sehari-hari.
                                </p>
                            </div>

                            {/* Quick Links */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Menu</h3>
                                <ul className="space-y-2 text-gray-400">
                                    <li>Makanan Utama</li>
                                    <li>Minuman</li>
                                    <li>Snack & Cemilan</li>
                                    <li>Menu Spesial</li>
                                </ul>
                            </div>

                            {/* Support */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Bantuan</h3>
                                <ul className="space-y-2 text-gray-400">
                                    <li>Cara Pemesanan</li>
                                    <li>Pembayaran</li>
                                    <li>FAQ</li>
                                    <li>Kontak Support</li>
                                </ul>
                            </div>

                            {/* Contact */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Lokasi</h3>
                                <div className="space-y-2 text-gray-400">
                                    <div className="flex items-center space-x-2">
                                        <MapPin className="w-4 h-4" />
                                        <span>Kantin Utama Kampus</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Clock className="w-4 h-4" />
                                        <span>Senin - Jumat: 07:00 - 17:00</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                            <p className="text-gray-400 text-sm">
                                © 2025 Kantin Digital. All rights reserved.
                            </p>
                            <p className="text-gray-500 text-xs mt-4 md:mt-0">
                                Powered by Laravel v{laravelVersion} (PHP v{phpVersion})
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

                                          
