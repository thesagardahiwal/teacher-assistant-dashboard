"use client"
import BatchProtectedRoute from '@/components/BatchProtectedRoute'
import React from 'react'

function layout({children} : {children: React.ReactNode}) {
  return (
    <BatchProtectedRoute>
        {children}
    </BatchProtectedRoute>
  )
}

export default layout