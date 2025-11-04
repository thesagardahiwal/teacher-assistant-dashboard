// components/StudentFilters.tsx
"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setFilters } from "@/features/students/studentSlice";
import { fetchStudents } from "@/features/students/studentThunks";


export default function StudentFilters() {
  const dispatch = useAppDispatch();
  const { filters, pagination } = useAppSelector((state) => state.students);
  
  const [localFilters, setLocalFilters] = useState({
    search: filters?.search || "",
    year: filters?.year || "",
    department: filters?.department || "",
    batch: filters?.batch || "",
  });

  // Debounced search to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setFilters(localFilters));
      dispatch(fetchStudents(localFilters));
    }, 500);

    return () => clearTimeout(timer);
  }, [localFilters, dispatch]);

  const handleFilterChange = (key: string, value: string) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePageChange = (page: number) => {
    dispatch(fetchStudents({ ...localFilters, page }));
  };

  const clearAllFilters = () => {
    setLocalFilters({ search: "", year: "", department: "", batch: "" });
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Search by name, roll no, email..."
          value={localFilters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
          className="border rounded px-3 py-2 w-64"
        />
        
        <select 
          value={localFilters.year}
          onChange={(e) => handleFilterChange("year", e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">All Years</option>
          <option value="FE">FE</option>
          <option value="SE">SE</option>
          <option value="TE">TE</option>
          <option value="BE">BE</option>
        </select>

        <select 
          value={localFilters.department}
          onChange={(e) => handleFilterChange("department", e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">All Departments</option>
          <option value="Computer Engineering">Computer Engineering</option>
          <option value="IT">IT</option>
          <option value="Mechanical">Mechanical</option>
          <option value="Civil">Civil</option>
        </select>

        <button
          onClick={clearAllFilters}
          className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Clear Filters
        </button>
      </div>

      {/* Pagination Controls */}
      {pagination && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {pagination.totalStudents > 0 ? (pagination.currentPage - 1) * pagination.limit + 1 : 0} -{" "}
            {Math.min(pagination.currentPage * pagination.limit, pagination.totalStudents)} of{" "}
            {pagination.totalStudents} students
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={!pagination.hasPrevPage}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            
            <span className="px-3 py-1">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={!pagination.hasNextPage}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}