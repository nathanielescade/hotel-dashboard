'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { FaUserShield, FaLock, FaHotel } from 'react-icons/fa'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    
    // Fake authentication logic
    if (email === 'admin@hotel.com' && password === 'admin123') {
      login({ email, role: 'admin', name: 'Admin User' })
      router.push('/dashboard')
    } else if (email === 'user@hotel.com' && password === 'user123') {
      login({ email, role: 'user', name: 'Hotel Staff' })
      router.push('/dashboard')
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md neon-card rounded-2xl p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-500">
              <FaHotel className="text-3xl text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold neon-text text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Hotel Management
          </h1>
          <p className="text-gray-400 mt-2">Sign in to your dashboard</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-lg text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUserShield className="text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-3 rounded-lg neon-input focus:outline-none"
                placeholder="admin@hotel.com"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-3 rounded-lg neon-input focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg neon-button text-white font-semibold"
          >
            Sign In
          </button>
        </form>


        <div className="mt-6 text-center text-sm text-gray-400">
            <p>Don`t have an account? <a href="/signup" className="text-cyan-400 hover:text-cyan-300">Sign Up</a></p>
        </div>
      </div>
    </div>
  )
}