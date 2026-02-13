import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, LogIn, Mail, Lock, ArrowLeft } from 'lucide-react';
import authService from '../services/authService';
import toast from 'react-hot-toast';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;
    const navigate = useNavigate();

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.login(formData);
            toast.success('Logged in successfully!');
            navigate('/dashboard');
        } catch (error) {
            const message = error.response?.data?.message || 'Invalid credentials';
            toast.error(message);
        }
    };

    return (
        <div className="min-h-screen bg-white flex">
            {/* Left Side - Image */}
            <div className="hidden lg:flex lg:w-1/2 bg-green-900 relative overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2071&auto=format&fit=crop"
                    alt="Sugarcane Farm"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900 to-transparent opacity-90"></div>
                <div className="relative z-10 flex flex-col justify-center px-16 text-white">
                    <Leaf className="h-16 w-16 mb-6 text-green-400" />
                    <h1 className="text-5xl font-bold mb-6 leading-tight">Smart Protection for Your Harvest</h1>
                    <p className="text-xl text-green-100 max-w-lg">
                        Advanced real-time metal detection system to safeguard your machinery and ensure pure production.
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
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
                        <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                        <p className="mt-2 text-gray-500">Please enter your details to sign in.</p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                        <div className="space-y-4">
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
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all transform hover:scale-[1.02]"
                        >
                            Sign In
                        </button>

                        <div className="text-center">
                            <span className="text-sm text-gray-600">Don't have an account? </span>
                            <Link to="/register" className="text-sm font-medium text-green-600 hover:text-green-500 transition-colors">
                                Create an account
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
