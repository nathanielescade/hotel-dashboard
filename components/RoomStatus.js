'use client'
import { useState } from 'react'
import { FaBed, FaUser, FaCheck, FaTimes, FaClock } from 'react-icons/fa'

export default function RoomStatus() {
  const [rooms] = useState([
    { id: 101, status: 'occupied', guest: 'John Smith', type: 'Deluxe' },
    { id: 102, status: 'available', guest: null, type: 'Standard' },
    { id: 103, status: 'cleaning', guest: null, type: 'Deluxe' },
    { id: 201, status: 'occupied', guest: 'Sarah Johnson', type: 'Suite' },
    { id: 202, status: 'available', guest: null, type: 'Standard' },
    { id: 203, status: 'maintenance', guest: null, type: 'Deluxe' },
    { id: 301, status: 'occupied', guest: 'Michael Brown', type: 'Suite' },
    { id: 302, status: 'available', guest: null, type: 'Standard' },
  ])

  const getStatusColor = (status) => {
    switch (status) {
      case 'occupied':
        return 'bg-gradient-to-r from-red-500 to-red-600'
      case 'available':
        return 'bg-gradient-to-r from-green-500 to-emerald-600'
      case 'cleaning':
        return 'bg-gradient-to-r from-yellow-500 to-amber-600'
      case 'maintenance':
        return 'bg-gradient-to-r from-purple-500 to-indigo-600'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'occupied':
        return <FaUser className="text-white" />
      case 'available':
        return <FaCheck className="text-white" />
      case 'cleaning':
        return <FaClock className="text-white" />
      case 'maintenance':
        return <FaTimes className="text-white" />
      default:
        return null
    }
  }

  return (
    <div className="neon-card rounded-xl p-6 h-80 overflow-hidden flex flex-col">
      <h2 className="text-xl font-bold mb-4 neon-text text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        Room Status
      </h2>
      
      <div className="flex-1 overflow-y-auto scrollbar-thin pr-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rooms.map((room) => (
            <div 
              key={room.id} 
              className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-cyan-500/30 transition-all"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <FaBed className="text-cyan-400 mr-2" />
                  <span className="font-bold">Room {room.id}</span>
                </div>
                <div className={`p-2 rounded-full ${getStatusColor(room.status)}`}>
                  {getStatusIcon(room.status)}
                </div>
              </div>
              
              <div className="text-sm text-gray-400 mb-1">{room.type}</div>
              
              {room.guest && (
                <div className="text-sm text-gray-300 truncate">{room.guest}</div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-800 flex justify-between text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 mr-2"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-red-600 mr-2"></div>
          <span>Occupied</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 mr-2"></div>
          <span>Cleaning</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 mr-2"></div>
          <span>Maintenance</span>
        </div>
      </div>
    </div>
  )
}