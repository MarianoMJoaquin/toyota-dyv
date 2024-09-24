import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, Grid, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import 'swiper/css/grid';
import 'swiper/css/effect-fade';

export default function AutoDetalles({ slug }) {
  const [detallesAuto, setDetallesAuto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    if (slug) {
      const fetchDetallesAuto = async () => {
        try {
          const respuesta = await fetch(`https://panelweb.derkayvargas.com/api/usados/${slug}`);
          const data = await respuesta.json();
          setDetallesAuto(data.data);
          setCargando(false);
        } catch (error) {
          console.error("Error al cargar los detalles del auto:", error);
        }
      };

      fetchDetallesAuto();
    }
  }, [slug]);

  if (cargando) {
    return (
      <div role="status" className="flex justify-center items-center">
        <svg
          aria-hidden="true"
          className="inline w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
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

  return (
    <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-8">
      {/* Contenedor principal con miniaturas y galería */}
      <div className="flex flex-col">
        {/* Galería principal, a la derecha */}
        <div>
          <Swiper
            modules={[Navigation, Pagination, Thumbs, EffectFade]}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            effect="fade"
            loop={true}
            thumbs={{ swiper: thumbsSwiper }}
            className="rounded-lg"
          >
            {detallesAuto.photos.map((photo, index) => (
              <SwiperSlide key={index}>
                <img
                  src={`https://panelweb.derkayvargas.com${photo.public_path}`}
                  alt={`Imagen ${index + 1}`}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </SwiperSlide>
            ))}

            {/* Botones de navegación personalizados */}
            <div className="swiper-button-prev">
              <i className="ri-arrow-left-s-line text-3xl text-white"></i>
            </div>
            <div className="swiper-button-next">
              <i className="ri-arrow-right-s-line text-3xl text-white"></i>
            </div>
          </Swiper>
        </div>

        {/* Miniaturas en columna, a la izquierda */}
        <div className="">
          <Swiper
            modules={[Grid]}
            onSwiper={setThumbsSwiper}
            slidesPerView={5}
            spaceBetween={10}
            freeMode={true}
            grid={{ rows: 2, fill: "row" }}
            watchSlidesVisibility={true}
            watchSlidesProgress={true}
            className="rounded-lg"
          >
            {detallesAuto.photos.map((photo, index) => (
              <SwiperSlide key={index}>
                <img
                  src={`https://panelweb.derkayvargas.com${photo.public_path}`}
                  alt={`Miniatura ${index + 1}`}
                  className="w-full h-20 object-cover rounded-lg cursor-pointer"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>    

      </div>

      {/* Información del auto */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">
          {detallesAuto.marca} {detallesAuto.modelo}
        </h2>
        <p className="text-xl text-gray-700">Año: {detallesAuto.anio}</p>
        <p className="text-xl text-gray-700">Kilometraje: {detallesAuto.km} km</p>
        <p className="text-xl text-gray-700">Color: {detallesAuto.color}</p>
        <p className="text-xl font-semibold text-red-600">Precio: ${Number(detallesAuto.precio).toLocaleString()}</p>
        <p className="text-xl text-gray-700">Estado: {detallesAuto.estado}</p>
        <p className="text-xl text-gray-700">Transmisión: {detallesAuto.transmision}</p>
        <p className="text-xl text-gray-700">Combustible: {detallesAuto.combustible}</p>
        {detallesAuto.uct === 1 ? (
          <p className="text-xl text-green-600 font-semibold">Certificado Toyota</p>
        ) : (
          <p className="text-xl text-gray-600">No certificado</p>
        )}
      </div>
    </div>
  );
}
