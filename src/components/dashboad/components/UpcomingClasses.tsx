// app/dashboard/components/UpcomingClasses.tsx
import { Link as LinkIcon } from "lucide-react";

const classes = [
  {
    time: "10:30",
    name: "Composition | Class 3A",
    date: "June 08, Offline",
  },
  {
    time: "11:30",
    name: "Composition | Class 3B",
    date: "June 08, Offline",
  },
  {
    time: "14:30",
    name: "Grid System | Class 5B",
    date: "June 08, Online - Zoom meeting",
  },
];

export default function UpcomingClasses() {
  return (
    <div className="bg-white p-5 rounded-2xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Upcoming Classes</h3>
        <button className="text-indigo-600 text-sm font-medium">View all</button>
      </div>

      <div className="space-y-3">
        {classes.map((cls, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 cursor-pointer"
          >
            <div>
              <p className="text-sm text-gray-400">{cls.time}</p>
              <p className="font-medium text-gray-800">{cls.name}</p>
              <p className="text-sm text-gray-500">{cls.date}</p>
            </div>
            <div className="bg-indigo-100 p-2 rounded-xl">
              <LinkIcon size={16} className="text-indigo-600" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
