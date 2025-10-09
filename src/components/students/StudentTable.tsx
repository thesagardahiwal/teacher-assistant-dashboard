import StudentActions from "./StudentActions";

export default function StudentTable({ students, onRefresh }) {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">Roll No</th>
          <th className="border p-2">Name</th>
          <th className="border p-2">Batch</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Attendance %</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(students) && students.map((s) => (
          <tr key={s._id}>
            <td className="border p-2">{s.roll}</td>
            <td className="border p-2">{s.name}</td>
            <td className="border p-2">{s.batchId}</td>
            <td className="border p-2">{s.email || "-"}</td>
            <td className="border p-2">{s.attendance || "0"}%</td>
            <td className="border p-2">
              <StudentActions student={s} onRefresh={onRefresh} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
