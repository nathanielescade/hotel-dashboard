// lib/auth.js
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on page load
    const savedUser = localStorage.getItem('hotelUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('hotelUser', JSON.stringify(userData))
  }

  const signup = (userData) => {
    // In a real app, you would send this data to a server
    // For now, we'll just store it in localStorage
    const users = JSON.parse(localStorage.getItem('hotelUsers') || '[]')
    users.push(userData)
    localStorage.setItem('hotelUsers', JSON.stringify(users))
    login(userData)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('hotelUser')
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}