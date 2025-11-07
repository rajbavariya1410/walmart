import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'

// User components
import NavbarApp from './components/NavbarApp'
import MyCarousel from './components/MyCarousel'
import Product1 from './components/Product1'
import OfferZone from './components/OfferZone'
import CustomerBenefits from './components/CustomerBenefits'
import FooterApp from './components/FooterApp'
import Products from './components/Products'
import OffersPage from './components/OfferPage'
import Details from './components/Details'
import AddTOCart from './components/AddToCart'
import Checkout from './components/Checkout'
import ContactUs from './components/ContactUs'

// Admin components
import AdminLayout from './admincomponents/AdminLayout'
import AdmineDashboard from './admincomponents/AdmineDashboard'
import Users from './admincomponents/Users'
import AddProducts from './admincomponents/AddProducts'
import ManegeProducts from './admincomponents/ManegeProducts'
import Updateproduct from './admincomponents/Updateproduct'
import Orders from './admincomponents/Orders'
import Contact from './admincomponents/Contact'



export default function App() {
     
    return (
        <>
            <Routes>
                {/* Public / User routes */}
                <Route path="/walmart" element={<>
                    <NavbarApp />
                    <MyCarousel />
                    <OfferZone />
                    <Product1 />
                    <CustomerBenefits />
                    <FooterApp />
                </>} />

                <Route path="/products" element={<><Products /></>} />
                <Route path="/offers" element={<><OffersPage /></>} />
                <Route path="/contact-us" element={<><ContactUs /></>} />
                <Route path="/details/:id" element={<><Details /></>} />
                <Route path="/details/addtocart" element={<><AddTOCart /></>} />
                <Route path="/checkout" element={<><Checkout /></>} />

                {/* Admin routes (nested) */}
                <Route path="/walmart/adminelayout" element={<AdminLayout />}/>
                    <Route path="/walmart/adminelayout/dashborard" element={<AdmineDashboard />}/>
                    <Route path="/walmart/adminelayout/users" element={<Users />} />
                    <Route path="/walmart/adminelayout/add-products" element={<AddProducts />} />
                    <Route path="/walmart/adminelayout/manege-products" element={<ManegeProducts />} />
                    <Route path="/walmart/manege-products/updateproduct/:id" element={<Updateproduct />} />
                    <Route path="/walmart/adminelayout/orders" element={<Orders />} />
                    <Route path="/walmart/adminelayout/contacts" element={<Contact />} />
                

                {/* Fallback 404 */}
                <Route path="*" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-4xl font-bold">404</h1><p>Page not found</p></div></div>} />
            </Routes>
        </>
    )
}