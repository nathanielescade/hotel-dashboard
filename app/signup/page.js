// app/signup/page.js
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { FaUserShield, FaLock, FaHotel, FaUserPlus } from 'react-icons/fa'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const [error, setError] = useState('')
  const { signup } = useAuth()
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    
    // Basic validation
    if (!name || !email || !password) {
      setError('Please fill in all fields')
      return
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('hotelUsers') || '[]')
    if (users.some(user => user.email === email)) {
      setError('User with this email already exists')
      return
    }

    // Create new user
    signup({ name, email, role })
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md neon-card rounded-2xl p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-500">
              <FaUserPlus className="text-3xl text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold neon-text text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Create Account
          </h1>
          <p className="text-gray-400 mt-2">Join our hotel management system</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-lg text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUserShield className="text-gray-400" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-3 py-3 rounded-lg neon-input focus:outline-none"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

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
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div className="mb-4">
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

          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Role</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={role === 'user'}
                  onChange={() => setRole('user')}
                  className="mr-2"
                />
                <span>User</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === 'admin'}
                  onChange={() => setRole('admin')}
                  className="mr-2"
                />
                <span>Admin</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg neon-button text-white font-semibold"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          <p>Already have an account? <a href="/login" className="text-cyan-400 hover:text-cyan-300">Sign In</a></p>
        </div>
      </div>
    </div>
  )
}