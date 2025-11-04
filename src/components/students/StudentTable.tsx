// components/StudentTable.tsx
import StudentActions from "./StudentActions";

interface StudentTableProps {
  students: any[];
  onRefresh: () => void;
  pagination?: any;
}

export default function StudentTable({ students, onRefresh, pagination }: StudentTableProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left p-4 font-semibold text-gray-700">Roll No</th>
              <th className="text-left p-4 font-semibold text-gray-700">Name</th>
              <th className="text-left p-4 font-semibold text-gray-700">Department</th>
              <th className="text-left p-4 font-semibold text-gray-700">Year</th>
              <th className="text-left p-4 font-semibold text-gray-700">Email</th>
              <th className="text-left p-4 font-semibold text-gray-700">Phone</th>
              <th className="text-left p-4 font-semibold text-gray-700">Attendance %</th>
              <th className="text-left p-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(students) && students.length > 0 ? (
              students.map((student) => (
                <tr key={student._id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{student.rollNumber}</td>
                  <td className="p-4 font-medium">{student.name}</td>
                  <td className="p-4">{student.department}</td>
                  <td className="p-4">
                    {student.batch?.year || student.year || '-'}
                  </td>
                  <td className="p-4">{student.email || "-"}</td>
                  <td className="p-4">{student.phone || "-"}</td>
                  <td className="p-4">
                    {student.attendanceStats?.percentage?.toFixed(1) || "0"}%
                  </td>
                  <td className="p-4">
                    <StudentActions student={student} onRefresh={onRefresh} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="p-8 text-center text-gray-500">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}