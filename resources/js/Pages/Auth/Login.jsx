import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { 
    Eye, 
    EyeOff, 
    Mail, 
    Lock, 
    AlertCircle, 
    ChefHat, 
    Utensils,
    Coffee,
    Loader2,
    CheckCircle
} from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Masuk - Kantin Digital" />
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 flex items-center justify-center p-4">
                <div className="w-full max-w-md space-y-8 bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-orange-100/50">
                    {/* Logo and Header */}
                    <div className="text-center space-y-3">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                            <ChefHat className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Selamat Datang</h2>
                            <p className="text-gray-600">Masuk ke Kantin Digital</p>
                        </div>
                    </div>

                    {/* Status Message */}
                    {status && (
                        <div className="border border-green-200 bg-green-50 rounded-lg p-4">
                            <div className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <p className="text-sm text-green-700">{status}</p>
                            </div>
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-700 font-medium">
                                Email
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="nama@email.com"
                                    className="pl-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
                                    required
                                    autoFocus
                                />
                            </div>
                            {errors.email && (
                                <div className="border border-red-200 bg-red-50 rounded-lg p-2">
                                    <div className="flex items-center space-x-2">
                                        <AlertCircle className="w-4 h-4 text-red-600" />
                                        <p className="text-sm text-red-700">{errors.email}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-700 font-medium">
                                Password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Masukkan password"
                                    className="pl-10 pr-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && (
                                <div className="border border-red-200 bg-red-50 rounded-lg p-2">
                                    <div className="flex items-center space-x-2">
                                        <AlertCircle className="w-4 h-4 text-red-600" />
                                        <p className="text-sm text-red-700">{errors.password}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded border-gray-300 text-orange-500 focus:ring-orange-500 focus:ring-offset-0"
                                />
                                <span className="text-gray-600">Ingat saya</span>
                            </label>
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-orange-500 hover:text-orange-600 font-medium transition-colors"
                                >
                                    Lupa password?
                                </Link>
                            )}
                        </div>

                        {/* Submit Button */}
                        <Button 
                            type="submit" 
                            disabled={processing}
                            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Masuk...
                                </>
                            ) : (
                                <>
                                    <Coffee className="w-4 h-4 mr-2" />
                                    Masuk
                                </>
                            )}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">atau</span>
                        </div>
                    </div>

                    {/* Quick Access */}
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                            <Utensils className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-orange-800">Akses Cepat</p>
                                <p className="text-xs text-orange-600">
                                    Masuk sekali untuk mengakses semua fitur kantin digital dengan mudah.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Register Link */}
                    <p className="text-center text-gray-600">
                        Belum punya akun?{' '}
                        <Link href={route('register')} className="text-orange-500 hover:text-orange-600 font-medium transition-colors">
                            Daftar sekarang
                        </Link>
                    </p>

                    {/* Footer Note */}
                    <div className="text-center">
                        <p className="text-xs text-gray-500">
                            Dengan masuk, Anda menyetujui syarat dan ketentuan kami
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
