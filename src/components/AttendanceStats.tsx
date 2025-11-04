// components/students/AttendanceStats.tsx
import React from 'react'

interface AttendanceStatsProps {
  stats: {
    totalLectures: number
    attendedLectures: number
    percentage: number
  }
}

export default function AttendanceStats({ stats }: AttendanceStatsProps) {
  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 75) return 'text-green-600 bg-green-50'
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  const getAttendanceStatus = (percentage: number) => {
    if (percentage >= 75) return 'Good'
    if (percentage >= 60) return 'Average'
    return 'Poor'
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
        Attendance Summary
      </h2>
      
      {/* Percentage Circle */}
      <div className="flex justify-center mb-4">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={stats.percentage >= 75 ? '#10B981' : stats.percentage >= 60 ? '#F59E0B' : '#EF4444'}
              strokeWidth="3"
              strokeDasharray={`${stats.percentage}, 100`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-2xl font-bold ${getAttendanceColor(stats.percentage).split(' ')[0]}`}>
                {stats.percentage}%
              </div>
              <div className="text-xs text-gray-500">Attendance</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Details */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Attended</span>
          <span className="text-sm font-semibold text-gray-900">
            {stats.attendedLectures} / {stats.totalLectures}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Status</span>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getAttendanceColor(stats.percentage)}`}>
            {getAttendanceStatus(stats.percentage)}
          </span>
        </div>
        
        <div className="pt-3 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            {stats.totalLectures === 0 ? 'No lectures recorded' : 'Based on total lectures'}
          </div>
        </div>
      </div>
    </div>
  )
}