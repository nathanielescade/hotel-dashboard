// components/ConfirmationDialog.js
'use client'
import { useState } from 'react'

export default function ConfirmationDialog({ 
  isOpen, 
  title, 
  message, 
  onConfirm, 
  onCancel 
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="neon-card rounded-xl p-6 max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p className="text-gray-300 mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg neon-button text-white font-semibold"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}