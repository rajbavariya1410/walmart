import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function OfferZone() {
    const navigate = useNavigate();
    return (

        <>

            {/* Offers Banner */}
            <section className="relative max-w-6xl mx-auto my-16 px-6">
                <div className="relative bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-400 text-white rounded-3xl shadow-2xl overflow-hidden py-16 px-8 text-center">

                    {/* Decorative glowing orbs */}
                    <div className="absolute top-0 left-0 w-40 h-40 bg-yellow-300 opacity-30 blur-3xl rounded-full"></div>
                    <div className="absolute bottom-0 right-0 w-56 h-56 bg-orange-400 opacity-30 blur-3xl rounded-full"></div>

                    {/* Firecracker / diya emoji accents */}
                    <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 animate-bounce">
                        🎇 Big Dhamaka Sale 🎆
                    </h2>

                    <p className="text-lg sm:text-xl mb-6">
                        Celebrate this New Year with <span className="font-bold">up to 50% OFF</span> on your favorite brands!
                    </p>

                    <button className="bg-white text-orange-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-orange-100 transition-transform transform hover:scale-105"
                    onClick={() => navigate("/offers")}
                    >
                        Shop Now 🔥
                    </button>

                    {/* Decorative footer line */}
                    <div className="mt-8 text-sm text-yellow-100 italic">
                        Limited time offer — spread happiness & save big this festive season ✨
                    </div>
                </div>
            </section>


        </>
    )
}
