// app/guests/page.js
'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { FaBars, FaPlus, FaSearch, FaFilter, FaUser, FaEnvelope, FaPhone, FaIdCard, FaEllipsisV } from 'react-icons/fa'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import ConfirmationDialog from '@/components/ConfirmationDialog'

export default function GuestsPage() {
  const { user, logout, loading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('guests')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [guests, setGuests] = useState([])
    const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
    
    // Mock data for guests
    setGuests([
      { id: 1, name: 'John Smith', email: 'john@example.com', phone: '+1 (555) 123-4567', idNumber: 'AB123456', bookings: 3 },
      { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+1 (555) 987-6543', idNumber: 'CD789012', bookings: 5 },
      { id: 3, name: 'Michael Brown', email: 'michael@example.com', phone: '+1 (555) 456-7890', idNumber: 'EF345678', bookings: 2 },
      { id: 4, name: 'Emily Davis', email: 'emily@example.com', phone: '+1 (555) 234-5678', idNumber: 'GH901234', bookings: 4 },
      { id: 5, name: 'David Wilson', email: 'david@example.com', phone: '+1 (555) 876-5432', idNumber: 'IJ567890', bookings: 1 },
    ])
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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold neon-text text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Guests
              </h1>
              <p className="text-gray-400">Manage all hotel guests</p>
            </div>
            <button className="mt-4 md:mt-0 flex items-center px-4 py-2 rounded-lg neon-button text-white font-semibold">
              <FaPlus className="mr-2" />
              Add Guest
            </button>
          </div>

          <div className="neon-card rounded-xl p-4 md:p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h2 className="text-xl font-bold mb-4 md:mb-0">All Guests</h2>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search guests..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg neon-input focus:outline-none"
                  />
                </div>
                <button className="flex items-center justify-center px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300">
                  <FaFilter className="mr-2" />
                  Filter
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 text-sm">
                    <th className="pb-3">Name</th>
                    <th className="pb-3">Email</th>
                    <th className="pb-3">Phone</th>
                    <th className="pb-3">ID Number</th>
                    <th className="pb-3">Bookings</th>
                    <th className="pb-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {guests.map((guest) => (
                    <tr key={guest.id} className="border-t border-gray-800 hover:bg-gray-800/30">
                      <td className="py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center mr-3">
                            <FaUser className="text-white" />
                          </div>
                          <div className="font-medium">{guest.name}</div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <FaEnvelope className="text-gray-400 mr-2" />
                          <span>{guest.email}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <FaPhone className="text-gray-400 mr-2" />
                          <span>{guest.phone}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <FaIdCard className="text-gray-400 mr-2" />
                          <span>{guest.idNumber}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="px-3 py-1 rounded-full text-xs bg-blue-900/30 text-blue-400">
                          {guest.bookings} bookings
                        </span>
                      </td>
                      <td className="py-4">
                        <button className="p-2 rounded-full hover:bg-gray-700/50">
                          <FaEllipsisV className="text-gray-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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