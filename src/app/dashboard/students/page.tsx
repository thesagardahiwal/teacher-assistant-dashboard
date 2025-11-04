"use client";

import BatchProtectedRoute from "@/components/BatchProtectedRoute";
import StudentList from "@/components/students/StudentList";

export default function StudentsPage() {


  return (
    <BatchProtectedRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Students</h1>
        <StudentList />
      </div>
    </BatchProtectedRoute>
  );
}
