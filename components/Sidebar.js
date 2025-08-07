// components/Sidebar.js
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  FaHotel, FaUsers, FaBed, FaChartLine, FaCog, FaSignOutAlt,
  FaCalendarAlt, FaMoneyBillWave, FaConciergeBell, FaKey, FaTimes, FaUserCircle,
} from 'react-icons/fa'

export default function Sidebar({ activeTab, setActiveTab, user, isOpen, toggleSidebar, handleLogout }) {
  const pathname = usePathname()

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FaHotel, href: '/dashboard' },
    { id: 'bookings', label: 'Bookings', icon: FaCalendarAlt, href: '/bookings' },
    { id: 'rooms', label: 'Rooms', icon: FaBed, href: '/rooms' },
    { id: 'guests', label: 'Guests', icon: FaUsers, href: '/guests' },
  ]

  const adminItems = [
    { id: 'revenue', label: 'Revenue', icon: FaMoneyBillWave, href: '/revenue' },
    { id: 'services', label: 'Services', icon: FaConciergeBell, href: '/services' },
    { id: 'staff', label: 'Staff', icon: FaUserCircle, href: '/staff' },
    { id: 'settings', label: 'Settings', icon: FaCog, href: '/settings' },
  ]

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      
      <div className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-gray-900/80 backdrop-blur-sm border-r border-gray-800 flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500">
              <FaHotel className="text-xl text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold neon-text text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Luxe Hotel
              </h1>
              <p className="text-xs text-gray-400">Management System</p>
            </div>
          </div>
          <button 
            className="lg:hidden text-gray-400 hover:text-white"
            onClick={toggleSidebar}
          >
            <FaTimes />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50 text-blue-300 neon-border'
                      : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                  }`}
                  onClick={() => {
                    setActiveTab(item.id)
                    if (window.innerWidth < 1024) toggleSidebar()
                  }}
                >
                  <item.icon className="mr-3" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
            
            {user.role === 'admin' && (
              <>
                <div className="pt-4 pb-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Admin
                </div>
                {adminItems.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                        activeTab === item.id
                          ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50 text-blue-300 neon-border'
                          : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                      }`}
                      onClick={() => {
                        setActiveTab(item.id)
                        if (window.innerWidth < 1024) toggleSidebar()
                      }}
                    >
                      <item.icon className="mr-3" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </>
            )}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div 
            className="flex items-center px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800/50 hover:text-gray-200 cursor-pointer"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="mr-3" />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </>
  )
}