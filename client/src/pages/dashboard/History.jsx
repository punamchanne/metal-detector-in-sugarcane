import React, { useEffect, useMemo, useState } from 'react';
import detectionService from '../../services/detectionService';
import { Download, Filter, FileDown, RotateCcw, Search } from 'lucide-react';
import { generatePDF } from '../../utils/pdfGenerator';
import toast from 'react-hot-toast';

const DetectionHistory = () => {
    const [detections, setDetections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    const [modeFilter, setModeFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const fetchDetections = async () => {
            try {
                const data = await detectionService.getHistory();
                setDetections(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetections();
    }, []);

    const filteredDetections = useMemo(() => {
        const query = searchText.trim().toLowerCase();

        return detections.filter((detection) => {
            const modeMatches = modeFilter === 'all' || detection.mode === modeFilter;
            const statusMatches =
                statusFilter === 'all'
                || (statusFilter === 'alert' && detection.alertTriggered)
                || (statusFilter === 'safe' && !detection.alertTriggered);

            const searchMatches =
                query.length === 0
                || detection.result?.toLowerCase().includes(query)
                || detection.mode?.toLowerCase().includes(query)
                || new Date(detection.createdAt).toLocaleString().toLowerCase().includes(query);

            return modeMatches && statusMatches && searchMatches;
        });
    }, [detections, modeFilter, searchText, statusFilter]);

    const downloadPDF = () => {
        if (filteredDetections.length === 0) {
            toast.error('No detections available for PDF export.');
            return;
        }

        const headers = ['Date & Time', 'Operation Mode', 'AI Result', 'Confidence', 'Status'];
        const data = filteredDetections.map(d => [
            new Date(d.createdAt).toLocaleString(),
            d.mode.replace(/_/g, ' ').toUpperCase(),
            d.result,
            `${(d.confidence * 100).toFixed(1)}%`,
            d.alertTriggered ? 'ALERT' : 'SAFE'
        ]);
        generatePDF('Detection History Report', headers, data, 'Detection_History');
        toast.success('Detection history PDF downloaded.');
    };

    const escapeCSV = (value) => {
        const safeValue = String(value ?? '');
        return `"${safeValue.replace(/"/g, '""')}"`;
    };

    const downloadCSV = () => {
        if (filteredDetections.length === 0) {
            toast.error('No detections available for CSV export.');
            return;
        }

        const headerRow = ['Date & Time', 'Operation Mode', 'AI Result', 'Confidence', 'Status'];
        const rows = filteredDetections.map((detection) => ([
            new Date(detection.createdAt).toLocaleString(),
            detection.mode.replace(/_/g, ' ').toUpperCase(),
            detection.result,
            `${(detection.confidence * 100).toFixed(1)}%`,
            detection.alertTriggered ? 'ALERT' : 'SAFE'
        ]));

        const csvContent = [
            headerRow.map(escapeCSV).join(','),
            ...rows.map((row) => row.map(escapeCSV).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Detection_History_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
        toast.success('Detection history CSV downloaded.');
    };

    const resetFilters = () => {
        setModeFilter('all');
        setStatusFilter('all');
        setSearchText('');
    };

    const getStatusColor = (isAlert) => {
        return isAlert ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800';
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Detection History</h1>
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowFilters((prev) => !prev)}
                        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
                    >
                        <Filter className="h-4 w-4" />
                        <span>{showFilters ? 'Hide Filters' : 'Filter'}</span>
                    </button>
                    <button 
                        onClick={downloadPDF}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        <FileDown className="h-4 w-4" />
                        <span>Download PDF</span>
                    </button>
                    <button
                        onClick={downloadCSV}
                        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50"
                    >
                        <Download className="h-4 w-4" />
                        <span>CSV</span>
                    </button>
                </div>
            </div>

            {showFilters && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col lg:flex-row gap-3 lg:items-end">
                    <div className="flex-1">
                        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Search</label>
                        <div className="relative">
                            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                placeholder="Search by result, mode, or date"
                                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Mode</label>
                        <select
                            value={modeFilter}
                            onChange={(e) => setModeFilter(e.target.value)}
                            className="w-full lg:w-48 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="all">All Modes</option>
                            <option value="metal_detection">Metal Detection</option>
                            <option value="leaf_disease">Leaf Disease</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Status</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full lg:w-40 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="all">All Status</option>
                            <option value="alert">Alert</option>
                            <option value="safe">Safe</option>
                        </select>
                    </div>

                    <button
                        onClick={resetFilters}
                        className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
                    >
                        <RotateCcw className="h-4 w-4" />
                        Reset
                    </button>
                </div>
            )}


            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date & Time
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Operation Mode
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    AI Result
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Confidence
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                        Loading detections...
                                    </td>
                                </tr>
                            ) : filteredDetections.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                        No detections found for current filters.
                                    </td>
                                </tr>
                            ) : (
                                filteredDetections.map((detection) => (
                                    <tr key={detection._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {new Date(detection.createdAt).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 uppercase">
                                            {detection.mode.replace(/_/g, ' ')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                            {detection.result}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {(detection.confidence * 100).toFixed(1)}%
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(detection.alertTriggered)}`}>
                                                {detection.alertTriggered ? 'ALERT' : 'SAFE'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DetectionHistory;
