import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';
import NavbarApp from './NavbarApp';
import FooterApp from './FooterApp';
;

export default function Details() {
    const [data, setData] = useState(null);
    const { id } = useParams();

    const proname = useRef("");
    const prodetail = useRef("");
    const proprice = useRef("");
    const pronewprice = useRef("");
    const imgurl = useRef("");
    const prophoto = useRef("");
    const navigate = useNavigate("");


    useEffect(() => {
        axios.get(`http://localhost:4000/products/${id}`).then((response) => {
            setData(response.data);
            proname.current.value = response.data.proname,
                prodetail.current.value = response.data.prodetail,
                proprice.current.value = response.data.proprice,
                pronewprice.current.value = response.data.pronewprice,
                imgurl.current.src = response.data.prophoto,
                prophoto.current.value = response.data.prophoto
        })
    }, [id]);

    const AddProduct = async (e) => {
        e.preventDefault();
        var Add = {
            proname: proname.current.value,
            prodetail: prodetail.current.value,
            proprice: proprice.current.value,
            pronewprice: pronewprice.current.value,
            imgurl: prophoto.current.value,
            prophoto: prophoto.current.value
        }
        try {
            axios.post(`http://localhost:4000/cart`, Add).then(() => {
                Swal.fire({
                    title: "Good job!",
                    text: "Product added successfully!",
                    icon: "success"
                });
                navigate('/details/addtocart');
            })
        }
        catch (error) {
            console.log('error genreting', error);
        }
    }

    return (
        <>
            <NavbarApp />
            <div id='details' className="bg-gray-200 rounded-lg p-4 shadow-2xl hover:shadow-md flex mt-10 m-auto w-200">
                {data && (
                    <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 p-6 overflow-hidden border border-gray-100 hover:border-sky-200">

                        {/* Product Image with Float Effect */}
                        <div
                            id="d-img"
                            className="relative w-full md:w-1/2 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center group"
                        >
                            <img
                                src={data.prophoto}
                                alt={data.proname}
                                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1"
                            />

                            {/* Subtle overlay glow */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>

                        {/* Product Info Section */}
                        <div className="flex-1 md:p-10 p-5 md:ms-10 animate-fadeIn">
                            <h3 className="text-3xl font-semibold mb-3 capitalize text-gray-800 group-hover:text-sky-700 transition-colors duration-300">
                                {data.proname}
                            </h3>

                            <p className="text-base text-gray-500 mb-4 leading-relaxed capitalize hover:text-gray-700 transition-colors duration-300 line-clamp-4">
                                {data.prodetail}
                            </p>

                            <div className="space-y-2">
                                <div className="flex gap-3 items-center">
                                    <span className="text-lg font-bold text-gray-700">Old Price:</span>
                                    <span className="text-lg font-bold text-gray-400 line-through">₹{data.proprice}</span>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <span className="text-lg font-bold text-gray-700">New Price:</span>
                                    <span className="text-lg font-bold text-green-600">₹{data.pronewprice}</span>
                                </div>
                            </div>

                            {/* Buttons Section */}
                            <div className="mt-8 flex flex-wrap gap-4">
                                <button
                                    onClick={() => navigate(`/`)}
                                    className="relative bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-xl overflow-hidden"
                                >
                                    <span className="relative z-10">Continue Shopping</span>
                                    <span className="absolute inset-0 bg-sky-400 opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
                                </button>

                                <button
                                    onClick={AddProduct}
                                    className="relative bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium px-6 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-xl overflow-hidden"
                                >
                                    <span className="relative z-10">Add To Cart</span>
                                    <span className="absolute inset-0 bg-yellow-200 opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
            <FooterApp />

            {/* hidden inputs for product details */}

            <div id='t-details'>
                <input type='hidden' ref={prophoto} readOnly className='border-0 text-black' />
                <img src={imgurl} alt="" ref={imgurl} />
                <input id='detail' className="text-2xl font-semibold mb-1 capitalize" ref={proname} />
                <textarea className="text-sm text-gray-500 mb-3 line-clamp-3 capitalize border-0" ref={prodetail} readOnly />
                <input className="text-lg font-bold text-gray-600 line-through border-none" readOnly ref={proprice} />
                <input className="text-lg font-bold text-green-600" readOnly ref={pronewprice} />
            </div>
        </>
    )
}
