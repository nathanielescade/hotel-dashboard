// app/staff/page.js
'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { FaBars, FaPlus, FaSearch, FaFilter, FaUser, FaEnvelope, FaPhone, FaIdCard, FaEllipsisV } from 'react-icons/fa'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import ConfirmationDialog from '@/components/ConfirmationDialog'

export default function StaffPage() {
  const { user, logout, loading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('staff')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [staff, setStaff] = useState([])
    const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
    
    if (user && user.role !== 'admin') {
      router.push('/dashboard')
    }
    
    // Mock data for staff
    setStaff([
      { id: 1, name: 'Robert Johnson', email: 'robert@hotel.com', phone: '+1 (555) 111-2222', position: 'Manager', department: 'Management' },
      { id: 2, name: 'Lisa Williams', email: 'lisa@hotel.com', phone: '+1 (555) 333-4444', position: 'Receptionist', department: 'Front Desk' },
      { id: 3, name: 'James Brown', email: 'james@hotel.com', phone: '+1 (555) 555-6666', position: 'Housekeeper', department: 'Housekeeping' },
      { id: 4, name: 'Mary Davis', email: 'mary@hotel.com', phone: '+1 (555) 777-8888', position: 'Chef', department: 'Restaurant' },
      { id: 5, name: 'David Wilson', email: 'david@hotel.com', phone: '+1 (555) 999-0000', position: 'Maintenance', department: 'Facilities' },
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

  if (user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl neon-text text-red-400">Access Denied</div>
      </div>
    )
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
                Staff
              </h1>
              <p className="text-gray-400">Manage hotel staff members</p>
            </div>
            <button className="mt-4 md:mt-0 flex items-center px-4 py-2 rounded-lg neon-button text-white font-semibold">
              <FaPlus className="mr-2" />
              Add Staff
            </button>
          </div>

          <div className="neon-card rounded-xl p-4 md:p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h2 className="text-xl font-bold mb-4 md:mb-0">All Staff</h2>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search staff..."
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
                    <th className="pb-3">Position</th>
                    <th className="pb-3">Department</th>
                    <th className="pb-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {staff.map((member) => (
                    <tr key={member.id} className="border-t border-gray-800 hover:bg-gray-800/30">
                      <td className="py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center mr-3">
                            <FaUser className="text-white" />
                          </div>
                          <div className="font-medium">{member.name}</div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <FaEnvelope className="text-gray-400 mr-2" />
                          <span>{member.email}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <FaPhone className="text-gray-400 mr-2" />
                          <span>{member.phone}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="px-3 py-1 rounded-full text-xs bg-blue-900/30 text-blue-400">
                          {member.position}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className="px-3 py-1 rounded-full text-xs bg-purple-900/30 text-purple-400">
                          {member.department}
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