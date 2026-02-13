import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, PlayCircle } from 'lucide-react';

const Hero = () => {
    return (
        <div className="relative bg-gradient-to-br from-green-50 via-white to-green-50 pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

                <div className="inline-flex items-center space-x-2 bg-white border border-green-100 shadow-sm text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-8 animate-fade-in-up">
                    <ShieldCheck className="h-4 w-4 text-green-500" />
                    <span>Industrial-Grade Metal Detection</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight">
                    Secure Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Sugarcane Harvest</span> <br className="hidden md:block" /> with Smart IoT.
                </h1>

                <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                    Prevent machinery damage and production downtime. Our real-time detection system ensures processed sugarcane is 100% metal-free.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/register"
                        className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-700 transition-all shadow-xl shadow-green-600/20 hover:-translate-y-1"
                    >
                        <span>Start Free Trial</span>
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                    <Link
                        to="/#how-it-works"
                        className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 rounded-full font-bold text-lg text-gray-700 bg-white border border-gray-200 hover:border-green-500 hover:text-green-600 transition-all hover:-translate-y-1 shadow-sm hover:shadow-md"
                    >
                        <PlayCircle className="h-5 w-5" />
                        <span>Watch Demo</span>
                    </Link>
                </div>
            </div>

            {/* Abstract Background Shapes */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden -z-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-green-200/20 rounded-full blur-[100px] mix-blend-multiply animate-blob"></div>
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-200/20 rounded-full blur-[100px] mix-blend-multiply animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-1/2 w-[500px] h-[500px] bg-yellow-100/40 rounded-full blur-[100px] mix-blend-multiply animate-blob animation-delay-4000"></div>
            </div>
        </div>
    );
};

export default Hero;
