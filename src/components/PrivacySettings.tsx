"use client";

import { useState } from 'react';
import { Shield, Eye, Download, Key, UserX } from 'lucide-react';
import { ToggleSwitch } from './ToggleSwitch';

export function PrivacySettings() {
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'teachers',
    dataCollection: true,
    personalizedAds: false,
    searchVisibility: true,
  });

  const toggleSetting = (setting: keyof typeof privacySettings) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Privacy & Security</h2>
        <p className="text-gray-600">Control your privacy and security settings</p>
      </div>

      {/* Profile Visibility */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Eye className="w-5 h-5 text-gray-400" />
          <div>
            <h3 className="font-medium text-gray-900">Profile Visibility</h3>
            <p className="text-sm text-gray-500">Control who can see your profile</p>
          </div>
        </div>
        
        <div className="space-y-3">
          {[
            { value: 'public', label: 'Public', description: 'Anyone can see your profile' },
            { value: 'teachers', label: 'Teachers Only', description: 'Only other teachers can see your profile' },
            { value: 'private', label: 'Private', description: 'Only you can see your profile' },
          ].map((option) => (
            <div key={option.value} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <input
                type="radio"
                name="profileVisibility"
                value={option.value}
                checked={privacySettings.profileVisibility === option.value}
                onChange={() => setPrivacySettings(prev => ({ ...prev, profileVisibility: option.value as any }))}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <div className="font-medium text-gray-900">{option.label}</div>
                <div className="text-sm text-gray-500">{option.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Preferences */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Download className="w-5 h-5 text-gray-400" />
          <div>
            <h3 className="font-medium text-gray-900">Data Preferences</h3>
            <p className="text-sm text-gray-500">Control how your data is used</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
            <div>
              <div className="font-medium text-gray-900">Data Collection</div>
              <div className="text-sm text-gray-500">Allow anonymous data collection to improve our services</div>
            </div>
            <ToggleSwitch 
              enabled={privacySettings.dataCollection} 
              onChange={() => toggleSetting('dataCollection')} 
            />
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
            <div>
              <div className="font-medium text-gray-900">Personalized Content</div>
              <div className="text-sm text-gray-500">Show personalized recommendations and content</div>
            </div>
            <ToggleSwitch 
              enabled={privacySettings.personalizedAds} 
              onChange={() => toggleSetting('personalizedAds')} 
            />
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
            <div>
              <div className="font-medium text-gray-900">Search Visibility</div>
              <div className="text-sm text-gray-500">Allow your profile to appear in search results</div>
            </div>
            <ToggleSwitch 
              enabled={privacySettings.searchVisibility} 
              onChange={() => toggleSetting('searchVisibility')} 
            />
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Shield className="w-5 h-5 text-gray-400" />
          <div>
            <h3 className="font-medium text-gray-900">Security</h3>
            <p className="text-sm text-gray-500">Manage your account security</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
            <div className="flex items-center space-x-3">
              <Key className="w-5 h-5 text-gray-400" />
              <div>
                <div className="font-medium text-gray-900">Change Password</div>
                <div className="text-sm text-gray-500">Update your password regularly</div>
              </div>
            </div>
            <div className="text-blue-600 font-medium">Change</div>
          </button>
          
          <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
            <div className="flex items-center space-x-3">
              <UserX className="w-5 h-5 text-gray-400" />
              <div>
                <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                <div className="text-sm text-gray-500">Add an extra layer of security</div>
              </div>
            </div>
            <div className="text-blue-600 font-medium">Enable</div>
          </button>
          
          <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
            <div>
              <div className="font-medium text-gray-900">Login Activity</div>
              <div className="text-sm text-gray-500">Review recent account activity</div>
            </div>
            <div className="text-blue-600 font-medium">View</div>
          </button>
        </div>
      </div>

      {/* Data Export */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Download className="w-5 h-5 text-gray-400" />
          <div>
            <h3 className="font-medium text-gray-900">Data Management</h3>
            <p className="text-sm text-gray-500">Download or delete your data</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-left">
            <div className="font-medium text-gray-900">Download Your Data</div>
            <div className="text-sm text-gray-500">Get a copy of your personal data</div>
          </button>
          
          <button className="p-4 border border-red-200 rounded-lg hover:bg-red-50 transition text-left">
            <div className="font-medium text-red-900">Delete Account</div>
            <div className="text-sm text-red-600">Permanently delete your account</div>
          </button>
        </div>
      </div>
    </div>
  );
}