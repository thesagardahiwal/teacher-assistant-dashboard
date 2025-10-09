"use client";

import * as XLSX from "xlsx";

export default function StudentExportButton({ students }) {
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(students);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, "students.xlsx");
  };

  return (
    <button
      onClick={handleExport}
      className="bg-gray-700 text-white px-3 py-1 rounded"
    >
      Export
    </button>
  );
}
