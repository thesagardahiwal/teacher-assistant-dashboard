import { X } from 'lucide-react';
import Link from 'next/link';
import { menuItems } from './MenuItems';

interface MobileSidebarProps {
  isOpen: boolean;
  activeItem: string;
  onItemClick: (item: string) => void;
  onClose: () => void;
}

export function MobileSidebar({ isOpen, activeItem, onItemClick, onClose }: MobileSidebarProps) {
  if (!isOpen) return null;

  return (
    <aside className="fixed inset-0 z-50 bg-white p-5 md:hidden">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-blue-600">TeacherAssistX</h1>
        <button
          onClick={onClose}
          className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <nav className="space-y-4">
        {menuItems.map((item) => (
          <MobileSidebarItem
            key={item.label}
            item={item}
            isActive={activeItem === item.label}
            onClick={() => {
              onItemClick(item.label);
              onClose();
            }}
          />
        ))}
      </nav>
    </aside>
  );
}

interface MobileSidebarItemProps {
  item: typeof menuItems[0];
  isActive: boolean;
  onClick: () => void;
}

function MobileSidebarItem({ item, isActive, onClick }: MobileSidebarItemProps) {
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