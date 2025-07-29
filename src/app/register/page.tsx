'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaUser, FaEnvelope, FaLock, FaArrowRight, FaGoogle, FaGithub } from 'react-icons/fa'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import PasswordStrengthBar from 'react-password-strength-bar'
import { ResponseData } from '@/types/response'

// Zod schema for form validation
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Must contain at least one number')
})

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [verificationSent, setVerificationSent] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFormError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  })

  const handleRegister = async (data: RegisterFormData) => {
    setLoading(true)
    try {
      const res = await fetch('/api/v1/auth/register', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const responseData: ResponseData = await res.json()

      if (res.ok && responseData.success) {
        setEmail(data.email)
        setVerificationSent(true)
      } else {
        if (responseData.message === 'Email already exists') {
          setFormError('email', {
            type: 'manual',
            message: 'This email is already registered'
          })
        } else {
          setFormError('root', {
            type: 'manual',
            message: responseData.message || 'Registration failed'
          })
        }
      }
    } catch (error) {
      setFormError('root', {
        type: 'manual',
        message: 'An unexpected error occurred'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSocialLogin = (provider: 'google' | 'github') => {
    window.location.href = `/api/auth/social-login/${provider}`
  }

  if (verificationSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 text-center">
          <div className="mb-6 text-green-500 dark:text-green-400 text-5xl">
            ✓
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Verify Your Email
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We've sent a verification link to <span className="font-medium">{email}</span>.
            Please check your inbox and click the link to activate your account.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-sm text-gray-700 dark:text-gray-300 mb-6">
            Didn't receive the email? Check your spam folder or{' '}
            <button 
              onClick={() => setVerificationSent(false)}
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              try another email
            </button>
          </div>
          <button
            onClick={() => router.push('/login')}
            className="w-full py-2 px-4 bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white font-medium rounded-lg"
          >
            Back to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Create Your Account
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Join thousands of educators using TeacherAssistX
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          {errors.root && (
            <div className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-4">
              {errors.root.message}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => handleSocialLogin('google')}
              className="flex text-gray-700 dark:text-gray-300 items-center justify-center gap-2 py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <FaGoogle className="text-red-500" />
              <span>Google</span>
            </button>
            <button
              onClick={() => handleSocialLogin('github')}
              className="flex text-gray-700 dark:text-gray-300 items-center justify-center gap-2 py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <FaGithub />
              <span>GitHub</span>
            </button>
          </div>

          <div className="flex items-center mb-6">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
            <span className="mx-4 text-gray-500 dark:text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
          </div>

          <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  className={`pl-10 w-full px-4 py-2 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500`}
                  placeholder="John Doe"
                  {...register('name')}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  className={`pl-10 w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500`}
                  placeholder="you@example.com"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  className={`pl-10 w-full px-4 py-2 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500`}
                  placeholder="••••••••"
                  {...register('password')}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <PasswordStrengthBar 
                password={password} 
                className="mt-1"
                scoreWordClassName="text-xs text-gray-500 dark:text-gray-400"
                shortScoreWord="Too short"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white font-medium rounded-lg shadow-sm transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                'Creating account...'
              ) : (
                <>
                  Register <FaArrowRight className="ml-2" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <a
                href="/login"
                className="text-teal-600 dark:text-teal-400 hover:underline font-medium"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          By registering, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  )
}