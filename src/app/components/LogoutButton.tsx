'use client'
import React from 'react'
import {signOut} from 'next-auth/react'

export const LogoutButton = () => {
  return (
    <button
      className="bg-black hover:bg-red-700 text-white font-bold py-1.5 px-4 rounded"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  )
}
