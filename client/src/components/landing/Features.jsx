import React from 'react';
import { Target, Cpu, Bell, Activity, UserCheck, Database, Zap, Shield } from 'lucide-react';

const features = [
    {
        icon: <Target className="h-6 w-6 text-white" />,
        color: "bg-blue-500",
        title: 'Precision Detection',
        description: 'Advanced algorithms distinguish between ferrous and non-ferrous metals with 99.9% accuracy.'
    },
    {
        icon: <Cpu className="h-6 w-6 text-white" />,
        color: "bg-green-500",
        title: 'IoT Connectivity',
        description: 'Seamlessly integrates with your existing PLC and SCADA systems for automated control.'
    },
    {
        icon: <Bell className="h-6 w-6 text-white" />,
        color: "bg-red-500",
        title: 'Instant Alerts',
        description: 'Get real-time SMS and email notifications the moment a contaminant is detected.'
    },
    {
        icon: <Activity className="h-6 w-6 text-white" />,
        color: "bg-purple-500",
        title: 'Live Monitoring',
        description: 'Monitor sensor health, signal strength, and detection logs from any device.'
    },
    {
        icon: <UserCheck className="h-6 w-6 text-white" />,
        color: "bg-orange-500",
        title: 'User-Friendly',
        description: 'Intuitive dashboard designed for operators and farm managers. No training required.'
    },
    {
        icon: <Shield className="h-6 w-6 text-white" />,
        color: "bg-teal-500",
        title: 'Built Tough',
        description: 'IP67 rated hardware designed to withstand dust, moisture, and vibration.'
    }
];

const Features = () => {
    return (
        <section id="features" className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <span className="text-green-600 font-semibold tracking-wider uppercase text-sm">Key Features</span>
                    <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">
                        Everything you need to <span className="text-green-600">protect your mill</span>
                    </h2>
                    <p className="text-xl text-gray-500 max-w-3xl mx-auto">
                        A complete end-to-end solution for metal detection in sugarcane processing.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-100 group"
                        >
                            <div className={`${feature.color} w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
