import Link from 'next/link'
import { cookies } from 'next/headers'
import { FaChalkboardTeacher, FaClipboardList, FaUserGraduate, FaRegLightbulb, FaChartLine } from 'react-icons/fa'
import Image from 'next/image'

export default async function LandingPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-200 font-sans selection:bg-teal-500 selection:text-white">
      
      {/* Navigation */}
      <nav className="flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto px-6 sm:px-8 py-6">
        <div className="flex items-center mb-4 sm:mb-0">
          <span className="text-3xl font-extrabold tracking-tight text-teal-600 dark:text-teal-400 mr-2">
            TeacherAssistX
          </span>
          <span className="bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 text-xs px-2 py-1 rounded-full font-medium">
            PRO
          </span>
        </div>
        
        <div className="sm:flex flex-col hidden sm:flex-row gap-3 w-full sm:w-auto">
          {!token ? (
            <>
              <Link
                href="/auth/login"
                className="px-5 py-2 rounded-md bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white font-medium shadow-sm transition-colors text-center"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="px-5 py-2 rounded-md border border-teal-600 dark:border-teal-400 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-gray-800 font-medium transition-colors text-center"
              >
                Get Started
              </Link>
            </>
          ) : (
            <Link
              href="/dashboard"
              className="px-5 py-2 rounded-md bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white font-medium shadow-sm transition-colors text-center"
            >
              Go to Dashboard
            </Link>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 sm:py-24 text-center">
        <div className="mb-8 inline-flex items-center gap-2 bg-teal-100/50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-full px-4 py-1 text-sm text-teal-700 dark:text-teal-300">
          <FaRegLightbulb className="text-teal-500" />
          <span>Trusted by 5,000+ educators</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">
          Transform Your <span className="text-teal-600 dark:text-teal-400">Teaching</span> Workflow
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          The all-in-one platform for attendance tracking, classroom management, and student progress monitoring.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          {!token ? (
            <>
              <Link
                href="/auth/register"
                className="px-8 py-3 rounded-lg bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white font-medium shadow-md transition-colors text-center"
              >
                Let's Get Started
              </Link>
              <Link
                href="/features"
                className="px-8 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-colors text-center"
              >
                Explore Features
              </Link>
            </>
          ) : (
            <Link
              href="/dashboard"
              className="px-8 py-3 rounded-lg bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white font-medium shadow-md transition-colors text-center"
            >
              Continue to Dashboard
            </Link>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-1 max-w-4xl mx-auto border border-gray-200 dark:border-gray-700">
          <div className="rounded-lg overflow-hidden">
            {/* Replace with your actual dashboard screenshot */}
            <div className="bg-gray-100 dark:bg-gray-700 h-64 sm:h-96 flex items-center justify-center text-gray-500 dark:text-gray-400">
              Dashboard Preview
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-white dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Powerful Features for Educators</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to streamline your teaching process and focus on what matters most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FaChalkboardTeacher className="text-teal-500" size={24} />}
              title="Smart Attendance"
              description="Automated attendance tracking with OCR technology and CSV exports."
              color="teal"
            />
            <FeatureCard
              icon={<FaClipboardList className="text-blue-500" size={24} />}
              title="Class Management"
              description="Organize multiple classes, subjects, and student groups with ease."
              color="blue"
            />
            <FeatureCard
              icon={<FaUserGraduate className="text-indigo-500" size={24} />}
              title="Student Profiles"
              description="Comprehensive student records with attendance and performance history."
              color="indigo"
            />
            <FeatureCard
              icon={<FaChartLine className="text-amber-500" size={24} />}
              title="Analytics Dashboard"
              description="Visual insights into class performance and attendance trends."
              color="amber"
            />
            <FeatureCard
              icon={<FaRegLightbulb className="text-purple-500" size={24} />}
              title="AI Suggestions"
              description="Get personalized recommendations for struggling students."
              color="purple"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection />

      {/* Pricing Section */}
      {/* <PricingSection /> */}

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900 py-12 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <span className="text-xl font-bold text-teal-600 dark:text-teal-400">TeacherAssistX</span>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Empowering educators since 2023
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <FooterLinks title="Product" links={['Features', 'Pricing', 'Integrations']} />
              <FooterLinks title="Resources" links={['Documentation', 'Blog', 'Webinars']} />
              <FooterLinks title="Company" links={['About', 'Careers', 'Contact']} />
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} TeacherAssistX. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

// Feature Card Component
function FeatureCard({ icon, title, description, color }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string,
  color: string
}) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-lg bg-${color}-100 dark:bg-${color}-900/30 flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  )
}

// Testimonial Section Component
function TestimonialSection() {
  return (
    <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Trusted by Educators Worldwide</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join thousands of teachers who have transformed their workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TestimonialCard
            quote="This platform saved me 10+ hours per week on administrative tasks."
            name="Dr. Sarah Johnson"
            role="University Professor"
            avatar="/placeholder-avatar.jpg"
          />
          <TestimonialCard
            quote="The analytics helped me identify struggling students much earlier."
            name="Mr. David Chen"
            role="High School Teacher"
            avatar="/placeholder-avatar.jpg"
          />
          <TestimonialCard
            quote="Simple interface but powerful features - perfect for busy teachers."
            name="Ms. Priya Patel"
            role="Elementary School Teacher"
            avatar="/placeholder-avatar.jpg"
          />
        </div>
      </div>
    </section>
  )
}

// Testimonial Card Component
function TestimonialCard({ quote, name, role, avatar }: { 
  quote: string, 
  name: string, 
  role: string,
  avatar: string
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden mr-4">
          {/* Replace with actual avatar image */}
          {!avatar ? (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          ) : (
            <Image src={avatar} width={50} height={50} alt={name} className="w-full h-full object-cover" />
          )}
        </div>
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{role}</p>
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-300 italic">&quot;{quote}&quot;</p>
    </div>
  )
}

// Pricing Section Component
function PricingSection() {
  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose the plan that fits your needs. Cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <PricingCard
            name="Basic"
            price="$9"
            period="month"
            description="For individual teachers"
            features={['1 Classroom', '50 Students', 'Basic Analytics']}
            featured={false}
          />
          <PricingCard
            name="Pro"
            price="$29"
            period="month"
            description="For departments and schools"
            features={['10 Classrooms', 'Unlimited Students', 'Advanced Analytics', 'Priority Support']}
            featured={true}
          />
          <PricingCard
            name="Enterprise"
            price="Custom"
            period=""
            description="For large institutions"
            features={['Unlimited Classrooms', 'Dedicated Support', 'Custom Integrations', 'API Access']}
            featured={false}
          />
        </div>
      </div>
    </section>
  )
}

// Pricing Card Component
function PricingCard({ name, price, period, description, features, featured }: { 
  name: string, 
  price: string, 
  period: string,
  description: string,
  features: string[],
  featured: boolean
}) {
  return (
    <div className={`rounded-xl border ${featured ? 'border-teal-500 dark:border-teal-400 shadow-lg' : 'border-gray-200 dark:border-gray-700 shadow-sm'} p-6 relative`}>
      {featured && (
        <div className="absolute top-0 right-0 bg-teal-500 dark:bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
          POPULAR
        </div>
      )}
      <h3 className="text-2xl font-bold mb-1">{name}</h3>
      <div className="flex items-end mb-4">
        <span className="text-4xl font-bold">{price}</span>
        {period && <span className="text-gray-600 dark:text-gray-400 ml-1">/{period}</span>}
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-6">{description}</p>
      
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <svg className="w-5 h-5 text-teal-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <button className={`w-full py-2 rounded-lg ${featured ? 'bg-teal-600 hover:bg-teal-700 text-white' : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'} font-medium transition-colors`}>
        Get Started
      </button>
    </div>
  )
}

// Footer Links Component
function FooterLinks({ title, links }: { title: string, links: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3 uppercase tracking-wider">{title}</h4>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}