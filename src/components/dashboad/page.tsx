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
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <WorkingHours />
          <StudentTests />
        </div>
        <div className="space-y-6">
          <GroupChats />
          <CalendarWidget />
          <UpcomingClasses />
        </div>
      </div>
    </div>
  );
}
