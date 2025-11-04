// components/students/StudentHeader.tsx (Ultra Compact)
import React, { useState } from 'react'
import { Student } from '@/types/student.types'

interface StudentHeaderProps {
  student: Student
}

export default function StudentHeader({ student }: StudentHeaderProps) {
  const [showMore, setShowMore] = useState(false)

  const getBatchDisplay = () => {
    if (typeof student.batch === 'object') {
      return student.batch.name || student.batch.batchId || 'Unknown Batch'
    }
    return student.batch
  }

  const getBatchYear = () => {
    if (typeof student.batch === 'object') {
      return student.batch.year
    }
    return student.year
  }

  const getBatchDepartment = () => {
    if (typeof student.batch === 'object') {
      return student.batch.department
    }
    return student.department
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-6">
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-start sm:justify-between">
        {/* Student Info */}
        <div className="flex items-start space-x-3 sm:space-x-4 flex-1 min-w-0">
          {/* Avatar - Smaller on mobile */}
          <div className="flex-shrink-0">
            <div className="w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm sm:text-xl font-bold">
              {student.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">
              {student.name}
            </h1>
            
            {/* Primary Info - Always visible */}
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600">
              <span className="flex items-center">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-1.5 sm:mr-2"></span>
                {student.rollNumber}
              </span>
              
              {student.enrollmentNumber && (
                <span className="flex items-center">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mr-1.5 sm:mr-2"></span>
                  {student.enrollmentNumber}
                </span>
              )}
            </div>

            {/* Expandable secondary info */}
            {(showMore || window.innerWidth >= 640) && (
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600">
                <span className="flex items-center">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full mr-1.5 sm:mr-2"></span>
                  {getBatchDepartment()}
                </span>
                
                <span className="flex items-center">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full mr-1.5 sm:mr-2"></span>
                  {getBatchDisplay()}
                </span>

                {getBatchYear() && (
                  <span className="flex items-center">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full mr-1.5 sm:mr-2"></span>
                    {getBatchYear()}
                  </span>
                )}
              </div>
            )}

            {/* Show more/less toggle for mobile */}
            <div className="sm:hidden mt-2">
              <button
                onClick={() => setShowMore(!showMore)}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                {showMore ? 'Show less' : 'Show more'}
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons - Stack on mobile */}
        <div className="flex flex-col xs:flex-row sm:flex-col lg:flex-row gap-2 justify-end">
          <button className="
            order-2 xs:order-1 sm:order-1
            px-3 py-1.5 sm:px-4 sm:py-2
            text-xs sm:text-sm font-medium
            text-gray-700
            bg-white
            border border-gray-300
            rounded
            hover:bg-gray-50
            transition-colors
            flex items-center justify-center
          ">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
          
          <button className="
            order-1 xs:order-2 sm:order-2
            px-3 py-1.5 sm:px-4 sm:py-2
            text-xs sm:text-sm font-medium
            text-white
            bg-blue-600
            border border-transparent
            rounded
            hover:bg-blue-700
            transition-colors
            flex items-center justify-center
          ">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Message
          </button>
        </div>
      </div>
    </div>
  )
}