import React, { useRef } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import AdmineNavbar from './AdmineNavbar'
import AdmineSidebar from './AdmineSidebar'

export default function AddProducts() {


    //Store product data

    const category = useRef("");
    const proname = useRef("");
    const prodetail = useRef("");
    const proprice = useRef("");
    const pronewprice = useRef("");
    const prophoto = useRef("");
    const navigate = useNavigate("");

    const Addproduct = async (e) => {
        e.preventDefault();
        var Adddata = {
            category: category.current.value,
            proname: proname.current.value,
            prodetail: prodetail.current.value,
            proprice: proprice.current.value,
            pronewprice: pronewprice.current.value,
            prophoto: prophoto.current.value
        }
        try {
            axios.post(`http://localhost:4000/products`, Adddata).then(() => {
                Swal.fire({
                    title: "Good job!",
                    text: "Product added successfully!",
                    icon: "success"
                });
                navigate('/adminelayout/manege-products')
                e.target.reset();
            })
        }
        catch (error) {
            console.log('error genrating', error);
        }

    }


    return (
        <>
            <AdmineNavbar />
            <AdmineSidebar />
            <div className="md:pl-65 min-h-screen">
                <div className="max-w-xl mx-auto p-6 mt-10 mb-10">
                    <h2 className="text-2xl font-semibold mb-4">Add Product</h2>

                    <form className="space-y-4 bg-white p-6 rounded shadow" onSubmit={Addproduct}>
                        <label className="block">
                            <span className="text-sm font-medium text-gray-700">Category Name</span>
                            <select name="category" id="" ref={category} className="mt-1 block w-full border border-gray-200 rounded px-3 py-2" required>
                                <option value="">--Select--</option>
                                <option value="men's items">men's items</option>
                                <option value="women's items">women's items</option>
                                <option value="kid's items">kid's items</option>
                            </select>
                        </label>

                        <label className="block">
                            <span className="text-sm font-medium text-gray-700">Product Name</span>
                            <input className="mt-1 block w-full border border-gray-200 rounded px-3 py-2"
                                ref={proname} required />
                        </label>

                        <label className="block">
                            <span className="text-sm font-medium text-gray-700">Details</span>
                            <textarea className="mt-1 block w-full border border-gray-200 rounded px-3 py-2" rows={4} ref={prodetail} required></textarea>
                        </label>

                        <div className="grid grid-cols-2 gap-4">
                            <label className="block">
                                <span className="text-sm font-medium text-gray-700">Old Price</span>
                                <input className="mt-1 block w-full border border-gray-200 rounded px-3 py-2" ref={proprice} required />
                            </label>

                            <label className="block">
                                <span className="text-sm font-medium text-gray-700">New price</span>
                                <input className="mt-1 block w-full border border-gray-200 rounded px-3 py-2" ref={pronewprice} required />
                            </label>
                        </div>

                        <label className="block">
                            <span className="text-sm font-medium text-gray-700">Photo URL</span>
                            <input className="mt-1 block w-full border border-gray-200 rounded px-3 py-2" ref={prophoto} required />
                        </label>

                        <div className="flex items-center gap-3">
                            <button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded">Add Product</button>
                            <button type="button" className="text-sm text-gray-600">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
