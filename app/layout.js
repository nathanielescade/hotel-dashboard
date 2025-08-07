// app/layout.js
import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Hotel Management Dashboard',
  description: 'Neon-themed hotel management system',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-950 text-gray-100">
          <Providers>
            {children}
          </Providers>
        </div>
      </body>
    </html>
  )
}