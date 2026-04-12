import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generatePDF = (title, headers, data, filename) => {
    const doc = new jsPDF();
    
    // Add Title
    doc.setFontSize(18);
    doc.text(title, 14, 22);
    
    // Add Timestamp
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);
    
    // Add Table using autoTable function
    autoTable(doc, {
        head: [headers],
        body: data,
        startY: 35,
        theme: 'striped',
        headStyles: { fillColor: [34, 197, 94] }, // Green-600 color
    });

    
    doc.save(`${filename}.pdf`);
};
