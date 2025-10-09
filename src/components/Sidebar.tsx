import Link from 'next/link';
import { menuItems } from './MenuItems';

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

export function Sidebar({ activeItem, onItemClick }: SidebarProps) {
  return (
    <aside className="hidden md:block w-64 bg-white shadow-md p-5">
      <h1 className="text-2xl font-bold text-blue-600 mb-8">TeacherAssistX</h1>
      <nav className="space-y-4">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.label}
            item={item}
            isActive={activeItem === item.label}
            onClick={() => onItemClick(item.label)}
          />
        ))}
      </nav>
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
      className={`flex items-center w-full px-3 py-2 rounded-lg hover:bg-blue-100 transition ${
        isActive ? 'bg-blue-200 text-blue-800 font-semibold' : ''
      }`}
    >
      <span className="mr-3">{item.icon}</span>
      {item.label}
    </Link>
  );
}