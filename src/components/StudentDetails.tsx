// components/students/StudentDetails.tsx
import React from 'react'
import { Student } from '@/types/student.types'

interface StudentDetailsProps {
  student: Student
}

export default function StudentDetails({ student }: StudentDetailsProps) {
  // Helper function to safely get batch information
  const getBatchInfo = () => {
    if (typeof student.batch === 'object') {
      return {
        year: student.batch.year,
        department: student.batch.department,
        name: student.batch.name
      }
    };
    return {
      year: student.year,
      department: student.department,
      name: student.batch
    }
  }

  const batchInfo = getBatchInfo()
  console.log(batchInfo, student)
  const details = [
    {
      label: 'Email',
      value: student.email || 'Not provided',
      icon: '📧'
    },
    {
      label: 'Phone',
      value: student.phone || 'Not provided',
      icon: '📱'
    },
    {
      label: 'Year',
      value: batchInfo.year || 'Not specified',
      icon: '🎓'
    },
    {
      label: 'Department',
      value: batchInfo.department,
      icon: '🏫'
    },
    {
      label: 'Batch',
      value: batchInfo.name,
      icon: '👥'
    },
    {
      label: 'Student Since',
      value: new Date(student.createdAt).toLocaleDateString(),
      icon: '📅'
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
        Student Information
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {details.map((detail, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
            <span className="text-lg flex-shrink-0">{detail.icon}</span>
            <div>
              <p className="text-sm font-medium text-gray-500">{detail.label}</p>
              <p className="text-sm text-gray-900 mt-1">{detail.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}