import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { ArrowLeft, User, Shield, UserCog, Eye, EyeOff } from 'lucide-react';

const roleIcons = {
    customer: <User className="w-4 h-4" />,
    admin: <Shield className="w-4 h-4" />,
    manager: <UserCog className="w-4 h-4" />
};

const roleLabels = {
    customer: "Customer",
    admin: "Admin",
    manager: "Manager"
};

export default function Edit({ user, roles }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        role: user.role || 'customer',
        password: '',
        password_confirmation: '',
    });

    const [changePassword, setChangePassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        // Create form data with basic fields
        const formData = {
            name: data.name,
            email: data.email,
            role: data.role,
        };

        // Only include password fields if changing password
        if (changePassword && data.password) {
            formData.password = data.password;
            formData.password_confirmation = data.password_confirmation;
        }

        put(route('admin.users.update', user.id), formData);
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center space-x-4">
                    <Link href={route('admin.users.index')}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Kembali
                        </Button>
                    </Link>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Edit Pengguna: {user.name}
                    </h2>
                </div>
            }
        >
            <Head title={`Edit Pengguna - ${user.name}`} />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={submit}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Edit Informasi Pengguna</CardTitle>
                                <CardDescription>
                                    Perbarui detail pengguna
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* User Info */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                            {roleIcons[user.role]}
                                        </div>
                                        <div>
                                            <h3 className="font-medium">{user.name}</h3>
                                            <p className="text-sm text-gray-600">
                                                Bergabung: {new Date(user.created_at).toLocaleDateString('id-ID')}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nama Lengkap *</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Masukkan nama lengkap"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="Masukkan alamat email"
                                        required
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-600">{errors.email}</p>
                                    )}
                                </div>

                                {/* Role */}
                                <div className="space-y-2">
                                    <Label htmlFor="role">Role *</Label>
                                    <Select value={data.role} onValueChange={(value) => setData('role', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih role pengguna" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {roles.map((role) => (
                                                <SelectItem key={role} value={role}>
                                                    <div className="flex items-center space-x-2">
                                                        {roleIcons[role]}
                                                        <span>{roleLabels[role]}</span>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.role && (
                                        <p className="text-sm text-red-600">{errors.role}</p>
                                    )}
                                </div>

                                {/* Change Password Section */}
                                <div className="border-t pt-6">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <Button
                                            type="button"
                                            variant={changePassword ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => {
                                                setChangePassword(!changePassword);
                                                if (changePassword) {
                                                    // Reset password fields when canceling
                                                    setData('password', '');
                                                    setData('password_confirmation', '');
                                                }
                                            }}
                                        >
                                            {changePassword ? "Batal Ubah Password" : "Ubah Password"}
                                        </Button>
                                        <span className="text-sm text-gray-600">
                                            {changePassword ? "Klik untuk membatalkan" : "Klik untuk mengubah password"}
                                        </span>
                                    </div>

                                    {changePassword && (
                                        <div className="space-y-4 pl-6 border-l-2 border-gray-200">
                                            {/* Password */}
                                            <div className="space-y-2">
                                                <Label htmlFor="password">Password Baru *</Label>
                                                <div className="relative">
                                                    <Input
                                                        id="password"
                                                        type={showPassword ? "text" : "password"}
                                                        value={data.password}
                                                        onChange={(e) => setData('password', e.target.value)}
                                                        placeholder="Masukkan password baru (min. 8 karakter)"
                                                        required={changePassword}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff className="h-4 w-4" />
                                                        ) : (
                                                            <Eye className="h-4 w-4" />
                                                        )}
                                                    </Button>
                                                </div>
                                                {errors.password && (
                                                    <p className="text-sm text-red-600">{errors.password}</p>
                                                )}
                                            </div>

                                            {/* Password Confirmation */}
                                            <div className="space-y-2">
                                                <Label htmlFor="password_confirmation">Konfirmasi Password Baru *</Label>
                                                <div className="relative">
                                                    <Input
                                                        id="password_confirmation"
                                                        type={showPasswordConfirmation ? "text" : "password"}
                                                        value={data.password_confirmation}
                                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                                        placeholder="Ulangi password baru"
                                                        required={changePassword}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                        onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                                    >
                                                        {showPasswordConfirmation ? (
                                                            <EyeOff className="h-4 w-4" />
                                                        ) : (
                                                            <Eye className="h-4 w-4" />
                                                        )}
                                                    </Button>
                                                </div>
                                                {errors.password_confirmation && (
                                                    <p className="text-sm text-red-600">{errors.password_confirmation}</p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Role Description */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-medium text-sm mb-2">Deskripsi Role:</h4>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li><strong>Customer:</strong> Dapat melihat produk dan melakukan pemesanan</li>
                                        <li><strong>Manager:</strong> Dapat mengelola pesanan dan status pesanan</li>
                                        <li><strong>Admin:</strong> Dapat mengelola semua aspek sistem (produk, pengguna, laporan)</li>
                                    </ul>
                                </div>

                                {/* Submit Buttons */}
                                <div className="flex justify-end space-x-4 pt-6">
                                    <Link href={route('admin.users.index')}>
                                        <Button type="button" variant="outline">
                                            Batal
                                        </Button>
                                    </Link>
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
