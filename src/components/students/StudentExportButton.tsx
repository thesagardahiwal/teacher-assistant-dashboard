// components/StudentExportButton.tsx (Simplified)
"use client";

import * as XLSX from "xlsx";

interface Student {
  _id: string;
  studentId: string;
  rollNumber: string;
  enrollmentNumber?: string;
  name: string;
  email?: string;
  phone?: string;
  batch: any;
  department: string;
  guardian?: {
    name?: string;
    phone?: string;
    email?: string;
  };
  attendanceStats: {
    totalLectures: number;
    attendedLectures: number;
    percentage: number;
  };
  year?: string;
}

interface StudentExportButtonProps {
  students: Student[];
}

export default function StudentExportButton({ students }: StudentExportButtonProps) {
  const handleExport = () => {
    if (!students || students.length === 0) {
      alert('No students data available to export');
      return;
    }

    try {
      // Flatten the data for Excel export
      const exportData = students.map(student => ({
        'Roll Number': student.rollNumber,
        'Enrollment Number': student.enrollmentNumber || 'N/A',
        'Name': student.name,
        'Email': student.email || 'N/A',
        'Phone': student.phone || 'N/A',
        'Batch': typeof student.batch === 'object' ? student.batch.name || 'N/A' : student.batch,
        'Year': typeof student.batch === 'object' ? student.batch.year || 'N/A' : student.year || 'N/A',
        'Department': student.department,
        'Guardian Name': student.guardian?.name || 'N/A',
        'Guardian Phone': student.guardian?.phone || 'N/A',
        'Guardian Email': student.guardian?.email || 'N/A',
        'Total Lectures': student.attendanceStats.totalLectures,
        'Attended Lectures': student.attendanceStats.attendedLectures,
        'Attendance %': student.attendanceStats.percentage,
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
      
      const timestamp = new Date().toISOString().split('T')[0];
      XLSX.writeFile(workbook, `students_${timestamp}.xlsx`);
      
    } catch (error) {
      console.error('Export error:', error);
      alert('Error exporting students data. Please try again.');
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={!students || students.length === 0}
      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Export Students
    </button>
  );
}