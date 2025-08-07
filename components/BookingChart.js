'use client'
import { useEffect, useRef } from 'react'
import { Chart } from 'chart.js/auto'

export default function BookingChart() {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d')
      
      // Destroy previous chart instance if exists
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
      
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            {
              label: 'Bookings',
              data: [12, 19, 15, 25, 22, 30, 28],
              borderColor: '#00f3ff',
              backgroundColor: 'rgba(0, 243, 255, 0.1)',
              tension: 0.4,
              fill: true,
              pointBackgroundColor: '#00f3ff',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: '#00f3ff',
              pointRadius: 5,
              pointHoverRadius: 7
            },
            {
              label: 'Cancellations',
              data: [2, 3, 1, 4, 2, 1, 3],
              borderColor: '#ff00ff',
              backgroundColor: 'rgba(255, 0, 255, 0.1)',
              tension: 0.4,
              fill: true,
              pointBackgroundColor: '#ff00ff',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: '#ff00ff',
              pointRadius: 5,
              pointHoverRadius: 7
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
                  return `${context.dataset.label}: ${context.raw}`
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
                color: '#a0a0a0'
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

  return (
    <div className="neon-card rounded-xl p-6 h-80">
      <h2 className="text-xl font-bold mb-4 neon-text text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        Weekly Bookings
      </h2>
      <div className="h-64">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  )
}