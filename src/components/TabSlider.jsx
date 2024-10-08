import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation, Pagination } from 'swiper/modules';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const TabSlider = () => {
  const [activeTab, setActiveTab] = useState('autos');

  // Función para cambiar las tabs con animación
  const showTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Tab Navigation */}
      <ul className="flex justify-center space-x-4 mb-8 border-b">
        <li
          className={`cursor-pointer py-2 px-4 text-gray-600 border-b-2 border-transparent hover:border-red-500 ${
            activeTab === 'autos' ? 'border-red-500' : ''
          }`}
          onClick={() => showTab('autos')}
        >
          Autos
        </li>
        <li
          className={`cursor-pointer py-2 px-4 text-gray-600 border-b-2 border-transparent hover:border-red-500 ${
            activeTab === 'pickups' ? 'border-red-500' : ''
          }`}
          onClick={() => showTab('pickups')}
        >
          Pick-Ups
        </li>
        <li
          className={`cursor-pointer py-2 px-4 text-gray-600 border-b-2 border-transparent hover:border-red-500 ${
            activeTab === 'cross' ? 'border-red-500' : ''
          }`}
          onClick={() => showTab('cross')}
        >
          Cross
        </li>
      </ul>

      {/* Tab Content */}
      <div id="tab-content">
        {/* Autos Tab */}
        <div
          className={`swiper-container transition-opacity duration-500 transform ${
            activeTab === 'autos' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 hidden'
          }`}
        >
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            loop={true}
            navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
            pagination={{ clickable: true }}
          >
            <SwiperSlide>
              <div className="bg-white rounded-lg shadow p-4">Auto 1</div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white rounded-lg shadow p-4">Auto 2</div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white rounded-lg shadow p-4">Auto 3</div>
            </SwiperSlide>

            <div className="swiper-button-prev">
                <i className="ri-arrow-left-s-line text-2xl text-white"></i>
              </div>
              <div className="swiper-button-next">
                <i className="ri-arrow-right-s-line text-2xl text-white"></i>
              </div>
          </Swiper>
        </div>

        {/* Pick-Ups Tab */}
        <div
          className={`swiper-container transition-opacity duration-500 transform ${
            activeTab === 'pickups' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 hidden'
          }`}
        >
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            loop={true}
            navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
            pagination={{ clickable: true }}
          >
            <SwiperSlide>
              <div className="bg-white rounded-lg shadow p-4">Pick-Up 1</div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white rounded-lg shadow p-4">Pick-Up 2</div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white rounded-lg shadow p-4">Pick-Up 3</div>
            </SwiperSlide>

            <div className="swiper-button-prev">
                <i className="ri-arrow-left-s-line text-2xl text-white"></i>
              </div>
              <div className="swiper-button-next">
                <i className="ri-arrow-right-s-line text-2xl text-white"></i>
              </div>
          </Swiper>
        </div>

        {/* Cross Tab */}
        <div
          className={`swiper-container transition-opacity duration-500 transform ${
            activeTab === 'cross' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 hidden'
          }`}
        >
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            loop={true}
            navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
            pagination={{ clickable: true }}
          >
            <SwiperSlide>
              <div className="bg-white rounded-lg shadow p-4">Cross 1</div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white rounded-lg shadow p-4">Cross 2</div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white rounded-lg shadow p-4">Cross 3</div>
            </SwiperSlide>

            <div className="swiper-button-prev">
                <i className="ri-arrow-left-s-line text-2xl text-white"></i>
              </div>
              <div className="swiper-button-next">
                <i className="ri-arrow-right-s-line text-2xl text-white"></i>
              </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default TabSlider;
