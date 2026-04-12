import React from 'react';
import { FileText, Download, Calendar, Printer } from 'lucide-react';
import detectionService from '../../services/detectionService';
import { generatePDF } from '../../utils/pdfGenerator';
import toast from 'react-hot-toast';

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
    const handleDownload = async (reportTitle) => {
        try {
            const detections = await detectionService.getHistory();
            if (detections.length === 0) {
                toast.error('No data available for report');
                return;
            }

            const headers = ['Date', 'Result', 'Confidence', 'Alert'];
            const data = detections.map(d => [
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

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Reports Center</h1>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                        <Calendar className="h-4 w-4" />
                        <span>Select Date Range</span>
                    </button>
                    <button 
                        onClick={() => handleDownload('Custom_Report')}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        <Printer className="h-4 w-4" />
                        <span>Generate Custom Report</span>
                    </button>
                </div>
            </div>

            <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Daily Summaries</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <ReportCard 
                        title="Production Report" 
                        period="Today, 14 Feb" 
                        size="245 KB" 
                        onDownload={() => handleDownload('Production Report')} 
                    />
                    <ReportCard 
                        title="Shift A Log" 
                        period="Yesterday, 13 Feb" 
                        size="1.2 MB" 
                        onDownload={() => handleDownload('Shift A Log')} 
                    />
                    <ReportCard 
                        title="Shift B Log" 
                        period="Yesterday, 13 Feb" 
                        size="980 KB" 
                        onDownload={() => handleDownload('Shift B Log')} 
                    />
                    <ReportCard 
                        title="Incident Report" 
                        period="12 Feb 2026" 
                        size="450 KB" 
                        onDownload={() => handleDownload('Incident Report')} 
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
                        onClick={() => handleDownload('Monthly_Analytics_Feb_2026')}
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

