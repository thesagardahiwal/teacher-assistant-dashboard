// app/dashboard/components/CalendarWidget.tsx
export default function CalendarWidget() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const monthDays = Array.from({ length: 30 }, (_, i) => i + 1);
  const today = 8;

  return (
    <div className="bg-white p-5 rounded-2xl shadow">
      <h3 className="font-semibold mb-4 text-gray-800">June 2022</h3>

      <div className="grid grid-cols-7 text-center text-gray-500 text-sm mb-2">
        {days.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {monthDays.map((day) => (
          <div
            key={day}
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm cursor-pointer
            ${
              day === today
                ? "bg-indigo-600 text-white"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
