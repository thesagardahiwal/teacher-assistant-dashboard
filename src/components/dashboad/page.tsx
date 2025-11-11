import Header from "./components/Header";
import WorkingHours from "./components/WorkingHours";
import GroupChats from "./components/GroupChats";
import CalendarWidget from "./components/CalendarWidget";
import StudentTests from "./components/StudentTests";
import UpcomingClasses from "./components/UpcomingClasses";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <Header />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 sm:col-span-1 space-y-6">
          <WorkingHours />
          <StudentTests />
        </div>
        <div className="space-y-6 min-w-[260px]">
          <GroupChats />
          <CalendarWidget />
          <UpcomingClasses />
        </div>
      </div>
    </div>
  );
}
