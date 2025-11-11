// app/dashboard/components/StudentTests.tsx
import { EllipsisVertical } from "lucide-react";

const tests = [
  {
    name: "Composition in Web Design",
    deadline: "June 09, 2022",
    student: "Marie Stephens",
    status: "Active",
  },
  {
    name: "Responsive vs. Adaptive Design",
    deadline: "June 10, 2022",
    student: "Barbara Carter",
    status: "Active",
  },
  {
    name: "Responsive vs. Adaptive Design",
    deadline: "June 10, 2022",
    student: "Daniel Evans",
    status: "Reviewed",
  },
  {
    name: "8 Point Grid System in UX",
    deadline: "June 11, 2022",
    student: "Paul Robinson",
    status: "Not viewed",
  },
];

const statusColors: Record<string, string> = {
  Active: "bg-blue-100 text-blue-600",
  Reviewed: "bg-green-100 text-green-600",
  "Not viewed": "bg-yellow-100 text-yellow-600",
};

export default function StudentTests() {
  return (
    <div className="bg-white p-5 rounded-2xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Student tests</h3>
        <button className="text-indigo-600 text-sm font-medium">All tests</button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="pb-2">Test name</th>
              <th className="pb-2">Deadline</th>
              <th className="pb-2">Student</th>
              <th className="pb-2">Status</th>
              <th className="pb-2"></th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test, idx) => (
              <tr
                key={idx}
                className="border-b hover:bg-gray-50 text-gray-700 last:border-none"
              >
                <td className="py-3 font-medium">{test.name}</td>
                <td>{test.deadline}</td>
                <td>{test.student}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[test.status]}`}
                  >
                    {test.status}
                  </span>
                </td>
                <td className="text-gray-400">
                  <EllipsisVertical size={16} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
