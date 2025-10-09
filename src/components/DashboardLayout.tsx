'use client';

import { useState } from 'react';
import { ReduxProviders } from '@/context/ReduxProvider';
import { Sidebar } from './Sidebar';
import { MobileSidebar } from './MobileSidebar';
import { Navbar } from './Navbar';
import { LoadingState } from './LoadingState';
import { useMobileDetection } from '@/hooks/useMobileDetection';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [activeItem, setActiveItem] = useState('Home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isMobile, mounted } = useMobileDetection();

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  if (!mounted || isMobile === null) {
    return <LoadingState />;
  }

  return (
    <ReduxProviders>
      <div className="flex flex-col md:flex-row h-screen bg-gray-100 text-gray-800">
        {/* Sidebars */}
        <MobileSidebar
          isOpen={isMobileMenuOpen}
          activeItem={activeItem}
          onItemClick={setActiveItem}
          onClose={closeMobileMenu}
        />
        
        <Sidebar
          activeItem={activeItem}
          onItemClick={setActiveItem}
        />

        {/* Content Section */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar
            onMenuToggle={toggleMobileMenu}
            isMobileMenuOpen={isMobileMenuOpen}
          />
          
          <main className="flex-1 p-4 md:p-6 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </ReduxProviders>
  );
}