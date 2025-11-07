import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AdmineNavbar from './AdmineNavbar'
import AdmineSidebar from './AdmineSidebar'


export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders (replace URL with your API)
  useEffect(() => {
    axios.get("http://localhost:4000/orders")
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading orders...</div>;
  }

  const deletData = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel Order!",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:4000/orders/${id}`).then(() => {
          Swal.fire("Deleted!", "Your order has been deleted.", "success");
          // refresh list after delete
          axios.get(`http://localhost:4000/orders`).then((res) => setOrders(res.data || []));
        }).catch((err) => {
          console.error('Error deleting order', err);
        });
      }
    });
  };

  return (
    <>
      <AdmineNavbar />
      <AdmineSidebar />
      <div className="md:pl-65 min-h-screen">
        <div className="container mx-auto p-5">
          <h1 className="text-2xl font-bold mb-5 text-center text-sky-700">
            🧾 Admin Order Details
          </h1>

          {orders.length === 0 ? (
            <p className="text-center text-gray-500">No orders found</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white p-5 rounded-2xl shadow-md border hover:shadow-lg transition duration-200"
                >
                  <h2 className="font-semibold text-lg mb-2 text-sky-600">
                    Order #{order.id}
                  </h2>

                  {/* User Info */}
                  <div className="mb-3">
                    <p><span className="font-medium">Customer:</span> {order.name}</p>
                    <p><span className="font-medium">Address:</span> {order.address}</p>
                    <p><span className="font-medium">City:</span> {order.city}</p>
                    <p><span className="font-medium">ZIP:</span> {order.zip}</p>
                  </div>

                  {/* Items */}
                  <div className="border-t pt-2">
                    <h3 className="font-medium mb-1 text-gray-700">Items:</h3>
                    <ul className="space-y-1 text-sm">
                      {order.items.map((item, idx) => (
                        <li key={idx} className="flex justify-between">
                          <span>{item.proname} × {item.quantity}</span>
                          <span>₹{item.pronewprice * item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Totals */}
                  <div className="border-t mt-2 pt-2 text-sm">
                    <p><span className="font-medium">Subtotal:</span> ₹{order.subtotal}</p>
                    <p><span className="font-medium">Shipping:</span> ₹{order.shipping}</p>
                    <p className="font-semibold text-sky-700">Total: ₹{order.total}</p>
                  </div>

                  {/* Status */}
                  <div className="mt-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                        }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex justify-between">
                    <button className="bg-sky-500 text-white px-4 py-1 rounded-lg hover:bg-sky-600 text-sm">
                      View
                    </button>
                    <button className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 text-sm"
                      onClick={() =>
                        deletData(order.id)
                      }
                    >
                      Cancel Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
