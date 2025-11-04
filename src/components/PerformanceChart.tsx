// components/students/PerformanceChart.tsx
import { ISubject } from '@/types/subject.types'
import React from 'react'

interface PerformanceChartProps {
  performance: {
    subjectId: ISubject
    assessmentType: string
    marksObtained: number
    totalMarks: number
    date: Date
  }[]
}

export default function PerformanceChart({ performance }: PerformanceChartProps) {
  // Helper function to get subject name
  const getSubjectName = (subjectId: string | any) => {
    if (typeof subjectId === 'object') {
      return subjectId.name || 'Unknown Subject'
    }
    return subjectId
  }

  if (performance.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
          Performance
        </h2>
        <div className="text-center py-8">
          <div className="text-gray-400 text-6xl mb-4">📊</div>
          <p className="text-gray-500">No performance data available</p>
        </div>
      </div>
    )
  }

  const latestPerformance = performance.slice(0, 5) // Show latest 5

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
        Recent Performance
      </h2>
      
      <div className="space-y-4">
        {latestPerformance.map((item, index) => {
          const percentage = (item.marksObtained / item.totalMarks) * 100
          const getBarColor = (percent: number) => {
            if (percent >= 80) return 'bg-green-500'
            if (percent >= 60) return 'bg-yellow-500'
            return 'bg-red-500'
          }

          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900">
                  {item.assessmentType}
                </span>
                <span className="text-sm text-gray-600">
                  {item.marksObtained}/{item.totalMarks} ({percentage.toFixed(1)}%)
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getBarColor(percentage)} transition-all duration-500`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-500">
                <span>{new Date(item.date).toLocaleDateString()}</span>
                <span>Subject: {getSubjectName(item.subjectId)}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}