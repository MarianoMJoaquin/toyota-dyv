import { useState, useEffect } from "react";
import axios from "axios"; // Importamos axios
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const ModelosTabSliderComponent = () => {
  const [activeTab, setActiveTab] = useState("Autos");
  const [autos, setAutos] = useState([]);
  const [pickups, setPickups] = useState([]);
  const [suv, setSuv] = useState([]);
  const [comerciales, setComerciales] = useState([]);
  const [deportivos, setDeportivos] = useState([]);
  const [hibridos, setHibridos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/vehicles");
        const data = response.data;

        // Filtramos los vehículos por categorías
        const autosData = data.filter(
          (vehicle) =>
            vehicle.categories.some((category) => category.name === "Auto") &&
            !vehicle.tags.includes("gazoo_racing") &&
            !vehicle.tags.includes("hybrid")
        );
        const pickupsData = data.filter(
          (vehicle) =>
            vehicle.categories.some((category) => category.name === "Pick Up") &&
            !vehicle.tags.includes("gazoo_racing") &&
            !vehicle.tags.includes("hybrid")
        );
        const suvData = data.filter(
          (vehicle) =>
            vehicle.categories.some((category) => category.name === "SUV") &&
            !vehicle.tags.includes("gazoo_racing") &&
            !vehicle.tags.includes("hybrid")
        );
        const comercialesData = data.filter((vehicle) =>
          vehicle.categories.some((category) => category.name === "Comercial")
        );
        const deportivosData = data.filter((vehicle) =>
          vehicle.tags.includes("gazoo_racing")
        );
        const hibridosData = data.filter((vehicle) =>
          vehicle.tags.includes("hybrid")
        );

        // Actualizamos los estados con los datos filtrados
        setAutos(autosData);
        setPickups(pickupsData);
        setSuv(suvData);
        setComerciales(comercialesData);
        setDeportivos(deportivosData);
        setHibridos(hibridosData);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los datos de la API:", error);
        setLoading(false);
      }
    };

    fetchData(); // Llamamos a la función que obtiene los datos
  }, []);

  if (loading) {
    return (
      <div
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
      </div>
    );
  }

  const renderCard = (vehicle) => {
    const heroImage = vehicle.images.find((img) => img.data.viewType === "banner");
    const imageUrl = heroImage?.formats?.large?.url || vehicle.defaultImage?.formats?.small?.url;

    return (
      <div className="catalog__item">
        <a href="javascript:void(0)" className="catalog__item-link">
          <img
            className="w-full h-80 object-cover catalog__item-img"
            src={imageUrl}
            alt={vehicle.name}
          />
        </a>
        <div className="catalog__item-info">
          {/* <div className="catalog__item-top">
            <span className="catalog__item-year">hola</span>
            <span>|</span>
            <span className="catalog__item-type">hola</span>
          </div>*/}
          <div className="catalog__item-middle">
            <div className="catalog__item-name">{vehicle.name}</div>
            {/*<p className="catalog__item-text">holaaaa</p>*/}
          </div>
          <div className="catalog__item-bottom">
            <a href={`/modelos/${vehicle.slug}`} className="catalog__item-btn px-5 py-2 bg-white text-black text-base rounded-full hover:bg-gray-100 transition-all">
              Ver más
            </a>
            <div className="catalog__item-price text-xl">
              <span className="catalog__item-price-text">Desde </span>
              <span className="catalog__item-price-number">
                {vehicle.defaultPrice?.currency}${" "}
                {vehicle.defaultPrice?.amount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSlider = (vehicles) => (
    <Swiper
      modules={[Pagination, Navigation]}
      autoHeight={true}
      spaceBetween={10}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      pagination={{ clickable: true }}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: vehicles.length > 2 ? 3 : 2 },
      }}
    >
      {vehicles.map((vehicle) => (
        <SwiperSlide key={vehicle.id} className="mb-5">
          {renderCard(vehicle)}
        </SwiperSlide>
      ))}
      <div className="swiper-button-prev">
        <i className="ri-arrow-left-s-line text-2xl text-white"></i>
      </div>
      <div className="swiper-button-next">
        <i className="ri-arrow-right-s-line text-2xl text-white"></i>
      </div>
    </Swiper>
  );

  return (
    <div className="w-full">
      {/* Botones de los tabs */}
        <div className="flex justify-center space-x-4 mb-4 border-b border-gray-300 max-sm:hidden">
          {["Autos", "Pick-Ups", "SUV", "Comerciales", "Deportivos", "Híbridos"].map((tab) => (
            <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`relative px-4 py-2 text-xl transition-all ${
            activeTab === tab
              ? "text-red-600 after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:bg-red-600"
              : "cursor-pointer py-2 px-4 text-gray-600 border-b-2 border-transparent hover:border-black hover:transition hover:text-black"
          }`}
            >
          {tab}
            </button>
          ))}
        </div>

        {/* Select para dispositivos móviles */}
        <div className="sm:hidden mb-4">
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="block py-2.5 w-full focus:text-black text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer"
          >
            {["Autos", "Pick-Ups", "SUV", "Comerciales", "Deportivos", "Híbridos"].map((tab) => (
          <option key={tab} value={tab}>
            {tab}
          </option>
            ))}
          </select>
        </div>

        {/* Contenido del tab activo */}
      <div className="py-8">
        {activeTab === "Autos" && renderSlider(autos)}
        {activeTab === "Pick-Ups" && renderSlider(pickups)}
        {activeTab === "SUV" && renderSlider(suv)}
        {activeTab === "Comerciales" && renderSlider(comerciales)}
        {activeTab === "Deportivos" && renderSlider(deportivos)}
        {activeTab === "Híbridos" && renderSlider(hibridos)}
      </div>
      <div className="flex justify-end">
        <a
          href="/modelos"
          className="text-gray-500 rounded-lg text-xl hover:text-black transition-all inline-flex items-center relative group overflow-hidden"
        >
          <span className="flex items-center mb-1">
            <span className="flex items-center leading-none">Ver todos los modelos</span>
            <i className="ri-arrow-right-s-line text-2xl flex items-center leading-none transform group-hover:translate-x-1 transition-transform duration-300"></i>
          </span>
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
        </a>
      </div>
    </div>
  );
};

export default ModelosTabSliderComponent;
