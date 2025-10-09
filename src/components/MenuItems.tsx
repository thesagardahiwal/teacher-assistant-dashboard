
import {
  Home,
  Users,
  BookOpen,
  Settings,
  BookTextIcon,
  MenuSquareIcon,
} from 'lucide-react';

export const menuItems = [
  { icon: <Home className="w-5 h-5" />, label: 'Home', path: '/dashboard' },
  { icon: <Users className="w-5 h-5" />, label: 'Students', path: '/dashboard/students' },
  { icon: <BookOpen className="w-5 h-5" />, label: 'Batch', path: '/dashboard/batches' },
  { icon: <MenuSquareIcon className="w-5 h-5" />, label: 'Assignment', path: '/dashboard/assignments' },
  { icon: <BookTextIcon className="w-5 h-5" />, label: 'Diary', path: '/dashboard/diary' },
  { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/dashboard/settings' },
];

export const teacher = {
  name: 'Ms. Sagar Dahiwal',
};