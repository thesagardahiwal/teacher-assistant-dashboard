"use client";

import { useState } from 'react';
import { SettingsHeader } from '@/components/SettingsHeader';
import { AppearanceSettings } from '@/components/AppearanceSettings';
import { NotificationSettings } from '@/components/NotificationSettings';
import { PrivacySettings } from '@/components/PrivacySettings';
import { AccountSettings } from '@/components/AccountSettings';
import { DangerZone } from '@/components/DangerZone';
import { PaintBucketIcon, Bell, LockKeyholeIcon, User, Ghost } from 'lucide-react';

type SettingsSection = 'appearance' | 'notifications' | 'privacy' | 'account' | 'danger';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSection>('appearance');

  const renderSection = () => {
    switch (activeSection) {
      case 'appearance':
        return <AppearanceSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'privacy':
        return <PrivacySettings />;
      case 'account':
        return <AccountSettings />;
      case 'danger':
        return <DangerZone />;
      default:
        return <AppearanceSettings />;
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SettingsHeader />
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-2 bg-white rounded-2xl w-fit p-4">
              <SidebarItem
                icon={<PaintBucketIcon/>}
                title="Appearance"
                description="Theme and display"
                isActive={activeSection === 'appearance'}
                onClick={() => setActiveSection('appearance')}
              />
              <SidebarItem
                icon={<Bell/>}
                title="Notifications"
                description="Alerts and emails"
                isActive={activeSection === 'notifications'}
                onClick={() => setActiveSection('notifications')}
              />
              <SidebarItem
                icon={<LockKeyholeIcon/>}
                title="Privacy & Security"
                description="Data and permissions"
                isActive={activeSection === 'privacy'}
                onClick={() => setActiveSection('privacy')}
              />
              <SidebarItem
                icon= {<User/>}
                title="Account"
                description="Profile and preferences"
                isActive={activeSection === 'account'}
                onClick={() => setActiveSection('account')}
              />
              <SidebarItem
                icon={<Ghost/>}
                title="Danger Zone"
                description="Critical actions"
                isActive={activeSection === 'danger'}
                onClick={() => setActiveSection('danger')}
              />
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {renderSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SidebarItemProps {
  icon: any;
  title: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
}

function SidebarItem({ icon, title, description, isActive, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
        isActive
          ? 'bg-blue-50 border border-blue-200 shadow-sm'
          : 'hover:bg-gray-50 border border-transparent'
      }`}
    >
      <div className="flex items-start space-x-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <h3 className={`font-semibold ${
            isActive ? 'text-blue-700' : 'text-gray-900'
          }`}>
            {title}
          </h3>
          <p className={`text-sm ${
            isActive ? 'text-blue-600' : 'text-gray-500'
          }`}>
            {description}
          </p>
        </div>
      </div>
    </button>
  );
}