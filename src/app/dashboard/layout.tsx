'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, Users, BookOpen, Settings, Search, UserCircle2, Menu, X } from 'lucide-react';

const menuItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Home', path: '/dashboard' },
    { icon: <Users className="w-5 h-5" />, label: 'Students', path: '/dashboard/students' },
    { icon: <BookOpen className="w-5 h-5" />, label: 'Classrooms', path: '/dashboard/classrooms' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/dashboard/settings' },
];

const teacher = {
    name: 'Ms. Sagar Dahiwal', // Replace this with dynamic data later
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [active, setActive] = useState('Home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize(); // Set initial value
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-100 text-gray-800">

            {/* Sidebar - Mobile */}
            {isMobileMenuOpen && isMobile && (
                <aside className="fixed inset-0 z-50 bg-white p-5 md:hidden">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-xl font-bold text-blue-600">TeacherAssistX</h1>
                        <button
                            onClick={toggleMobileMenu}
                            className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
                            aria-label="Close menu"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <nav className="space-y-4">
                        {menuItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.path}
                                onClick={() => {
                                    setActive(item.label);
                                    setIsMobileMenuOpen(false);
                                }}
                                className={`flex items-center w-full px-3 py-2 rounded-lg hover:bg-blue-100 transition ${active === item.label ? 'bg-blue-200 text-blue-800 font-semibold' : ''
                                    }`}
                            >
                                <span className="mr-3">{item.icon}</span>
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </aside>
            )}

            {/* Sidebar - Desktop */}
            <aside className={`hidden md:block w-64 bg-white shadow-md p-5 ${isMobile ? 'fixed inset-0 z-40' : ''}`}>
                <h1 className="text-2xl font-bold text-blue-600 mb-8">TeacherAssistX</h1>
                <nav className="space-y-4">
                    {menuItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.path}
                            onClick={() => setActive(item.label)}
                            className={`flex items-center w-full px-3 py-2 rounded-lg hover:bg-blue-100 transition ${active === item.label ? 'bg-blue-200 text-blue-800 font-semibold' : ''
                                }`}
                        >
                            <span className="mr-3">{item.icon}</span>
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Content Section */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Navbar */}
                <header className="flex items-center justify-between px-4 md:px-6 py-4 bg-white shadow">
                    {/* Mobile Menu Button (hidden on desktop) */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
                        aria-label="Toggle menu"
                    >
                        <Menu className="w-5 h-5" />
                    </button>

                    {/* Search - Hidden on mobile when menu is open */}
                    {(!isMobileMenuOpen || !isMobile) && (
                        <div className="relative w-full md:w-72 mx-2 md:mx-0">
                            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    )}

                    {/* Profile */}
                    <div className="flex items-center space-x-3">
                        <UserCircle2 className="w-8 h-8 text-blue-600" />
                        <span className="hidden sm:inline font-medium text-gray-700">{teacher.name}</span>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 p-4 md:p-6 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
}