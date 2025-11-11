"use client";

export default function CalendarWidget() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth(); // 0 = Jan
  const today = now.getDate(); // current day (1–31)

  // Get month name and number of days in month
  const monthName = now.toLocaleString("default", { month: "long" });
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Calculate which day of week month starts on
  const startDay = new Date(year, month, 1).getDay();

  // Build full calendar grid
  const monthDays = Array.from({ length: startDay + daysInMonth }, (_, i) =>
    i < startDay ? null : i - startDay + 1
  );

  return (
    <div className="bg-white p-5 rounded-2xl shadow">
      <h3 className="font-semibold mb-4 text-gray-800">
        {monthName} {year}
      </h3>

      <div className="grid grid-cols-7 text-center text-gray-500 text-sm mb-2">
        {days.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {monthDays.map((day, i) => (
          <div
            key={i}
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm cursor-pointer
              ${
                day === today
                  ? "bg-indigo-600 text-white font-semibold shadow"
                  : day
                  ? "hover:bg-gray-100 text-gray-700"
                  : ""
              }`}
          >
            {day || ""}
          </div>
        ))}
      </div>
    </div>
  );
}
