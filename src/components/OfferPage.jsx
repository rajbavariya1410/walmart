import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavbarApp from "./NavbarApp";
import FooterApp from "./FooterApp";

export default function OffersPage() {
    const [offers, setOffers] = useState([]);
    const [allOffers, setAllOffers] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:4000/products")
            .then((res) => {
                const allProducts = res.data || [];
                const discounted = allProducts.filter(
                    (item) => Number(item.proprice) > Number(item.pronewprice)
                );
                setAllOffers(discounted);
                setOffers(discounted);
            })
            .catch(() => console.error("Failed to fetch products"))
            .finally(() => setLoading(false));
    }, []);

    // Filter offers when product selection changes
    useEffect(() => {
        if (!selectedProduct) {
            setOffers(allOffers); 
            return;
        }
        const filtered = allOffers.filter(
            item => item.category?.toLowerCase() === selectedProduct.toLowerCase()
        );
        setOffers(filtered);
    }, [selectedProduct, allOffers]);

    if (loading)
        return <p className="text-center py-10 text-gray-600">Loading offers...</p>;

    return (
        <>
            <NavbarApp />
            <div className="min-h-screen bg-gradient-to-b from-orange-100 via-yellow-50 to-white">

                <section className="relative bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-400 text-white rounded-b-[3rem] shadow-lg text-center py-16 px-4">
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 drop-shadow-md animate-bounce">
                        🎇 New Year Mega Offers 🎆
                    </h1>
                    <p className="text-lg sm:text-xl opacity-90 mb-6">
                        Grab up to <span className="font-bold">50% OFF</span> on your favorite products!
                    </p>


                    <div className="absolute top-0 left-10 w-32 h-32 bg-yellow-300 blur-3xl opacity-30 rounded-full"></div>
                    <div className="absolute bottom-0 right-10 w-40 h-40 bg-pink-400 blur-3xl opacity-30 rounded-full"></div>
                </section>

                <div className="max-w-6xl mx-auto px-4 py-12">
                    <div class="flex flex-col items-start space-y-2 w-64">
                        <label for="product" class="text-gray-700 font-medium">Select Offer</label>

                        <select 
                            id="product" 
                            name="product"
                            value={selectedProduct}
                            onChange={(e) => setSelectedProduct(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition duration-200 cursor-pointer"
                        >
                            <option value="">All Products</option>
                            <option value="men's items">Men's Products</option>
                            <option value="women's items">Women's Products</option>
                            <option value="kid's items">Kid's Products</option>
                            <option value="electronics">Electronics</option>
                            <option value="grocery">Grocery</option>
                            <option value="toys">Toys</option>
                            <option value="home & kitchen">Home & Kitchen</option>
                        </select>
                    </div>

                    <h1 className="text-3xl font-bold bg-gradient-to-b from-orange-500 to-yellow-300 bg-clip-text text-transparent mb-2 flex">
                        {selectedProduct 
                            ? `Offers on ${selectedProduct.charAt(0).toUpperCase() + selectedProduct.slice(1)}` 
                            : 'All Current Offers'}
                    </h1>
                    <hr className="mb-4 w-50 text-yellow-300 " />
                    {offers.length === 0 ? (
                        <p className="text-center text-gray-600 text-lg">
                            No products on offer right now — check back later 🎁
                        </p>

                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">

                            {offers.map((item) => (
                                <div
                                    key={item.id}
                                    className="group bg-white rounded-2xl p-4 shadow-md hover:shadow-xl hover:-translate-y-1 border border-gray-100 hover:border-orange-400 transition-all duration-300 flex flex-col"
                                >

                                    <div className="relative w-auto h-48 rounded-xl overflow-hidden mb-3 flex items-center justify-center bg-gray-50">
                                        <img
                                            src={item.prophoto}
                                            alt={item.proname}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                                        />
                                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                                            🔥 {Math.round(
                                                ((item.proprice - item.pronewprice) / item.proprice) * 100
                                            )}
                                            % OFF
                                        </span>
                                    </div>


                                    <div className="flex-1">
                                        <h3 className="text-base font-semibold text-gray-800 mb-1 capitalize group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
                                            {item.proname}
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-3 line-clamp-2 capitalize">
                                            {item.prodetail}
                                        </p>
                                    </div>


                                    <div className="mt-2 flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-sm text-gray-400 line-through">
                                                ₹{item.proprice}
                                            </span>
                                            <span className="text-lg font-bold text-green-600">
                                                ₹{item.pronewprice}
                                            </span>
                                        </div>

                                        <button
                                            onClick={() => navigate(`/details/${item.id}`)}
                                            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow-sm transition-all duration-300"
                                        >
                                            View
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <FooterApp />
        </>
    );
}
