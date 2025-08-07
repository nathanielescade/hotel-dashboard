'use client'
import { useState } from 'react'
import { FaCalendarAlt, FaUser, FaBed, FaDollarSign, FaEllipsisV } from 'react-icons/fa'
import { format } from 'date-fns'

export default function RecentBookings() {
  const [bookings] = useState([
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

  return (
    <div className="neon-card rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold neon-text text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Recent Bookings
        </h2>
        <button className="text-sm text-cyan-400 hover:text-cyan-300">
          View All
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-400 text-sm">
              <th className="pb-3">Booking ID</th>
              <th className="pb-3">Guest</th>
              <th className="pb-3">Room</th>
              <th className="pb-3">Dates</th>
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
                  <div className="text-sm">
                    <div className="flex items-center mb-1">
                      <FaCalendarAlt className="text-gray-400 mr-2" />
                      <span>{format(booking.checkIn, 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <FaCalendarAlt className="mr-2" />
                      <span>{format(booking.checkOut, 'MMM dd, yyyy')}</span>
                    </div>
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
  )
}