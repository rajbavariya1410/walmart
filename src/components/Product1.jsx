import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'

export default function Product1() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    axios
      .get('http://localhost:4000/products')
      .then((res) => {
        if (!cancelled) setData(res.data || [])
      })
      .catch(() => {
        if (!cancelled) setError('Failed to load products')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  if (loading) return <p className="text-center">Loading...</p>
  if (error) return <p className="text-center text-red-500">{error}</p>

  // Filter for men's products

  const mensProducts = data.filter(item => item.category === "men's items")
  const mensCount = mensProducts.length

  // Filter for Women's products

  const womensProducts = data.filter(item => item.category === "women's items")
  const womensCount = womensProducts.length

  // Filter for Kid's products

  const kidsProducts = data.filter(item => item.category === "kid's items")
  const kidsCount = kidsProducts.length



  return (
    <>
      <div className="p-4">
        <h1 className="text-3xl font-bold bg-gradient-to-b from-blue-500 to-green-500 bg-clip-text text-transparent mb-2 flex">
          Men's Fashion
          <p className="text-3xl font-bold bg-gradient-to-b from-blue-500 to-green-500 bg-clip-text text-transparent mb-2">
            : {mensCount}
          </p>
        </h1>
        <hr className="mb-4 w-25" />

        {mensProducts.length > 5 ? (
          // ---------- SLIDER WHEN > 5 PRODUCTS ----------
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={16}
            breakpoints={{
              0: { slidesPerView: 2 },     // mobile
              640: { slidesPerView: 3 },   // small screens
              1024: { slidesPerView: 5 }   // desktop
            }}
          >
            {mensProducts.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="group bg-white rounded-2xl p-4 shadow-md hover:shadow-xl hover:-translate-y-1 border border-gray-100 hover:border-sky-300 transition-all duration-300 flex flex-col">
                  <div className="relative w-auto sm:h-auto lg:h-60 md:h-50 rounded-xl overflow-hidden mb-3 flex items-center justify-center bg-gray-50">
                    {item.prophoto ? (
                      <img
                        src={item.prophoto}
                        alt={item.proname}
                        className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    ) : (
                      <div className="text-gray-400 text-sm">No image</div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-800 mb-1 capitalize group-hover:text-sky-700 transition-colors duration-300 line-clamp-2">
                      {item.proname}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-3 capitalize group-hover:text-gray-700 transition-colors duration-300">
                      {item.prodetail}
                    </p>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-400 line-through">₹{item.proprice}</span>
                      <span className="text-lg font-bold text-green-600">₹{item.pronewprice}</span>
                    </div>

                    <button
                      onClick={() => navigate(`/details/${item.id}`)}
                      className="relative overflow-hidden bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg shadow-sm transition-all duration-300 group-hover:shadow-md"
                    >
                      <span className="relative z-10">Details</span>
                      <span className="absolute inset-0 bg-sky-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          // ---------- NORMAL GRID WHEN ≤ 5 ----------
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {mensProducts.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl p-4 shadow-md hover:shadow-xl hover:-translate-y-1 border border-gray-100 hover:border-sky-300 transition-all duration-300 flex flex-col"
              >
                <div className="relative w-auto sm:h-auto lg:h-60 md:h-50 rounded-xl overflow-hidden mb-3 flex items-center justify-center bg-gray-50">
                  <img
                    src={item.prophoto}
                    alt={item.proname}
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-800 mb-1 capitalize group-hover:text-sky-700 transition-colors duration-300 line-clamp-2">
                    {item.proname}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-3 capitalize group-hover:text-gray-700 transition-colors duration-300">
                    {item.prodetail}
                  </p>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-400 line-through">₹{item.proprice}</span>
                    <span className="text-lg font-bold text-green-600">₹{item.pronewprice}</span>
                  </div>
                  <button
                    onClick={() => navigate(`/details/${item.id}`)}
                    className="relative overflow-hidden bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg shadow-sm transition-all duration-300 group-hover:shadow-md"
                  >
                    <span className="relative z-10">Details</span>
                    <span className="absolute inset-0 bg-sky-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Women's Products  */}

      <div className="p-4">
        <h1 className="text-3xl font-bold bg-gradient-to-b from-blue-500 to-green-500 bg-clip-text text-transparent mb-2 flex">
          Women's Fashion
          <p className="text-3xl font-bold bg-gradient-to-b from-blue-500 to-green-500 bg-clip-text text-transparent mb-2">
            : {womensCount}
          </p>
        </h1>
        <hr className="mb-4 w-25" />

        {womensProducts.length > 5 ? (
          // ---------- SLIDER WHEN > 5 PRODUCTS ----------
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={16}
            breakpoints={{
              0: { slidesPerView: 2 },     // mobile
              640: { slidesPerView: 3 },   // small screens
              1024: { slidesPerView: 5 }   // desktop
            }}
          >
            {womensProducts.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="group bg-white rounded-2xl p-4 shadow-md hover:shadow-xl hover:-translate-y-1 border border-gray-100 hover:border-sky-300 transition-all duration-300 flex flex-col">
                  <div className="relative w-auto sm:h-auto lg:h-60 md:h-50 rounded-xl overflow-hidden mb-3 flex items-center justify-center bg-gray-50">
                    {item.prophoto ? (
                      <img
                        src={item.prophoto}
                        alt={item.proname}
                        className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    ) : (
                      <div className="text-gray-400 text-sm">No image</div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-800 mb-1 capitalize group-hover:text-sky-700 transition-colors duration-300 line-clamp-2">
                      {item.proname}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-3 capitalize group-hover:text-gray-700 transition-colors duration-300">
                      {item.prodetail}
                    </p>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-400 line-through">₹{item.proprice}</span>
                      <span className="text-lg font-bold text-green-600">₹{item.pronewprice}</span>
                    </div>

                    <button
                      onClick={() => navigate(`/details/${item.id}`)}
                      className="relative overflow-hidden bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg shadow-sm transition-all duration-300 group-hover:shadow-md"
                    >
                      <span className="relative z-10">Details</span>
                      <span className="absolute inset-0 bg-sky-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          // ---------- NORMAL GRID WHEN ≤ 5 ----------
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {womensProducts.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl p-4 shadow-md hover:shadow-xl hover:-translate-y-1 border border-gray-100 hover:border-sky-300 transition-all duration-300 flex flex-col"
              >
                <div className="relative w-auto sm:h-auto lg:h-60 md:h-50 rounded-xl overflow-hidden mb-3 flex items-center justify-center bg-gray-50">
                  <img
                    src={item.prophoto}
                    alt={item.proname}
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-800 mb-1 capitalize group-hover:text-sky-700 transition-colors duration-300 line-clamp-2">
                    {item.proname}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-3 capitalize group-hover:text-gray-700 transition-colors duration-300">
                    {item.prodetail}
                  </p>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-400 line-through">₹{item.proprice}</span>
                    <span className="text-lg font-bold text-green-600">₹{item.pronewprice}</span>
                  </div>
                  <button
                    onClick={() => navigate(`/details/${item.id}`)}
                    className="relative overflow-hidden bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg shadow-sm transition-all duration-300 group-hover:shadow-md"
                  >
                    <span className="relative z-10">Details</span>
                    <span className="absolute inset-0 bg-sky-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Kid's Products  */}

      <div className="p-4">
        <h1 className="text-3xl font-bold bg-gradient-to-b from-blue-500 to-green-500 bg-clip-text text-transparent mb-2 flex">
          Kid's Fashion
          <p className="text-3xl font-bold bg-gradient-to-b from-blue-500 to-green-500 bg-clip-text text-transparent mb-2">
            : {kidsCount}
          </p>
        </h1>
        <hr className="mb-4 w-25" />

        {kidsProducts.length > 5 ? (
          // ---------- SLIDER WHEN > 5 PRODUCTS ----------
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={16}
            breakpoints={{
              0: { slidesPerView: 2 },     // mobile
              640: { slidesPerView: 3 },   // small screens
              1024: { slidesPerView: 5 }   // desktop
            }}
          >
            {kidsProducts.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="group bg-white rounded-2xl p-4 shadow-md hover:shadow-xl hover:-translate-y-1 border border-gray-100 hover:border-sky-300 transition-all duration-300 flex flex-col">
                  <div className="relative w-auto sm:h-auto lg:h-60 md:h-50 rounded-xl overflow-hidden mb-3 flex items-center justify-center bg-gray-50">
                    {item.prophoto ? (
                      <img
                        src={item.prophoto}
                        alt={item.proname}
                        className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    ) : (
                      <div className="text-gray-400 text-sm">No image</div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-800 mb-1 capitalize group-hover:text-sky-700 transition-colors duration-300 line-clamp-2">
                      {item.proname}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-3 capitalize group-hover:text-gray-700 transition-colors duration-300">
                      {item.prodetail}
                    </p>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-400 line-through">₹{item.proprice}</span>
                      <span className="text-lg font-bold text-green-600">₹{item.pronewprice}</span>
                    </div>

                    <button
                      onClick={() => navigate(`/details/${item.id}`)}
                      className="relative overflow-hidden bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg shadow-sm transition-all duration-300 group-hover:shadow-md"
                    >
                      <span className="relative z-10">Details</span>
                      <span className="absolute inset-0 bg-sky-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          // ---------- NORMAL GRID WHEN ≤ 5 ----------
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {kidsProducts.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl p-4 shadow-md hover:shadow-xl hover:-translate-y-1 border border-gray-100 hover:border-sky-300 transition-all duration-300 flex flex-col"
              >
                <div className="relative w-auto sm:h-auto lg:h-60 md:h-50 rounded-xl overflow-hidden mb-3 flex items-center justify-center bg-gray-50">
                  <img
                    src={item.prophoto}
                    alt={item.proname}
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-800 mb-1 capitalize group-hover:text-sky-700 transition-colors duration-300 line-clamp-2">
                    {item.proname}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-3 capitalize group-hover:text-gray-700 transition-colors duration-300">
                    {item.prodetail}
                  </p>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-400 line-through">₹{item.proprice}</span>
                    <span className="text-lg font-bold text-green-600">₹{item.pronewprice}</span>
                  </div>
                  <button
                    onClick={() => navigate(`/details/${item.id}`)}
                    className="relative overflow-hidden bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg shadow-sm transition-all duration-300 group-hover:shadow-md"
                  >
                    <span className="relative z-10">Details</span>
                    <span className="absolute inset-0 bg-sky-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </>
  )
}
