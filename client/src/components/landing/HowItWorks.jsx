import React from 'react';
import { ScanLine, AlertTriangle, MonitorPlay, Save } from 'lucide-react';

const steps = [
    {
        id: 1,
        icon: <ScanLine className="h-10 w-10 text-white" />,
        title: "Detection",
        description: "Sugarcane passes through the detectors where high-precision sensors scan for foreign metal objects."
    },
    {
        id: 2,
        icon: <AlertTriangle className="h-10 w-10 text-white" />,
        title: "Analysis & Alert",
        description: "The system identifies the object type and immediately sends a stop signal to the conveyor belt."
    },
    {
        id: 3,
        icon: <MonitorPlay className="h-10 w-10 text-white" />,
        title: "Monitoring",
        description: "Operators receive an instant notification on the dashboard with the location of the detected metal."
    },
    {
        id: 4,
        icon: <Save className="h-10 w-10 text-white" />,
        title: "Logging",
        description: "The event is recorded in the secure database for future reporting and maintenance tracking."
    }
];

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="py-24 bg-gradient-to-br from-green-900 to-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-green-400 font-semibold tracking-wider uppercase text-sm">Process Flow</span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-2">How It Works</h2>
                </div>

                <div className="relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-700 -translate-y-1/2 z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                        {steps.map((step) => (
                            <div key={step.id} className="relative flex flex-col items-center text-center">
                                <div className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center shadow-lg shadow-green-900/50 mb-6 border-4 border-gray-800">
                                    {step.icon}
                                </div>
                                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 w-full h-full hover:bg-gray-800 transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm font-bold mb-4 mx-auto">
                                        {step.id}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-green-400">{step.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
