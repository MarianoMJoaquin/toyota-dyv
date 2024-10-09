import { useState, useEffect } from "react";
import axios from 'axios';  // Importamos axios
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const TabSliderComponent = () => {
  const [activeTab, setActiveTab] = useState("Autos");
  const [autos, setAutos] = useState([]);
  const [pickups, setPickups] = useState([]);
  const [suv, setSuv] = useState([]);
  const [comerciales, setComerciales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Hacemos la solicitud al endpoint proxy de Astro en lugar de la API externa
        const response = await axios.get("/api/vehicles");
        const data = response.data;

        // Filtramos los vehículos por categorías
        const autosData = data.filter(vehicle =>
          vehicle.categories.some(category => category.name === "Auto")
        );
        const pickupsData = data.filter(vehicle =>
          vehicle.categories.some(category => category.name === "Pick Up")
        );
        const suvData = data.filter(vehicle =>
          vehicle.categories.some(category => category.name === "SUV")
        );
        const comercialesData = data.filter(vehicle =>
          vehicle.categories.some(category => category.name === "Comercial")
        );

        // Actualizamos los estados con los datos filtrados
        setAutos(autosData);
        setPickups(pickupsData);
        setSuv(suvData);
        setComerciales(comercialesData);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los datos de la API:", error);
        setLoading(false);
      }
    };

    fetchData(); // Llamamos a la función que obtiene los datos
  }, []);

  if (loading) {
    return <p className="text-center">Cargando datos...</p>;
  }

  const renderSlider = (vehicles) => (
    <Swiper
      modules={[Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
    >
      {vehicles.map(vehicle => (
        <SwiperSlide key={vehicle.id}>
          <div className="flex flex-col items-center">
            <img
              src={vehicle.defaultImage?.formats?.small?.url || vehicle.images[0]?.formats?.small?.url}
              alt={vehicle.name}
            />
            <p className="text-center mt-2">{vehicle.name}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );

  return (
    <div className="w-full">
      {/* Botones de los tabs */}
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => setActiveTab("Autos")}
          className={`px-4 py-2 text-lg ${activeTab === "Autos" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Autos
        </button>
        <button
          onClick={() => setActiveTab("Pick-Ups")}
          className={`px-4 py-2 text-lg ${activeTab === "Pick-Ups" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Pick-Ups
        </button>
        <button
          onClick={() => setActiveTab("SUV")}
          className={`px-4 py-2 text-lg ${activeTab === "SUV" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          SUV
        </button>
        <button
          onClick={() => setActiveTab("Comerciales")}
          className={`px-4 py-2 text-lg ${activeTab === "Comerciales" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Comerciales
        </button>
      </div>

      {/* Contenido del tab activo */}
      <div>
        {activeTab === "Autos" && renderSlider(autos)}
        {activeTab === "Pick-Ups" && renderSlider(pickups)}
        {activeTab === "SUV" && renderSlider(suv)}
        {activeTab === "Comerciales" && renderSlider(comerciales)}
      </div>
    </div>
  );
};

export default TabSliderComponent;
