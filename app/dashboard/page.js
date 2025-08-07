// app/dashboard/page.js
'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { FaBars } from 'react-icons/fa'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import StatsCards from '@/components/StatsCards'
import BookingChart from '@/components/BookingChart'
import RecentBookings from '@/components/RecentBookings'
import RoomStatus from '@/components/RoomStatus'
import ConfirmationDialog from '@/components/ConfirmationDialog'

export default function Dashboard() {
  const { user, logout, loading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleLogoutClick = () => {
    setShowLogoutDialog(true)
  }

  const confirmLogout = () => {
    logout()
    router.push('/login')
    setShowLogoutDialog(false)
  }

  const cancelLogout = () => {
    setShowLogoutDialog(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl neon-text text-blue-400">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        user={user} 
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        handleLogout={handleLogoutClick}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          user={user} 
          logout={handleLogoutClick} 
          toggleSidebar={toggleSidebar} 
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gradient-to-b from-gray-900/80 to-indigo-950/80">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold neon-text text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Dashboard
            </h1>
            <p className="text-gray-400">Welcome back, {user.name}!</p>
          </div>

          <StatsCards />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <BookingChart />
            <RoomStatus />
          </div>
          
          <RecentBookings />
        </main>
      </div>

      <ConfirmationDialog
        isOpen={showLogoutDialog}
        title="Confirm Logout"
        message="Are you sure you want to logout?"
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </div>
  )
}