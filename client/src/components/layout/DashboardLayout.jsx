import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    History,
    Bell,
    FileText,
    Settings,
    LogOut,
    Menu,
    Leaf,
    User,
    Camera,
    Scan
} from 'lucide-react';
import authService from '../../services/authService';

const SidebarLink = ({ to, icon: Icon, label, active }) => (
    <Link
        to={to}
        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors mb-1 ${active
            ? 'bg-green-100 text-green-700'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
    >
        <Icon className="h-5 w-5" />
        <span className="font-medium">{label}</span>
    </Link>
);

const DashboardLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (!userData) {
            navigate('/login');
        } else {
            setUser(userData);
        }
    }, [navigate]);

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside
                className={`bg-white shadow-xl fixed inset-y-0 left-0 z-20 w-64 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0 lg:static lg:inset-0`}
            >
                <div className="h-full flex flex-col">
                    {/* Sidebar Header */}
                    <div className="h-16 flex items-center px-6 border-b border-gray-100">
                        <Link to="/" className="flex items-center space-x-2">
                            <Leaf className="h-8 w-8 text-green-600" />
                            <span className="text-xl font-bold text-gray-800">CaneGuard</span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <div className="flex-1 overflow-y-auto py-4 px-3">
                        <nav className="space-y-1">
                            <SidebarLink
                                to="/dashboard"
                                icon={LayoutDashboard}
                                label="Overview"
                                active={location.pathname === '/dashboard'}
                            />
                            <SidebarLink
                                to="/dashboard/history"
                                icon={History}
                                label="Detection History"
                                active={isActive('/dashboard/history')}
                            />
                            <SidebarLink
                                to="/dashboard/alerts"
                                icon={Bell}
                                label="Alerts"
                                active={isActive('/dashboard/alerts')}
                            />
                            <SidebarLink
                                to="/dashboard/reports"
                                icon={FileText}
                                label="Reports"
                                active={isActive('/dashboard/reports')}
                            />
                            <SidebarLink
                                to="/dashboard/live"
                                icon={Camera}
                                label="Live Detection"
                                active={isActive('/dashboard/live')}
                            />
                            <SidebarLink
                                to="/dashboard/inspection"
                                icon={Scan}
                                label="AI Inspection"
                                active={isActive('/dashboard/inspection')}
                            />
                            <SidebarLink
                                to="/dashboard/settings"
                                icon={Settings}
                                label="Settings"
                                active={isActive('/dashboard/settings')}
                            />
                        </nav>
                    </div>

                    {/* User Profile & Logout */}
                    <div className="p-4 border-t border-gray-100">
                        <div className="flex items-center space-x-3 mb-4 px-2">
                            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                <User className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-800">{user?.name || 'User'}</p>
                                <p className="text-xs text-gray-500 truncate w-32">{user?.email || 'user@example.com'}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-3 px-4 py-2 w-full text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <LogOut className="h-5 w-5" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Header (Mobile specific mainly) */}
                <header className="bg-white shadow-sm lg:hidden h-16 flex items-center px-4">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                    <span className="ml-4 text-lg font-semibold text-gray-900">Dashboard</span>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-50 z-10 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default DashboardLayout;
