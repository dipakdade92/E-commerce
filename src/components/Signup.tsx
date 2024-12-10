'use client'

import React, { useState } from 'react'


function SignUpModal({ closeModal }: { closeModal: () => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !password) {
      setError('Please fill out all fields.')
      return
    }

    localStorage.setItem('user', JSON.stringify({ name, email, password }))
    setName('')
    setEmail('')
    setPassword('')
    setError('')
    closeModal()
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-xl font-semibold mb-4">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-violet-500 rounded-lg hover:bg-violet-600 focus:outline-none"
          >
            Sign Up
          </button>
        </form>
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          X
        </button>
      </div>
    </div>
  )
}

export default SignUpModal
