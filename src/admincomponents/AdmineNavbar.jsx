import React from 'react'
import { FaBars } from 'react-icons/fa'

export default function AdmineNavbar() {
  const toggleSidebar = () => {
    // dispatch a custom event so sidebar can respond
    window.dispatchEvent(new CustomEvent('admin-sidebar-toggle'))
  }

  return (
    <header className="bg-gray-900 text-white md:pl-4 top-0 sticky z-10 shadow ms-64 hidden md:block lg:block p-4.5 ">
      <div className="max-w-6xl  px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl font-semibold">Walmart Admin Dashboard</h1>
      </div>
    </header>
  )
}
