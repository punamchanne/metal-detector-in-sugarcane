import React from 'react';
import { Camera, RefreshCw } from 'lucide-react';

const LiveDetection = () => {
    const [isCameraOn, setIsCameraOn] = React.useState(false);
    const videoRef = React.useRef(null);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setIsCameraOn(true);
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
            alert("Could not access camera. Please check permissions.");
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setIsCameraOn(false);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-gray-900">Live Detection</h1>

            {/* Live Feed Area */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                    {/* Video Element for Live Feed */}
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className={`w-full h-full object-cover ${isCameraOn ? 'block' : 'hidden'}`}
                    />

                    {/* Placeholder when Camera is Off */}
                    {!isCameraOn && (
                        <div className="text-gray-500 flex flex-col items-center">
                            <Camera className="h-16 w-16 mb-4 opacity-50" />
                            <span className="text-lg font-medium">Camera Feed Offline</span>
                            <span className="text-sm mt-2">Click "Start Camera" to activate webcam</span>
                        </div>
                    )}

                    {/* Live Indicator */}
                    {isCameraOn && (
                        <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse z-10">
                            LIVE
                        </div>
                    )}
                </div>

                <div className="mt-6 flex justify-between items-center">
                    <div className="flex space-x-4">
                        {!isCameraOn ? (
                            <button
                                onClick={startCamera}
                                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                <Camera className="h-4 w-4" />
                                <span>Start Camera</span>
                            </button>
                        ) : (
                            <button
                                onClick={stopCamera}
                                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                <Camera className="h-4 w-4" />
                                <span>Stop Camera</span>
                            </button>
                        )}

                        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <RefreshCw className="h-4 w-4" />
                            <span>Refresh Device</span>
                        </button>
                    </div>
                    <div className="text-sm text-gray-500">
                        Status: <span className={`${isCameraOn ? 'text-green-600' : 'text-yellow-600'} font-medium`}>
                            {isCameraOn ? 'System Online' : 'Standby'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Example Detections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <img
                        src="https://images.unsplash.com/photo-1530982011887-3cc11cc85693?auto=format&fit=crop&q=80&w=600"
                        alt="Metal Detection"
                        className="w-full h-48 object-cover rounded-lg mb-3"
                    />
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-medium text-gray-900">Example: Metal Debris</h3>
                            <p className="text-xs text-gray-500">Detected in conveyor belt</p>
                        </div>
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
                            Metal (98%)
                        </span>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <img
                        src="https://plus.unsplash.com/premium_photo-1661962692059-55d5a4319814?auto=format&fit=crop&q=80&w=600"
                        alt="Leaf Disease"
                        className="w-full h-48 object-cover rounded-lg mb-3"
                    />
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-medium text-gray-900">Example: Rust Disease</h3>
                            <p className="text-xs text-gray-500">Detected on leaf surface</p>
                        </div>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">
                            Disease (85%)
                        </span>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <img
                        src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&q=80&w=600"
                        alt="Clean Sugarcane"
                        className="w-full h-48 object-cover rounded-lg mb-3"
                    />
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-medium text-gray-900">Example: Healthy Cane</h3>
                            <p className="text-xs text-gray-500">No issues detected</p>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                            Clean
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveDetection;
