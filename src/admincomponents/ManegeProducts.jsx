import React, { useState, useEffect } from "react";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import AdmineNavbar from './AdmineNavbar';
import AdmineSidebar from './AdmineSidebar';

export default function ManegeProducts() {
  const [proData, setProData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/products`);
        setProData(res.data || []);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    fetchProducts();
  }, []);

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
        axios.delete(`http://localhost:4000/products/${id}`).then(() => {
          Swal.fire("Deleted!", "Your product has been deleted.", "success");
          // refresh list after delete
          axios.get(`http://localhost:4000/products`).then((res) => setProData(res.data || []));
        }).catch((err) => {
          console.error('Error deleting product', err);
        });
      }
    });
  };



  return (
    <>
      <AdmineNavbar />
      <AdmineSidebar />
      <div className="md:pl-65 min-h-screen">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Manage Products</h2>
        </div>

        {/* Mobile View: Stacked Product Cards */}
        <div className="md:hidden space-y-5 px-4 py-3">
          {proData && proData.map((product) => (
            <article
              key={product.id}
              className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 hover:shadow-lg transition-all duration-200"
            >
              {/* Product Image + Info */}
              <div className="flex gap-4">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <img
                    src={product.prophoto}
                    alt={product.proname}
                    className="w-24 h-24 rounded-xl object-cover border border-gray-200"
                  />
                </div>

                {/* Product Details */}
                <div className="flex flex-col flex-1 min-w-0"> {/* prevents overflow */}
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 break-words">
                      {product.proname}
                    </h3>

                    <span className="text-sm font-bold text-sky-600 whitespace-nowrap flex-shrink-0">
                      ₹{product.pronewprice}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 mt-1 capitalize truncate">
                    {product.category}
                  </p>

                  <p className="text-xs text-gray-600 mt-2 line-clamp-2 break-words leading-snug">
                    {product.prodetail}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="my-3 border-t border-gray-100"></div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => navigate(`/walmart/manege-products/updateproduct/${product.id}`)}
                  className="flex items-center gap-1 text-sm text-blue-600 hover:text-white border border-blue-200 hover:bg-blue-600 px-3 py-1.5 rounded-lg transition"
                  aria-label={`Edit ${product.proname}`}
                >
                  <FaPencilAlt className="text-xs" /> Edit
                </button>

                <button
                  onClick={() => deletData(product.id)}
                  className="flex items-center gap-1 text-sm text-red-600 hover:text-white border border-red-200 hover:bg-red-600 px-3 py-1.5 rounded-lg transition"
                  aria-label={`Delete ${product.proname}`}
                >
                  <FaTrash className="text-xs" /> Delete
                </button>
              </div>
            </article>
          ))}
        </div>


        {/* Desktop/tablet: full table */}
        <div className="hidden md:block overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Old Price</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">New Price</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {proData && proData.map((product) => {
                return (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img src={product.prophoto} className="w-16 h-auto object-cover rounded" alt={product.proname} />
                    </td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-800">{product.proname}</td>
                    <td className="px-6 py-4 w-90 text-sm text-gray-600 whitespace-normal break-words line-clamp-3">{product.prodetail}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">₹.{product.proprice}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">{product.pronewprice}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-4">
                        <button className="text-blue-600 hover:text-blue-800 border-1 p-2 rounded"
                          onClick={() => {
                            // navigate to the update page for this product
                            navigate(`/walmart/manege-products/updateproduct/${product.id}`)
                          }}><FaPencilAlt /></button>
                        <button className="text-red-600 hover:text-red-800 border-1 p-2 rounded"
                          key={product.id}
                          onClick={() =>
                            deletData(product.id)
                          }
                        ><FaTrash /></button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      </div>

    </>
  )
}
