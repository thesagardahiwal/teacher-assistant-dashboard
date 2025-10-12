import { Download, Shield, Bell, HelpCircle } from 'lucide-react';

export function ProfileActions() {
  const actions = [
    {
      icon: <Download className="w-5 h-5" />,
      label: 'Export Data',
      description: 'Download your personal data',
      onClick: () => console.log('Export data')
    },
    {
      icon: <Shield className="w-5 h-5" />,
      label: 'Privacy Settings',
      description: 'Manage your privacy preferences',
      onClick: () => console.log('Privacy settings')
    },
    {
      icon: <Bell className="w-5 h-5" />,
      label: 'Notification Settings',
      description: 'Configure email notifications',
      onClick: () => console.log('Notification settings')
    },
    {
      icon: <HelpCircle className="w-5 h-5" />,
      label: 'Get Help',
      description: 'Contact support',
      onClick: () => console.log('Get help')
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      
      <div className="space-y-3">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition text-left"
          >
            <div className="text-gray-400">{action.icon}</div>
            <div>
              <p className="font-medium text-gray-900">{action.label}</p>
              <p className="text-sm text-gray-500">{action.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}