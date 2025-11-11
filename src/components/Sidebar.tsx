'use client';

import Link from 'next/link';
import { menuItems } from './MenuItems';
import { PlusCircle } from 'lucide-react';

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

export function Sidebar({ activeItem, onItemClick }: SidebarProps) {
  return (
    <aside className="hidden md:flex flex-col justify-between w-64 p-2 bg-gray-100">
      {/* --- Top Section --- */}
      <div>
        <div className="p-6 bg-white rounded-2xl">
          <h1 className="text-2xl font-bold text-gray-800">TeacherAssistX</h1>
          <p className="text-xs text-gray-500 mt-1">Dashboard</p>
        </div>

        {/* --- Nav Items --- */}
        <nav className="mt-6 bg-white rounded-2xl p-2 py-4 space-y-3">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.label}
              item={item}
              isActive={activeItem === item.label}
              onClick={() => onItemClick(item.label)}
            />
          ))}
        </nav>
      </div>

      {/* --- Bottom Create Class Card --- */}
      <div className="m-4 bg-gradient-to-r from-indigo-500 to-purple-500 p-5 rounded-2xl text-white shadow-md">
        <div className="text-sm opacity-90">Create new class chat now</div>
        <button
          className="mt-4 bg-white text-indigo-600 font-medium px-4 py-2 rounded-xl w-full flex items-center justify-center gap-2 hover:bg-gray-100 transition"
        >
          <PlusCircle size={16} /> Create class
        </button>
      </div>
    </aside>
  );
}

interface SidebarItemProps {
  item: typeof menuItems[0];
  isActive: boolean;
  onClick: () => void;
}

function SidebarItem({ item, isActive, onClick }: SidebarItemProps) {
  return (
    <Link
      href={item.path}
      onClick={onClick}
      className={`flex items-center gap-3 px-5 py-3 mx-2 rounded-xl transition-all duration-150 
        ${
          isActive
            ? 'bg-indigo-100 text-indigo-700 font-semibold shadow-sm'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
    >
      <span
        className={`flex items-center justify-center w-5 h-5 ${
          isActive ? 'text-indigo-600' : 'text-gray-500'
        }`}
      >
        {item.icon}
      </span>
      <span>{item.label}</span>
    </Link>
  );
}
