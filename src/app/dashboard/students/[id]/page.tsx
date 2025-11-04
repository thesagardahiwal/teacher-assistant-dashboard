// app/dashboard/students/[id]/page.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import StudentProfile from '@/components/StudentProfile'
import { studentService } from '@/services/studentService'
import { Student } from '@/types/student.types'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import ErrorMessage from '@/components/ui/ErrorMessage'

export default function StudentProfilePage() {
  const params = useParams()
  const id = params.id as string
  
  const [student, setStudent] = useState<Student | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await studentService.getById(id);
        console.log(response)
        setStudent(response.data || null)
      } catch (err: any) {
        console.error('Error fetching student:', err)
        setError(err.response?.data?.msg || 'Failed to fetch student data')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchStudent()
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ErrorMessage 
          title="Failed to load student" 
          message={error}
          onRetry={() => window.location.reload()}
        />
      </div>
    )
  }

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ErrorMessage 
          title="Student not found" 
          message="The student you're looking for doesn't exist."
        />
      </div>
    )
  }

  return <StudentProfile student={student} />
}