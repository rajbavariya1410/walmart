import React, { useState, useEffect } from 'react'
import { FaSort, FaEdit, FaTrash } from 'react-icons/fa'
import { getAuth } from 'firebase/auth'
import Swal from 'sweetalert2'
import AdmineNavbar from './AdmineNavbar'
import AdmineSidebar from './AdmineSidebar'

export default function Users() {
    const [users, setUsers] = useState([]);

    const handleDeleteUser = (userId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    // Remove user from session storage
                    sessionStorage.removeItem(`user_${userId}`);
                    // Update users list
                    setUsers(users.filter(user => user.id !== userId));
                    Swal.fire(
                        'Deleted!',
                        'User has been deleted.',
                        'success'
                    );
                } catch (error) {
                    console.error('Error deleting user:', error);
                    Swal.fire(
                        'Error',
                        'Failed to delete user',
                        'error'
                    );
                }
            }
        });
    };

    useEffect(() => {
        // Fetch users from session storage
        const fetchUsers = () => {
            try {
                // Get all registered users from session storage
                const allUsers = [];
                for (let i = 0; i < sessionStorage.length; i++) {
                    const key = sessionStorage.key(i);
                    if (key.startsWith('user_')) {
                        const userData = JSON.parse(sessionStorage.getItem(key));
                        allUsers.push({
                            id: userData.uid,
                            email: userData.email,
                            createdAt: userData.createdAt || 'N/A',
                            lastLogin: userData.lastLogin || 'N/A'
                        });
                    }
                }
                setUsers(allUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
                Swal.fire('Error', 'Failed to fetch users', 'error');
            }
        };

        fetchUsers();
        // Refresh users list every minute
        const interval = setInterval(fetchUsers, 60000);
        return () => clearInterval(interval);
    }, []);
    return (
        <>
            <AdmineNavbar />
            <AdmineSidebar />
            <div className="md:pl-65 min-h-screen">
                <div className="md:block overflow-x-auto bg-white rounded shadow">
                    <div className="p-4 bg-white shadow rounded-lg">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Registered Users</h2>
                        <div className="mb-4">
                            <span className="text-blue-600 font-semibold text-lg">Total Users: {users.length}</span>
                        </div>
                    </div>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.createdAt}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.lastLogin}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                                            <button
                                                className="text-red-600 hover:text-red-800 mx-2"
                                                onClick={() => handleDeleteUser(user.id)}
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                        No users found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
