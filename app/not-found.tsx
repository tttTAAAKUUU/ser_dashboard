import Link from 'next/link'
import { Frown, ArrowLeft, CloudOff } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen  flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="relative">
          {/* Animated background shapes */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 bg-blue-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="w-48 h-48 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="w-48 h-48 bg-yellow-700 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>

          {/* Content */}
          <div className="relative">
            <CloudOff className="w-24 h-24 mx-auto text-gray-400 mb-4 animate-bounce" />
            <h1 className="text-7xl font-bold text-gray-100 mb-4">404</h1>
            <p className="text-2xl text-gray-300 mb-8">Oops! Page not found</p>
            <div className="flex items-center justify-center space-x-4 mb-8">
              <Frown className="w-6 h-6 text-yellow-500 animate-pulse" />
              <p className="text-gray-600">We couldn&apos;t find the page you&apos;re looking for</p>
            </div>
            <Link 
              href="/" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 ease-in-out"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go back
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

