import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const WhyUs = () => {
    const benefits = [
        "High Detection Sensitivity",
        "Reduces Machine Downtime",
        "Increases Production Efficiency",
        "Easy Retrofit Installation",
        "Affordable Maintenance",
        "24/7 Support Integration"
    ];

    return (
        <section id="about" className="py-24 bg-green-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* About Text */}
                    <div>
                        <span className="text-green-600 font-bold tracking-wide uppercase">About Us</span>
                        <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-6">
                            Pioneering Safety in <br /> Sugarcane Processing
                        </h2>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            At CaneGuard, our mission is to revolutionize agriculture safety through smart technology.
                            We combine robust sensors with intelligent software to protect your capital investments and
                            streamline the sugarcane crushing process.
                        </p>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            We believe in affordable, scalable, and easy-to-use solutions that empower farmers and
                            factory owners to focus on production without the fear of metal contamination.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                                    <span className="text-gray-800 font-medium">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Abstract Visual / Image Placeholder */}
                    <div className="relative">
                        <div className="absolute -inset-4 bg-green-200/50 rounded-full blur-2xl"></div>
                        <div className="relative bg-white p-8 rounded-2xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                                <p className="text-gray-400 font-medium">Add Image: Factory/Field View</p>
                            </div>
                            <div className="mt-8 flex justify-between items-end">
                                <div>
                                    <div className="text-4xl font-bold text-green-600">98%</div>
                                    <div className="text-gray-600 text-sm font-medium mt-1">Detection Rate</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold text-gray-800">500+</div>
                                    <div className="text-gray-600 text-sm font-medium mt-1">Installations</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WhyUs;
