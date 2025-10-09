"use client";

import Link from "next/link";
import { studentService } from "@/services";

export default function StudentActions({ student, onRefresh }) {
  const handleDelete = async () => {
    await studentService.remove(student._id);
    onRefresh();
  };

  return (
    <div className="flex gap-2">
      <Link href={`/dashboard/students/${student._id}`}>
        <button className="text-blue-600">View</button>
      </Link>
      <button className="text-red-600" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
