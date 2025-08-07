// app/bookings/page.js
'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { FaBars, FaPlus, FaSearch, FaFilter, FaCalendarAlt, FaUser, FaBed, FaDollarSign, FaEllipsisV } from 'react-icons/fa'
import { format } from 'date-fns'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import ConfirmationDialog from '@/components/ConfirmationDialog'

export default function BookingsPage() {
  const { user, logout, loading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('bookings')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [bookings, setBookings] = useState([])
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)


  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }

    
    // Mock data for bookings
    setBookings([
      { 
        id: 'BK001', 
        guest: 'John Smith', 
        room: '101', 
        checkIn: new Date(2023, 5, 15), 
        checkOut: new Date(2023, 5, 18), 
        status: 'confirmed',
        amount: 450
      },
      { 
        id: 'BK002', 
        guest: 'Sarah Johnson', 
        room: '201', 
        checkIn: new Date(2023, 5, 16), 
        checkOut: new Date(2023, 5, 20), 
        status: 'checked-in',
        amount: 850
      },
      { 
        id: 'BK003', 
        guest: 'Michael Brown', 
        room: '301', 
        checkIn: new Date(2023, 5, 17), 
        checkOut: new Date(2023, 5, 19), 
        status: 'pending',
        amount: 620
      },
      { 
        id: 'BK004', 
        guest: 'Emily Davis', 
        room: '102', 
        checkIn: new Date(2023, 5, 18), 
        checkOut: new Date(2023, 5, 22), 
        status: 'confirmed',
        amount: 780
      },
      { 
        id: 'BK005', 
        guest: 'David Wilson', 
        room: '203', 
        checkIn: new Date(2023, 5, 19), 
        checkOut: new Date(2023, 5, 21), 
        status: 'cancelled',
        amount: 520
      },
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


  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-400 bg-green-900/30'
      case 'checked-in':
        return 'text-blue-400 bg-blue-900/30'
      case 'pending':
        return 'text-yellow-400 bg-yellow-900/30'
      case 'cancelled':
        return 'text-red-400 bg-red-900/30'
      default:
        return 'text-gray-400 bg-gray-900/30'
    }
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
                Bookings
              </h1>
              <p className="text-gray-400">Manage all hotel reservations</p>
            </div>
            <button className="mt-4 md:mt-0 flex items-center px-4 py-2 rounded-lg neon-button text-white font-semibold">
              <FaPlus className="mr-2" />
              New Booking
            </button>
          </div>

          <div className="neon-card rounded-xl p-4 md:p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h2 className="text-xl font-bold mb-4 md:mb-0">All Bookings</h2>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search bookings..."
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
                    <th className="pb-3">Booking ID</th>
                    <th className="pb-3">Guest</th>
                    <th className="pb-3">Room</th>
                    <th className="pb-3">Check-in</th>
                    <th className="pb-3">Check-out</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Amount</th>
                    <th className="pb-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="border-t border-gray-800 hover:bg-gray-800/30">
                      <td className="py-4">
                        <div className="font-medium">{booking.id}</div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center mr-3">
                            <FaUser className="text-xs text-white" />
                          </div>
                          <div>{booking.guest}</div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <FaBed className="text-cyan-400 mr-2" />
                          <span>{booking.room}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <FaCalendarAlt className="text-gray-400 mr-2" />
                          <span>{format(booking.checkIn, 'MMM dd, yyyy')}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <FaCalendarAlt className="text-gray-400 mr-2" />
                          <span>{format(booking.checkOut, 'MMM dd, yyyy')}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-xs capitalize ${getStatusColor(booking.status)}`}>
                          {booking.status.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex items-center justify-end">
                          <FaDollarSign className="text-green-400" />
                          <span>{booking.amount}</span>
                        </div>
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