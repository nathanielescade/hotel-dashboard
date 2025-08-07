// app/revenue/page.js
'use client'
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { FaBars, FaMoneyBillWave, FaChartLine, FaCalendarAlt, FaDownload } from 'react-icons/fa'
import { Chart } from 'chart.js/auto'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import ConfirmationDialog from '@/components/ConfirmationDialog'

export default function RevenuePage() {
  const { user, logout, loading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('revenue')
  const [sidebarOpen, setSidebarOpen] = useState(false)
    const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
    
    if (user && user.role !== 'admin') {
      router.push('/dashboard')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d')
      
      // Destroy previous chart instance if exists
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
      
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Revenue',
              data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 35000, 32000, 40000, 38000, 45000],
              backgroundColor: 'rgba(0, 243, 255, 0.6)',
              borderColor: '#00f3ff',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: '#e0e0e0',
                font: {
                  size: 12
                }
              }
            },
            tooltip: {
              backgroundColor: 'rgba(15, 15, 35, 0.8)',
              titleColor: '#00f3ff',
              bodyColor: '#e0e0e0',
              borderColor: '#00f3ff',
              borderWidth: 1,
              padding: 10,
              displayColors: false,
              callbacks: {
                label: function(context) {
                  return `Revenue: $${context.raw.toLocaleString()}`
                }
              }
            }
          },
          scales: {
            x: {
              grid: {
                color: 'rgba(255, 255, 255, 0.05)'
              },
              ticks: {
                color: '#a0a0a0'
              }
            },
            y: {
              grid: {
                color: 'rgba(255, 255, 255, 0.05)'
              },
              ticks: {
                color: '#a0a0a0',
                callback: function(value) {
                  return '$' + value.toLocaleString()
                }
              },
              beginAtZero: true
            }
          }
        }
      })
    }
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

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
                Revenue
              </h1>
              <p className="text-gray-400">Track hotel income and financial performance</p>
            </div>
            <button className="mt-4 md:mt-0 flex items-center px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300">
              <FaDownload className="mr-2" />
              Export Report
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="neon-card rounded-xl p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 mb-1">Total Revenue</p>
                  <h3 className="text-3xl font-bold">$324,580</h3>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-500">
                  <FaMoneyBillWave className="text-xl text-white" />
                </div>
              </div>
              <div className="mt-4 text-green-400 flex items-center">
                <span>↑ 12% from last year</span>
              </div>
            </div>

            <div className="neon-card rounded-xl p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 mb-1">Monthly Revenue</p>
                  <h3 className="text-3xl font-bold">$45,000</h3>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500">
                  <FaChartLine className="text-xl text-white" />
                </div>
              </div>
              <div className="mt-4 text-green-400 flex items-center">
                <span>↑ 8% from last month</span>
              </div>
            </div>

            <div className="neon-card rounded-xl p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 mb-1">Average Daily Rate</p>
                  <h3 className="text-3xl font-bold">$185</h3>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500">
                  <FaCalendarAlt className="text-xl text-white" />
                </div>
              </div>
              <div className="mt-4 text-yellow-400 flex items-center">
                <span>↓ 2% from last month</span>
              </div>
            </div>
          </div>

          <div className="neon-card rounded-xl p-4 md:p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 neon-text text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Annual Revenue
            </h2>
            <div className="h-80">
              <canvas ref={chartRef}></canvas>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="neon-card rounded-xl p-4 md:p-6">
              <h2 className="text-xl font-bold mb-4">Revenue by Room Type</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Standard Rooms</span>
                    <span>$120,000 (37%)</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2.5 rounded-full" style={{ width: '37%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Deluxe Rooms</span>
                    <span>$145,000 (45%)</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-400 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Suites</span>
                    <span>$59,580 (18%)</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-400 h-2.5 rounded-full" style={{ width: '18%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="neon-card rounded-xl p-4 md:p-6">
              <h2 className="text-xl font-bold mb-4">Revenue Forecast</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                  <div>
                    <div className="font-medium">Next Month</div>
                    <div className="text-sm text-gray-400">Projected revenue</div>
                  </div>
                  <div className="text-xl font-bold">$48,000</div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                  <div>
                    <div className="font-medium">Next Quarter</div>
                    <div className="text-sm text-gray-400">Projected revenue</div>
                  </div>
                  <div className="text-xl font-bold">$135,000</div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                  <div>
                    <div className="font-medium">Next Year</div>
                    <div className="text-sm text-gray-400">Projected revenue</div>
                  </div>
                  <div className="text-xl font-bold">$520,000</div>
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