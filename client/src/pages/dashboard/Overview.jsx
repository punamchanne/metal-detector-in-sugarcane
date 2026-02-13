import React, { useEffect, useState } from 'react';
import { Gauge, CheckCircle, AlertOctagon, TrendingUp, Calendar, Zap } from 'lucide-react';
import detectionService from '../../services/detectionService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const StatCard = ({ title, value, icon: Icon, color, subtext }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-start justify-between hover:shadow-md transition-shadow">
        <div>
            <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
            {subtext && <p className="text-xs text-gray-400 mt-2">{subtext}</p>}
        </div>
        <div className={`p-3 rounded-lg ${color} shadow-lg shadow-opacity-20`}>
            <Icon className="h-6 w-6 text-white" />
        </div>
    </div>
);

const Overview = () => {
    const [stats, setStats] = useState({
        total: 0,
        ferrous: 0,
        nonFerrous: 0,
        today: 0
    });

    // Mock data for charts (since backend doesn't provide time-series yet)
    const chartData = [
        { name: 'Mon', detections: 4 },
        { name: 'Tue', detections: 7 },
        { name: 'Wed', detections: 2 },
        { name: 'Thu', detections: 9 },
        { name: 'Fri', detections: 5 },
        { name: 'Sat', detections: 3 },
        { name: 'Sun', detections: 0 },
    ];

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await detectionService.getStats();
                setStats(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                    <p className="text-gray-500 text-sm">Real-time production monitoring</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 text-sm text-gray-600 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-green-600" />
                    <span>{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Detections"
                    value={stats.total}
                    icon={Gauge}
                    color="bg-blue-600"
                    subtext="Lifetime metal detections"
                />
                <StatCard
                    title="Critical Alerts"
                    value={stats.today}
                    icon={AlertOctagon}
                    color="bg-red-600"
                    subtext="Detected today"
                />
                <StatCard
                    title="Ferrous Metals"
                    value={stats.ferrous}
                    icon={Zap}
                    color="bg-amber-500"
                    subtext="Magnetic materials"
                />
                <StatCard
                    title="Safe Scans"
                    value={stats.total * 15 + 120} // Mock calculation for "Safe"
                    icon={CheckCircle}
                    color="bg-green-600"
                    subtext="Clean sugarcane processed"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Weekly Trend Chart */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-6 flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                        Weekly Detection Trend
                    </h3>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip cursor={{ fill: '#f0fdf4' }} />
                                <Bar dataKey="detections" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Activity / System Health */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-800">System Health</h3>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Operational</span>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-gray-600 font-medium">Sensor 1 (Input Feed)</span>
                            </div>
                            <span className="text-sm text-green-600">Active</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '98%' }}></div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-gray-600 font-medium">Sensor 2 (Crusher)</span>
                            </div>
                            <span className="text-sm text-green-600">Active</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-gray-600 font-medium">Network Connection</span>
                            </div>
                            <span className="text-sm text-green-600">Stable (14ms)</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '95%' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
