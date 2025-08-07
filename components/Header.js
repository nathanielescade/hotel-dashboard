// components/Header.js
'use client'
import { FaSearch, FaBell, FaUserCircle, FaBars } from 'react-icons/fa'

export default function Header({ user, logout, toggleSidebar }) {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <button 
          className="lg:hidden mr-4 text-gray-400 hover:text-white"
          onClick={toggleSidebar}
        >
          <FaBars className="text-xl" />
        </button>
        <div className="relative w-80 hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-lg neon-input focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <button className="relative p-2 text-gray-400 hover:text-gray-200">
          <FaBell className="text-xl" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full pulse"></span>
        </button>

        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="font-medium">{user.name}</div>
            <div className="text-xs text-gray-400 capitalize">{user.role}</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center">
            <FaUserCircle className="text-xl text-white" />
          </div>
        </div>
      </div>
    </header>
  )
}