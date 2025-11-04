// components/students/StudentProfile.tsx
'use client'

import React from 'react'
import { Student } from '@/types/student.types'
import StudentHeader from './StudentHeader'
import StudentDetails from './StudentDetails'
import AttendanceStats from './AttendanceStats'
import PerformanceChart from './PerformanceChart'
import GuardianInfo from './GuardianInfo'
import RecentActivity from './RecentActivity'

interface StudentProfileProps {
  student: Student
}

export default function StudentProfile({ student }: StudentProfileProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <StudentHeader student={student} />
        
        {/* Main Content Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Student Details */}
            <StudentDetails student={student} />
            
            {/* Performance Chart */}
            <PerformanceChart performance={student.performance} />
            
            {/* Recent Activity */}
            <RecentActivity student={student} />
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            {/* Attendance Stats */}
            <AttendanceStats stats={student.attendanceStats} />
            
            {/* Guardian Info */}
            <GuardianInfo guardian={student.guardian} />
          </div>
        </div>
      </div>
    </div>
  )
}