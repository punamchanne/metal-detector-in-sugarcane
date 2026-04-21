import React, { useState } from 'react';
import { PlayCircle, X } from 'lucide-react';

const Demo = () => {
    const [open, setOpen] = useState(false);

    return (
        <section id="demo" className="py-20 bg-white scroll-mt-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <span className="text-green-600 font-semibold tracking-wider uppercase text-sm">Watch Demo</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">See CaneShield in Action</h2>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        A quick walkthrough of real-time detection, machine alerts, and dashboard monitoring.
                    </p>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-green-900 rounded-2xl p-6 md:p-8 shadow-xl">
                    <div className="relative overflow-hidden rounded-xl border border-white/15 bg-black/40 aspect-video flex items-center justify-center">
                        <img
                            src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&q=80&w=1400"
                            alt="Demo preview"
                            className="absolute inset-0 w-full h-full object-cover opacity-50"
                        />
                        <button
                            onClick={() => setOpen(true)}
                            className="relative z-10 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-500 transition-colors shadow-lg"
                        >
                            <PlayCircle className="h-5 w-5" />
                            Play 90-Second Demo
                        </button>
                    </div>
                </div>
            </div>

            {open && (
                <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="w-full max-w-4xl bg-gray-900 rounded-xl border border-gray-700 overflow-hidden shadow-2xl">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
                            <h3 className="text-sm md:text-base text-white font-semibold">CaneShield Demo</h3>
                            <button
                                onClick={() => setOpen(false)}
                                className="text-gray-300 hover:text-white"
                                aria-label="Close demo"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="aspect-video bg-black">
                            <video
                                controls
                                autoPlay
                                className="w-full h-full"
                                src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Demo;
