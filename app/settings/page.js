// app/settings/page.js
'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { FaBars, FaSave, FaHotel, FaPalette, FaBell, FaLock, FaDatabase } from 'react-icons/fa'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import ConfirmationDialog from '@/components/ConfirmationDialog'

export default function SettingsPage() {
  const { user, logout, loading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('settings')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('general')
    const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [settings, setSettings] = useState({
    hotelName: 'Luxe Hotel',
    theme: 'neon',
    notifications: true,
    currency: 'USD',
    timezone: 'UTC-5'
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
    
    if (user && user.role !== 'admin') {
      router.push('/dashboard')
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
    const handleLogout = () => {
    setShowLogoutDialog(true)
  }


  const handleSaveSettings = () => {
    // In a real app, you would save these settings to a database
    alert('Settings saved successfully!')
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
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
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold neon-text text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Settings
            </h1>
            <p className="text-gray-400">Configure hotel management system</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-1/4">
              <div className="neon-card rounded-xl p-4">
                <h2 className="text-lg font-bold mb-4">Settings Sections</h2>
                <ul className="space-y-2">
                  <li>
                    <button
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                        activeSection === 'general'
                          ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50 text-blue-300 neon-border'
                          : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                      }`}
                      onClick={() => setActiveSection('general')}
                    >
                      <div className="flex items-center">
                        <FaHotel className="mr-3" />
                        <span>General</span>
                      </div>
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                        activeSection === 'appearance'
                          ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50 text-blue-300 neon-border'
                          : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                      }`}
                      onClick={() => setActiveSection('appearance')}
                    >
                      <div className="flex items-center">
                        <FaPalette className="mr-3" />
                        <span>Appearance</span>
                      </div>
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                        activeSection === 'notifications'
                          ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50 text-blue-300 neon-border'
                          : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                      }`}
                      onClick={() => setActiveSection('notifications')}
                    >
                      <div className="flex items-center">
                        <FaBell className="mr-3" />
                        <span>Notifications</span>
                      </div>
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                        activeSection === 'security'
                          ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50 text-blue-300 neon-border'
                          : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                      }`}
                      onClick={() => setActiveSection('security')}
                    >
                      <div className="flex items-center">
                        <FaLock className="mr-3" />
                        <span>Security</span>
                      </div>
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                        activeSection === 'data'
                          ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50 text-blue-300 neon-border'
                          : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                      }`}
                      onClick={() => setActiveSection('data')}
                    >
                      <div className="flex items-center">
                        <FaDatabase className="mr-3" />
                        <span>Data Management</span>
                      </div>
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full lg:w-3/4">
              <div className="neon-card rounded-xl p-4 md:p-6">
                {activeSection === 'general' && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">General Settings</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-300 mb-2">Hotel Name</label>
                        <input
                          type="text"
                          name="hotelName"
                          value={settings.hotelName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg neon-input focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">Currency</label>
                        <select
                          name="currency"
                          value={settings.currency}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg neon-input focus:outline-none"
                        >
                          <option value="USD">US Dollar (USD)</option>
                          <option value="EUR">Euro (EUR)</option>
                          <option value="GBP">British Pound (GBP)</option>
                          <option value="JPY">Japanese Yen (JPY)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">Timezone</label>
                        <select
                          name="timezone"
                          value={settings.timezone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg neon-input focus:outline-none"
                        >
                          <option value="UTC-5">Eastern Time (UTC-5)</option>
                          <option value="UTC-6">Central Time (UTC-6)</option>
                          <option value="UTC-7">Mountain Time (UTC-7)</option>
                          <option value="UTC-8">Pacific Time (UTC-8)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'appearance' && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Appearance Settings</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-300 mb-2">Theme</label>
                        <select
                          name="theme"
                          value={settings.theme}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg neon-input focus:outline-none"
                        >
                          <option value="neon">Neon</option>
                          <option value="dark">Dark</option>
                          <option value="light">Light</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'notifications' && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Notification Settings</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Email Notifications</div>
                          <div className="text-sm text-gray-400">Receive notifications via email</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="notifications"
                            checked={settings.notifications}
                            onChange={handleInputChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-purple-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'security' && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Security Settings</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-300 mb-2">Change Password</label>
                        <input
                          type="password"
                          placeholder="Current Password"
                          className="w-full px-4 py-2 rounded-lg neon-input focus:outline-none mb-2"
                        />
                        <input
                          type="password"
                          placeholder="New Password"
                          className="w-full px-4 py-2 rounded-lg neon-input focus:outline-none mb-2"
                        />
                        <input
                          type="password"
                          placeholder="Confirm New Password"
                          className="w-full px-4 py-2 rounded-lg neon-input focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'data' && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Data Management</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Backup Data</h3>
                        <button className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300">
                          Export All Data
                        </button>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Clear Data</h3>
                        <button className="px-4 py-2 rounded-lg bg-red-900/30 hover:bg-red-800/30 text-red-400">
                          Clear All Data
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={handleSaveSettings}
                    className="flex items-center px-4 py-2 rounded-lg neon-button text-white font-semibold"
                  >
                    <FaSave className="mr-2" />
                    Save Changes
                  </button>
                </div>
              </div>
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