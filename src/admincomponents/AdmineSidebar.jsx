import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes, FaTachometerAlt, FaUser, FaPlus, FaBoxOpen, FaClipboardList, FaEnvelopeOpenText } from 'react-icons/fa'

export default function AdmineSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col bg-gray-900 text-white w-64 h-screen fixed top-0 left-0">
        <div className="flex items-center justify-center h-16 border-b border-gray-700">
          <h2 className="text-xl font-semibold">Admin Panel</h2>
        </div>

        <nav className="flex flex-col mt-6 space-y-4 px-6 text-sm">
          <Link to="/walmart/adminelayout/dashborard" className="flex items-center gap-3 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 rounded-lg p-3"><FaTachometerAlt /> <span>Dashboard</span></Link>
          <Link to="/walmart/adminelayout/users" className="flex items-center gap-3 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 rounded-lg p-3"><FaUser /> <span>Users</span></Link>
          <Link to="/walmart/adminelayout/add-products" className="flex items-center gap-3 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 rounded-lg p-3"><FaPlus /> <span>Add Products</span></Link>
          <Link to="/walmart/adminelayout/manege-products" className="flex items-center gap-3 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 rounded-lg p-3"><FaBoxOpen /> <span>Manage Products</span></Link>
          <Link to="/walmart/adminelayout/orders" className="flex items-center gap-3 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 rounded-lg p-3"><FaClipboardList /> <span>Orders</span></Link>
          <Link to="/walmart/adminelayout/contacts" className="flex items-center gap-3 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 rounded-lg p-3"><FaEnvelopeOpenText /> <span>Contacts</span></Link>
        </nav>
      </aside>

      {/* Mobile top bar */}
      <header className="md:hidden bg-gray-900 text-white flex items-center justify-between px-4 py-3">
        <h2 className="text-lg font-semibold">Admin Panel</h2>
        <button onClick={() => setOpen(true)} className="p-2 rounded hover:bg-gray-800">
          <FaBars className="text-2xl" />
        </button>
      </header>

      {/* Mobile drawer */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform transition-transform duration-300 z-50 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">Admin Panel</h2>
          <button onClick={() => setOpen(false)}>
            <FaTimes className="text-2xl text-gray-300 hover:text-gray-600" />
          </button>
        </div>

        <nav className="flex flex-col mt-4 space-y-3 px-6 text-sm">
          <Link to="/walmart/adminelayout/dashborard" onClick={() => setOpen(false)} className="flex items-center gap-3 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 rounded-lg p-3"><FaTachometerAlt /> <span>Dashboard</span></Link>
          <Link to="/walmart/adminelayout/users" onClick={() => setOpen(false)} className="flex items-center gap-3 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 rounded-lg p-3"><FaUser /> <span>Users</span></Link>
          <Link to="/walmart/adminelayout/add-products" onClick={() => setOpen(false)} className="flex items-center gap-3 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 rounded-lg p-3"><FaPlus /> <span>Add Products</span></Link>
          <Link to="/walmart/adminelayout/manege-products" onClick={() => setOpen(false)} className="flex items-center gap-3 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 rounded-lg p-3"><FaBoxOpen /> <span>Manage Products</span></Link>
          <Link to="/walmart/adminelayout/orders" onClick={() => setOpen(false)} className="flex items-center gap-3 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 rounded-lg p-3"><FaClipboardList /> <span>Orders</span></Link>
          <Link to="/walmart/adminelayout/contacts" onClick={() => setOpen(false)} className="flex items-center gap-3 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 rounded-lg p-3"><FaEnvelopeOpenText /> <span>Contacts</span></Link>
        </nav>
      </div>

      {/* Overlay */}
      {open && <div className="fixed inset-0 bg-black opacity-40 z-40" onClick={() => setOpen(false)}></div>}
    </>
  )
}
