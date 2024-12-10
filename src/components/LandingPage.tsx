'use client'

import React, { useState } from 'react'


import SignUpModal from './Signup'
import LoginModal from './Login'
import Welcome from './Welcome'

function LandingPage() {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  const openSignUp = () => setIsSignUpOpen(true)
  const openLogin = () => setIsLoginOpen(true)
  const closeSignUp = () => setIsSignUpOpen(false)
  const closeLogin = () => setIsLoginOpen(false)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white-100 bg-gradient-to-r from-violet-500 to-fuchsia-500" >
      <Welcome/>
      <br />

      <button
        onClick={openLogin}
        className="px-4 py-2 mb-4 text-white bg-violet-700 rounded-lg hover:bg-violet-900 focus:outline-none"
      >
        Login
      </button>
      <button
        onClick={openSignUp}
        className="px-4 py-2 mb-4 text-white bg-violet-700 rounded-lg hover:bg-violet-900 focus:outline-none"
      >
        Sign Up
      </button>

      {isSignUpOpen && <SignUpModal closeModal={closeSignUp} />}
      {isLoginOpen && <LoginModal closeModal={closeLogin} />}
    </div>
  )
}

export default LandingPage
