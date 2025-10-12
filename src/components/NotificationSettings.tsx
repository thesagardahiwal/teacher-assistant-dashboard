"use client";

import { useState } from 'react';
import { Bell, Mail, MessageSquare, Calendar } from 'lucide-react';
import { ToggleSwitch } from './ToggleSwitch';

export function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    email: {
      assignmentUpdates: true,
      gradeUpdates: false,
      announcements: true,
      weeklyDigest: true,
    },
    push: {
      assignmentDeadlines: true,
      newMessages: false,
      systemAlerts: true,
    },
    sms: {
      urgentAlerts: false,
      gradeUpdates: false,
    },
  });

  const toggleNotification = (category: keyof typeof notifications, type: string) => {
    setNotifications(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [type]: !prev[category][type],
      },
    }));
  };

  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Notifications</h2>
        <p className="text-gray-600">Manage how you receive notifications and alerts</p>
      </div>

      {/* Email Notifications */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Mail className="w-5 h-5 text-gray-400" />
          <div>
            <h3 className="font-medium text-gray-900">Email Notifications</h3>
            <p className="text-sm text-gray-500">Receive updates via email</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <NotificationToggle
            label="Assignment Updates"
            description="Get notified when new assignments are posted"
            enabled={notifications.email.assignmentUpdates}
            onChange={() => toggleNotification('email', 'assignmentUpdates')}
          />
          <NotificationToggle
            label="Grade Updates"
            description="Receive notifications when grades are published"
            enabled={notifications.email.gradeUpdates}
            onChange={() => toggleNotification('email', 'gradeUpdates')}
          />
          <NotificationToggle
            label="Announcements"
            description="Important announcements from administrators"
            enabled={notifications.email.announcements}
            onChange={() => toggleNotification('email', 'announcements')}
          />
          <NotificationToggle
            label="Weekly Digest"
            description="Weekly summary of activities and updates"
            enabled={notifications.email.weeklyDigest}
            onChange={() => toggleNotification('email', 'weeklyDigest')}
          />
        </div>
      </div>

      {/* Push Notifications */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Bell className="w-5 h-5 text-gray-400" />
          <div>
            <h3 className="font-medium text-gray-900">Push Notifications</h3>
            <p className="text-sm text-gray-500">In-app and browser notifications</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <NotificationToggle
            label="Assignment Deadlines"
            description="Reminders for upcoming assignment due dates"
            enabled={notifications.push.assignmentDeadlines}
            onChange={() => toggleNotification('push', 'assignmentDeadlines')}
          />
          <NotificationToggle
            label="New Messages"
            description="Notifications for new messages from students"
            enabled={notifications.push.newMessages}
            onChange={() => toggleNotification('push', 'newMessages')}
          />
          <NotificationToggle
            label="System Alerts"
            description="Important system maintenance and updates"
            enabled={notifications.push.systemAlerts}
            onChange={() => toggleNotification('push', 'systemAlerts')}
          />
        </div>
      </div>

      {/* SMS Notifications */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <MessageSquare className="w-5 h-5 text-gray-400" />
          <div>
            <h3 className="font-medium text-gray-900">SMS Notifications</h3>
            <p className="text-sm text-gray-500">Text message alerts (if enabled)</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <NotificationToggle
            label="Urgent Alerts"
            description="Critical alerts via SMS"
            enabled={notifications.sms.urgentAlerts}
            onChange={() => toggleNotification('sms', 'urgentAlerts')}
          />
          <NotificationToggle
            label="Grade Updates"
            description="Final grade publications via SMS"
            enabled={notifications.sms.gradeUpdates}
            onChange={() => toggleNotification('sms', 'gradeUpdates')}
          />
        </div>
      </div>

      {/* Quiet Hours */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Calendar className="w-5 h-5 text-gray-400" />
          <div>
            <h3 className="font-medium text-gray-900">Quiet Hours</h3>
            <p className="text-sm text-gray-500">Schedule when not to receive notifications</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex-1">
            <div className="font-medium text-gray-900">10:00 PM - 7:00 AM</div>
            <div className="text-sm text-gray-500">No notifications during these hours</div>
          </div>
          <button className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium">
            Change
          </button>
        </div>
      </div>
    </div>
  );
}

interface NotificationToggleProps {
  label: string;
  description: string;
  enabled: boolean;
  onChange: () => void;
}

function NotificationToggle({ label, description, enabled, onChange }: NotificationToggleProps) {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
      <div>
        <div className="font-medium text-gray-900">{label}</div>
        <div className="text-sm text-gray-500">{description}</div>
      </div>
      <ToggleSwitch enabled={enabled} onChange={onChange} />
    </div>
  );
}