import React, { useEffect, useState } from 'react'
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import AdmineNavbar from './AdmineNavbar'
import AdmineSidebar from './AdmineSidebar'

export default function Contact() {
    const [messageData, setMessageData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/contacts`);
                setMessageData(res.data || []);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
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
                axios.delete(`http://localhost:4000/contacts/${id}`).then(() => {
                    Swal.fire("Deleted!", "Your contact has been deleted.", "success");
                    // refresh list after delete
                    axios.get(`http://localhost:4000/contacts`).then((res) => setMessageData(res.data || []));
                }).catch((err) => {
                    console.error('Error deleting contact', err);
                });
            }
        });
    };

    return (
        <>
            <AdmineNavbar />
            <AdmineSidebar />
            <div className="md:pl-65 min-h-screen">
                <div className="hidden md:block overflow-x-auto bg-white rounded shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message  </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {messageData && messageData.map((msg) => {
                                return (
                                    <>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{msg.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{msg.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{msg.email}</td>
                                            <td className="px-6 py-4 w-90 text-sm text-gray-600 whitespace-normal break-words line-clamp-3">{msg.message}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <div className="flex items-center justify-center gap-4">
                                                    <button className="text-red-600 hover:text-red-800 border-1 p-2 rounded"
                                                        onClick={() => deletData(msg.id)}
                                                    ><FaTrash /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Mobile View: Stacked Message Cards */}
                <div className="md:hidden space-y-5 px-4 py-3">
                    {messageData && messageData.map((msg) => (
                        <article
                            key={msg.id}
                            className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 hover:shadow-lg transition-all duration-200"
                        >
                            <div className="flex gap-4">
                                {/* Product Details */}
                                <div className="flex flex-col flex-1 min-w-0"> {/* prevents overflow */}
                                    <div className="flex justify-between items-start gap-2">
                                        <h3 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 break-words">
                                            {msg.name}
                                        </h3>

                                        <span className="text-sm font-bold text-sky-600 whitespace-nowrap flex-shrink-0">
                                            ID : {msg.id}
                                        </span>
                                    </div>

                                    <p className="text-xs text-gray-500 mt-1 capitalize truncate">
                                        {msg.email}
                                    </p>

                                    <p className="text-xs text-gray-600 mt-2 line-clamp-2 break-words leading-snug">
                                        {msg.message}
                                    </p>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="my-3 border-t border-gray-100"></div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => deletData(msg.id)}
                                    className="flex items-center gap-1 text-sm text-red-600 hover:text-white border border-red-200 hover:bg-red-600 px-3 py-1.5 rounded-lg transition"
                                    aria-label={`Delete ${msg.id}`}
                                >
                                    <FaTrash className="text-xs" /> Delete
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </>
    )
}
