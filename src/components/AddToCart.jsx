import React, { useState, useEffect } from "react";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import NavbarApp from "./NavbarApp";
import FooterApp from "./FooterApp";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // fetch cart once on mount
    axios.get(`http://localhost:4000/cart`).then((res) => {
      setCartItems(res.data || [])
    }).catch((err) => console.error('Failed to load cart', err))
  }, [cartItems]);

  //For delete data

  const deletData = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:4000/cart/${id}`).then(() => {
          Swal.fire("Deleted!", "Your item has been deleted.", "success");
        });
      }
    });
  };

  const clearCart = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove all items from your cart!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, clear it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          for (const item of cartItems) {
            await axios.delete(`http://localhost:4000/cart/${item.id}`);
          }
          setCartItems([]);
          Swal.fire("Cleared!", "Your cart is now empty.", "success");
        } catch (error) {
          Swal.fire("Error!", "Failed to clear the cart.", "error");
        }
      }
    });
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      Swal.fire("Empty!", "Your cart is empty!", "info");
      return;
    }

    // Check if user is logged in by checking sessionStorage
    const user = sessionStorage.getItem('user');
    if (!user) {
      Swal.fire({
        title: "Please Login",
        text: "You need to be logged in to proceed to checkout",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Cancel"
      }).then((result) => {
        if (result.isConfirmed) {
          // Trigger the login dialog
          document.getElementById('dialog')?.showModal();
        }
      });
      return;
    }

    navigate('/checkout', { state: { cartItems } });

    try {
      for (const item of cartItems) {
        await axios.delete(`http://localhost:4000/cart/${item.id}`);
      }
      setCartItems([]);
    } catch (error) {
      console.error("Failed to clear cart after checkout", error);
    }
  };


  return (
    <>
      <NavbarApp />

      <main className="max-w-6xl mx-auto p-4 md:p-6">
        <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Items list */}
          {cartItems && cartItems.map((items) => {
            return (
              <>
                <section className="md:col-span-2 bg-white rounded shadow p-4">
                  <ul className="space-y-4">

                    <li className="flex gap-4 items-center">
                      <div className="w-24 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        <img src={items.prophoto} alt="" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-gray-800">{items.proname}</h3>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{items.prodetail}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-gray-800">₹.{items.pronewprice} </div>
                            <div className="text-sm text-gray-500">each</div>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button className="p-2 border rounded text-gray-600 hover:bg-gray-100"><FaMinus /></button>
                            <div className="px-3"></div>
                            <button className="p-2 border rounded text-gray-600 hover:bg-gray-100"><FaPlus /></button>
                          </div>

                          <div className="flex items-center gap-3">
                            <button className="text-red-600 hover:text-red-800 flex items-center gap-2"
                              key={items.id}
                              onClick={() =>
                                deletData(items.id)
                              }
                            ><FaTrash /></button>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </section>
              </>
            )
          })}

          {/* Summary */}
          <aside className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Subtotal</span>
              <span>
                ₹ {cartItems.reduce((total, item) => total + Number(item.pronewprice || 0), 0).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Shipping</span>
              <span>{cartItems.length > 0 ? '₹ 50' : 'N/A'}</span>
            </div>
            <div className="border-t mt-3 pt-3 flex justify-between items-center">
              <div>
                <div className="text-sm text-gray-600">Total</div>
                <div className="text-xl font-semibold">₹ {cartItems.reduce((total, item) => total + Number(item.pronewprice || 0), 0) + (cartItems.length > 0 ? 50 : 0)}</div>
              </div>
            </div>

            <button className="w-full mt-4 bg-green-600 text-white py-2 rounded"
              onClick={() => handleCheckout()}
            >Proceed to Checkout</button>
            <button className="w-full mt-2 bg-red-100 text-red-700 py-2 rounded"
              onClick={() =>
                clearCart(cartItems)
              }
            >Clear Cart</button>
          </aside>
        </div>
      </main>

      <FooterApp />
    </>
  )
}
