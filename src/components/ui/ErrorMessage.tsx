// components/ui/ErrorMessage.tsx
import React from 'react'
import { AlertCircle, RefreshCw, Home } from 'lucide-react'

interface ErrorMessageProps {
  title?: string
  message: string
  onRetry?: () => void
  onHome?: () => void
  severity?: 'error' | 'warning' | 'info'
  className?: string
  showIcon?: boolean
  actions?: React.ReactNode
}

export default function ErrorMessage({ 
  title = 'Error',
  message, 
  onRetry, 
  onHome,
  severity = 'error',
  className = '',
  showIcon = true,
  actions
}: ErrorMessageProps) {
  const severityStyles = {
    error: {
      container: 'bg-red-50 border-red-200',
      icon: 'text-red-500',
      title: 'text-red-800',
      message: 'text-red-700',
      button: 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200',
      icon: 'text-yellow-500',
      title: 'text-yellow-800',
      message: 'text-yellow-700',
      button: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'
    },
    info: {
      container: 'bg-blue-50 border-blue-200',
      icon: 'text-blue-500',
      title: 'text-blue-800',
      message: 'text-blue-700',
      button: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
    }
  }

  const styles = severityStyles[severity]

  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <div className={`max-w-md w-full rounded-lg border p-6 ${styles.container}`}>
        <div className="flex flex-col items-center text-center">
          {showIcon && (
            <div className={`mb-4 ${styles.icon}`}>
              <AlertCircle size={48} />
            </div>
          )}
          
          <h2 className={`text-lg font-semibold mb-2 ${styles.title}`}>
            {title}
          </h2>
          
          <p className={`text-sm mb-6 ${styles.message}`}>
            {message}
          </p>

          {/* Custom actions or default buttons */}
          {actions ? (
            actions
          ) : (
            <div className="flex gap-3">
              {onRetry && (
                <button
                  onClick={onRetry}
                  className={`flex items-center gap-2 px-4 py-2 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${styles.button}`}
                >
                  <RefreshCw size={16} />
                  Try Again
                </button>
              )}
              
              {onHome && (
                <button
                  onClick={onHome}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Home size={16} />
                  Go Home
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Full page error component
export function FullPageError({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  onRetry,
  onHome
}: {
  title?: string
  message?: string
  onRetry?: () => void
  onHome?: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <ErrorMessage
        title={title}
        message={message}
        onRetry={onRetry}
        onHome={onHome}
        className="max-w-lg"
      />
    </div>
  )
}

// Inline error component for forms
export function InlineError({ 
  message, 
  className = '' 
}: { 
  message: string 
  className?: string 
}) {
  return (
    <div className={`flex items-center gap-2 text-red-600 text-sm mt-1 ${className}`}>
      <AlertCircle size={16} />
      <span>{message}</span>
    </div>
  )
}

// Empty state component
export function EmptyState({
  title = 'No data found',
  message = 'There is no data to display at the moment.',
  icon = '📭',
  action
}: {
  title?: string
  message?: string
  icon?: string
  action?: React.ReactNode
}) {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">{message}</p>
      {action}
    </div>
  )
}