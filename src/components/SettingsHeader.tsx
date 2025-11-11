import { Settings, Download, Upload } from 'lucide-react';

export function SettingsHeader() {
  const handleExportData = () => {
    // Implement data export logic
    console.log('Exporting data...');
  };

  const handleImportData = () => {
    // Implement data import logic
    console.log('Importing data...');
  };

  return (
    <div className="flex bg-white rounded-2xl p-4 flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
          <Settings className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your account preferences and settings</p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={handleExportData}
          className="flex items-center space-x-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          <Download className="w-4 h-4" />
          <span>Export Data</span>
        </button>
        <button
          onClick={handleImportData}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Upload className="w-4 h-4" />
          <span>Import Data</span>
        </button>
      </div>
    </div>
  );
}