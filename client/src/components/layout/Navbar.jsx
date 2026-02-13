import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Features', path: '#features' },
        { name: 'How It Works', path: '#how-it-works' },
        { name: 'Why Us', path: '#why-us' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="bg-green-600 p-1.5 rounded-lg group-hover:bg-green-700 transition-colors">
                            <Leaf className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">CaneGuard</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.path}
                                className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                        <div className="h-6 w-px bg-gray-200"></div>
                        <Link
                            to="/login"
                            className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
                        >
                            Log in
                        </Link>
                        <Link
                            to="/register"
                            className="bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/20 hover:-translate-y-0.5"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-gray-900 focus:outline-none p-2"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 md:hidden shadow-lg animate-fade-in-down">
                    <div className="px-4 py-6 space-y-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.path}
                                className="block text-base font-medium text-gray-600 hover:text-green-600"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                        <hr className="border-gray-100" />
                        <div className="flex flex-col gap-3 pt-2">
                            <Link
                                to="/login"
                                className="text-center w-full py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50"
                                onClick={() => setIsOpen(false)}
                            >
                                Log in
                            </Link>
                            <Link
                                to="/register"
                                className="text-center w-full py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700"
                                onClick={() => setIsOpen(false)}
                            >
                                Create Account
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
