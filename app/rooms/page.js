// app/rooms/page.js
'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { FaBars, FaPlus, FaSearch, FaFilter, FaBed, FaUsers, FaDollarSign, FaEllipsisV } from 'react-icons/fa'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import ConfirmationDialog from '@/components/ConfirmationDialog'

export default function RoomsPage() {
  const { user, logout, loading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('rooms')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [rooms, setRooms] = useState([])
    const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
    
    // Mock data for rooms
    setRooms([
      { id: 101, type: 'Deluxe', status: 'occupied', guest: 'John Smith', price: 150 },
      { id: 102, type: 'Standard', status: 'available', guest: null, price: 100 },
      { id: 103, type: 'Deluxe', status: 'cleaning', guest: null, price: 150 },
      { id: 201, type: 'Suite', status: 'occupied', guest: 'Sarah Johnson', price: 250 },
      { id: 202, type: 'Standard', status: 'available', guest: null, price: 100 },
      { id: 203, type: 'Deluxe', status: 'maintenance', guest: null, price: 150 },
      { id: 301, type: 'Suite', status: 'occupied', guest: 'Michael Brown', price: 250 },
      { id: 302, type: 'Standard', status: 'available', guest: null, price: 100 },
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
      case 'occupied':
        return 'text-red-400 bg-red-900/30'
      case 'available':
        return 'text-green-400 bg-green-900/30'
      case 'cleaning':
        return 'text-yellow-400 bg-yellow-900/30'
      case 'maintenance':
        return 'text-purple-400 bg-purple-900/30'
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
                Rooms
              </h1>
              <p className="text-gray-400">Manage all hotel rooms</p>
            </div>
            <button className="mt-4 md:mt-0 flex items-center px-4 py-2 rounded-lg neon-button text-white font-semibold">
              <FaPlus className="mr-2" />
              Add Room
            </button>
          </div>

          <div className="neon-card rounded-xl p-4 md:p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h2 className="text-xl font-bold mb-4 md:mb-0">All Rooms</h2>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search rooms..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg neon-input focus:outline-none"
                  />
                </div>
                <button className="flex items-center justify-center px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300">
                  <FaFilter className="mr-2" />
                  Filter
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rooms.map((room) => (
                <div key={room.id} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-cyan-500/30 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <FaBed className="text-cyan-400 mr-2" />
                      <span className="font-bold">Room {room.id}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs capitalize ${getStatusColor(room.status)}`}>
                      {room.status}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-400 mb-1">{room.type}</div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center">
                      <FaDollarSign className="text-green-400" />
                      <span>{room.price}/night</span>
                    </div>
                    {room.guest && (
                      <div className="text-sm text-gray-300 truncate">{room.guest}</div>
                    )}
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <button className="p-2 rounded-full hover:bg-gray-700/50">
                      <FaEllipsisV className="text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}
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