import { useState, useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/css';
import CarComponent360 from './CarComponent360';
import '../assets/styles/modelos.css';


export default function ModeloDetalles({ slug }) {
  const [modelData, setModelData] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function fetchModelData() {
      try {
        const response = await fetch('/api/vehicles');
        const data = await response.json();
        const model = data.find(m => m.slug === slug);
        setModelData(model);
      } catch (error) {
        console.error('Error fetching model data:', error);
      } finally {
        setCargando(false);
      }
    }

    fetchModelData();
  }, [slug]);

  useEffect(() => {
    if (modelData) {
      const swiper = new Swiper('.init-swiper', {
        spaceBetween: 20,
        slidesPerView: "auto",
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });
    }
  }, [modelData]);

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
    )
  }

  if (!modelData) {
    return window.location.href = '/404';
  }

  return (
    
    <main className="main">
      
        <section id="hero" className="hero section dark-background">
          <img src={modelData.images.find(img => img.data.viewType === "banner")?.formats?.large?.url} className="hero-bg" alt="" data-aos="fade-in" />
          <div className="container mx-auto sm:px-4">
            <div className="flex flex-wrap justify-center">
          <div className="lg:w-2/3 pr-4 pl-4 flex flex-col items-center lg:items-start">
            <p data-aos="fade-up" data-aos-delay="200">Toyota</p>
            <h2 data-aos="fade-up" data-aos-delay="100">{modelData.name}</h2>
            <div className="flex mt-4" data-aos="fade-up" data-aos-delay="300">
              <a href={`https://dyv.e.toyota.com.ar/inventory/${modelData.slug}`} className="cta-btn">Cotizar ahora</a>
            </div>
          </div>
          <div className="lg:w-1/3 pr-4 pl-4 flex items-center justify-center mt-5 lg:mt-0">
            <a href="#" className="glightbox pulsating-play-btn"></a>
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
          <div className="flex flex-wrap gap-y-4">
        <div className="lg:w-1/4 pr-4 pl-4" data-aos="fade-up" data-aos-delay="100">
          <div className="card-item">
            <span><i className="ri-speed-up-line"></i></span>
            <h4><a href="" className="stretched-link">Motor</a></h4>
            <p>{modelData.variants[0]?.details?.motor?.replace(/;;/g, '')}</p>
          </div>
        </div>

        <div className="lg:w-1/4 pr-4 pl-4" data-aos="fade-up" data-aos-delay="200">
          <div className="card-item">
            <span><i className="ri-car-line"></i></span>
            <h4><a href="" className="stretched-link">Diseño</a></h4>
            {/*{modelData.variants[0]?.details?.summary?.split(';;').map((item, index) => (
              <p key={index}>{item}<br /></p>
            ))} */}
            <p>{modelData.variants[0]?.details?.summary?.split(';;')[0]}</p>
            <p>{modelData.variants[0]?.details?.summary?.split(';;')[3]}</p>
            <p>{modelData.variants[0]?.details?.summary?.split(';;')[4]}</p>
          </div>
        </div>

        <div className="lg:w-1/4 pr-4 pl-4" data-aos="fade-up" data-aos-delay="300">
          <div className="card-item">
            <span><i className="ri-git-branch-line"></i></span>
            <h4><a href="" className="stretched-link">Transmisión</a></h4>
            <p>{modelData.variants[0]?.details?.transmission?.description?.replace(/;;/g, '')}</p>
          </div>
        </div>

        <div className="lg:w-1/4 pr-4 pl-4" data-aos="fade-up" data-aos-delay="400">
          <div className="card-item">
            <span><i className="ri-user-line"></i></span>
            <h4><a href="" className="stretched-link">Confort</a></h4>
            <p>{modelData.variants[0]?.details?.passengers?.replace(/;;/g, '')}</p>
          </div>
        </div>
          </div>
        </div>
      </section>

      {/* Events/Slider Section */}
      <section id="events" className="events 2xl:mx-44 xl:mx-5 lg:mx-5 section">
        {/* Fondo del slider */}
              <img src={modelData.images[0]?.url} className="slider-bg" alt="" data-aos="fade-in" />
              
              <div className="container mx-auto sm:px-4">
              <div className="swiper init-swiper" data-aos="fade-up" data-aos-delay="100">
                <div className="swiper-wrapper">
                {modelData.images.filter(img => img.type === "gallery" || img.type === "inventory").slice(0, 5).map((image, index) => (
                <div key={index} className="swiper-slide">
                  <div className="flex flex-wrap gy-4 event-item">
                  <div className="lg:w-1/2 pr-4 pl-4">
                    <img src={image.url} className="max-w-full h-auto" alt="" />
                  </div>
                  <div className="lg:w-1/2 pr-4 pl-4 pt-4 lg:pt-0 flex flex-col justify-center content">
                    <h3>{modelData.name}</h3>
                    <p>{image.data?.description || modelData.variants[0]?.details?.summary}</p>
                  </div>
                  </div>
                </div>
                ))}
                </div>
                <div className="swiper-pagination"></div>
              </div>
              </div>
                </section>

                {/* Version Section */}
      <section id="menu" className="menu lg:mx-5 section">
        <div className="container mx-auto section-title" data-aos="fade-up">
          <h2>{modelData.name.toUpperCase()}</h2>
          <p>Encontrá tu versión</p>
        </div>

        <div className="container mx-auto sm:px-4">   
          <div className="flex flex-wrap" data-aos="fade-up" data-aos-delay="200">
            <div className="menu-item">
              <div className="menu-content gap-4 flex-col justify-center items-center">
                { modelData.slug === 'corolla' ? <CarComponent360 client:load initialModel="corolla" initialVersion="xli" initialColor="red" initialSubversion="2.0 XLI CVT"/> : null }
                { modelData.slug === 'yaris-hatchback' ? <CarComponent360 client:load initialModel="yaris_hatchback" initialVersion="xs" initialColor="red" initialSubversion="XS 1.5 6M/T 5P"/> : null }
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="gallery 2xl:mx-44 lg:mx-5 section">
        <div className="container mx-auto section-title" data-aos="fade-up">
          <h2>{modelData.name.toUpperCase()}</h2>
          <p>Galería</p>
        </div>

        <div className="flex flex-wrap mx-6 md:mx-6 lg:mx-16" data-aos="fade-up" data-aos-delay="100">
          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-4">
            {modelData.images.filter(img => img.type === "gallery" || img.type === "inventory").slice(0, 5).map((image, index) => (
              <div key={index} className={`col-span-1 md:col-span-${index < 3 ? '2' : '3'} lg:col-span-${index < 3 ? '2' : '3'}`}>
                <div className="gallery-item">
                  <a href={image.url} className="glightbox" data-gallery="images-gallery">
                    <img src={image.url} className="w-full" alt="" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Material descargable */}
      <section id="material-descargable" className="material-descargable lg:mx-5 section">
        <div className="container mx-auto section-title" data-aos="fade-up">
          <h2>{modelData.name.toUpperCase()}</h2>
          <p>Material descargable</p>
        </div>

        <div className="container mx-auto">
          <div className="flex flex-wrap gap-y-4">
            {modelData.links.map((link, index) => (
              <div key={index} className="lg:w-1/3 pr-4 pl-4" data-aos="fade-up" data-aos-delay={(index + 1) * 100}>
                <div className="card-item">
                  <span>
                    <img src={`https://media.toyota.com.ar/icons/${link.type}.png`} alt="" />
                  </span>
                  <h4>
                    <a href={link.url} target="_blank" className="stretched-link">
                      {link.type === 'brochure' ? 'Ficha Técnica' : 
                       link.type === 'consumption' ? 'Información de consumo' : 
                       'Información sobre airbags'}
                    </a>
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
