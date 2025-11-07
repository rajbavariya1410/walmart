import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart, FaRegUserCircle, FaBars, FaTimes, FaSearch } from 'react-icons/fa'
import axios from 'axios'
import Swal from 'sweetalert2'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, setPersistence, browserSessionPersistence } from 'firebase/auth'
import { auth } from './firebase'

export default function NavbarApp() {

   const ADMIN_EMAIL = 'rajbavariya1410@gmail.com'
   const ADMIN_PASS = 'raj1410'

  {/* for login validation */ }
  const [data, setData] = useState([])
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [authMode, setAuthMode] = useState('signin') // 'signin' or 'signup'
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // use session persistence so auth state is cleared when browser is closed
      await setPersistence(auth, browserSessionPersistence)
      let result
      let user
      if (authMode === 'signin') {
        result = await signInWithEmailAndPassword(auth, email, password)
        user = result.user
        console.log('User signed in:', user.email)
      } else {
        result = await createUserWithEmailAndPassword(auth, email, password);
        user = result.user
        console.log('User created:', user.email)
      }
      // show success alert
      Swal.fire({
        icon: 'success',
        title: authMode === 'signin' ? 'Signed in' : 'Account created',
        text: authMode === 'signin' ? 'Welcome back!' : 'Your account has been created successfully.',
        timer: 1600,
        showConfirmButton: false,
      })
      // close modal dialog if open
      try { document.getElementById('dialog')?.close() } catch (e) { }

      // store basic user data in session storage so it clears on browser close
      const userObj = {
        uid: user.uid,
        email: user.email,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      }
      sessionStorage.setItem('user', JSON.stringify(userObj))
      // Also store in user-specific storage for admin panel
      sessionStorage.setItem(`user_${user.uid}`, JSON.stringify(userObj))
      setCurrentUser(userObj)
    }
    catch (error) {
      console.log('error genrating', error);
      setError(error.message || 'Authentication error')
    }
  }

  // Subscribe to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const u = { uid: user.uid, email: user.email }
        setCurrentUser(u)
        sessionStorage.setItem('user', JSON.stringify(u))
      } else {
        setCurrentUser(null)
        sessionStorage.removeItem('user')
      }
    })

    // if there is no session user saved, force sign out so users are not persisted
    const stored = sessionStorage.getItem('user')
    if (!stored) {
      // ensure Firebase doesn't keep the user signed in across sessions
      signOut(auth).catch(() => { })
    } else if (!currentUser) {
      try { setCurrentUser(JSON.parse(stored)) } catch { }
    }

    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setCurrentUser(null)
      sessionStorage.removeItem('user')
    } catch (err) {
      console.error('Logout failed', err)
    }
  }

  // Cart Count 

  const [cartCount, setCartCount] = useState(0);

  // Fetch cart count
  const fetchCartCount = async () => {
    try {
      const res = await axios.get('http://localhost:4000/cart');
      setCartCount(res.data.length);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  useEffect(() => {
    fetchCartCount();

    const interval = setInterval(fetchCartCount, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header className="bg-white shadow sticky top-0 left-0 w-full z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                to="/walmart"
                className="text-2xl font-extrabold text-sky-600 tracking-tight hover:text-sky-700 transition-colors duration-300"
              >
                Walmart
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden sm:flex sm:space-x-8 items-center font-medium">
              <Link to="/walmart" className="relative text-gray-700 hover:text-sky-600 transition duration-300 group">
                Home
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-sky-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/products" className="relative text-gray-700 hover:text-sky-600 transition duration-300 group">
                Products
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-sky-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/offers" className="relative text-gray-700 hover:text-sky-600 transition duration-300 group">
                OfferZone
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-sky-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/contact-us" className="relative text-gray-700 hover:text-sky-600 transition duration-300 group">
                Contact-Us
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-sky-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>

            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block">
                <div className="relative">
                  <input
                    type="search"
                    placeholder="Search..."
                    className="border border-gray-200 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 transition-all duration-300"
                  />
                  <FaSearch className="absolute right-3 top-2.5 text-gray-400 text-sm" />
                </div>
              </div>

              <Link
                to="/details/addtocart"
                className="relative p-2 rounded-full hover:bg-sky-50 transition duration-300"
                aria-label="Open cart"
              >
                <FaShoppingCart className="text-xl text-gray-700 hover:text-sky-600 transition-colors duration-300" />
                <span className="absolute -top-1 -right-1 bg-sky-600 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow">
                  {cartCount}
                </span>
              </Link>

              <div className="hidden sm:block bg-blue-400 px-6 p-1 rounded-3xl shadow">
                {currentUser ? (
                  <div className="flex items-center gap-3">
                    <span className="text-white text-sm">{currentUser.email}</span>
                    <button onClick={handleLogout} className="bg-white text-blue-600 px-3 py-1 rounded text-sm">Logout</button>
                  </div>
                ) : (
                  <button
                    className="text-white font-bold"
                    command="show-modal"
                    commandfor="dialog"
                  >
                    <FaRegUserCircle className="inline-block me-2.5 text-white size-5" />
                    login
                  </button>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                className="sm:hidden p-2 rounded hover:bg-gray-100"
                onClick={() => setMenuOpen(true)}
              >
                <FaBars className="text-xl text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Side Menu */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${menuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div className="flex justify-between items-center px-4 py-4 border-b">
            <span className="text-xl font-bold text-sky-600">Walmart</span>
            <button onClick={() => setMenuOpen(false)}>
              <FaTimes className="text-gray-600 text-2xl" />
            </button>
          </div>

          <nav className="flex flex-col space-y-4 px-6 py-4">
            <Link
              to="/walmart"
              className="text-gray-700 hover:text-sky-600"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-700 hover:text-sky-600"
              onClick={() => setMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/offers"
              className="text-gray-700 hover:text-sky-600"
              onClick={() => setMenuOpen(false)}
            >
              OfferZone
            </Link>
            <Link
              to="/contact-us"
              className="text-gray-700 hover:text-sky-600"
              onClick={() => setMenuOpen(false)}
            >
              Contact-Us
            </Link>

            {currentUser ? (
              <div className="items-center gap-2 mt-4">
                <span className="text-white flex mt-2 bg-blue-500 rounded-t-2xl p-2 rounded-e-2xl ">{currentUser.email}</span>
                <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="bg-white text-red-600 px-3 py-2 rounded-b-2xl border-2 border-blue-500">Logout</button>
              </div>
            ) : (
              <button
                className="flex items-center gap-2 bg-blue-400 text-white px-4 py-2 rounded-3xl mt-4"
                onClick={() => setMenuOpen(false)}
                command="show-modal"
                commandfor="dialog"
              >
                <FaRegUserCircle /> Login
              </button>
            )}
          </nav>
        </div>

        {/* Background overlay */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black opacity-40 z-40"
            onClick={() => setMenuOpen(false)}
          ></div>
        )}
      </header>

      {/* Model box for login */}

      <el-dialog>
        <dialog id="dialog" aria-labelledby="dialog-title" className="fixed inset-0 size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-transparent">
          <el-dialog-backdrop class="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"></el-dialog-backdrop>

          <div tabindex="0" className="flex min-h-full items-end justify-center p-4 text-center focus:outline-none sm:items-center sm:p-0">
            <el-dialog-panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95">
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-white sm:mx-0 sm:size-10 text-blue-500">
                    <FaRegUserCircle />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h2 id="dialog-title" class="text-base font-stretch-50% text-blue-600 ">Login Form</h2>
                    <div class="mt-2">
                      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4">{authMode === 'signin' ? 'Sign in to your account' : 'Create an account'}</h2>

                        {error && (
                          <div role="alert" className="mb-3 text-sm text-red-600">
                            {error}
                          </div>
                        )}

                        <label className="block mb-3">
                          <span className="text-sm font-medium text-slate-700">Email</span>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full rounded border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
                            placeholder="you@example.com"
                            aria-label="Email address"
                          />
                        </label>

                        <label className="block mb-3">
                          <span className="text-sm font-medium text-slate-700">Password</span>
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full rounded border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
                            placeholder="Enter your password"
                            aria-label="Password"
                          />
                        </label>

                        <div className="flex items-center justify-between mb-4">
                          <label className="inline-flex items-center text-sm">
                            <input
                              type="checkbox"
                              checked={remember}
                              onChange={(e) => setRemember(e.target.checked)}
                              className="mr-2"
                            />
                            Remember me
                          </label>

                          <a href="#" className="text-sm text-sky-600 hover:underline">Forgot password?</a>
                        </div>

                        <div className="text-sm text-center mt-3 mb-3">
                          {authMode === 'signin' ? (
                            <>
                              Don't have an account? <button type="button" onClick={() => setAuthMode('signup')} className="text-sky-600 hover:underline">Create one</button>
                            </>
                          ) : (
                            <>
                              Already have an account? <button type="button" onClick={() => setAuthMode('signin')} className="text-sky-600 hover:underline">Login in</button>
                            </>
                          )}
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-sky-600 hover:bg-sky-700 text-white py-2 rounded text-sm font-medium"
                        >
                          Sign in
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button" command="close" commandfor="dialog" class="mt-3 inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 hover:text-black sm:mt-0 sm:w-auto">Close</button>
              </div>
            </el-dialog-panel>
          </div>
        </dialog>
      </el-dialog>

    </>
  )
}

