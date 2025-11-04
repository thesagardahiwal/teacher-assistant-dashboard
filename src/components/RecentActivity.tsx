// components/students/RecentActivity.tsx
import React from 'react'
import { Student } from '@/types/student.types'

interface RecentActivityProps {
  student: Student
}

export default function RecentActivity({ student }: RecentActivityProps) {
  // Mock recent activities - you can replace with actual data
  const activities = [
    {
      id: 1,
      type: 'attendance',
      description: 'Marked present in Mathematics',
      time: '2 hours ago',
      icon: '✅'
    },
    {
      id: 2,
      type: 'performance',
      description: 'Scored 85% in Physics test',
      time: '1 day ago',
      icon: '📝'
    },
    {
      id: 3,
      type: 'update',
      description: 'Profile information updated',
      time: '2 days ago',
      icon: '✏️'
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
        Recent Activity
      </h2>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
            <span className="text-lg flex-shrink-0">{activity.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">{activity.description}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All Activity
        </button>
      </div>
    </div>
  )
}