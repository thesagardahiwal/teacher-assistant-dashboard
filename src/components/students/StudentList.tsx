// components/StudentList.tsx
"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import StudentTable from "./StudentTable";
import StudentFilters from "./StudentFilters";
import StudentImportModal from "./StudentImportModal";
import StudentExportButton from "./StudentExportButton";
import ApiLoader from "../ApiLoader";
import { fetchStudents } from "@/features/students/studentThunks";

export default function StudentList() {
  const dispatch = useAppDispatch();
  const { students, loading, error, pagination, filters } = useAppSelector((state) => state.students);
  useEffect(() => {
    // Load initial data with current filters
    dispatch(fetchStudents(filters));
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchStudents(filters));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Students</h1>
          {pagination && (
            <p className="text-gray-600">
              Total: {pagination.totalStudents} students
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <StudentImportModal onImported={handleRefresh} />
          <StudentExportButton students={students} />
        </div>
      </div>

      {/* Filters */}
      <StudentFilters />

      {/* Table */}
      <ApiLoader loading={loading} error={error}>
        <StudentTable 
          students={students} 
          onRefresh={handleRefresh} 
          pagination={pagination}
        />
      </ApiLoader>
    </div>
  );
}