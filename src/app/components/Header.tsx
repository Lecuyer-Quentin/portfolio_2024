'use client'

import Link from 'next/link'

import {useState } from 'react'

export default function Header() {
  const [logIn, setLogIn] = useState(false)
  
  return (
    <header className="flex items-center justify-between w-full h-24 px-24">
        <h1 className="text-3xl font-bold">
            <Link href="/">Portfolio</Link>
        </h1>
        <nav className="flex items-center justify-between w-1/2">
            <Link href="/projects" className="text-xl font-medium">Projects</Link>
            
            <Link href="/about" className="text-xl font-medium">About</Link>
            <Link href="/contact" className="text-xl font-medium">Contact</Link>
            {logIn && <Link href="/dashboard" className="text-xl font-medium">Board</Link>}

        </nav>

        <button className="px-4 py-2 bg-gray-800 text-white rounded-md"
        onClick={() => setLogIn(!logIn)}
        >
            {logIn ? 'Log Out' : 'Log In'}
        </button>

    </header>
  )
}
