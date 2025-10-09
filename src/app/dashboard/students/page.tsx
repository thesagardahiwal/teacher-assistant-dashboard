"use client";

import StudentList from "@/components/students/StudentList";

export default function StudentsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Students</h1>
      <StudentList />
    </div>
  );
}
