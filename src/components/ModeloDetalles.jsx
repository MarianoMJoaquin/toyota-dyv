import { useState, useEffect } from "react";
// Cambiar importaciones de Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import CarComponent360 from "./CarComponent360";
import "../assets/styles/modelos.css";
import "swiper/swiper-bundle.css";

// Función auxiliar para determinar el grid
const getGridSpan = (totalImages, index) => {
  if (totalImages === 1) return "col-span-1 md:col-span-6 lg:col-span-6";
  if (totalImages === 2) return "col-span-1 md:col-span-3 lg:col-span-3";
  if (totalImages === 3) return "col-span-1 md:col-span-2 lg:col-span-2";
  if (totalImages === 4) {
    return index < 2 
      ? "col-span-1 md:col-span-3 lg:col-span-3"
      : "col-span-1 md:col-span-3 lg:col-span-3";
  }
  // 5 o más imágenes
  return index < 3 
    ? "col-span-1 md:col-span-2 lg:col-span-2"
    : "col-span-1 md:col-span-3 lg:col-span-3";
};

export default function ModeloDetalles({ slug }) {
  const [modelData, setModelData] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [activeView, setActiveView] = useState('exterior'); // Nuevo estado para controlar la vista activa

  useEffect(() => {
    async function fetchModelData() {
      try {
        const response = await fetch("/api/vehicles");
        const data = await response.json();
        const model = data.find((m) => m.slug === slug);
        setModelData(model);
      } catch (error) {
        console.error("Error fetching model data:", error);
      } finally {
        setCargando(false);
      }
    }

    fetchModelData();
  }, [slug]);

  // Modificar el useEffect de GLightbox
  useEffect(() => {
    if (modelData && typeof window !== "undefined" && window.GLightbox) {
      // Destruir instancias previas si existen
      if (window.galleryLightbox) {
        window.galleryLightbox.destroy();
      }
      if (window.videoLightbox) {
        window.videoLightbox.destroy();
      }

      // Crear instancia para la galería
      window.galleryLightbox = window.GLightbox({
        selector: `.galeria-${activeView}`,
        touchNavigation: true,
        loop: true,
        autoplayVideos: true
      });

      // Crear instancia para el video del hero
      window.videoLightbox = window.GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        autoplayVideos: true
      });

      return () => {
        // Destruir instancias al desmontar el componente
        if (window.galleryLightbox) {
          window.galleryLightbox.destroy();
        }
        if (window.videoLightbox) {
          window.videoLightbox.destroy();
        }
      };
    }
  }, [modelData, activeView]);

  if (cargando) {
    return (
      <div
        role="status"
        style={{ height: "100vh" }}
        className="flex items-center justify-center"
      >
        <svg
          aria-hidden="true"
          className="w-16 h-16 text-gray-200 animate-spin fill-red-600"
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

  if (!modelData) {
    return (window.location.href = "/404");
  }

  return (
    <main className="main">
      <section id="hero" className="hero section dark-background">
        <img
          loading="lazy"
          decoding="async"
          src={
            modelData.images.find((img) => img.data.viewType === "banner")?.url
          }
          className="hero-bg"
          alt=""
          data-aos="fade-in"
        />
        <div className="container mx-auto sm:px-4">
          <div className="flex max-sm:flex-col justify-center gap-20 items-center lg:justify-between">
            <div className="lg:w-2/3 pr-4 pl-4 flex flex-col items-center lg:items-start">
              <p data-aos="fade-up" data-aos-delay="200">
                Toyota
              </p>
              <h2 data-aos="fade-up" data-aos-delay="100">
                {modelData.name}
              </h2>
              <div
                className="hidden md:block"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <a
                  href={`https://dyv.e.toyota.com.ar/inventory/${modelData.slug}`}
                  className="cta-btn mt-4"
                >
                  Cotizar ahora
                </a>
              </div>
            </div>
            <div className="lg:w-1/3 pr-4 pl-4 flex items-center justify-center mt-5 lg:mt-0">
              {modelData.slug === "yaris-hatchback" ? (
                <a
                  href="https://youtu.be/nxRG2RrQFbc?si=FNkJrMsjQgaT40Ql"
                  className="glightbox pulsating-play-btn"
                ></a>
              ) : null}
              {modelData.slug === "yaris-sedan" ? (
                <a
                  href="https://youtu.be/nxRG2RrQFbc?si=FNkJrMsjQgaT40Ql"
                  className="glightbox pulsating-play-btn"
                ></a>
              ) : null}
              {modelData.slug === "corolla" ? (
                <a
                  href="https://youtu.be/bfZj4rnxvNA?si=F_qXjEiy9zws-QDM"
                  className="glightbox pulsating-play-btn"
                ></a>
              ) : null}
              {modelData.slug === "corolla-hybrid" ? (
                <a
                  href="https://youtu.be/bfZj4rnxvNA?si=F_qXjEiy9zws-QDM"
                  className="glightbox pulsating-play-btn"
                ></a>
              ) : null}
              {modelData.slug === "hilux-cabina-doble" ? (
                <a
                  href="https://youtu.be/q9SOy7bm_wo?si=LEcMNOIhjMiht965"
                  className="glightbox pulsating-play-btn"
                ></a>
              ) : null}
              {modelData.slug === "corolla-cross" ? (
                <a
                  href="https://youtu.be/N9wWHAkhLyo?si=sYMYI4X5OknMh821"
                  className="glightbox pulsating-play-btn"
                ></a>
              ) : null}
              {modelData.slug === "corolla-cross-hybrid" ? (
                <a
                  href="https://youtu.be/N9wWHAkhLyo?si=sYMYI4X5OknMh821"
                  className="glightbox pulsating-play-btn"
                ></a>
              ) : null}
              {modelData.slug === "sw4" ? (
                <a
                  href="https://youtu.be/5PekEJU9S8Q?si=RHNDxRYse25UrKe6"
                  className="glightbox pulsating-play-btn"
                ></a>
              ) : null}
            </div>
            <div className="lg:w-1/3 pr-4 pl-4 items-center justify-center mt-5 lg:mt-0 hidden max-sm:block">
                <a
                  href={`https://dyv.e.toyota.com.ar/inventory/${modelData.slug}`}
                  className="cta-btn"
                >
                  Cotizar ahora
                </a>
            </div>
          </div>
        </div>
      </section>

      {/* Specs Section */}
      <section id="why-us" className="why-us lg:mx-5 section">
        <div className="container mx-auto section-title" data-aos="fade-up">
          <h2>{modelData.name.toUpperCase()}</h2>
          <p>Especificaciones</p>
        </div>

        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="card-item h-full">
                <span>
                  <i className="ri-speed-up-line"></i>
                </span>
                <h4>
                    Motor
                </h4>
                <p>
                  {modelData.variants[0]?.details?.motor?.replace(/;;/g, "")}
                </p>
              </div>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="card-item h-full">
                <span>
                  <i className="ri-car-line"></i>
                </span>
                <h4>
                    Diseño
                </h4>
                <p>{modelData.variants[2]?.details?.summary?.split(";")[0]}</p>
                <p>{modelData.variants[2]?.details?.summary?.split(";")[1]}</p>
                <p>{modelData.variants[2]?.details?.summary?.split(";")[2]}</p>
                <p>{modelData.variants[2]?.details?.summary?.split(";")[3]}</p>
                <p>{modelData.variants[2]?.details?.summary?.split(";")[4]}</p>
                <p>{modelData.variants[2]?.details?.summary?.split(";")[5]}</p>
                <p>{modelData.variants[2]?.details?.summary?.split(";")[7]}</p>
              </div>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="card-item h-full">
                <span>
                  <i className="ri-git-branch-line"></i>
                </span>
                <h4>
                    Transmisión
                </h4>
                <p>
                  {modelData.variants[0]?.details?.transmission?.description?.replace(
                    /;;/g,
                    ""
                  )}
                </p>
              </div>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="card-item h-full">
                <span>
                  <i className="ri-user-line"></i>
                </span>
                <h4>
                    Confort
                </h4>
                <p>
                  {modelData.variants[0]?.details?.passengers?.replace(
                    /;/g,
                    ""
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events/Slider Section */}
      <section id="events" className="events md:mx-10 section">
        {/* Fondo del slider */}
        <img
          src={modelData.images[0]?.url}
          className="slider-bg"
          alt=""
          data-aos="fade-in"
        />

        <div className="container mx-auto px-4">
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{
              clickable: true,
              el: '.swiper-pagination',
            }}
            className="init-swiper"
            data-aos="fade-up" 
            data-aos-delay="100"
          >
            {modelData.images
              .filter((img) => img.type === "gallery" || img.type === "inventory")
              .slice(0, 5)
              .map((image, index) => {
                const descriptions = {
                  "yaris-hatchback": { 
                    title: [
                      "Conectividad en todas sus versiones",
                      "Toyota Safety Sense",
                      "Diseño exterior", 
                    ],
                    descriptions: [
                      "Audio con pantalla táctil LCD de 6.8\" con conectividad Apple Car Play® & Android Auto®. Equipado con climatizador automático digital, cámara de estacionamiento y control de velocidad crucero, disponibles en versiones XLS+ y S.",
                      "Yaris ofrece, en las versión S, Sistema de Pre-colisión frontal (PCS)* y Sistema de alerta de cambio de carril (LDA)*. Estos sistemas avanzados de asistencia a la conducción complementan al conductor en diversas situaciones de peligro para mitigar o evitar accidentes de tránsito.",
                      "Diseño frontal con ópticas delanteras LED con regulación en altura, disponible en la versión S. Llantas de aleación de 16” para versiones XLS+ y S."
                    ],
                  },
                  "yaris-sedan": { 
                    title: [
                      "Diseño exterior",
                      "Toyota Safety Sense",
                      "Conectividad en todas sus versiones", 
                    ],
                    descriptions: [
                      "Equipada con airbags frontales y laterales para los pasajeros delanteros, airbag de rodilla para el conductor, y airbags de cortina delanteros y traseros, brindando un ambiente seguro para todos los ocupantes.",
                      "Yaris ofrece, en las versión S, Sistema de Pre-colisión frontal (PCS)* y Sistema de alerta de cambio de carril (LDA)*. Estos sistemas avanzados de asistencia a la conducción complementan al conductor en diversas situaciones de peligro para mitigar o evitar accidentes de tránsito.",
                      "Audio con pantalla táctil LCD de 6.8\" con conectividad Apple Car Play® & Android Auto®. Equipado con climatizador automático digital, cámara de estacionamiento y control de velocidad crucero, disponibles en versiones XLS+ y S."
                    ],
                  },
                  "corolla": { 
                    title: [
                      "Confort",
                      "Equipamiento",
                      "Toyota Safety Sense",
                      "Tecnología", 
                    ],
                    descriptions: [
                      "La versión SEG equipa un tablero de información múltiple full digital de 12,3” pulgadas, mientras que las versiones XEI y XLI cuentan con un display de información de 7”. ​Además, las versiones SEG y XEI están equipadas con salidas de aire acondicionado y dos puertos USB tipo “C” en las plazas traseras.",
                      "Aire acondicionado trasero con salidas de aire en las plazas traseras, disponible en versiones SEG y XEI. Además, la versión SEG cuenta con asientos delanteros con regulación eléctrica y memoria para el conductor.",
                      "Todas las versiones de Corolla están equipadas con Toyota Safety Sense*: un paquete de seguridad activa que incorpora un radar de ondas milimétricas que, combinado con una cámara monocular, pueden detectar una variedad de peligros y alertar al conductor para evitar o mitigar accidentes. El nuevo Corolla cuenta con: Sistema de Pre-colisión frontal (PCS), Control de velocidad crucero adaptativo (ACC), Sistema de alerta de cambio de carril (LDA)* y Luces Altas Automáticas (AHB)*.",
                      "Todas las versiones cuentan con equipo multimedia con una pantalla de 10” y conectividad inalámbrica para Android Auto y Apple CarPlay.* Cargador inalámbrico para smartphones que soportan carga inalámbrica* en la versión SEG. La versión SEG incorpora paquete de Servicios Conectados (*)."
                    ],
                  },

                };
                
                const modelTitle = descriptions[modelData.slug]?.title || Array(5).fill(""); // Si no hay titulos, se llena con 5 strings vacíos
                const modelDescriptions = descriptions[modelData.slug]?.descriptions || Array(5).fill(""); // Si no hay descripciones propiamente dichas, se llena con 5 strings vacíos

                return (
                  <SwiperSlide key={index}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 event-item">
                      <div className="w-full">
                        <img 
                          src={image.url} 
                          className="w-full h-auto object-cover rounded-lg" 
                          alt="" 
                        />
                      </div>
                      <div className="w-full flex flex-col justify-center py-4 lg:py-0">
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
                          {modelTitle[index]}
                        </h3>
                        <p className="text-base md:text-lg">
                          {modelDescriptions[index]}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            <div className="swiper-pagination !relative !bottom-0 mt-8"></div>
          </Swiper>
        </div>
      </section>

      {/* Version Section */}
      <section id="menu" className="menu lg:mx-5 section">
        <div className="container mx-auto section-title" data-aos="fade-up">
          <h2>{modelData.name.toUpperCase()}</h2>
          <p>Encontrá tu versión</p>
        </div>

        <div className="container mx-auto sm:px-4">
          <div
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="menu-item">
              <div className="menu-content gap-4 flex-col justify-center items-center">
                {modelData.slug === "yaris-hatchback" ? (
                  <CarComponent360
                    client:load
                    initialModel="yaris_hatchback"
                    initialVersion="xs"
                    initialColor="red"
                    initialSubversion="XS 1.5 6M/T 5P"
                  />
                ) : null}
                {modelData.slug === "yaris-sedan" ? (
                  <CarComponent360
                    client:load
                    initialModel="yaris_sedan"
                    initialVersion="xls"
                    initialColor="gray"
                    initialSubversion="XLS 1.5 6M/T 4P"
                  />
                ) : null}
                {modelData.slug === "corolla" ? (
                  <CarComponent360
                    client:load
                    initialModel="corolla"
                    initialVersion="xli"
                    initialColor="white-perl"
                    initialSubversion="2.0 XLI CVT"
                  />
                ) : null}
                {modelData.slug === "corolla-hybrid" ? (
                  <CarComponent360
                    client:load
                    initialModel="corolla_hybrid"
                    initialVersion="xei"
                    initialColor="white-perl"
                    initialSubversion="HEV 1.8 XEI eCVT"
                  />
                ) : null}
                {modelData.slug === "hilux-cabina-simple" ? (
                  <CarComponent360
                    client:load
                    initialModel="hilux_cabina_simple"
                    initialVersion="dx"
                    initialColor="white"
                    initialSubversion="DX 4X2/4X4 MT"
                  />
                ) : null}
                {modelData.slug === "hilux-cabina-doble" ? (
                  <CarComponent360
                    client:load
                    initialModel="hilux_cabina_doble"
                    initialVersion="dx"
                    initialColor="gray"
                    initialSubversion="DX 4X2/4X4 6MT"
                  />
                ) : null}
                {modelData.slug === "hilux-chasis-cabina" ? (
                  <CarComponent360
                    client:load
                    initialModel="hilux_chasis_cabina"
                    initialVersion="dx"
                    initialColor="white"
                    initialSubversion="DX 4X2/4X4 MT"
                  />
                ) : null}
                {modelData.slug === "corolla-cross" ? (
                  <CarComponent360
                    client:load
                    initialModel="corolla_cross"
                    initialVersion="xli"
                    initialColor="red"
                    initialSubversion="XS 2.0 CVT"
                  />
                ) : null}
                {modelData.slug === "corolla-cross-hybrid" ? (
                  <CarComponent360
                    client:load
                    initialModel="corolla_cross_hybrid"
                    initialVersion="xs"
                    initialColor="white-perl"
                    initialSubversion="XS 1.8 HEV eCVT"
                  />
                ) : null}
                {modelData.slug === "sw4" ? (
                  <CarComponent360
                    client:load
                    initialModel="sw4"
                    initialVersion="srx"
                    initialColor="black"
                    initialSubversion="SRX 4X4 7A/T"
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="galeria lg:mx-5 section">
        <div className="container mx-auto section-title" data-aos="fade-up">
          <h2>{modelData.name.toUpperCase()}</h2>
          <p>Galería</p>
        </div>

        <div className="galeria-tab-buttons">
          <button 
            className={`galeria-tab-button ${activeView === 'exterior' ? 'active' : ''}`}
            onClick={() => setActiveView('exterior')}
          >
            Exterior
          </button>
          <button 
            className={`galeria-tab-button ${activeView === 'interior' ? 'active' : ''}`}
            onClick={() => setActiveView('interior')}
          >
            Interior
          </button>
        </div>

        <div className="galeria-wrapper container mx-auto">
          <div className={`galeria-container ${activeView === 'exterior' ? 'active' : ''}`}>
            <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-4">
              {modelData.images
                .filter(img => {
                  const isGalleryOrInventory = img.type === "gallery" || img.type === "inventory";
                  return isGalleryOrInventory && img.data?.viewType === 'exterior';
                })
                .slice(0, 5)
                .map((image, index, filteredArray) => (
                  <div
                    key={index}
                    className={`${getGridSpan(filteredArray.length, index)} transform transition-all duration-300 ease-in-out`}
                  >
                    <div className="galeria-item">
                      <a
                        href={image.url}
                        className="galeria-exterior"
                        data-gallery="galeria-exterior"
                      >
                        <img 
                          src={image.url} 
                          className="w-full transition-opacity duration-300 ease-in-out" 
                          alt="" 
                        />
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className={`galeria-container ${activeView === 'interior' ? 'active' : ''}`}>
            <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-4">
              {modelData.images
                .filter(img => {
                  const isGalleryOrInventory = img.type === "gallery" || img.type === "inventory";
                  return isGalleryOrInventory && img.data?.viewType === 'interior';
                })
                .slice(0, 5)
                .map((image, index, filteredArray) => (
                  <div
                    key={index}
                    className={`${getGridSpan(filteredArray.length, index)} transform transition-all duration-300 ease-in-out`}
                  >
                    <div className="galeria-item">
                      <a
                        href={image.url}
                        className="galeria-interior"
                        data-gallery="galeria-interior"
                      >
                        <img 
                          src={image.url} 
                          className="w-full transition-opacity duration-300 ease-in-out" 
                          alt="" 
                        />
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      <section id="test-drive" className="test-drive lg:mx-5 section red-background">
          <div className="container mx-auto section-title" data-aos="fade-up">
            <h2>{modelData.name.toUpperCase()}</h2>
            <p>Solicitá un Test Drive</p>
          </div>

          <div className="container mx-auto">
            <div className="flex flex-wrap gap-6 px-4">
              <div
                className="lg:w-[calc(50%-12px)] w-full"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <a href="/test-drive">
                  <div className="card-item border border-gray-300 p-8 hover:border-[#eb001b] rounded-2xl transition-all duration-300 h-full">
                    <span className="inline-block mb-4">
                      <i className="ri-car-line text-3xl text-[#eb001b] bg-red-50 p-4 rounded-full"></i>
                    </span>
                    <h4 className="text-3xl font-bold my-4 hover:text-[#eb001b] transition-colors duration-300 items-center">
                        Solicitar un Test Drive
                    </h4>
                    <p className="text-gray-600 text-2xl mb-6">
                      Probá tu {modelData.name} en la concesionaria más cercana.*
                    </p>
                  </div>
                  <div className="mt-4 pl-8">
                    <p className="text-base text-gray-500 italic">
                      *Sujeto a disponibilidad de stock.
                    </p>
                  </div>
                </a>
              </div>

              <div
                className="lg:w-[calc(50%-12px)] w-full"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <a href="/concesionarias">
                  <div className="card-item border border-gray-300 p-8 hover:border-[#eb001b] rounded-2xl transition-all duration-300 h-full">
                    <span className="inline-block mb-4">
                      <i className="ri-map-pin-line text-3xl text-[#eb001b] bg-red-50 p-4 rounded-full"></i>
                    </span>
                    <h4 className="text-3xl font-bold my-4 hover:text-[#eb001b] transition-colors duration-300 items-center">
                        Encontrá tu concesionaria
                    </h4>
                    <p className="text-gray-600 text-2xl mb-6">
                      Ubicá la concesionaria más cercana a tu domicilio.
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

      

        {/* Material descargable */}
      <section
        id="material-descargable"
        className="material-descargable lg:mx-5 section"
      >
        <div className="container mx-auto section-title" data-aos="fade-up">
          <h2>{modelData.name.toUpperCase()}</h2>
          <p>Material descargable</p>
        </div>

        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modelData.links.map((link, index) => {
              const getCustomImage = (type) => {
                switch (type) {
                  case 'brochure':
                    return 'ri-file-text-line';
                  case 'consumption':
                    return 'ri-bar-chart-horizontal-line';
                  default:
                    return 'https://media.toyota.com.ar/icons/default.png';
                }
              };

              return (
                <div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={(index + 1) * 100}
                >
                  <div className="card-item h-full">
                    <span>
                      <i className={getCustomImage(link.type)}></i>
                    </span>
                    <h4>
                      <a
                        href={link.url}
                        target="_blank"
                        className="material-link text-xl md:text-2xl lg:text-3xl"
                      >
                        {link.type === "brochure"
                          ? "Ficha Técnica"
                          : link.type === "consumption"
                            ? "Información de consumo"
                            : "Información sobre airbags"}
                      </a>
                    </h4>
                  </div>
                </div>
              );
            })}

            {/* Card adicional para información de airbag */}
            <div
              data-aos="fade-up"
              data-aos-delay={(modelData.links.length + 1) * 100}
            >
              <div className="card-item h-full">
                <span>
                  <i className="ri-information-line"></i>
                </span>
                <h4>
                  <a
                    href="https://media.toyota.com.ar/52dca697-53be-41e1-9562-e9d6a346687a.pdf"
                    target="_blank"
                    className="material-link text-xl md:text-2xl lg:text-3xl"
                  >
                    Información sobre airbags
                  </a>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
