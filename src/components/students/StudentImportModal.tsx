"use client";

import { useState, useMemo } from "react";
import Papa from "papaparse";
import { studentService } from "@/services";
import { IStudent } from "@/types/student.types";
import { useBatches } from "@/hooks/useBatches";

function normalizePhone(phone: string): string {
  if (!phone) return "";
  
  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Take only the last 10 digits (in case country code is included)
  return digitsOnly.slice(-10);
}


function deduplicateStudents(students: IStudent[]): IStudent[] {
    const seen = new Map<string, IStudent>();

    students.forEach((s) => {
        // Key: rollNumber OR enrollmentNumber
        const key = (s.rollNumber || s.enrollmentNumber)!.trim();

        if (!seen.has(key)) {
            seen.set(key, s);
        }
        // If duplicate is found, ignore the later one
    });

    return Array.from(seen.values());
}

function mapRowToStudent(row: Record<string, string>, batch: string, batchName:string, department: string, year: string): IStudent {
  const baseId = row.rollNumber || row.enrollmentNumber || `SID-${Math.random().toString(36).slice(2)}`;

  return {
    studentId: baseId,
    rollNumber: row.rollNumber || "",
    enrollmentNumber: row.enrollmentNumber || "",
    name: row.name || "",
    email: row.email || "",
    phone: normalizePhone(row.phone || ""), // Normalize here
    batch,
    department,
    guardian: {
      name: row.guardian_name || "",
      phone: normalizePhone(row.guardian_phone || ""), // Normalize here too
      email: row.guardian_email || "",
    },
    attendanceStats: {
      totalLectures: 0,
      attendedLectures: 0,
      percentage: 0,
    },
    performance: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    year: year
  };
}

export default function StudentImportModal({ onImported }: { onImported: () => void }) {
    const [open, setOpen] = useState(false);
    const { batches } = useBatches();
    const [students, setStudents] = useState<IStudent[]>([]);
    const [selectedStudents, setSelectedStudents] = useState<IStudent[]>([]);
    const [batchId, setBatchId] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [batch, setBatch] = useState("Batch A");
    const [department, setDepartment] = useState("CSE");
    const [year, setYear] = useState(new Date().getFullYear().toString());
    const [filterText, setFilterText] = useState("");

    const pageSize = 5;

    // Filtered students
    const filteredStudents = useMemo(() => {
        if (!filterText) return students;
        const lower = filterText.toLowerCase();
        return students.filter(
            (s) =>
                s.name.toLowerCase().includes(lower) ||
                s.rollNumber.toLowerCase().includes(lower) ||
                s.enrollmentNumber?.toLowerCase().includes(lower) ||
                s.batch.toLowerCase().includes(lower) ||
                s.department.toLowerCase().includes(lower)
        );
    }, [students, filterText]);

    const pageCount = Math.ceil(filteredStudents.length / pageSize);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => {
                const mapped = (result.data as Record<string, string>[]).map((row) =>
                    mapRowToStudent(row, batchId, batch, department, year)
                );
                const deduped = deduplicateStudents(mapped);
                setStudents(deduped);
            },
        });
    };

    const handleChange = (studentId: string, field: keyof IStudent, value: any) => {
        setStudents((prev) =>
            prev.map((s) =>
                s.studentId === studentId
                    ? field === "guardian"
                        ? { ...s, guardian: { ...s.guardian, ...value } }
                        : { ...s, [field]: value }
                    : s
            )
        );
    };

    // Selection
    const toggleSelect = (student: IStudent) => {
        setSelectedStudents((prev) =>
            prev.find((s) => s.studentId === student.studentId)
                ? prev.filter((s) => s.studentId !== student.studentId)
                : [...prev, student]
        );
    };

    const selectAll = () => setSelectedStudents(students);
    const deselectAll = () => setSelectedStudents([]);
    const selectPage = () =>
        setSelectedStudents((prev) => {
            const pageData = currentData;
            const ids = new Set(prev.map((s) => s.studentId));
            const merged = [...prev];
            pageData.forEach((s) => {
                if (!ids.has(s.studentId)) merged.push(s);
            });
            return merged;
        });

    const deselectPage = () =>
        setSelectedStudents((prev) => prev.filter((s) => !currentData.some((c) => c.studentId === s.studentId)));

    const handleSubmit = async () => {
        console.log("Importing students:", selectedStudents);
        const invalidPhones = selectedStudents.filter(s =>
            s.phone && s.phone.length > 10 ||
            s.guardian?.phone && s.guardian.phone.length > 10
        );

        if (invalidPhones.length > 0) {
            alert(`Some phone numbers exceed 10 characters. Please fix them before importing.`);
            return;
        }
        await studentService.import(selectedStudents);
        // setOpen(false);
        // onImported();
    };

    //   const previewSelected = () => {
    //     setStudents(selectedStudents);
    //     setCurrentPage(1);
    //   };

    const currentData = filteredStudents.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="bg-blue-600 text-white px-3 py-1 rounded"
            >
                Import Students
            </button>

            {open && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow w-[900px] max-h-[90vh] overflow-y-auto">
                        <h2 className="font-bold mb-4">Import Students</h2>

                        {/* Batch & Department */}
                        <div className="flex gap-3 mb-4 items-center">
                            <select
                                value={batch}
                                onChange={(e) => {
                                    const selectedBatch = batches.find((b) => b.batchId === e.target.value);
                                    if (selectedBatch) {
                                        setBatchId(selectedBatch._id);
                                        setBatch(selectedBatch.name);
                                        setDepartment(selectedBatch.department);
                                        setYear(selectedBatch.year);
                                    }
                                }}
                                className="border rounded px-3 py-2 w-52"
                            >
                                <option value="">Select Batch</option>
                                {batches.map((b) => (
                                    <option key={b.batchId} value={b.batchId}>
                                        {b.name} ({b.department} - {b.year})
                                    </option>
                                ))}
                            </select>

                            <div className="text-sm text-gray-600">
                                {batch ? (
                                    <>
                                        <p><strong>Batch:</strong> {batch}</p>
                                        <p><strong>Dept:</strong> {department}</p>
                                        <p><strong>Year:</strong> {year}</p>
                                    </>
                                ) : (
                                    <p>Select a batch to import students</p>
                                )}
                            </div>
                        </div>

                        {/* File Upload */}
                        <input type="file" accept=".csv" onChange={handleFileUpload} className="mb-4" />
                        {students.length > 0 && (
                            <>
                                {/* Filter */}
                                <input
                                    value={filterText}
                                    onChange={(e) => setFilterText(e.target.value)}
                                    placeholder="Filter by name, roll no, batch, department..."
                                    className="border rounded px-3 py-1 mb-4 w-full"
                                />

                                {/* Selection Controls */}
                                {students.length > 0 && (
                                    <div className="flex gap-2 mb-4">
                                        <button onClick={selectAll} className="px-3 py-1 bg-gray-200 rounded">Select All</button>
                                        <button onClick={deselectAll} className="px-3 py-1 bg-gray-200 rounded">Deselect All</button>
                                        <button onClick={selectPage} className="px-3 py-1 bg-gray-200 rounded">Select Page</button>
                                        <button onClick={deselectPage} className="px-3 py-1 bg-gray-200 rounded">Deselect Page</button>
                                    </div>
                                )}
                            </>
                        )}

                        {/* Preview Table */}
                        {filteredStudents.length > 0 && (
                            <div>
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse border border-gray-300 mb-4">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="border min-w-32 p-2">Select</th>
                                                <th className="border min-w-32 p-2">Roll No</th>
                                                <th className="border min-w-32 p-2">Enrollment No</th>
                                                <th className="border min-w-32 p-2">Name</th>
                                                <th className="border min-w-32 p-2">Email</th>
                                                <th className="border min-w-32 p-2">Phone</th>
                                                <th className="border min-w-32 p-2">Department</th>
                                                <th className="border min-w-32 p-2">Guardian Name</th>
                                                <th className="border min-w-32 p-2">Guardian Phone</th>
                                                <th className="border min-w-32 p-2">Guardian Email</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentData.map((s, i) => {
                                                const globalIndex = students.findIndex((st) => st.studentId === s.studentId);
                                                const checked = selectedStudents.some((sel) => sel.studentId === s.studentId);

                                                return (
                                                    <tr key={s.studentId + i}>
                                                        <td className="border p-2 text-center">
                                                            <input
                                                                type="checkbox"
                                                                checked={checked}
                                                                onChange={() => toggleSelect(s)}
                                                            />
                                                        </td>
                                                        <td className="border p-2">
                                                            <input
                                                                value={s.rollNumber}
                                                                onChange={(e) => handleChange(s.studentId, "rollNumber", e.target.value)}
                                                                className="border rounded px-2 py-1 w-full"
                                                            />
                                                        </td>
                                                        <td className="border p-2">
                                                            <input
                                                                value={s.enrollmentNumber || ""}
                                                                onChange={(e) => handleChange(s.studentId, "enrollmentNumber", e.target.value)}
                                                                className="border rounded px-2 py-1 w-full"
                                                            />
                                                        </td>
                                                        <td className="border p-2">
                                                            <input
                                                                value={s.name}
                                                                onChange={(e) => handleChange(s.studentId, "name", e.target.value)}
                                                                className="border rounded px-2 py-1 w-full"
                                                            />
                                                        </td>
                                                        <td className="border p-2">
                                                            <input
                                                                value={s.email || ""}
                                                                onChange={(e) => handleChange(s.studentId, "email", e.target.value)}
                                                                className="border rounded px-2 py-1 w-full"
                                                            />
                                                        </td>
                                                        <td className="border p-2">
                                                            <input
                                                                value={s.phone || ""}
                                                                onChange={(e) => handleChange(s.studentId, "phone", e.target.value)}
                                                                className="border rounded px-2 py-1 w-full"
                                                            />
                                                        </td>
                                                        <td className="border p-2">
                                                            <input
                                                                value={s.department}
                                                                disabled
                                                                className="border rounded px-2 py-1 w-full"
                                                            />
                                                        </td>
                                                        <td className="border p-2">
                                                            <input
                                                                value={s?.guardian?.name || ""}
                                                                onChange={(e) => handleChange(s.studentId, "guardian", { name: e.target.value })}
                                                                className="border rounded px-2 py-1 w-full"
                                                            />
                                                        </td>
                                                        <td className="border p-2">
                                                            <input
                                                                value={s?.guardian?.phone || ""}
                                                                onChange={(e) => handleChange(s.studentId, "guardian", { phone: e.target.value })}
                                                                className="border rounded px-2 py-1 w-full"
                                                            />
                                                        </td>
                                                        <td className="border p-2">
                                                            <input
                                                                value={s?.guardian?.email || ""}
                                                                onChange={(e) => handleChange(s.studentId, "guardian", { email: e.target.value })}
                                                                className="border rounded px-2 py-1 w-full"
                                                            />
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                <div className="flex justify-between items-center">
                                    <button
                                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="px-3 py-1 bg-gray-200 rounded"
                                    >
                                        Prev
                                    </button>
                                    <span>Page {currentPage} of {pageCount}</span>
                                    <button
                                        onClick={() => setCurrentPage((p) => Math.min(p + 1, pageCount))}
                                        disabled={currentPage === pageCount}
                                        className="px-3 py-1 bg-gray-200 rounded"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="mt-6 flex justify-end gap-2">
                            <button
                                onClick={handleSubmit}
                                disabled={selectedStudents.length === 0}
                                className="bg-green-600 text-white px-4 py-2 rounded"
                            >
                                Import {selectedStudents.length > 0 ? `(${selectedStudents.length})` : ""}
                            </button>
                            <button
                                onClick={() => {
                                    setStudents([]);
                                    setSelectedStudents([]);
                                    setOpen(false);
                                }}
                                className="px-4 py-2 border rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
