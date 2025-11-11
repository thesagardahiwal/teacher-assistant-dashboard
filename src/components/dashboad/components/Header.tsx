"use client";
import useAuth from "@/hooks/useAuth";
import { UserCircle2Icon } from 'lucide-react'
export default function Header() {
    const { user } = useAuth();
    const now = new Date();
  return (
    <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow">
      <div>
        <h2 className="text-xl font-semibold">Welcome back, {user?.name.split(' ')[0]} 👋</h2>
        <p className="text-sm text-gray-500">{now.toLocaleDateString('en-US', {month: 'long', day: '2-digit', weekday: 'long'})}</p>
      </div>
      <div className="flex items-center gap-3">
        {user?.profilePic ? (
          <img src={user.profilePic} alt="profile" className="w-10 h-10 rounded-full" />
        ) : (
          <UserCircle2Icon className="w-10 h-10 text-gray-400" />
        )}
        <div>
          <p className="font-medium">{user?.name}</p>
          <p className="text-xs text-gray-500">ID: {user?.teacherId}, Dept: {user?.department}</p>
        </div>
      </div>
    </div>
  );
}
