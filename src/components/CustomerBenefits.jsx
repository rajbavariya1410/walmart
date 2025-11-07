import React from 'react'
import { FaTruck, FaTags, FaHeadphones, FaCreditCard } from 'react-icons/fa'

export default function CustomerBenefits() {
    return (
        <>

            {/* Customer Benefits */}
            < section className="bg-blue-50 py-12" >
                <div className="max-w-6xl mx-auto grid md:grid-cols-4 sm:grid-cols-2 gap-8 px-4 text-center">
                    {[
                        { icon: <FaTruck size={28} />, title: "Free Delivery", desc: "On frist order" },
                        { icon: <FaTags size={28} />, title: "Best Prices", desc: "Unbeatable deals everyday" },
                        { icon: <FaHeadphones size={28} />, title: "24/7 Support", desc: "Always here to help" },
                        { icon: <FaCreditCard size={28} />, title: "Secure Payments", desc: "Your data is safe" },
                    ].map((item, i) => (
                        <div key={i} className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
                            <div className="text-blue-600 flex justify-center mb-3">{item.icon}</div>
                            <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                            <p className="text-gray-500 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section >
        </>
    )
}
