import { Search, UserCircle2, Menu } from 'lucide-react';
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';

interface NavbarProps {
  onMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

export function Navbar({ onMenuToggle, isMobileMenuOpen }: NavbarProps) {
  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-4 bg-white shadow">
      {/* Mobile Menu Button */}
      <button
        onClick={onMenuToggle}
        className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
        aria-label="Toggle menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Search - Only show when mobile menu is closed */}
      {!isMobileMenuOpen && <SearchBar />}

      {/* Profile */}
      <ProfileSection />
    </header>
  );
}

function SearchBar() {
  return (
    <div className="relative w-full md:w-72 mx-2 md:mx-0">
      <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search..."
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}

function ProfileSection() {
  const { user } = useAuth();
  return (
    <Link href={"/dashboard/profile"} className="flex items-center space-x-3">
      <UserCircle2 className="w-8 h-8 text-blue-600" />
      <span className="hidden sm:inline font-medium text-gray-700">
        {user?.name || "Failed to load!"}
      </span>
    </Link>
  );
}