'use client'
import { useRouter } from 'next/navigation'
import { FaUser, FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import PasswordStrengthBar from 'react-password-strength-bar'
import ApiLoader from '@/components/ApiLoader'
import { useApi } from '@/hooks/useApi'
import { teacherService } from '@/services'
import toast from 'react-hot-toast'

// Zod schema for form validation
const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  phone: z.string().length(10, "Phone number must be 10 digits"),
  department: z.string().min(1, "Department is required"),
  teacherId: z.string().min(1, "Teacher ID is required"),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Must contain at least one number')
})

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const { error, execute, loading, success, message, status } = useApi(teacherService.register)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError: setFormError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  })

  const handleRegister = async (data: RegisterFormData) => {
    try {
      const response = await execute(data);

      if (response.success) {
        toast.success(response.message || "Registered successfully");
        router.push('/auth/login');
      } else {
        toast.error(response.message || "Registration failed");
      }

    } catch (error) {
      toast.error("Something went wrong");
      setFormError("root", {
        type: "manual",
        message: "An unexpected error occurred",
      });
    }
  };


  return (
    <ApiLoader loading={loading}>
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
                <label htmlFor="teacherId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Teacher Id
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    id="teacherId"
                    type="number"
                    className={`pl-10 w-full px-4 py-2 rounded-lg border ${errors.teacherId ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500`}
                    placeholder="e.g. 123456"
                    {...register('teacherId')}
                  />
                </div>
                {errors.teacherId && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.teacherId.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    id="phone"
                    type="phone"
                    className={`pl-10 w-full px-4 py-2 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500`}
                    placeholder="+91 89xxxx90"
                    {...register('phone')}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone.message}</p>
                )}
              </div>


              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Department
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    id="department"
                    type="department"
                    className={`pl-10 w-full px-4 py-2 rounded-lg border ${errors.department ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500`}
                    placeholder="e.g. Computer Science"
                    {...register('department')}
                  />
                </div>
                {errors.department && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.department.message}</p>
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
                  />
                </div>
                <PasswordStrengthBar
                  password={watch('password') || ''}
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
                  href="/auth/login"
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
    </ApiLoader>
  )
}