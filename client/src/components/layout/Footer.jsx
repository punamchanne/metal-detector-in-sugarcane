import React from 'react';
import { Leaf, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Brand */}
                    <div>
                        <div className="flex items-center space-x-2 mb-6">
                            <Leaf className="h-8 w-8 text-green-500" />
                            <span className="text-xl font-bold">CaneGuard</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Protecting your machinery with advanced metal detection technology.
                            Smart, secure, and reliable.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-green-400">Quick Links</h3>
                        <ul className="space-y-3 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                            <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                            <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                            <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-green-400">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3 text-gray-400">
                                <Mail className="h-5 w-5 text-green-500 mt-1" />
                                <span>contact@caneguard.com</span>
                            </li>
                            <li className="flex items-start space-x-3 text-gray-400">
                                <Phone className="h-5 w-5 text-green-500 mt-1" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-start space-x-3 text-gray-400">
                                <MapPin className="h-5 w-5 text-green-500 mt-1" />
                                <span>Tech Park, Pune, Maharashtra</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-green-400">Newsletter</h3>
                        <p className="text-gray-400 text-sm mb-4">Subscribe for updates and safety tips.</p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Enter email"
                                className="bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none w-full border border-gray-700 focus:border-green-500"
                            />
                            <button className="bg-green-600 px-4 py-2 rounded-r-lg hover:bg-green-700 transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>

                </div>

                <div className="border-t border-gray-800 pt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} CaneGuard. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
