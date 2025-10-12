"use client";

import { useState } from 'react';
import { AlertTriangle, Trash2, Download, Archive } from 'lucide-react';

export function DangerZone() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleExportData = () => {
    // Implement data export
    console.log('Exporting all data...');
  };

  const handleArchiveAccount = () => {
    // Implement account archiving
    console.log('Archiving account...');
  };

  const handleDeleteAccount = () => {
    // Implement account deletion
    console.log('Deleting account...');
    setShowDeleteConfirm(false);
  };

  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Danger Zone</h2>
        <p className="text-gray-600">Critical actions that affect your account</p>
      </div>

      {/* Export Data */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-6 border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <Download className="w-5 h-5 text-gray-400" />
            <div>
              <h3 className="font-medium text-gray-900">Export Your Data</h3>
              <p className="text-sm text-gray-500">Download all your data in a portable format</p>
            </div>
          </div>
          <button
            onClick={handleExportData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Export Data
          </button>
        </div>
      </div>

      {/* Archive Account */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-6 border border-orange-200 rounded-lg bg-orange-50">
          <div className="flex items-center space-x-3">
            <Archive className="w-5 h-5 text-orange-600" />
            <div>
              <h3 className="font-medium text-orange-900">Archive Account</h3>
              <p className="text-sm text-orange-700">
                Temporarily disable your account. You can reactivate it later.
              </p>
            </div>
          </div>
          <button
            onClick={handleArchiveAccount}
            className="px-4 py-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-600 hover:text-white transition"
          >
            Archive Account
          </button>
        </div>
      </div>

      {/* Delete Account */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-6 border border-red-200 rounded-lg bg-red-50">
          <div className="flex items-center space-x-3">
            <Trash2 className="w-5 h-5 text-red-600" />
            <div>
              <h3 className="font-medium text-red-900">Delete Account</h3>
              <p className="text-sm text-red-700">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Delete Account</h3>
                  <p className="text-gray-600 mt-1">
                    Are you absolutely sure? This action cannot be undone.
                  </p>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-red-800">
                  This will permanently delete your account and remove all your data from our servers. 
                  This includes:
                </p>
                <ul className="text-sm text-red-800 mt-2 space-y-1 list-disc list-inside">
                  <li>All your teaching diaries and assignments</li>
                  <li>Student records and batch information</li>
                  <li>Profile information and preferences</li>
                  <li>All associated files and documents</li>
                </ul>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Yes, Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}