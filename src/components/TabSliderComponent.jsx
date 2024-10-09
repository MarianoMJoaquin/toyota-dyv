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
    return (<div
      role="status"
      style={{ height: "65vh" }}
      className="flex items-center justify-center"
    >
      <svg
        aria-hidden="true"
        className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Cargando auto...</span>
    </div>);
  }

  const renderCard = (vehicle) => (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <img
        className="w-full h-72 object-cover"
        src={vehicle.images[0]?.formats?.large?.url || vehicle.defaultImage?.formats?.small?.url}
        alt={vehicle.name}
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{vehicle.name}</h3>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
          Ver más
        </button>
      </div>
    </div>
  );

  const renderSlider = (vehicles) => (
    <Swiper
      modules={[Pagination]}
      autoHeight={true}
      spaceBetween={10}
      slidesPerView={1}
      pagination={{ clickable: true }}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }}
    >
      {vehicles.map(vehicle => (
        <SwiperSlide key={vehicle.id} className="mb-5">
          {renderCard(vehicle)}
        </SwiperSlide>
      ))}
    </Swiper>
  );

  return (
    <div className="w-full" style={{height: "65vh"}}>
      {/* Botones de los tabs */}
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => setActiveTab("Autos")}
          className={`px-4 py-2 text-lg rounded-lg focus:outline-none transition-all duration-300 ${activeTab === "Autos" ? "bg-blue-500 text-white shadow-lg" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
        >
          Autos
        </button>
        <button
          onClick={() => setActiveTab("Pick-Ups")}
          className={`px-4 py-2 text-lg rounded-lg focus:outline-none transition-all duration-300 ${activeTab === "Pick-Ups" ? "bg-blue-500 text-white shadow-lg" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
        >
          Pick-Ups
        </button>
        <button
          onClick={() => setActiveTab("SUV")}
          className={`px-4 py-2 text-lg rounded-lg focus:outline-none transition-all duration-300 ${activeTab === "SUV" ? "bg-blue-500 text-white shadow-lg" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
        >
          SUV
        </button>
        <button
          onClick={() => setActiveTab("Comerciales")}
          className={`px-4 py-2 text-lg rounded-lg focus:outline-none transition-all duration-300 ${activeTab === "Comerciales" ? "bg-blue-500 text-white shadow-lg" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
        >
          Comerciales
        </button>
      </div>

      {/* Contenido del tab activo */}
      <div className="p-8">
        {activeTab === "Autos" && renderSlider(autos)}
        {activeTab === "Pick-Ups" && renderSlider(pickups)}
        {activeTab === "SUV" && renderSlider(suv)}
        {activeTab === "Comerciales" && renderSlider(comerciales)}
      </div>
    </div>
  );
};

export default TabSliderComponent;
