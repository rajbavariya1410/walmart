import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaPhoneAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom';

export default function FooterApp() {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="text-2xl font-bold text-sky-400">Walmart</div>
          <p className="mt-3 text-sm text-gray-300">Everyday low prices, any day.</p>
          <div className="mt-4 flex items-center gap-3 text-gray-400">
            <FaPhoneAlt />
            <span className="text-sm">+1 (800) 925-6278</span>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/products" className="hover:text-white">Products</Link></li>
            <li><Link to="/contact-us" className="hover:text-white">Contact</Link></li>
            <li><Link to="/" className="hover:text-white">Stores</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Customer Service</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Help Center</a></li>
            <li><a href="#" className="hover:text-white">Returns</a></li>
            <li><a href="#" className="hover:text-white">Shipping</a></li>
            <li><a href="#" className="hover:text-white">Track Order</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-3">
            <a href="#" className="p-2 rounded bg-gray-800 hover:bg-gray-700"><FaFacebookF /></a>
            <a href="#" className="p-2 rounded bg-gray-800 hover:bg-gray-700"><FaTwitter /></a>
            <a href="#" className="p-2 rounded bg-gray-800 hover:bg-gray-700"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-400">
          <div>© {new Date().getFullYear()} Walmart. All rights reserved.</div>
          <div className="mt-2 sm:mt-0">Terms · Privacy · Accessibility</div>
        </div>
      </div>
    </footer>
  )
}
