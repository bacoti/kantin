import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { 
    Eye, 
    EyeOff, 
    User, 
    Mail, 
    Lock, 
    Check, 
    X, 
    AlertCircle, 
    ChefHat, 
    Utensils,
    Coffee,
    Loader2
} from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const getPasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return strength;
    };

    const passwordStrength = getPasswordStrength(data.password);

    const getPasswordStrengthText = (strength) => {
        switch (strength) {
            case 0:
            case 1:
                return { text: 'Lemah', color: 'text-red-500' };
            case 2:
                return { text: 'Sedang', color: 'text-yellow-500' };
            case 3:
                return { text: 'Kuat', color: 'text-orange-500' };
            case 4:
                return { text: 'Sangat Kuat', color: 'text-green-500' };
            default:
                return { text: '', color: '' };
        }
    };

    const isStepValid = () => {
        if (currentStep === 1) {
            return data.name.trim() !== '' && data.email.trim() !== '' && !errors.name && !errors.email;
        }
        if (currentStep === 2) {
            return data.password !== '' && data.password_confirmation !== '' && 
                   data.password === data.password_confirmation && passwordStrength >= 2;
        }
        return false;
    };

    const handleNext = () => {
        if (currentStep === 1 && isStepValid()) {
            setCurrentStep(2);
        }
    };

    const handlePrevious = () => {
        if (currentStep === 2) {
            setCurrentStep(1);
        }
    };

    const passwordCriteria = [
        { text: 'Minimal 8 karakter', met: data.password.length >= 8 },
        { text: 'Mengandung huruf besar', met: /[A-Z]/.test(data.password) },
        { text: 'Mengandung angka', met: /[0-9]/.test(data.password) },
        { text: 'Mengandung simbol', met: /[^A-Za-z0-9]/.test(data.password) },
    ];

    return (
        <>
            <Head title="Daftar - Kantin Digital" />
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 flex items-center justify-center p-4">
                <div className="w-full max-w-md space-y-8 bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-orange-100/50">
                    {/* Logo and Header */}
                    <div className="text-center space-y-3">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                            <ChefHat className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Daftar Akun</h2>
                            <p className="text-gray-600">Bergabunglah dengan Kantin Digital</p>
                        </div>
                    </div>

                    {/* Progress Steps */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            {[1, 2].map((step) => (
                                <div key={step} className="flex items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                                        currentStep >= step 
                                            ? 'bg-orange-500 text-white shadow-lg' 
                                            : 'bg-white border-2 border-gray-200 text-gray-400'
                                    }`}>
                                        {step}
                                    </div>
                                    {step < 2 && (
                                        <div className="flex-1 mx-4">
                                            <div className={`h-1 rounded-full transition-all duration-300 ${
                                                currentStep >= step + 1 ? 'bg-orange-500' : 'bg-gray-200'
                                            }`} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>Info Pribadi</span>
                            <span>Keamanan</span>
                        </div>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Step 1: Personal Information */}
                        {currentStep === 1 && (
                            <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-gray-700 font-medium">
                                        Nama Lengkap
                                    </Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <Input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Masukkan nama lengkap"
                                            className="pl-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
                                            required
                                            autoFocus
                                        />
                                    </div>
                                    {errors.name && (
                                        <div className="border border-red-200 bg-red-50 rounded-lg p-2">
                                            <div className="flex items-center space-x-2">
                                                <AlertCircle className="w-4 h-4 text-red-600" />
                                                <p className="text-sm text-red-700">{errors.name}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

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

                                <div className="flex space-x-3 pt-4">
                                    <Button 
                                        type="button" 
                                        variant="outline" 
                                        disabled
                                        className="flex-1 border-gray-200 text-gray-400"
                                    >
                                        Kembali
                                    </Button>
                                    <Button 
                                        type="button" 
                                        onClick={handleNext}
                                        disabled={!isStepValid()}
                                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Lanjutkan
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Security */}
                        {currentStep === 2 && (
                            <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
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
                                            placeholder="Buat password yang kuat"
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

                                    {/* Password Strength */}
                                    {data.password && (
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">Kekuatan Password</span>
                                                <span className={`text-sm font-medium ${getPasswordStrengthText(passwordStrength).color}`}>
                                                    {getPasswordStrengthText(passwordStrength).text}
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-4 gap-1">
                                                {[...Array(4)].map((_, index) => (
                                                    <div key={index} className="h-1 rounded-full bg-gray-200">
                                                        <div className={`h-1 rounded-full transition-all duration-300 ${
                                                            passwordStrength >= index + 1 
                                                                ? passwordStrength === 1 ? 'bg-red-500' 
                                                                : passwordStrength === 2 ? 'bg-yellow-500'
                                                                : passwordStrength === 3 ? 'bg-orange-500'
                                                                : 'bg-green-500'
                                                                : 'bg-gray-200'
                                                        }`} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Password Criteria */}
                                    {data.password && (
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-600 font-medium">Kriteria Password:</p>
                                            {passwordCriteria.map((criteria, index) => (
                                                <div key={index} className="flex items-center space-x-2">
                                                    {criteria.met ? (
                                                        <Check className="w-4 h-4 text-green-500" />
                                                    ) : (
                                                        <X className="w-4 h-4 text-gray-300" />
                                                    )}
                                                    <span className={`text-sm ${criteria.met ? 'text-green-600' : 'text-gray-500'}`}>
                                                        {criteria.text}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password_confirmation" className="text-gray-700 font-medium">
                                        Konfirmasi Password
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <Input
                                            id="password_confirmation"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            placeholder="Ulangi password"
                                            className="pl-10 pr-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    {errors.password_confirmation && (
                                        <div className="border border-red-200 bg-red-50 rounded-lg p-2">
                                            <div className="flex items-center space-x-2">
                                                <AlertCircle className="w-4 h-4 text-red-600" />
                                                <p className="text-sm text-red-700">{errors.password_confirmation}</p>
                                            </div>
                                        </div>
                                    )}
                                    {data.password_confirmation && data.password !== data.password_confirmation && (
                                        <div className="border border-red-200 bg-red-50 rounded-lg p-2">
                                            <div className="flex items-center space-x-2">
                                                <AlertCircle className="w-4 h-4 text-red-600" />
                                                <p className="text-sm text-red-700">Password tidak cocok</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex space-x-3 pt-4">
                                    <Button 
                                        type="button" 
                                        variant="outline" 
                                        onClick={handlePrevious}
                                        className="flex-1 border-orange-200 text-orange-600 hover:bg-orange-50"
                                    >
                                        Kembali
                                    </Button>
                                    <Button 
                                        type="submit" 
                                        disabled={processing || !isStepValid()}
                                        className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {processing ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Mendaftar...
                                            </>
                                        ) : (
                                            <>
                                                <ChefHat className="w-4 h-4 mr-2" />
                                                Daftar Sekarang
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </form>

                    {/* Security Notice */}
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                            <Coffee className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-orange-800">Keamanan Terjamin</p>
                                <p className="text-xs text-orange-600">
                                    Data Anda dienkripsi dan kami tidak menyimpan informasi sensitif dalam bentuk teks biasa.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Login Link */}
                    <p className="text-center text-gray-600">
                        Sudah punya akun?{' '}
                        <Link href={route('login')} className="text-orange-500 hover:text-orange-600 font-medium transition-colors">
                            Masuk di sini
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
