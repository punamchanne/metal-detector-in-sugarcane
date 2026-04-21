import React, { useEffect, useMemo, useState } from 'react';
import { FileText, Download, Calendar, Printer } from 'lucide-react';
import detectionService from '../../services/detectionService';
import { generatePDF } from '../../utils/pdfGenerator';
import toast from 'react-hot-toast';

const toDateValue = (date) => date.toISOString().split('T')[0];
const getDefaultStartDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return toDateValue(date);
};
const getDefaultEndDate = () => toDateValue(new Date());

const DATE_PRESETS = [
    { key: 'today', label: 'Today' },
    { key: 'last7', label: 'Last 7 Days' },
    { key: 'last30', label: 'Last 30 Days' },
    { key: 'thisMonth', label: 'This Month' },
    { key: 'all', label: 'All Time' },
];

const ReportCard = ({ title, period, size, onDownload }) => (
    <div className="p-4 border rounded-lg hover:border-green-500 cursor-pointer transition-all bg-white group">
        <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 text-green-600">
                <FileText className="h-6 w-6" />
            </div>
            <span className="text-xs text-gray-400 font-mono">{size}</span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-500 mb-4">{period}</p>
        <button 
            onClick={onDownload}
            className="w-full py-2 flex items-center justify-center gap-2 text-sm text-green-600 bg-green-50 rounded hover:bg-green-600 hover:text-white transition-colors"
        >
            <Download className="h-4 w-4" />
            Download PDF
        </button>
    </div>
);

const Reports = () => {
    const [detections, setDetections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDateRange, setShowDateRange] = useState(false);
    const [startDate, setStartDate] = useState(getDefaultStartDate());
    const [endDate, setEndDate] = useState(getDefaultEndDate());
    const [activePreset, setActivePreset] = useState('last7');

    useEffect(() => {
        const fetchDetections = async () => {
            try {
                const data = await detectionService.getHistory();
                setDetections(data);
            } catch (error) {
                console.error(error);
                toast.error('Failed to load report data');
            } finally {
                setLoading(false);
            }
        };

        fetchDetections();
    }, []);

    const filteredByDate = useMemo(() => {
        const startBoundary = startDate ? new Date(`${startDate}T00:00:00`) : null;
        const endBoundary = endDate ? new Date(`${endDate}T23:59:59.999`) : null;

        return detections.filter((detection) => {
            const createdAt = new Date(detection.createdAt);
            if (startBoundary && createdAt < startBoundary) return false;
            if (endBoundary && createdAt > endBoundary) return false;
            return true;
        });
    }, [detections, endDate, startDate]);

    const handleDownload = async (reportTitle, sourceDetections = detections) => {
        try {
            if (sourceDetections.length === 0) {
                toast.error('No data available for report');
                return;
            }

            const headers = ['Date', 'Result', 'Confidence', 'Alert'];
            const data = sourceDetections.map(d => [
                new Date(d.createdAt).toLocaleDateString(),
                d.result,
                `${(d.confidence * 100).toFixed(0)}%`,
                d.alertTriggered ? 'YES' : 'NO'
            ]);

            generatePDF(reportTitle, headers, data, reportTitle.replace(/\s+/g, '_'));
            toast.success('Report downloaded successfully');
        } catch (error) {
            console.error(error);
            toast.error('Failed to generate report');
        }
    };

    const applyDateRange = () => {
        if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
            toast.error('Start date cannot be after end date');
            return;
        }

        setActivePreset('custom');
        toast.success(`Date range applied (${filteredByDate.length} records)`);
    };

    const resetDateRange = () => {
        setStartDate(getDefaultStartDate());
        setEndDate(getDefaultEndDate());
        setActivePreset('last7');
        toast.success('Date range reset to last 7 days');
    };

    const applyPresetRange = (presetKey) => {
        const today = new Date();

        if (presetKey === 'today') {
            const value = toDateValue(today);
            setStartDate(value);
            setEndDate(value);
        }

        if (presetKey === 'last7') {
            const from = new Date(today);
            from.setDate(today.getDate() - 6);
            setStartDate(toDateValue(from));
            setEndDate(toDateValue(today));
        }

        if (presetKey === 'last30') {
            const from = new Date(today);
            from.setDate(today.getDate() - 29);
            setStartDate(toDateValue(from));
            setEndDate(toDateValue(today));
        }

        if (presetKey === 'thisMonth') {
            const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
            setStartDate(toDateValue(firstDay));
            setEndDate(toDateValue(today));
        }

        if (presetKey === 'all') {
            setStartDate('');
            setEndDate('');
        }

        setActivePreset(presetKey);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Reports Center</h1>
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowDateRange((prev) => !prev)}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                        <Calendar className="h-4 w-4" />
                        <span>{showDateRange ? 'Hide Date Range' : 'Select Date Range'}</span>
                    </button>
                    <button 
                        onClick={() => handleDownload('Custom_Report', filteredByDate)}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        <Printer className="h-4 w-4" />
                        <span>Generate Custom Report</span>
                    </button>
                </div>
            </div>

            {showDateRange && (
                <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col lg:flex-row gap-3 lg:items-end">
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Start Date</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => {
                                setStartDate(e.target.value);
                                setActivePreset('custom');
                            }}
                            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">End Date</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => {
                                setEndDate(e.target.value);
                                setActivePreset('custom');
                            }}
                            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <button
                        onClick={applyDateRange}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        Apply
                    </button>
                    <button
                        onClick={resetDateRange}
                        className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                        Reset
                    </button>
                    <div className="flex flex-wrap gap-2 lg:ml-auto">
                        {DATE_PRESETS.map((preset) => (
                            <button
                                key={preset.key}
                                onClick={() => applyPresetRange(preset.key)}
                                className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                                    activePreset === preset.key
                                        ? 'bg-green-600 text-white border-green-600'
                                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                }`}
                            >
                                {preset.label}
                            </button>
                        ))}
                    </div>
                    <p className="text-sm text-gray-500">
                        {filteredByDate.length} detections in selected range
                    </p>
                </div>
            )}

            <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Daily Summaries</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <ReportCard 
                        title="Production Report" 
                        period="Today, 14 Feb" 
                        size="245 KB" 
                        onDownload={() => handleDownload('Production Report', detections)} 
                    />
                    <ReportCard 
                        title="Shift A Log" 
                        period="Yesterday, 13 Feb" 
                        size="1.2 MB" 
                        onDownload={() => handleDownload('Shift A Log', detections)} 
                    />
                    <ReportCard 
                        title="Shift B Log" 
                        period="Yesterday, 13 Feb" 
                        size="980 KB" 
                        onDownload={() => handleDownload('Shift B Log', detections)} 
                    />
                    <ReportCard 
                        title="Incident Report" 
                        period="12 Feb 2026" 
                        size="450 KB" 
                        onDownload={() => handleDownload('Incident Report', detections)} 
                    />
                </div>
            </section>

            <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Analytics</h2>
                <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold text-gray-900">February 2026 Performance Review</h3>
                        <p className="text-sm text-gray-500 mt-1">Includes metal detection counts, downtime analysis, and sensor health logs.</p>
                    </div>
                    <button 
                        onClick={() => handleDownload('Monthly_Analytics_Feb_2026', detections)}
                        className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                    >
                        Download Full Report
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Reports;

