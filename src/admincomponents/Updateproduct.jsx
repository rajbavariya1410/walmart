import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';
import AdmineNavbar from './AdmineNavbar'
import AdmineSidebar from './AdmineSidebar'

export default function Updateproduct() {
    const [data, setData] = useState("");
    const { id } = useParams();

    const category = useRef("");
    const proname = useRef("");
    const prodetail = useRef("");
    const proprice = useRef("");
    const pronewprice = useRef("");
    const prophoto = useRef("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:4000/products/${id}`).then((response) => {
            setData(response.data);
            category.current.value = response.data.category,
                proname.current.value = response.data.proname,
                prodetail.current.value = response.data.prodetail,
                proprice.current.value = response.data.proprice,
                pronewprice.current.value = response.data.pronewprice,
                prophoto.current.value = response.data.prophoto
        });
    }, [id]);

    const UpdateData = (e) => {
        e.preventDefault();
        var updData = {
            category: category.current.value,
            proname: proname.current.value,
            prodetail: prodetail.current.value,
            proprice: proprice.current.value,
            pronewprice: pronewprice.current.value,
            prophoto: prophoto.current.value
        };

        axios.put(`http://localhost:4000/products/${id}`, updData).then(() => {
            Swal.fire({
                title: "Great!",
                text: "Your product successfully Updated!",
                icon: "success"
            });
            navigate('/adminelayout/manege-products');
        }).catch((error) => {
            console.log('Error updating product:', error);
        });
    };

    return (
        <>
            <AdmineNavbar />
            <AdmineSidebar />
            <div className="md:pl-65 min-h-screen">
                <div className='m-auto sm:w-100 md:w-2/3 lg:w-1/2'>
                    <div className="mt-10 text-center sm:ml-5 sm:text-left mb-20 container">
                        <h2 id="dialog-title" className="text-base font-stretch-50% text-blue-600">Update Products</h2>
                        <div className="mt-2">
                            <form className="space-y-4 bg-white p-6 rounded shadow"
                                onSubmit={UpdateData} >
                                <label className="block">
                                    <span className="text-sm font-medium text-green-700">Update Category Name</span>
                                    <input className="mt-1 block w-full border border-gray-200 rounded px-3 py-2" ref={category} />
                                </label>

                                <label className="block">
                                    <span className="text-sm font-medium text-green-700">Update Product Name</span>
                                    <input className="mt-1 block w-full border border-gray-200 rounded px-3 py-2" ref={proname} />
                                </label>

                                <label className="block">
                                    <span className="text-sm font-medium text-green-700">Update Details</span>
                                    <textarea className="mt-1 block w-full border border-gray-200 rounded px-3 py-2" rows={4} ref={prodetail} ></textarea>
                                </label>

                                <div className="grid grid-cols-2 gap-4">
                                    <label className="block">
                                        <span className="text-sm font-medium text-green-700">Update Old Price</span>
                                        <input className="mt-1 block w-full border border-gray-200 rounded px-3 py-2" ref={proprice} />
                                    </label>

                                    <label className="block">
                                        <span className="text-sm font-medium text-green-700">Update New Price</span>
                                        <input className="mt-1 block w-full border border-gray-200 rounded px-3 py-2" ref={pronewprice} />
                                    </label>
                                </div>

                                <label className="block">
                                    <span className="text-sm font-medium text-green-700">Update Photo URL</span>
                                    <input className="mt-1 block w-full border border-gray-200 rounded px-3 py-2" ref={prophoto} />
                                </label>

                                <div className="flex items-center gap-3">
                                    <button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded">Update Product</button>
                                    <button type="button" className="text-sm text-gray-600"
                                        onClick={() => {
                                            navigate(`/adminelayout/manege-products`)
                                        }}
                                    >Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
