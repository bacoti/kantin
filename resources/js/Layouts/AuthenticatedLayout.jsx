import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useCart } from "@/context/CartContext";
import { 
    ChefHat, 
    ShoppingCart, 
    User, 
    Settings, 
    LogOut, 
    History,
    Users,
    Package,
    BarChart3,
    Menu,
    X,
    Coffee,
    Utensils
} from 'lucide-react';

export default function Authenticated({ header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const { cartItems } = useCart();
    const { auth } = usePage().props;

    const user = auth.user; // Sekarang 'auth.user' pasti ada jika sudah login
    const totalItems = (cartItems || []).reduce(
        (sum, item) => sum + (item.quantity || 0),
        0
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
            <nav className="bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            {/* Logo */}
                            <div className="shrink-0 flex items-center">
                                <Link href="/" className="flex items-center space-x-3 group">
                                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                                        <ChefHat className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="hidden sm:block">
                                        <h1 className="text-xl font-bold text-gray-900">Kantin Digital</h1>
                                        <p className="text-xs text-gray-600">Pesan Online, Ambil Cepat</p>
                                    </div>
                                </Link>
                            </div>

                            {/* Desktop Navigation */}
                            <div className="hidden space-x-2 sm:-my-px sm:ms-10 sm:flex sm:items-center">
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                    className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-orange-50 hover:text-orange-600"
                                >
                                    <Coffee className="w-4 h-4" />
                                    <span>Dashboard</span>
                                </NavLink>

                                {/* Admin Menu */}
                                {user?.role === "admin" && (
                                    <div className="flex items-center space-x-2">
                                        <div className="h-6 w-px bg-gray-200"></div>
                                        <NavLink
                                            href={route("admin.dashboard")}
                                            active={route().current("admin.dashboard")}
                                            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-orange-50 hover:text-orange-600"
                                        >
                                            <Settings className="w-4 h-4" />
                                            <span>Admin</span>
                                        </NavLink>
                                        <NavLink
                                            href={route("admin.products.index")}
                                            active={route().current("admin.products.*")}
                                            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-orange-50 hover:text-orange-600"
                                        >
                                            <Package className="w-4 h-4" />
                                            <span>Products</span>
                                        </NavLink>
                                        <NavLink
                                            href={route("admin.users.index")}
                                            active={route().current("admin.users.*")}
                                            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-orange-50 hover:text-orange-600"
                                        >
                                            <Users className="w-4 h-4" />
                                            <span>Users</span>
                                        </NavLink>
                                        <NavLink
                                            href={route("admin.reports.index")}
                                            active={route().current("admin.reports.index")}
                                            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-orange-50 hover:text-orange-600"
                                        >
                                            <BarChart3 className="w-4 h-4" />
                                            <span>Reports</span>
                                        </NavLink>
                                    </div>
                                )}

                                {/* Manager Menu */}
                                {auth.user.role === "manager" && (
                                    <div className="flex items-center space-x-2">
                                        <div className="h-6 w-px bg-gray-200"></div>
                                        <NavLink
                                            href={route("manager.orders.index")}
                                            active={route().current("manager.orders.index")}
                                            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-orange-50 hover:text-orange-600"
                                        >
                                            <Utensils className="w-4 h-4" />
                                            <span>Manajemen Pesanan</span>
                                        </NavLink>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className="hidden sm:flex sm:items-center sm:space-x-4">
                            {/* Cart */}
                            <Link
                                href={route("cart.index")}
                                className="relative p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 group"
                            >
                                <ShoppingCart className="w-6 h-6" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium shadow-lg animate-pulse">
                                        {totalItems}
                                    </span>
                                )}
                            </Link>

                            {/* User Dropdown */}
                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="flex items-center space-x-3 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 group">
                                            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-medium text-sm shadow-md group-hover:shadow-lg transition-all duration-200">
                                                {user?.name?.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="hidden md:block text-left">
                                                <div className="font-medium">{user?.name}</div>
                                                <div className="text-xs text-gray-500 capitalize">{user?.role}</div>
                                            </div>
                                            <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content className="w-56 mt-2 bg-white/95 backdrop-blur-md border border-orange-100 shadow-xl rounded-xl">
                                        <div className="px-4 py-3 border-b border-orange-100">
                                            <div className="font-medium text-gray-900">{user?.name}</div>
                                            <div className="text-sm text-gray-500">{user?.email}</div>
                                            <div className="text-xs text-orange-600 capitalize font-medium mt-1">{user?.role}</div>
                                        </div>
                                        
                                        <div className="py-2">
                                            <Dropdown.Link
                                                href={route("profile.edit")}
                                                className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all duration-200"
                                            >
                                                <User className="w-4 h-4" />
                                                <span>Profile</span>
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route("orders.index")}
                                                className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all duration-200"
                                            >
                                                <History className="w-4 h-4" />
                                                <span>Riwayat Pesanan</span>
                                            </Dropdown.Link>
                                            
                                            {user?.role === "admin" && (
                                                <div className="border-t border-orange-100 mt-2 pt-2">
                                                    <div className="px-4 py-1">
                                                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Admin Panel</div>
                                                    </div>
                                                    <Dropdown.Link
                                                        href={route("admin.dashboard")}
                                                        className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all duration-200"
                                                    >
                                                        <Settings className="w-4 h-4" />
                                                        <span>Admin Dashboard</span>
                                                    </Dropdown.Link>
                                                    <Dropdown.Link
                                                        href={route("admin.products.index")}
                                                        className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all duration-200"
                                                    >
                                                        <Package className="w-4 h-4" />
                                                        <span>Manage Products</span>
                                                    </Dropdown.Link>
                                                    <Dropdown.Link
                                                        href={route("admin.users.index")}
                                                        className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all duration-200"
                                                    >
                                                        <Users className="w-4 h-4" />
                                                        <span>Manage Users</span>
                                                    </Dropdown.Link>
                                                </div>
                                            )}
                                            
                                            <div className="border-t border-orange-100 mt-2 pt-2">
                                                <Dropdown.Link
                                                    href={route("logout")}
                                                    method="post"
                                                    as="button"
                                                    className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-all duration-200 w-full"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    <span>Log Out</span>
                                                </Dropdown.Link>
                                            </div>
                                        </div>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200"
                            >
                                {showingNavigationDropdown ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className={`${showingNavigationDropdown ? "block" : "hidden"} sm:hidden bg-white/95 backdrop-blur-md border-t border-orange-100`}>
                    <div className="px-4 pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
                        >
                            <Coffee className="w-5 h-5" />
                            <span>Dashboard</span>
                        </ResponsiveNavLink>
                        
                        {user?.role === "admin" && (
                            <>
                                <div className="my-4 border-t border-orange-100"></div>
                                <div className="px-3 py-2">
                                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Admin Panel</div>
                                </div>
                                <ResponsiveNavLink
                                    href={route("admin.dashboard")}
                                    active={route().current("admin.dashboard")}
                                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
                                >
                                    <Settings className="w-5 h-5" />
                                    <span>Admin Dashboard</span>
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route("admin.products.index")}
                                    active={route().current("admin.products.*")}
                                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
                                >
                                    <Package className="w-5 h-5" />
                                    <span>Manage Products</span>
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route("admin.users.index")}
                                    active={route().current("admin.users.*")}
                                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
                                >
                                    <Users className="w-5 h-5" />
                                    <span>Manage Users</span>
                                </ResponsiveNavLink>
                            </>
                        )}
                        
                        {auth.user.role === "manager" && (
                            <>
                                <div className="my-4 border-t border-orange-100"></div>
                                <ResponsiveNavLink
                                    href={route("manager.orders.index")}
                                    active={route().current("manager.orders.index")}
                                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
                                >
                                    <Utensils className="w-5 h-5" />
                                    <span>Manajemen Pesanan</span>
                                </ResponsiveNavLink>
                            </>
                        )}
                    </div>

                    {/* Mobile User Section */}
                    <div className="pt-4 pb-3 border-t border-orange-100">
                        <div className="px-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-medium shadow-md">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <div className="font-medium text-base text-gray-800">{user?.name}</div>
                                    <div className="font-medium text-sm text-gray-500">{user?.email}</div>
                                    <div className="text-xs text-orange-600 capitalize font-medium">{user?.role}</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 px-4 space-y-1">
                            <ResponsiveNavLink 
                                href={route("profile.edit")}
                                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
                            >
                                <User className="w-5 h-5" />
                                <span>Profile</span>
                            </ResponsiveNavLink>
                            <ResponsiveNavLink 
                                href={route("orders.index")}
                                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
                            >
                                <History className="w-5 h-5" />
                                <span>Riwayat Pesanan</span>
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium text-red-600 hover:bg-red-50 transition-all duration-200 w-full"
                            >
                                <LogOut className="w-5 h-5" />
                                <span>Log Out</span>
                            </ResponsiveNavLink>
                        </div>
                        
                        {/* Mobile Cart */}
                        <div className="mt-4 px-4">
                            <Link
                                href={route("cart.index")}
                                className="flex items-center justify-center space-x-3 w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                <span>Keranjang</span>
                                {totalItems > 0 && (
                                    <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                                        {totalItems}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Header */}
            {header && (
                <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-orange-100">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="pb-20">{children}</main>
        </div>
    );
}
