import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaCreditCard } from "react-icons/fa";
import Swal from "sweetalert2";
import NavbarApp from "./NavbarApp";
import FooterApp from "./FooterApp";
import axios from "axios";

export default function Checkout() {
  const location = useLocation();
  const { cartItems } = location.state || { cartItems: [] };

  const subtotal = cartItems.reduce((total, item) => total + Number(item.pronewprice || 0), 0);
  const shipping = subtotal > 0 ? 50 : 0;
  const total = subtotal + shipping;

  //Store user data
  const name = useRef("");
  const address = useRef("");
  const city = useRef("");
  const zip = useRef("");
  const navigate = useNavigate();


  const placeOrder = async (e) => {
    e.preventDefault();
    var AddData = {
      name: name.current.value,
      address: address.current.value,
      city: city.current.value,
      zip: zip.current.value,
    }
    try {
      axios.post('http://localhost:4000/orders', {
        items: cartItems,
        subtotal,
        shipping,
        total,
        ...AddData
      }).then(() => {
        Swal.fire({
          title: "Good job!",
          text: "Order Place successfully!",
          icon: "success"
        });
        navigate('/');
        e.target.reset();
      });
    } catch (error) {
      console.log('Error placing order', error);
    }
  };

  return (
    <>
      <NavbarApp />

      <div className="bg-gray-50 min-h-screen py-10 px-4">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10">
          {/* Left Section: Shipping & Payment */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <FaMapMarkerAlt className="text-sky-500" /> Shipping Details
            </h2>

            <form className="space-y-4"
              onSubmit={placeOrder}
            >
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  ref={name}
                  className="w-full mt-1 border rounded-lg p-2 focus:ring-2 focus:ring-sky-400 outline-none"
                  placeholder="Enter Your Name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  ref={address}
                  className="w-full mt-1 border rounded-lg p-2 focus:ring-2 focus:ring-sky-400 outline-none"
                  placeholder="Enter Your Address"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    ref={city}
                    placeholder="City"
                    className="w-full mt-1 border rounded-lg p-2 focus:ring-2 focus:ring-sky-400 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="zip"
                    ref={zip}
                    placeholder="ZIP Code"
                    className="w-full mt-1 border rounded-lg p-2 focus:ring-2 focus:ring-sky-400 outline-none"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/\D/g, '');
                    }}
                    required
                  />
                </div>
              </div>

              <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
                <FaCreditCard className="text-sky-500" /> Payment Info
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  maxLength="16"
                  className="w-full mt-1 border rounded-lg p-2 focus:ring-2 focus:ring-sky-400 outline-none"
                  placeholder="xxxx xxxx xxxx xxxx"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, '');
                  }}
                  required
                />
              </div>


              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Expiry Date
                  </label>
                  <input
                    type="month"
                    name="expiry"
                    className="w-full mt-1 border rounded-lg p-2 focus:ring-2 focus:ring-sky-400 outline-none"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    CVV
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    maxLength="4"
                    className="w-full mt-1 border rounded-lg p-2 focus:ring-2 focus:ring-sky-400 outline-none"
                    placeholder="123"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/\D/g, '');
                    }}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-sky-500 text-white py-3 rounded-lg mt-6 font-medium hover:bg-sky-600 transition-all">
                Place Order
              </button>
            </form>
          </div>

          {/* Right Section: Order Summary */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

            <div className="space-y-4 border-b pb-4">
              <ul className="divide-y">
                {cartItems.map((item) => (
                  <li key={item.id} className="py-3 flex justify-between">
                    <span>{item.proname}</span>
                    <span>₹{item.pronewprice}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Shipping</span>
              <span>₹{shipping}</span>
            </div>
            <div className="border-t mt-3 pt-3 flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
            <div className="mt-6">
              <p className="text-gray-500 text-sm">
                Your order will be delivered within 3-5 business days.
              </p>
            </div>
          </div>
        </div>
      </div>
      <FooterApp />
    </>
  );
}
