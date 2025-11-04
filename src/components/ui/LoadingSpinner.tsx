// components/ui/LoadingSpinner.tsx
import React from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  text?: string
  overlay?: boolean
}

export default function LoadingSpinner({ 
  size = 'md', 
  className = '', 
  text,
  overlay = false 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const spinner = (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin`}
      ></div>
      {text && (
        <p className="mt-2 text-sm text-gray-600">{text}</p>
      )}
    </div>
  )

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        {spinner}
      </div>
    )
  }

  return spinner
}

// Variant with different colors
export function LoadingSpinnerWithColor({ 
  color = 'blue',
  size = 'md',
  className = ''
}: { 
  color?: 'blue' | 'green' | 'red' | 'purple' 
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string 
}) {
  const colorClasses = {
    blue: 'border-t-blue-600',
    green: 'border-t-green-600',
    red: 'border-t-red-600',
    purple: 'border-t-purple-600'
  }

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} border-4 border-gray-200 ${colorClasses[color]} rounded-full animate-spin`}
      ></div>
    </div>
  )
}

// Skeleton loader for content
export function LoadingSkeleton({ 
  lines = 3,
  className = '' 
}: { 
  lines?: number
  className?: string 
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="h-4 bg-gray-200 rounded animate-pulse"
          style={{
            width: `${index === lines - 1 ? '70%' : '100%'}`
          }}
        ></div>
      ))}
    </div>
  )
}