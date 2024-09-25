import React, { useState, useEffect, useRef } from 'react';
import '../assets/styles/swiper.css'; // Importa los estilos que ya compartiste

const Slider = () => {
  const [slides, setSlides] = useState([]);
  const [slideIndex, setSlideIndex] = useState(1);
  const [offset, setOffset] = useState(0);
  const slideTimer = useRef(null);
  const sliderInnerRef = useRef(null);
  const sliderWrapperRef = useRef(null);

  // Fetch de la API
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch('https://panelweb.derkayvargas.com/api/slide/4');
        const data = await response.json();
        setSlides(data.items);
      } catch (error) {
        console.error('Error fetching slides:', error);
      }
    };

    fetchSlides();
  }, []);

  // Configura el auto-slide
  useEffect(() => {
    if (slides.length > 0) {
      slideTimer.current = setInterval(slideMoveNext, 10000);
      return () => clearInterval(slideTimer.current); // Cleanup al desmontar
    }
  }, [slides]);

  // Funciones para mover las diapositivas
  const slideMoveNext = () => {
    setSlideIndex((prevIndex) => {
      const newIndex = prevIndex === slides.length ? 1 : prevIndex + 1;
      const newOffset = (newIndex - 1) * (100 / slides.length);
      setOffset(newOffset);
      return newIndex;
    });
  };

  const slideMovePrev = () => {
    setSlideIndex((prevIndex) => {
      const newIndex = prevIndex === 1 ? slides.length : prevIndex - 1;
      const newOffset = (newIndex - 1) * (100 / slides.length);
      setOffset(newOffset);
      return newIndex;
    });
  };

  const goToSlide = (index) => {
    setSlideIndex(index + 1);
    setOffset((index) => (100 / slides.length) * index);
    clearInterval(slideTimer.current);
    slideTimer.current = setInterval(slideMoveNext, 10000);
  };

  // Swipe para dispositivos móviles
  const handleTouchStart = (e) => {
    const x1 = e.touches[0].clientX;
    const y1 = e.touches[0].clientY;
    sliderWrapperRef.current.dataset.x1 = x1;
    sliderWrapperRef.current.dataset.y1 = y1;
  };

  const handleTouchMove = (e) => {
    const x1 = parseFloat(sliderWrapperRef.current.dataset.x1);
    const y1 = parseFloat(sliderWrapperRef.current.dataset.y1);
    if (!x1 || !y1) return;

    const x2 = e.touches[0].clientX;
    const y2 = e.touches[0].clientY;
    const diffX = x2 - x1;
    const diffY = y2 - y1;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      diffX > 0 ? slideMovePrev() : slideMoveNext();
    }
    sliderWrapperRef.current.dataset.x1 = 0;
    sliderWrapperRef.current.dataset.y1 = 0;
  };

  return (
    <div className="slider">
      <div className="slider__wrapper" ref={sliderWrapperRef} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
        <div className="slider__inner" ref={sliderInnerRef} style={{ transform: `translateX(-${offset}%)`, width: `${100 * slides.length}%`, display: 'flex' }}>
          {slides.map((slide, index) => (
            <div key={slide.id} className={`slider__item ${slide.size === 'MD' ? 'md:block' : 'hidden'} ${slide.size === 'SM' ? 'block' : 'md:hidden'}`}>
              <h1 className="slider__item-title">
                Slide {slide.orden}
                <span>Tamaño: {slide.size}</span>
              </h1>
              <button className="slider__item-btn">Conocé más</button>
              <a className="slider__item-bg" href={slide.url}>
                <img className="slider__item-img" src={slide.image.public_path} alt={`Slide ${slide.orden}`} />
              </a>
            </div>
          ))}
          {console.log(slides)}
        </div>
      </div>

      <div className="slider__nav">
        {slides.map((_, index) => (
          <button key={index} className={`slider__nav-btn ${index === slideIndex - 1 ? 'slider__nav-btn_active' : ''}`} onClick={() => goToSlide(index)}></button>
        ))}
      </div>

      <div className="slider__arrows">
        <button className="slider__arrow slider__arrow_prev" onClick={slideMovePrev}>
          <i className="ri-arrow-left-s-line"></i>
          <img className="slider__arrow-icon" src="/images/arrow-prev-icon.svg" alt="Anterior" />
        </button>
        <button className="slider__arrow slider__arrow_next" onClick={slideMoveNext}>
          <i className="ri-arrow-right-s-line"></i>
          <img className="slider__arrow-icon" src="/images/arrow-next-icon.svg" alt="Siguiente" />
        </button>
      </div>
    </div>
  );
};

export default Slider;
