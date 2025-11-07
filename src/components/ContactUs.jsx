import React, { useRef } from "react";
import NavbarApp from "./NavbarApp";
import FooterApp from "./FooterApp";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function ContactUs() {
    const name = useRef("");
    const email = useRef("");
    const message = useRef("");
    const navigate = useNavigate("");

    const sendMessage = async (e) => {
        e.preventDefault();
        var messageData = {
            name: name.current.value,
            email: email.current.value,
            message: message.current.value
        };
        try {
            axios.post(`http://localhost:4000/contacts`, messageData);
            Swal.fire({
                title: "Good job!",
                text: "Message sent successfully!",
                icon: "success"
            });
            navigate("/");
            e.target.reset();
        } catch (error) {
            console.log("error generating", error);
        }
    }
    return (
        <>
            <NavbarApp />
            <section className="bg-gray-100 py-16 px-5">
                <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="grid md:grid-cols-2">
                        {/* Left Section - Contact Info */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-10 flex flex-col justify-center">
                            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                            <p className="mb-8 text-gray-100">
                                We’d love to hear from you! Fill out the form or reach us via the details below.
                            </p>

                            <div className="space-y-5">
                                <div className="flex items-center gap-4">
                                    <FaMapMarkerAlt className="text-2xl" />
                                    <p>150 Feet Ring Road, Near McDonald's, Rajkot, Gujarat</p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <FaPhoneAlt className="text-2xl" />
                                    <p>+91 7202994265</p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <FaEnvelope className="text-2xl" />
                                    <p>walmartcontact@gmail.com</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Section - Contact Form */}
                        <div className="p-10">
                            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Send us a Message</h2>
                            <form className="space-y-5" onSubmit={sendMessage}>
                                <div>
                                    <label className="block mb-2 font-medium text-gray-600">Your Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        ref={name}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium text-gray-600">Email</label>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        ref={email}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium text-gray-600">Message</label>
                                    <textarea
                                        rows="5"
                                        placeholder="Write your message..."
                                        ref={message}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-all"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <FooterApp />
        </>
    );
}
