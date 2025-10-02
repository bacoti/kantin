import React, { useState, useEffect } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Plus, Edit, Trash2, Search, User, Shield, UserCog } from 'lucide-react';

const roleIcons = {
    customer: <User className="w-4 h-4" />,
    admin: <Shield className="w-4 h-4" />,
    manager: <UserCog className="w-4 h-4" />
};

const roleColors = {
    customer: "default",
    admin: "destructive",
    manager: "secondary"
};

const roleLabels = {
    customer: "Customer",
    admin: "Admin",
    manager: "Manager"
};

export default function Index({ users, filters, roles, flash }) {
    const { delete: destroy, processing } = useForm();
    const [search, setSearch] = useState(filters.search || '');
    const [roleFilter, setRoleFilter] = useState(filters.role || '');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const handleDeleteClick = (userId, userName) => {
        setUserToDelete({ id: userId, name: userName });
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        if (userToDelete) {
            destroy(route('admin.users.destroy', userToDelete.id), {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setUserToDelete(null);
                },
                onError: () => {
                    // Keep modal open on error so user can see the error message
                }
            });
        }
    };

    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
        setUserToDelete(null);
    };

    // Handle ESC key to close modal
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === 'Escape' && showDeleteModal) {
                handleDeleteCancel();
            }
        };

        if (showDeleteModal) {
            document.addEventListener('keydown', handleEscKey);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey);
            document.body.style.overflow = 'unset';
        };
    }, [showDeleteModal]);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.users.index'), {
            search: search,
            role: roleFilter
        }, {
            preserveState: true,
            replace: true
        });
    };

    const handleRoleFilter = (value) => {
        setRoleFilter(value);
        router.get(route('admin.users.index'), {
            search: search,
            role: value === 'all' ? '' : value
        }, {
            preserveState: true,
            replace: true
        });
    };

    const clearFilters = () => {
        setSearch('');
        setRoleFilter('');
        router.get(route('admin.users.index'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Kelola Pengguna
                    </h2>
                    <Link href={route('admin.users.create')}>
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Tambah Pengguna
                        </Button>
                    </Link>
                </div>
            }
        >
            <Head title="Kelola Pengguna" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Flash Messages */}
                    {flash?.success && (
                        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                            {flash.success}
                        </div>
                    )}
                    {flash?.error && (
                        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                            {flash.error}
                        </div>
                    )}

                    <Card>
                        <CardHeader>
                            <CardTitle>Daftar Pengguna</CardTitle>
                            <CardDescription>
                                Kelola semua pengguna dalam sistem kantin digital
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {/* Search and Filter */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <form onSubmit={handleSearch} className="flex-1 flex gap-2">
                                    <Input
                                        type="text"
                                        placeholder="Cari berdasarkan nama atau email..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="flex-1"
                                    />
                                    <Button type="submit" variant="outline">
                                        <Search className="w-4 h-4" />
                                    </Button>
                                </form>

                                <div className="flex gap-2">
                                    <Select value={roleFilter || 'all'} onValueChange={handleRoleFilter}>
                                        <SelectTrigger className="w-48">
                                            <SelectValue placeholder="Filter berdasarkan role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Semua Role</SelectItem>
                                            {roles.map((role) => (
                                                <SelectItem key={role} value={role}>
                                                    {roleLabels[role]}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    {(search || roleFilter) && (
                                        <Button variant="outline" onClick={clearFilters}>
                                            Clear
                                        </Button>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4">
                                {users.data.length > 0 ? (
                                    <div className="grid gap-4">
                                        {users.data.map((user) => (
                                            <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                                        {roleIcons[user.role]}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-medium">{user.name}</h3>
                                                        <p className="text-sm text-muted-foreground">
                                                            {user.email}
                                                        </p>
                                                        <div className="flex items-center space-x-2 mt-1">
                                                            <Badge variant={roleColors[user.role]}>
                                                                {roleLabels[user.role]}
                                                            </Badge>
                                                            <span className="text-xs text-muted-foreground">
                                                                Bergabung: {new Date(user.created_at).toLocaleDateString('id-ID')}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Link href={route('admin.users.edit', user.id)}>
                                                        <Button variant="outline" size="sm">
                                                            <Edit className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleDeleteClick(user.id, user.name)}
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
                                        <User className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                                        <p className="text-muted-foreground mb-2">
                                            {(search || roleFilter) ? 'Tidak ada pengguna yang ditemukan.' : 'Belum ada pengguna.'}
                                        </p>
                                        {!(search || roleFilter) && (
                                            <Link href={route('admin.users.create')}>
                                                <Button className="mt-4">
                                                    <Plus className="w-4 h-4 mr-2" />
                                                    Tambah Pengguna Pertama
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Pagination */}
                            {users.last_page > 1 && (
                                <div className="flex justify-center mt-6">
                                    <div className="flex space-x-2">
                                        {users.links.map((link, index) => (
                                            link.url ? (
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
                                            ) : (
                                                <span
                                                    key={index}
                                                    className="px-3 py-2 text-sm border rounded bg-gray-100 text-gray-400 border-gray-300"
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            )
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={handleDeleteCancel}
                >
                    <div
                        className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                                <Trash2 className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Konfirmasi Hapus Pengguna
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Tindakan ini tidak dapat dibatalkan
                                </p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="text-gray-700">
                                Apakah Anda yakin ingin menghapus pengguna{' '}
                                <span className="font-semibold text-gray-900">
                                    "{userToDelete?.name}"
                                </span>
                                ?
                            </p>
                            <p className="text-sm text-red-600 mt-2">
                                Data pengguna dan semua informasi terkait akan dihapus secara permanen.
                            </p>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <Button
                                variant="outline"
                                onClick={handleDeleteCancel}
                                disabled={processing}
                            >
                                Batal
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleDeleteConfirm}
                                disabled={processing}
                            >
                                {processing ? 'Menghapus...' : 'Ya, Hapus'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
