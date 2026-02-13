import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, UserPlus, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import authService from '../services/authService';
import toast from 'react-hot-toast';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const { name, email, password, confirmPassword } = formData;
    const navigate = useNavigate();

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            try {
                await authService.register({ name, email, password });
                toast.success('Account created! Please login with your credentials.');
                navigate('/login');
            } catch (error) {
                console.error("Registration Error Details:", error);
                if (error.response) {
                    console.error("Server Response:", error.response.data);
                    console.error("Status Code:", error.response.status);
                }
                const message = error.response?.data?.message || 'Registration failed';
                toast.error(message);
            }
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-row-reverse">
            {/* Right Side - Image */}
            <div className="hidden lg:flex lg:w-1/2 bg-green-900 relative overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1595831934989-13e6bd915502?q=80&w=2070&auto=format&fit=crop"
                    alt="Agriculture Tech"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900 to-transparent opacity-90"></div>
                <div className="relative z-10 flex flex-col justify-center px-16 text-white">
                    <Leaf className="h-16 w-16 mb-6 text-green-400" />
                    <h1 className="text-5xl font-bold mb-6 leading-tight">Join the Future of Farming</h1>
                    <p className="text-xl text-green-100 max-w-lg">
                        Create an account to monitor your equipment, track detections, and access detailed reports instantly.
                    </p>
                </div>
            </div>

            {/* Left Side - Form */}
            <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-16 bg-white">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <Link to="/" className="inline-flex items-center space-x-2 text-gray-500 hover:text-green-600 transition-colors mb-8 group">
                            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-medium">Back to Home</span>
                        </Link>
                        <div className="lg:hidden flex justify-center mb-6">
                            <Link to="/" className="inline-flex items-center space-x-2 text-green-600">
                                <Leaf className="h-8 w-8" />
                                <span className="text-xl font-bold">CaneGuard</span>
                            </Link>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
                        <p className="mt-2 text-gray-500">Sign up to get started with CaneGuard.</p>
                    </div>

                    <form className="mt-8 space-y-5" onSubmit={onSubmit}>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow sm:text-sm"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={onChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow sm:text-sm"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={onChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow sm:text-sm"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={onChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow sm:text-sm"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={onChange}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all transform hover:scale-[1.02] mt-4"
                        >
                            Create Account
                        </button>

                        <div className="text-center mt-4">
                            <span className="text-sm text-gray-600">Already have an account? </span>
                            <Link to="/login" className="text-sm font-medium text-green-600 hover:text-green-500 transition-colors">
                                Log in
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
