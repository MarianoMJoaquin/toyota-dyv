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
      {modelData.variants.find(variant => variant.hasConnectedServices === true) ? (
      <img
        src="/images/toyota-servicios-conectados.webp"
        alt="Servicios Conectados"
        className="absolute top-20 right-4 max-w-52 max-h-96 z-10"
        loading="lazy"
        decoding="async"
      />) : null}
      <section id="hero" className="hero section dark-background relative">
       
        {modelData.slug === "corolla-gr-sport" ? (
          <img
          loading="lazy"
          decoding="async"
          src="/images/corolla-gr2-3.png"
          className="hero-bg z-0"
          alt=""
          data-aos="fade-in"
        />
        ) : (
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
        )}
        <div className="container mx-auto max-h-full sm:px-4">
          
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
              {modelData.slug === "hilux-gr-sport-iv" ? (
                <a
                  href="https://youtu.be/KDcuFv60GMw?si=Vq-7jQoLKuPlvI2z"
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
                {/*<p>{modelData.variants[1]?.details?.summary?.split(";")[0]}</p> */}
                <p>{modelData.variants[0]?.details?.body_types}</p>
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
          {/* Sección de Servicios Conectados y Garantía */}
          {modelData.variants.find(variant => variant.hasConnectedServices === true) ? (
            <div className="connected-services-warranty mt-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div data-aos="fade-up" data-aos-delay="500">
                  <div className="card-item h-full">
                    <span>
                      <i className="ri-wifi-line"></i>
                    </span>
                    <h4>Servicios Conectados</h4>
                    <p>
                      Las versiones {modelData.variants
                        .filter(v => v.hasConnectedServices === true)
                        .map(v => v.name)
                        .join(", ")} cuentan con Servicios Conectados
                    </p>
                  </div>
                  
                </div>
                
                <div data-aos="fade-up" data-aos-delay="600">
                  <div className="card-item h-full">
                    <span>
                      <i className="ri-shield-check-line"></i>
                    </span>
                    <h4>Garantía</h4>
                    <p>
                    {modelData.variants[0]?.details?.warranty.replace(
                      /Garantía:/g,
                      ""
                    )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="warranty mt-4">
              <div className="grid grid-cols-1 gap-4">
                <div data-aos="fade-up" data-aos-delay="500">
                  <div className="card-item h-full">
                    <span>
                      <i className="ri-shield-check-line"></i>
                    </span>
                    <h4>Garantía</h4>
                    <p>
                      {modelData.variants[0]?.details?.warranty.replace(
                        /Garantía:/g,
                        ""
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
  </div>
  </section>

                        {/* Events/Slider Section */}
      {modelData.slug === "hilux-cabina-simple" || modelData.slug === "hilux-chasis-cabina" || modelData.slug === "sw4-gr-sport" || modelData.slug === "hiace-wagon" ? null : (
        <section id="events" className="events md:mx-10 section">
        {/* Fondo del slider */}
        {modelData.slug === "corolla-gr-sport" ? ( 
          <img
          src="/images/corolla-gr2-3.png"
          className="slider-bg"
          alt=""
          data-aos="fade-in"
        />) : (
           <img
           src={modelData.images[0]?.url}
           className="slider-bg"
           alt=""
           data-aos="fade-in"
         />
        )}

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
                      "Diseño" 
                    ],
                    descriptions: [
                      "La versión SEG equipa un tablero de información múltiple full digital de 12,3” pulgadas, mientras que las versiones XEI y XLI cuentan con un display de información de 7”. ​Además, las versiones SEG y XEI están equipadas con salidas de aire acondicionado y dos puertos USB tipo “C” en las plazas traseras.",
                      "Aire acondicionado trasero con salidas de aire en las plazas traseras, disponible en versiones SEG y XEI. Además, la versión SEG cuenta con asientos delanteros con regulación eléctrica y memoria para el conductor.",
                      "Todas las versiones de Corolla están equipadas con Toyota Safety Sense*: un paquete de seguridad activa que incorpora un radar de ondas milimétricas que, combinado con una cámara monocular, pueden detectar una variedad de peligros y alertar al conductor para evitar o mitigar accidentes. El nuevo Corolla cuenta con: Sistema de Pre-colisión frontal (PCS), Control de velocidad crucero adaptativo (ACC), Sistema de alerta de cambio de carril (LDA)* y Luces Altas Automáticas (AHB)*.",
                      "Todas las versiones cuentan con equipo multimedia con una pantalla de 10” y conectividad inalámbrica para Android Auto y Apple CarPlay.* Cargador inalámbrico para smartphones que soportan carga inalámbrica* en la versión SEG. La versión SEG incorpora paquete de Servicios Conectados (*).",
                      "Parrilla delantera tipo “panal de abeja” que aporta dinamismo y modernidad. Las versiones XEI incorporan llantas de 17”.​ Además, las versiones SEG y XEI poseen faros delanteros Bi-LED con regulación en altura."
                    ],
                  },
                  "corolla-hybrid": { 
                    title: [
                      "Confort",
                      "Equipamiento",
                      "Toyota Safety Sense",
                      "Tecnología",
                      "Diseño" 
                    ],
                    descriptions: [
                      "La versión SEG equipa un tablero de información múltiple full digital de 12,3” pulgadas, mientras que las versiones XEI y XLI cuentan con un display de información de 7”. ​Además, las versiones SEG y XEI están equipadas con salidas de aire acondicionado y dos puertos USB tipo “C” en las plazas traseras.",
                      "Aire acondicionado trasero con salidas de aire en las plazas traseras, disponible en versiones SEG y XEI. Además, la versión SEG cuenta con asientos delanteros con regulación eléctrica y memoria para el conductor.",
                      "Todas las versiones de Corolla están equipadas con Toyota Safety Sense*: un paquete de seguridad activa que incorpora un radar de ondas milimétricas que, combinado con una cámara monocular, pueden detectar una variedad de peligros y alertar al conductor para evitar o mitigar accidentes. El nuevo Corolla cuenta con: Sistema de Pre-colisión frontal (PCS), Control de velocidad crucero adaptativo (ACC), Sistema de alerta de cambio de carril (LDA)* y Luces Altas Automáticas (AHB)*.",
                      "Todas las versiones cuentan con equipo multimedia con una pantalla de 10” y conectividad inalámbrica para Android Auto y Apple CarPlay.* Cargador inalámbrico para smartphones que soportan carga inalámbrica* en la versión SEG. La versión SEG incorpora paquete de Servicios Conectados (*).",
                      "Parrilla delantera tipo “panal de abeja” que aporta dinamismo y modernidad. Las versiones XEI incorporan llantas de 17”.​ Además, las versiones SEG y XEI poseen faros delanteros Bi-LED con regulación en altura."
                    ],
                  },
                  "corolla-gr-sport": { 
                    title: [
                      "Spoiler y difusor inferior trasero",
                      "La pasión en cada puntada",
                      "Deportivo hasta la médula",
                      "Deportividad y exclusividad",
                      "Toyota Safety Sense" 
                    ],
                    descriptions: [
                      "Ambos inspirados en la icónica performance GR, guían el flujo de aire de manera precisa minimizando la resistencia aerodinámica. Además, contribuyen a reducir las turbulencias, lo que se traduce en una conducción más segura y placentera en carretera.",
                      "Textura y diseño se unen en armonía. La imagen revela la calidad de los materiales y el cuidado en cada detalle del interior del Corolla GR-S, donde el contraste del cuero y las costuras rojas evocan deportividad y elegancia.",
                      "Cada detalle cuenta en el interior del Corolla GR-S. El contraste de las costuras rojas en el volante y la palanca de cambios resalta la deportividad y la atención al detalle que caracterizan a este modelo.",
                      "El logo GR, símbolo de deportividad y pasión por el automovilismo, preside el interior del Corolla GR-S, recordándote que estás al mando de un coche único en su clase.",
                      "Todas las versiones de Corolla están equipadas con Toyota Safety Sense*: un paquete de seguridad activa que incorpora un radar de ondas milimétricas que, combinado con una cámara monocular, pueden detectar una variedad de peligros y alertar al conductor para evitar o mitigar accidentes. El nuevo Corolla GR-Sport cuenta con: Sistema de Pre-colisión frontal (PCS), Control de velocidad crucero adaptativo (ACC), Sistema de alerta de cambio de carril (LDA)* y Luces Altas Automáticas (AHB)*."
                    ],
                  },
                  "hilux-cabina-doble": { 
                    title: [
                      "Domina cualquier terreno",
                      "La pasión en cada puntada",
                      "Tecnología",
                      "La aventura comienza con un toque",
                      "Confort interior" 
                    ],
                    descriptions: [
                      "La Toyota Hilux está construida para conquistar lo imposible. Con su legendaria durabilidad y capacidad 4x4, ningún camino se le resiste. La aventura te espera, ¿estás listo?",
                      "La Toyota Hilux, con su imponente parrilla cromada y líneas definidas, no solo transmite robustez, sino que la demuestra en cada camino. Equipada con un motor turbo diésel 2.8 l de 204 CV y tracción 4x4, está lista para conquistar cualquier desafío, desde el trabajo duro hasta la aventura extrema.",
                      "Todas las versiones de Hilux cuentan pantalla táctil de 9” con USB, Bluetooth® y conectividad inalámbrica Android Auto® y Apple CarPlay®**. Las versiones SRV y SRX cuentan con cargador inalambrico para smartphones, USB tipo C en plazas traseras (x2) y paquete de servicios conectados*.",
                      "Con este botón, la potencia y la capacidad de la Hilux están a tu disposición.  Siente la emoción de tener el control y prepárate para vivir experiencias únicas.",
                      "Las versiones SRX cuentan con tapizado de cuero natural y ecológico con función de ventilación en butacas delanteras. Mientras que todas las versiones están equipadas con sensores de estacionamiento delanteros y traseros y aire acondicionado con climatizador automático digital bizona."
                    ],
                  },
                  "hilux-gr-sport-iv": { 
                    title: [
                      "Pasión por los detalles",
                      "ADN Deportivo GR-Sport",
                      "Redefiniendo la Aventura",
                      "Instrumentación Deportiva",
                      "Confort interior" 
                    ],
                    descriptions: [
                      "Siente la adrenalina GR-Sport incluso antes de arrancar el motor. El interior de la Hilux GR-Sport IV te envuelve en un ambiente deportivo y exclusivo, donde cada detalle está pensado para que vivas la conducción al máximo.",
                      "Toma el control con el volante deportivo de la Hilux GR-S. Su diseño ergonómico y detalles exclusivos te permiten sentir la conexión entre el conductor y la máquina, mientras que los pedales de aluminio completan la experiencia de manejo deportivo.",
                      "Descubre un interior donde la deportividad y la comodidad se entrelazan.  Desde los asientos deportivos con detalles en rojo y el icónico logo GR, hasta el diseño intuitivo del tablero y la tecnología al alcance de tu mano, la Hilux GR-Sport IV está lista para llevarte a la próxima aventura con un estilo inconfundible.",
                      "El tacómetro central con el logo GR te invita a explorar el máximo rendimiento, mientras que el velocímetro de fácil lectura y los indicadores analógicos te brindan información vital de un vistazo.",
                      "Esta nueva versión incorpora tapizado de cuero natural y ecológico combinado con Suede sintético perforado, apoyacabezas bordado con emblema GR, volante forrado en cuero natural microperforado con costuras rojas de diseño GR y detalles en rojo creando un interior deportivo, lujoso y confortable."
                    ],
                  },
                  "corolla-cross": { 
                    title: [
                      "Elegancia y Visión",
                      "Estilo y Presencia",
                      "Amplía tus Horizontes",
                      "Elegancia Reflectante",
                      "Firma Lumínica Inconfundible" 
                    ],
                    descriptions: [
                      "Descubre la firma lumínica que define al Corolla Cross. Sus faros estilizados, con detalles cromados y una línea bi-LED distintiva, proyectan una mirada moderna y sofisticada. Más que un elemento estético, este diseño sugiere tecnología de iluminación avanzada, listo para iluminar tus caminos con claridad y seguridad.",
                      "Descubre la evolución del diseño con el Toyota Corolla Cross. Su parrilla delantera rediseñada, con un patrón 3D panal distintivo y el emblemático logo de Toyota, irradia modernidad y confianza. Los faros afilados, integrados a la perfección, complementan su estética elegante y funcional.  Listo para conquistar la ciudad y más allá.",
                      "Disfruta de una nueva perspectiva con el techo panorámico del Corolla Cross.  Siente la libertad y la conexión con el exterior mientras el sol y el cielo iluminan el interior.  Este detalle, que eleva la experiencia de viaje, te invita a descubrir nuevos horizontes y disfrutar cada aventura al máximo.",
                      "Descubre un detalle que combina estilo y seguridad en el Corolla Cross. Su espejo retrovisor, con un diseño aerodinámico y un acabado elegante, se integra a la perfección con la estética del vehículo. Más allá de su función esencial, este espejo refleja la calidad y la atención al detalle que caracterizan al Corolla Cross.",
                      "Destaca en cada camino con el diseño distintivo de la parte trasera del Corolla Cross. El grupo óptico, con su forma elegante y detalles luminosos de alta tecnología, no solo te brinda visibilidad, sino que también define tu estilo. Una combinación perfecta de funcionalidad y estética que refleja la innovación y el dinamismo del Corolla Cross."
                    ],
                  },
                  "corolla-cross-hybrid": { 
                    title: [
                      "Elegancia Reflectante",
                      "El Futuro de la Movilidad:",
                      "Elegancia y Visión",
                      "Listo para la Ciudad",
                      "Trasera que Impresiona" 
                    ],
                    descriptions: [
                      "Descubre un detalle que combina estilo y seguridad en el Corolla Cross. Su espejo retrovisor, con un diseño aerodinámico y un acabado elegante, se integra a la perfección con la estética del vehículo. Más allá de su función esencial, este espejo refleja la calidad y la atención al detalle que caracterizan al Corolla Cross Hybrid.",
                      "Avanza con estilo y eficiencia. El Corolla Cross Hybrid combina un diseño elegante y moderno con la innovadora tecnología híbrida de Toyota.  Su silueta aerodinámica y detalles distintivos te invitan a descubrir una nueva forma de conducir, más sostenible y emocionante.",
                      "Descubre la firma lumínica que define al Corolla Cross. Sus faros estilizados, con detalles cromados y una línea bi-LED distintiva, proyectan una mirada moderna y sofisticada. Más que un elemento estético, este diseño sugiere tecnología de iluminación avanzada, listo para iluminar tus caminos con claridad y seguridad.",
                      "Domina las calles con el Corolla Cross Hybrid. Su diseño moderno y elegante, con líneas definidas y detalles distintivos, te hará destacar en cada recorrido.  Disfruta de una conducción suave y eficiente gracias a su tecnología híbrida, que te permite ahorrar combustible y reducir emisiones, sin sacrificar estilo ni desempeño.  La ciudad te espera.",
                      "El portón trasero de fácil acceso y la amplia capacidad de carga te brindan la versatilidad que necesitas para tu día a día.  Eficiencia y estilo se unen en un solo vehículo."
                    ],
                  },
                  "corolla-cross-gr-sport": { 
                    title: [
                      "Estilo Deportivo Elevado",
                      "Deportividad en Cada Ángulo",
                      "Mirada Deportiva",
                      "Trasera que deslumbra",
                      "Frontal Imponente" 
                    ],
                    descriptions: [
                      "Atrévete a destacar con el Corolla Cross GR-Sport. Su diseño exterior, con detalles exclusivos como la parrilla frontal distintiva, los faldones laterales deportivos y las llantas de aleación de diseño único, irradia deportividad y sofisticación en cada ángulo.  Una combinación perfecta de estilo y funcionalidad lista para conquistar la ciudad.",
                      "La parte trasera del Corolla Cross GR-Sport no solo llama la atención, la exige.  Desde el alerón deportivo y el difusor inferior con detalles en rojo, hasta el emblema GR-Sport que confirma su ADN de competición, cada elemento está diseñado para transmitir dinamismo y emoción.  Un diseño que refleja tu espíritu aventurero y te invita a conquistar nuevos caminos.",
                      "El espíritu deportivo del Corolla Cross GR-Sport. Su parrilla frontal exclusiva, combinada con el diseño aerodinámico y detalles en negro brillante, le dan una presencia imponente y distintiva.  Listo para conquistar la ciudad con estilo y agilidad.",
                      "La parte trasera del Toyota Corolla Cross GR-Sport no solo llama la atención, sino que la exige. Desde el alerón deportivo que corona su diseño, hasta el difusor inferior con detalles en rojo que evoca su espíritu de competición, cada elemento está diseñado para transmitir dinamismo y deportividad en cada camino.  Un diseño que refleja tu pasión por la aventura y te invita a conquistar nuevos horizontes con un estilo inconfundible.",
                      "La parrilla delantera exclusiva, que evoca la pasión por el automovilismo, irradia un estilo audaz y distintivo. Su diseño aerodinámico y detalles en negro brillante realzan su presencia imponente, mientras que los faros afilados completan una mirada que no pasa desapercibida. Listo para conquistar cada camino con un estilo inconfundible."
                    ],
                  },
                  "sw4": { 
                    title: [
                      "Control Total",
                      "Máxima Seguridad y Confort",
                      "Espacio para la Aventura",
                      "Confort y Control",
                      "Lista para la Aventura" 
                    ],
                    descriptions: [
                      "Adapta la SW4 a cada terreno y situación con su intuitivo selector de modos de conducción.  Elige entre los modos Eco, Normal y Sport para optimizar el rendimiento y la eficiencia, o activa el modo Off-Road para enfrentar los desafíos más exigentes.  Máximo control y versatilidad al alcance de tu mano.",
                      "La Toyota SW4 no solo te lleva a la aventura, sino que te protege en cada camino. Con este el interior espacioso y confortable, equipado con múltiples airbags para una máxima seguridad.  Disfruta de cada viaje con la tranquilidad de saber que estás rodeado de la mejor protección, sin sacrificar comodidad ni estilo.",
                      "Prepárate para compartir cada aventura con total comodidad. La Toyota SW4 te ofrece un interior espacioso y versátil, ideal para familias y grupos de amigos.  Disfruta de asientos confortables y amplio espacio para las piernas, incluso en la tercera fila.  Ya sea un viaje largo o una escapada de fin de semana, la SW4 te brinda la comodidad que necesitas para llegar a tu destino con estilo y relajación.",
                      "Sumérgete en un interior diseñado para el confort y el control.  Los asientos de cuero te envuelven en un abrazo de comodidad, mientras que el diseño intuitivo del tablero pone todo al alcance de tu mano.  Disfruta de cada viaje con la SW4, donde la calidad se siente en cada detalle y la conducción se convierte en una experiencia placentera.",
                      "Domina cualquier terreno con la Toyota SW4, una SUV diseñada para la aventura.  Su robusta construcción y su potente motor te llevan a donde quieras llegar, sin importar las condiciones del camino.  Con la SW4, la exploración no tiene límites."
                    ],
                  },
                  "hiace-furgon": { 
                    title: [
                      "Máximo Espacio para tu Negocio",
                      "Visión Clara, Diseño Inteligente",
                      "Iluminando el Camino del Éxito",
                      "Repostaje Inteligente",
                      "Comodidad y Control al Alcance de tu Mano" 
                    ],
                    descriptions: [
                      "Amplía las posibilidades de tu negocio con la Toyota Hiace Furgón.  Su generoso espacio de carga te permite transportar todo lo que necesitas, desde herramientas y materiales hasta mercancías y equipos.  La configuración interior flexible se adapta a tus necesidades específicas, brindándote la versatilidad que buscas para optimizar tu trabajo.  Con la Hiace Furgón, tu negocio llega más lejos.",
                      "La Hiace Furgón no solo te ofrece espacio y capacidad, sino también seguridad y practicidad en cada detalle.  Su espejo retrovisor de diseño inteligente te brinda una visión clara del entorno, permitiéndote maniobrar con confianza y facilidad, incluso en espacios reducidos.  Un elemento esencial para tu trabajo diario.",
                      "La Hiace Furgón no solo te lleva a tu destino, sino que ilumina el camino hacia el éxito de tu negocio.  Su faro delantero de diseño moderno y funcional te brinda una visibilidad clara y segura en cada viaje, permitiéndote trabajar con confianza y eficiencia, sin importar las condiciones del camino.  Un detalle que marca la diferencia en tu día a día.",
                      "La Hiace Furgón está diseñada para facilitar tu día a día, incluso en los detalles.  Su tapa de combustible integrada se abre de forma práctica y sencilla, permitiéndote repostar de manera rápida y eficiente.  Un detalle inteligente que te ahorra tiempo y esfuerzo, para que puedas concentrarte en lo que realmente importa: tu trabajo.",
                      "Experimenta una conducción placentera y segura con el volante de la Hiace Furgón. Su diseño ergonómico y revestimiento de alta calidad te brindan un agarre cómodo y firme, permitiéndote mantener el control en todo momento.  Además, los controles integrados te permiten acceder a las funciones esenciales del vehículo de forma intuitiva, sin distraerte del camino.  Seguridad y confort se unen para que disfrutes cada viaje al máximo."
                    ],
                  },
                  "hiace-commuter": { 
                    title: [
                      "Viaja con Comodidad y Estilo",
                      "Iluminando la Comodidad",
                      "Siempre Conectado",
                      "A Cada Pasajero, Su Confort",
                      "Modernidad y Confort" 
                    ],
                    descriptions: [
                      "La Hiace Commuter está diseñada para transportar a tus pasajeros con la máxima comodidad y estilo.  Sus amplios y confortables asientos ofrecen un espacio generoso para que todos disfruten del viaje.  Ya sea un traslado de negocios o una excursión familiar, la HiAce Commuter convierte cada trayecto en una experiencia placentera.",
                      "En la Hiace Commuter, la comodidad de tus pasajeros es primordial.  Esta imagen revela detalles que marcan la diferencia, como las luces de lectura individuales y los controles de fácil acceso.  Pequeños detalles que se traducen en un viaje más placentero para todos.",
                      "La Hiace Commuter está diseñada para mantenerte conectado en todo momento.  Con sus puertos USB de carga rápida, tanto tú como tus pasajeros podrán mantener sus dispositivos listos para usar durante todo el viaje.  Un detalle práctico que facilita el día a día y asegura que nadie se quede sin batería.",
                      "La Hiace Commuter piensa en la comodidad de todos. Con controles de climatización, se puede ajustar la temperatura y la dirección del flujo de aire para crear un ambiente perfecto.  Viajes placenteros para todos, sin importar el clima exterior.",
                      "Diseñado para el trabajo, el tablero de la Hiace Commuter ofrece funcionalidad y practicidad al alcance de tu mano.  Desde el sistema de infoentretenimiento hasta los controles de climatización y el amplio espacio de almacenamiento, cada detalle está pensado para facilitar tu día a día.  Conduce con confianza y eficiencia."
                    ],
                  },
                  "hiace-wagon": { 
                    title: [
                      "Viaja con Comodidad y Estilo HDP",
                      "Iluminando la Comodidad",
                      "Siempre Conectado",
                      "A Cada Pasajero, Su Confort",
                      "Modernidad y Confort" 
                    ],
                    descriptions: [
                      "La Hiace Commuter está diseñada para transportar a tus pasajeros con la máxima comodidad y estilo.  Sus amplios y confortables asientos ofrecen un espacio generoso para que todos disfruten del viaje.  Ya sea un traslado de negocios o una excursión familiar, la HiAce Commuter convierte cada trayecto en una experiencia placentera.",
                      "En la Hiace Commuter, la comodidad de tus pasajeros es primordial.  Esta imagen revela detalles que marcan la diferencia, como las luces de lectura individuales y los controles de fácil acceso.  Pequeños detalles que se traducen en un viaje más placentero para todos.",
                      "La Hiace Commuter está diseñada para mantenerte conectado en todo momento.  Con sus puertos USB de carga rápida, tanto tú como tus pasajeros podrán mantener sus dispositivos listos para usar durante todo el viaje.  Un detalle práctico que facilita el día a día y asegura que nadie se quede sin batería.",
                      "La Hiace Commuter piensa en la comodidad de todos. Con controles de climatización, se puede ajustar la temperatura y la dirección del flujo de aire para crear un ambiente perfecto.  Viajes placenteros para todos, sin importar el clima exterior.",
                      "Diseñado para el trabajo, el tablero de la Hiace Commuter ofrece funcionalidad y practicidad al alcance de tu mano.  Desde el sistema de infoentretenimiento hasta los controles de climatización y el amplio espacio de almacenamiento, cada detalle está pensado para facilitar tu día a día.  Conduce con confianza y eficiencia."
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
      )}

      {/* Version Section */}
      {modelData.slug === "sw4-gr-sport" || modelData.slug === "hiace-wagon" || modelData.slug === "hiace-furgon" || modelData.slug === "hiace-commuter" ? null : (
        <section id="menu" className="menu lg:mx-5 seccion">
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
                {modelData.slug === "corolla-gr-sport" ? (
                  <CarComponent360
                    client:load
                    initialModel="corolla_gr_sport"
                    initialVersion="GR-Sport"
                    initialColor="white-perl"
                    initialSubversion="GR-SPORT 2.0 CVT"
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
                    initialColor="silver"
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
                    initialSubversion="XLI 2.0 CVT"
                  />
                ) : null}
                {modelData.slug === "corolla-cross-hybrid" ? (
                  <CarComponent360
                    client:load
                    initialModel="corolla_cross_hybrid"
                    initialVersion="xei"
                    initialColor="white-perl"
                    initialSubversion="XEI HEV 1.8 eCVT"
                  />
                ) : null}
                {modelData.slug === "corolla-cross-gr-sport" ? (
                  <CarComponent360
                    client:load
                    initialModel="corolla_cross_gr_sport"
                    initialVersion="gr-sport"
                    initialColor="white-perl"
                    initialSubversion="2.0 CVT GR-SPORT"
                  />
                ) : null}
                {modelData.slug === "sw4" ? (
                  <CarComponent360
                    client:load
                    initialModel="sw4"
                    initialVersion="srx"
                    initialColor="white-perl"
                    initialSubversion="SRX 4X4 6AT 7A"
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Gallery Section */}
      {/**<section className="galeria lg:mx-5 section">
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
      </section> */}
      {modelData.slug === "corolla-gr-sport" || modelData.slug === "hilux-cabina-simple" || modelData.slug === "hilux-chasis-cabina" || modelData.slug === "sw4-gr-sport" || modelData.slug === "hiace-wagon" ? null : (
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
      )}

      {/* Corolla GR Sport galería */}
      {modelData.slug === "corolla-gr-sport" ? (
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
                  <div
                    className="col-span-1 md:col-span-2 lg:col-span-2 transform transition-all duration-300 ease-in-out"
                  >
                    <div className="galeria-item">
                      <a
                        href="/images/galeria-corollagr/images/exterior/1.jpeg"
                        className="galeria-exterior"
                        data-gallery="galeria-exterior"
                      >
                        <img
                          src="/images/galeria-corollagr/images/exterior/1.jpeg"
                          className="w-full transition-opacity duration-300 ease-in-out"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="col-span-1 md:col-span-2 lg:col-span-2 transform transition-all duration-300 ease-in-out"
                  >
                    <div className="galeria-item">
                      <a
                        href="/images/galeria-corollagr/images/exterior/12.jpeg"
                        className="galeria-exterior"
                        data-gallery="galeria-exterior"
                      >
                        <img
                          src="/images/galeria-corollagr/images/exterior/12.jpeg"
                          className="w-full transition-opacity duration-300 ease-in-out"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="col-span-1 md:col-span-2 lg:col-span-2 transform transition-all duration-300 ease-in-out"
                  >
                    <div className="galeria-item">
                      <a
                        href="/images/galeria-corollagr/images/exterior/8.jpeg"
                        className="galeria-exterior"
                        data-gallery="galeria-exterior"
                      >
                        <img
                          src="/images/galeria-corollagr/images/exterior/8.jpeg"
                          className="w-full transition-opacity duration-300 ease-in-out"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="col-span-1 md:col-span-3 lg:col-span-3 transform transition-all duration-300 ease-in-out"
                  >
                    <div className="galeria-item">
                      <a
                        href="/images/galeria-corollagr/images/exterior/6.jpeg"
                        className="galeria-exterior"
                        data-gallery="galeria-exterior"
                      >
                        <img
                          src="/images/galeria-corollagr/images/exterior/6.jpeg"
                          className="w-full transition-opacity duration-300 ease-in-out"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="col-span-1 md:col-span-3 lg:col-span-3 transform transition-all duration-300 ease-in-out"
                  >
                    <div className="galeria-item">
                      <a
                        href="/images/galeria-corollagr/images/exterior/13.jpeg"
                        className="galeria-exterior"
                        data-gallery="galeria-exterior"
                      >
                        <img
                          src="/images/galeria-corollagr/images/exterior/13.jpeg"
                          className="w-full transition-opacity duration-300 ease-in-out"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
            </div>
          </div>

          <div className={`galeria-container ${activeView === 'interior' ? 'active' : ''}`}>
          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-4">
                  <div
                    className="col-span-1 md:col-span-3 lg:col-span-3 transform transition-all duration-300 ease-in-out"
                  >
                    <div className="galeria-item">
                      <a
                        href="/images/galeria-corollagr/images/interior/1.jpeg"
                        className="galeria-interior"
                        data-gallery="galeria-interior"
                      >
                        <img
                          src="/images/galeria-corollagr/images/interior/1.jpeg"
                          className="w-full transition-opacity duration-300 ease-in-out"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="col-span-1 md:col-span-3 lg:col-span-3 transform transition-all duration-300 ease-in-out"
                  >
                    <div className="galeria-item">
                      <a
                        href="/images/galeria-corollagr/images/interior/2.jpeg"
                        className="galeria-interior"
                        data-gallery="galeria-interior"
                      >
                        <img
                          src="/images/galeria-corollagr/images/interior/2.jpeg"
                          className="w-full transition-opacity duration-300 ease-in-out"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="col-span-1 md:col-span-3 lg:col-span-3 transform transition-all duration-300 ease-in-out"
                  >
                    <div className="galeria-item">
                      <a
                        href="/images/galeria-corollagr/images/interior/3.jpeg"
                        className="galeria-interior"
                        data-gallery="galeria-interior"
                      >
                        <img
                          src="/images/galeria-corollagr/images/interior/3.jpeg"
                          className="w-full transition-opacity duration-300 ease-in-out"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="col-span-1 md:col-span-3 lg:col-span-3 transform transition-all duration-300 ease-in-out"
                  >
                    <div className="galeria-item">
                      <a
                        href="/images/galeria-corollagr/images/interior/4.jpeg"
                        className="galeria-interior"
                        data-gallery="galeria-interior"
                      >
                        <img
                          src="/images/galeria-corollagr/images/interior/4.jpeg"
                          className="w-full transition-opacity duration-300 ease-in-out"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
            </div>
          </div>
        </div>
      </section>
      ) : null}

      {/* Hiace Wagon galería */}
      {modelData.slug === "hiace-wagon" ? (
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
                  <div
                    className="col-span-1 md:col-span-3 lg:col-span-3 transform transition-all duration-300 ease-in-out"
                  >
                    <div className="galeria-item">
                      <a
                        href="/images/galeria-hiace-wagon/exterior/1.jpeg"
                        className="galeria-exterior"
                        data-gallery="galeria-exterior"
                      >
                        <img
                          src="/images/galeria-hiace-wagon/exterior/1.jpeg"
                          className="w-full transition-opacity duration-300 ease-in-out"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="col-span-1 md:col-span-3 lg:col-span-3 transform transition-all duration-300 ease-in-out"
                  >
                    <div className="galeria-item">
                      <a
                        href="/images/galeria-hiace-wagon/exterior/2.jpeg"
                        className="galeria-exterior"
                        data-gallery="galeria-exterior"
                      >
                        <img
                          src="/images/galeria-hiace-wagon/exterior/2.jpeg"
                          className="w-full transition-opacity duration-300 ease-in-out"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="col-span-1 md:col-span-3 lg:col-span-3 transform transition-all duration-300 ease-in-out"
                  >
                    <div className="galeria-item">
                      <a
                        href="/images/galeria-hiace-wagon/exterior/3.jpeg"
                        className="galeria-exterior"
                        data-gallery="galeria-exterior"
                      >
                        <img
                          src="/images/galeria-hiace-wagon/exterior/3.jpeg"
                          className="w-full transition-opacity duration-300 ease-in-out"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="col-span-1 md:col-span-3 lg:col-span-3 transform transition-all duration-300 ease-in-out"
                  >
                    <div className="galeria-item">
                      <a
                        href="/images/galeria-hiace-wagon/exterior/4.jpeg"
                        className="galeria-exterior"
                        data-gallery="galeria-exterior"
                      >
                        <img
                          src="/images/galeria-hiace-wagon/exterior/4.jpeg"
                          className="w-full transition-opacity duration-300 ease-in-out"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
            </div>
          </div>

          <div className={`galeria-container ${activeView === 'interior' ? 'active' : ''}`}>
          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-4">
                  <div
                    className="col-span-1 md:col-span-3 lg:col-span-3 transform transition-all duration-300 ease-in-out"
                  >
                    <div className="galeria-item">
                      <a
                        href="/images/galeria-hiace-wagon/interior/1.jpeg"
                        className="galeria-interior"
                        data-gallery="galeria-interior"
                      >
                        <img
                          src="/images/galeria-hiace-wagon/interior/1.jpeg"
                          className="w-full transition-opacity duration-300 ease-in-out"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="col-span-1 md:col-span-3 lg:col-span-3 transform transition-all duration-300 ease-in-out"
                  >
                    <div className="galeria-item">
                      <a
                        href="/images/galeria-hiace-wagon/interior/2.jpeg"
                        className="galeria-interior"
                        data-gallery="galeria-interior"
                      >
                        <img
                          src="/images/galeria-hiace-wagon/interior/2.jpeg"
                          className="w-full transition-opacity duration-300 ease-in-out"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>                  
            </div>
          </div>
        </div>
      </section>
      ) : null}

      {/* SW4 GR-Sport galería */}
      {modelData.slug === "sw4-gr-sport" ? (
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
                  <div
                    className="col-span-1 md:col-span-2 lg:col-span-2 transform transition-all duration-300 ease-in-out"
                  >
                    <div className="galeria-item">
                      <a
                        href="/images/galeria-sw4gr/exterior/1.webp"
                        className="galeria-exterior"
                        data-gallery="galeria-exterior"
                      >
                        <img
                          src="/images/galeria-sw4gr/exterior/1.webp"
                          className="w-full transition-opacity duration-300 ease-in-out"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="col-span-1 md:col-span-2 lg:col-span-2 transform transition-all duration-300 ease-in-out"
                  >
                    <div className="galeria-item">
                      <a
                        href="/images/galeria-sw4gr/exterior/2.webp"
                        className="galeria-exterior"
                        data-gallery="galeria-exterior"
                      >
                        <img
                          src="/images/galeria-sw4gr/exterior/2.webp"
                          className="w-full transition-opacity duration-300 ease-in-out"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="col-span-1 md:col-span-2 lg:col-span-2 transform transition-all duration-300 ease-in-out"
                  >
                    <div className="galeria-item">
                      <a
                        href="/images/galeria-sw4gr/exterior/3.webp"
                        className="galeria-exterior"
                        data-gallery="galeria-exterior"
                      >
                        <img
                          src="/images/galeria-sw4gr/exterior/3.webp"
                          className="w-full transition-opacity duration-300 ease-in-out"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="col-span-1 md:col-span-3 lg:col-span-3 transform transition-all duration-300 ease-in-out"
                  >
                    <div className="galeria-item">
                      <a
                        href="/images/galeria-sw4gr/exterior/4.webp"
                        className="galeria-exterior"
                        data-gallery="galeria-exterior"
                      >
                        <img
                          src="/images/galeria-sw4gr/exterior/4.webp"
                          className="w-full transition-opacity duration-300 ease-in-out"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="col-span-1 md:col-span-3 lg:col-span-3 transform transition-all duration-300 ease-in-out"
                  >
                    <div className="galeria-item">
                      <a
                        href="/images/galeria-sw4gr/exterior/5.webp"
                        className="galeria-exterior"
                        data-gallery="galeria-exterior"
                      >
                        <img
                          src="/images/galeria-sw4gr/exterior/5.webp"
                          className="w-full transition-opacity duration-300 ease-in-out"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
            </div>
          </div>

          <div className={`galeria-container ${activeView === 'interior' ? 'active' : ''}`}>
          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-4">
                  <div
                    className="col-span-1 md:col-span-2 lg:col-span-2 transform transition-all duration-300 ease-in-out"
                  >
                    <div className="galeria-item">
                      <a
                        href="/images/galeria-sw4gr/interior/8.webp"
                        className="galeria-interior"
                        data-gallery="galeria-interior"
                      >
                        <img
                          src="/images/galeria-sw4gr/interior/8.webp"
                          className="w-full transition-opacity duration-300 ease-in-out"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="col-span-1 md:col-span-2 lg:col-span-2 transform transition-all duration-300 ease-in-out"
                  >
                    <div className="galeria-item">
                      <a
                        href="/images/galeria-sw4gr/interior/2.webp"
                        className="galeria-interior"
                        data-gallery="galeria-interior"
                      >
                        <img
                          src="/images/galeria-sw4gr/interior/2.webp"
                          className="w-full transition-opacity duration-300 ease-in-out"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="col-span-1 md:col-span-2 lg:col-span-2 transform transition-all duration-300 ease-in-out"
                  >
                    <div className="galeria-item">
                      <a
                        href="/images/galeria-sw4gr/interior/3.webp"
                        className="galeria-interior"
                        data-gallery="galeria-interior"
                      >
                        <img
                          src="/images/galeria-sw4gr/interior/3.webp"
                          className="w-full transition-opacity duration-300 ease-in-out"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="col-span-1 md:col-span-3 lg:col-span-3 transform transition-all duration-300 ease-in-out"
                  >
                    <div className="galeria-item">
                      <a
                        href="/images/galeria-sw4gr/interior/10.webp"
                        className="galeria-interior"
                        data-gallery="galeria-interior"
                      >
                        <img
                          src="/images/galeria-sw4gr/interior/10.webp"
                          className="w-full transition-opacity duration-300 ease-in-out"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="col-span-1 md:col-span-3 lg:col-span-3 transform transition-all duration-300 ease-in-out"
                  >
                    <div className="galeria-item">
                      <a
                        href="/images/galeria-sw4gr/interior/5.webp"
                        className="galeria-interior"
                        data-gallery="galeria-interior"
                      >
                        <img
                          src="/images/galeria-sw4gr/interior/5.webp"
                          className="w-full transition-opacity duration-300 ease-in-out"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
            </div>
          </div>
        </div>
      </section>
      ) : null}

      {/* Test Drive Section */}

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
                <a href="/contacto#sucursales">
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
                  <a
                    href={link.url}
                    target="_blank"
                    className="block"
                  >
                    <div className="card-item h-full border border-gray-50 p-8 hover:border-[#eb001b] rounded-2xl transition-all duration-300">
                      <span>
                        <i className={getCustomImage(link.type)}></i>
                      </span>
                      <h4 className="material-link text-xl md:text-2xl lg:text-3xl">
                        {link.type === "brochure"
                          ? "Ficha Técnica"
                          : link.type === "consumption"
                            ? "Información de consumo"
                            : "Información sobre airbags"}
                      </h4>
                    </div>
                  </a>
                </div>
              );
            })}

            {/* Card adicional para información de airbag */}
            <div
              data-aos="fade-up"
              data-aos-delay={(modelData.links.length + 1) * 100}
            >
              <a
                href="https://media.toyota.com.ar/52dca697-53be-41e1-9562-e9d6a346687a.pdf"
                target="_blank"
                className="block"
              >
                <div className="card-item h-full border border-gray-50 p-8 hover:border-[#eb001b] rounded-2xl transition-all duration-300">
                  <span>
                    <i className="ri-information-line"></i>
                  </span>
                  <h4 className="material-link text-xl md:text-2xl lg:text-3xl">
                    Información sobre airbags
                  </h4>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
