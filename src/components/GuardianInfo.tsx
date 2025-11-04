// components/students/GuardianInfo.tsx
import React from 'react'

interface GuardianInfoProps {
  guardian?: {
    name?: string
    phone?: string
    email?: string
  }
}

export default function GuardianInfo({ guardian }: GuardianInfoProps) {
  if (!guardian || (!guardian.name && !guardian.phone && !guardian.email)) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
          Guardian Information
        </h2>
        <div className="text-center py-4">
          <div className="text-gray-400 text-4xl mb-2">👨‍👩‍👧‍👦</div>
          <p className="text-gray-500 text-sm">No guardian information available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
        Guardian Information
      </h2>
      
      <div className="space-y-4">
        {guardian.name && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-orange-600 text-sm">👤</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{guardian.name}</p>
              <p className="text-xs text-gray-500">Guardian Name</p>
            </div>
          </div>
        )}
        
        {guardian.phone && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm">📞</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{guardian.phone}</p>
              <p className="text-xs text-gray-500">Phone Number</p>
            </div>
          </div>
        )}
        
        {guardian.email && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-sm">📧</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{guardian.email}</p>
              <p className="text-xs text-gray-500">Email Address</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Contact Guardian
        </button>
      </div>
    </div>
  )
}