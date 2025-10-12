"use client";

import { useState } from 'react';
import { Monitor, Moon, Sun, Palette, ALargeSmall, Layout } from 'lucide-react';

export function AppearanceSettings() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [density, setDensity] = useState<'comfortable' | 'compact'>('comfortable');
  const [accentColor, setAccentColor] = useState('blue');

  const accentColors = [
    { name: 'blue', value: 'bg-blue-500', label: 'Blue' },
    { name: 'purple', value: 'bg-purple-500', label: 'Purple' },
    { name: 'green', value: 'bg-green-500', label: 'Green' },
    { name: 'orange', value: 'bg-orange-500', label: 'Orange' },
    { name: 'pink', value: 'bg-pink-500', label: 'Pink' },
  ];

  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Appearance</h2>
        <p className="text-gray-600">Customize how TeacherAssistX looks and feels</p>
      </div>

      {/* Theme Selection */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Palette className="w-5 h-5 text-gray-400" />
          <div>
            <h3 className="font-medium text-gray-900">Theme</h3>
            <p className="text-sm text-gray-500">Choose your preferred theme</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ThemeCard
            icon={<Sun className="w-5 h-5" />}
            title="Light"
            description="Clean and bright"
            isSelected={theme === 'light'}
            onClick={() => setTheme('light')}
          />
          <ThemeCard
            icon={<Moon className="w-5 h-5" />}
            title="Dark"
            description="Easy on the eyes"
            isSelected={theme === 'dark'}
            onClick={() => setTheme('dark')}
          />
          <ThemeCard
            icon={<Monitor className="w-5 h-5" />}
            title="System"
            description="Follows your device"
            isSelected={theme === 'system'}
            onClick={() => setTheme('system')}
          />
        </div>
      </div>

      {/* Accent Color */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-purple-600 rounded"></div>
          <div>
            <h3 className="font-medium text-gray-900">Accent Color</h3>
            <p className="text-sm text-gray-500">Choose your primary color</p>
          </div>
        </div>
        
        <div className="flex space-x-4">
          {accentColors.map((color) => (
            <button
              key={color.name}
              onClick={() => setAccentColor(color.name)}
              className={`flex flex-col items-center space-y-2 p-3 rounded-lg border-2 transition ${
                accentColor === color.name
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`w-8 h-8 rounded-full ${color.value}`}></div>
              <span className="text-xs font-medium text-gray-700">{color.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <ALargeSmall className="w-5 h-5 text-gray-400" />
          <div>
            <h3 className="font-medium text-gray-900">Font Size</h3>
            <p className="text-sm text-gray-500">Adjust the text size</p>
          </div>
        </div>
        
        <div className="flex space-x-4">
          {[
            { value: 'sm', label: 'Small', size: 'text-sm' },
            { value: 'base', label: 'Medium', size: 'text-base' },
            { value: 'lg', label: 'Large', size: 'text-lg' },
          ].map((size) => (
            <button
              key={size.value}
              onClick={() => setFontSize(size.value as any)}
              className={`flex-1 text-center py-3 rounded-lg border-2 transition ${
                fontSize === size.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <div className={`font-medium ${size.size}`}>Aa</div>
              <div className="text-xs mt-1">{size.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Layout Density */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Layout className="w-5 h-5 text-gray-400" />
          <div>
            <h3 className="font-medium text-gray-900">Layout Density</h3>
            <p className="text-sm text-gray-500">Choose how compact the interface appears</p>
          </div>
        </div>
        
        <div className="flex space-x-4">
          {[
            { value: 'comfortable', label: 'Comfortable', description: 'More spacing' },
            { value: 'compact', label: 'Compact', description: 'Less spacing' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setDensity(option.value as any)}
              className={`flex-1 text-left p-4 rounded-lg border-2 transition ${
                density === option.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium text-gray-900">{option.label}</div>
              <div className="text-sm text-gray-500">{option.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <div className="flex justify-end pt-6 border-t border-gray-200">
        <button className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
          Reset to Defaults
        </button>
      </div>
    </div>
  );
}

interface ThemeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

function ThemeCard({ icon, title, description, isSelected, onClick }: ThemeCardProps) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-lg border-2 text-left transition ${
        isSelected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center space-x-3 mb-2">
        <div className={`p-2 rounded-lg ${
          isSelected ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
        }`}>
          {icon}
        </div>
        <span className={`font-medium ${
          isSelected ? 'text-blue-700' : 'text-gray-900'
        }`}>
          {title}
        </span>
      </div>
      <p className="text-sm text-gray-500">{description}</p>
    </button>
  );
}