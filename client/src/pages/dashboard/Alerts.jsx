import React, { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import alertService from '../../services/alertService';
import toast from 'react-hot-toast';

const Alerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const data = await alertService.getAlerts();
                setAlerts(data);
            } catch (error) {
                console.error(error);
                toast.error('Failed to load alerts');
            } finally {
                setLoading(false);
            }
        };
        fetchAlerts();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">System Alerts</h1>
                <button className="text-sm text-red-600 hover:text-red-700 font-medium">Clear Resolved</button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-gray-500">
                        <Clock className="h-8 w-8 mx-auto animate-spin mb-2" />
                        <p>Loading alerts...</p>
                    </div>
                ) : alerts.length > 0 ? (
                    alerts.map((alert, index) => (
                        <div key={alert._id || index} className="p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors flex items-start gap-4">
                            <div className="p-2 rounded-full flex-shrink-0 bg-red-100 text-red-600">
                                <AlertTriangle className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-semibold text-gray-900">{alert.message}</h3>
                                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                        {alert.status || 'Active'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 mt-2 mb-1">
                                    <div className="flex items-center text-xs text-gray-500">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {new Date(alert.createdAt).toLocaleString()}
                                    </div>
                                    <span className="text-xs text-gray-400">ID: #{alert._id?.substring(0, 8) || 'N/A'}</span>
                                </div>
                                <div className="mt-3 flex gap-2">
                                    <button className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700">Stop Machine</button>
                                    <button className="px-3 py-1 bg-white border border-gray-300 text-gray-700 text-xs rounded hover:bg-gray-50">Ignore</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-8 text-center text-gray-500">
                        <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-3" />
                        <p>All systems normal. No active alerts.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Alerts;

