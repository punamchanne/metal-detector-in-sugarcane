import React, { useState } from 'react';
import { Upload, Play, Camera, Settings, Layers, Leaf, AlertTriangle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import detectionService from '../../services/detectionService';

const AIInspection = () => {
    const [selectedMode, setSelectedMode] = useState('metal_detection'); // 'metal_detection' or 'leaf_disease'
    const [selectedImage, setSelectedImage] = useState(null);
    const [fileObject, setFileObject] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileObject(file);
            setResult(null); // Reset result on new image
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const runScan = async () => {
        if (!fileObject) {
            toast.error('Please upload an image first!');
            return;
        }

        setIsLoading(true);
        setResult(null);

        const formData = new FormData();
        formData.append('image', fileObject);
        formData.append('mode', selectedMode);

        try {
            const data = await detectionService.detectImage(formData);
            setResult(data);

            if (data.alertTriggered) {
                toast.error(`ALERT: ${data.result} detected!`, { duration: 5000 });
            } else {
                toast.success('Scan complete: ' + data.result);
            }
        } catch (error) {
            console.error('Scan Error:', error);
            const message = error.response?.data?.message || 'AI detection failed. Make sure Python FastAPI is running!';
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-theme(spacing.16))] bg-black text-green-500 p-6 font-mono">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
                {/* Left Sidebar - Controls */}
                <div className="lg:col-span-1 space-y-6">
                    <h2 className="text-2xl font-bold text-green-400 border-b border-green-800 pb-2">
                        AI INSPECTION
                    </h2>

                    {/* Mode Selection */}
                    <div className="space-y-4">
                        <button
                            onClick={() => setSelectedMode('metal_detection')}
                            className={`w-full text-left p-4 rounded border transition-all ${selectedMode === 'metal_detection'
                                ? 'bg-green-900/30 border-green-400 text-green-300 shadow-[0_0_15px_rgba(74,222,128,0.2)]'
                                : 'border-green-900 text-green-700 hover:border-green-700'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-bold">MODE 1: METAL</span>
                                <Settings className="h-4 w-4" />
                            </div>
                            <p className="text-xs opacity-70">
                                Detects Nails, Wires, and Industrial Scrap.
                            </p>
                        </button>

                        <button
                            onClick={() => setSelectedMode('leaf_disease')}
                            className={`w-full text-left p-4 rounded border transition-all ${selectedMode === 'leaf_disease'
                                ? 'bg-green-900/30 border-green-400 text-green-300 shadow-[0_0_15px_rgba(74,222,128,0.2)]'
                                : 'border-green-900 text-green-700 hover:border-green-700'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-bold">MODE 2: LEAF</span>
                                <Leaf className="h-4 w-4" />
                            </div>
                            <p className="text-xs opacity-70">
                                Detects Red Rot, Rust, and Unhealthy Leaves.
                            </p>
                        </button>
                    </div>

                    {/* Status Panel */}
                    <div className="p-4 bg-green-900/10 border border-green-900/50 rounded mt-auto">
                        <div className="flex items-center space-x-2 text-sm mb-2">
                            <Layers className="h-4 w-4" />
                            <span>AI Status: <span className="text-green-400">System Online</span></span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                            <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span>Dataset: Sugarcane_V4.2</span>
                        </div>
                    </div>
                </div>

                {/* Main Content - Image & Actions */}
                <div className="lg:col-span-3 flex flex-col h-full bg-gray-900 rounded-lg border border-gray-800 overflow-hidden relative">
                    {/* Main Display Area */}
                    <div className="flex-1 flex items-center justify-center bg-black relative p-4 group">
                        {selectedImage ? (
                            <img
                                src={selectedImage}
                                alt="Inspection Target"
                                className="max-h-full max-w-full object-contain"
                            />
                        ) : (
                            <div className="text-center text-gray-600">
                                <Upload className="h-16 w-16 mx-auto mb-4 opacity-20" />
                                <p>No Input Image Selected</p>
                            </div>
                        )}

                        {/* Result Overlay */}
                        {result && (
                            <div className="absolute top-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded text-white font-bold tracking-wider z-20 shadow-2xl backdrop-blur-md whitespace-nowrap"
                                style={{ backgroundColor: result.alertTriggered ? 'rgba(220, 38, 38, 0.9)' : 'rgba(22, 163, 74, 0.9)' }}>
                                <div className="text-xl">{result.result}</div>
                                <div className="text-xs opacity-90 text-center mt-1">
                                    {(result.confidence * 100).toFixed(1)}% CONFIDENCE
                                </div>
                            </div>
                        )}

                        {/* Loading Indicator */}
                        {isLoading && (
                            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-30">
                                <Loader2 className="h-12 w-12 text-green-500 animate-spin mb-4" />
                                <div className="text-green-400 animate-pulse font-bold tracking-widest text-lg">
                                    ANALYZING IMAGE...
                                </div>
                            </div>
                        )}

                        {/* Overlay Grid (Cosmetic) */}
                        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] z-10"></div>

                        {/* Corner Markers */}
                        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-green-500/50 z-20"></div>
                        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-green-500/50 z-20"></div>
                        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-green-500/50 z-20"></div>
                        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-green-500/50 z-20"></div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="p-4 bg-gray-800 border-t border-gray-700 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 items-center">
                        <div className="w-full sm:w-auto">
                            <select
                                value={selectedMode}
                                onChange={(e) => setSelectedMode(e.target.value)}
                                className="w-full bg-gray-700 text-white border border-gray-600 rounded px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none uppercase text-sm font-bold tracking-wider">
                                <option value="metal_detection">Metal Detection</option>
                                <option value="leaf_disease">Leaf Disease</option>
                            </select>
                        </div>

                        <label className="w-full sm:w-auto cursor-pointer bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 rounded px-6 py-2 transition-colors flex items-center justify-center space-x-2 font-bold text-sm tracking-wider uppercase">
                            <Upload className="h-4 w-4" />
                            <span>Upload Image</span>
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                        </label>

                        <button
                            onClick={runScan}
                            disabled={isLoading}
                            className={`w-full sm:flex-1 ${isLoading ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-600 hover:bg-green-500'} text-white rounded px-6 py-2 transition-colors flex items-center justify-center space-x-2 font-bold text-sm tracking-wider uppercase shadow-[0_0_15px_rgba(22,163,74,0.4)]`}
                        >
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                            <span>{isLoading ? 'Scanning...' : 'Run AI Scan'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIInspection;
