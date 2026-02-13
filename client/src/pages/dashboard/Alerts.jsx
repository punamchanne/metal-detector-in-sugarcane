import React from 'react';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const mockAlerts = [
    { id: 1, type: 'Critical', message: 'Ferrous metal detected in Main Conveyor', time: '10:42 AM', status: 'Active' },
    { id: 2, type: 'Warning', message: 'Sensor signal weak on Sensor 2', time: '09:15 AM', status: 'Resolved' },
    { id: 3, type: 'Critical', message: 'Unknown object in pre-crusher', time: 'Yesterday', status: 'Resolved' },
];

const Alerts = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">System Alerts</h1>
                <button className="text-sm text-red-600 hover:text-red-700 font-medium">Clear Resolved</button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {mockAlerts.map((alert) => (
                    <div key={alert.id} className="p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors flex items-start gap-4">
                        <div className={`p-2 rounded-full flex-shrink-0 ${alert.type === 'Critical' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                            }`}>
                            <AlertTriangle className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className="font-semibold text-gray-900">{alert.message}</h3>
                                <span className={`px-2 py-0.5 rounded text-xs font-medium ${alert.status === 'Active' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                                    }`}>
                                    {alert.status}
                                </span>
                            </div>
                            <div className="flex items-center gap-4 mt-2 mb-1">
                                <div className="flex items-center text-xs text-gray-500">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {alert.time}
                                </div>
                                <span className="text-xs text-gray-400">ID: #{alert.id + 2030}</span>
                            </div>
                            {alert.status === 'Active' && (
                                <div className="mt-3 flex gap-2">
                                    <button className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700">Stop Machine</button>
                                    <button className="px-3 py-1 bg-white border border-gray-300 text-gray-700 text-xs rounded hover:bg-gray-50">Ignore</button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {mockAlerts.length === 0 && (
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
