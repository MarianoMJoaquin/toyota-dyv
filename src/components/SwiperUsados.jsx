import { useState, useEffect } from "react";
import axios from "axios"; // Importamos axios
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const SwiperUsados = () => {
  const [usedCars, setUsedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://panelweb.derkayvargas.com/api/usados?visible=1"
        ); // Obtenemos los autos usados
        const data = response.data.data; // Accedemos a la lista de autos usados

        setUsedCars(data);
        setLoading(false);
      } catch (error) {
        console.error(
          "Error al obtener los datos de la API de autos usados:",
          error
        );
        setLoading(false);
      }
    };

    fetchData();
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
        <span className="sr-only">Cargando autos usados...</span>
      </div>
    );
  }

  const renderCard = (car) => (
    <div className="catalog__item">
      <a href={`/usados/${car.slug}`} className="catalog__item-link">
        <img
          className="w-full h-72 object-cover catalog__item-img"
          src={`https://panelweb.derkayvargas.com/${car.foto.replace("public", "storage")}`} // Ruta completa para las imágenes
          alt={car.marca + " " + car.modelo}
        />
      </a>
      <div className="catalog__item-info">
        <div className="catalog__item-top">
          <span className="catalog__item-year">{car.anio}</span>
          <span>|</span>
          <span className="catalog__item-type">
            {Number(car.km).toLocaleString() + " km"}
          </span>
        </div>
        <div className="catalog__item-middle">
          <div className="catalog__item-name text-xl">
            {car.marca} {car.modelo}
          </div>
          <p className="catalog__item-text text-lg">
            {car.descripcion || "Descripción no disponible"}
          </p>
        </div>
        <div className="catalog__item-bottom">
          <a href={`/usados/${car.slug}`} className="catalog__item-btn px-5 py-2 bg-white text-black text-base rounded-full hover:bg-gray-100 transition-all">
            Ver más
          </a>
          <div className="catalog__item-price text-xl lg:text-2xl">
            <span className="catalog__item-price-number">
              ARS$ {Number(car.precio).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSlider = (cars) => (
    <Swiper
      modules={[Pagination, Navigation]}
      autoHeight={true}
      spaceBetween={10}
      slidesPerView={1}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      pagination={{ clickable: true }}
      onSlideChange={(swiper) => {
        setIsLastSlide(swiper.isEnd);
      }}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    >
      {cars.slice(0, 6).map((car) => (
        <SwiperSlide key={car.id} className="mb-5">
          {renderCard(car)}
        </SwiperSlide>
      ))}
      <SwiperSlide className="mb-5">
        <div className="catalog__item relative bg-transparent">
          {/* Fondo con efecto glassmorphism */}
          <div className="absolute inset-0 backdrop-blur-md bg-white/40"></div>
          
          {/* Estructura similar a renderCard */}
          <div className="relative z-10">
            <div className="w-full h-72 border border-white/20 rounded-t-lg"></div>
            <div className="catalog__item-info backdrop-blur-sm bg-white/20">
              <div className="catalog__item-top">
                <span className="opacity-50">•••</span>
              </div>
              <div className="catalog__item-middle flex flex-col items-center justify-center">
                <h3 className="text-2xl font-bold mb-2 text-gray-800">¿Querés ver más?</h3>
                <a 
                  href="/usados" 
                  className="group catalog__item-btn px-8 py-3 bg-red-600 text-white text-xl rounded-full hover:bg-red-700 transition-all flex items-center gap-2 mt-4"
                >
                  Ver más usados
                  <span className="transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300">
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <div className="swiper-button-prev hover:text-red-500">
        <i className="ri-arrow-left-s-line text-2xl text-white"></i>
      </div>
      <div className={`swiper-button-next hover:text-red-500 ${isLastSlide ? 'opacity-0 pointer-events-none' : ''}`}>
        <i className="ri-arrow-right-s-line text-2xl text-white"></i>
      </div>
    </Swiper>
  );

  return (
    <div className="w-full">
      <div className="p-8">{renderSlider(usedCars)}</div>
    </div>
  );
};

export default SwiperUsados;
