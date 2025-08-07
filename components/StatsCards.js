'use client'
import { useState } from 'react'
import { FaHotel, FaUsers, FaBed, FaMoneyBillWave } from 'react-icons/fa'

export default function StatsCards() {
  const [stats] = useState({
    occupancy: 78,
    guests: 142,
    rooms: 56,
    revenue: 24580
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div className="neon-card rounded-xl p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-400 mb-1">Occupancy Rate</p>
            <h3 className="text-3xl font-bold">{stats.occupancy}%</h3>
          </div>
          <div className="p-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500">
            <FaHotel className="text-xl text-white" />
          </div>
        </div>
        <div className="mt-4 h-2 w-full bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" 
            style={{ width: `${stats.occupancy}%` }}
          ></div>
        </div>
      </div>

      <div className="neon-card rounded-xl p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-400 mb-1">Total Guests</p>
            <h3 className="text-3xl font-bold">{stats.guests}</h3>
          </div>
          <div className="p-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500">
            <FaUsers className="text-xl text-white" />
          </div>
        </div>
        <div className="mt-4 text-green-400 flex items-center">
          <span>↑ 12% from last month</span>
        </div>
      </div>

      <div className="neon-card rounded-xl p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-400 mb-1">Available Rooms</p>
            <h3 className="text-3xl font-bold">{stats.rooms}</h3>
          </div>
          <div className="p-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-500">
            <FaBed className="text-xl text-white" />
          </div>
        </div>
        <div className="mt-4 text-yellow-400 flex items-center">
          <span>↓ 3 from yesterday</span>
        </div>
      </div>

      <div className="neon-card rounded-xl p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-400 mb-1">Revenue</p>
            <h3 className="text-3xl font-bold">${stats.revenue.toLocaleString()}</h3>
          </div>
          <div className="p-3 rounded-lg bg-gradient-to-r from-yellow-600 to-amber-500">
            <FaMoneyBillWave className="text-xl text-white" />
          </div>
        </div>
        <div className="mt-4 text-green-400 flex items-center">
          <span>↑ 8% from last week</span>
        </div>
      </div>
    </div>
  )
}