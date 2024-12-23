/**
 * @component SwiperNews
 * @description
 * Componente de carrusel infinito con control de velocidad y pausa.
 * 
 * Características principales:
 * - Desplazamiento automático infinito de imágenes
 * - Reducción de velocidad al pasar el mouse por encima
 * - Botón de reproducir/pausar en dispositivos móviles
 * - Animación suave utilizando requestAnimationFrame
 * - Duplicación de slides para efecto infinito
 * 
 * Funcionamiento técnico:
 * - Utiliza useRef para mantener referencias al contenedor y la animación
 * - Controla la posición y velocidad mediante refs para evitar re-renders
 * - Implementa un sistema de animación personalizado con requestAnimationFrame
 * - Maneja la transición suave entre estados de velocidad
 * 
 * Estados:
 * - isPlaying: Controla si el carrusel está en movimiento
 * - positionRef: Mantiene la posición actual del desplazamiento
 * - speedRef: Controla la velocidad de desplazamiento
 * 
 * Eventos:
 * - mouseEnter: Reduce la velocidad al 50%
 * - mouseLeave: Restaura la velocidad normal
 * - click en botón: Alterna entre reproducir/pausar
 */

import React, { useEffect, useRef, useState } from 'react';

const SwiperNews = () => {
  const [isPlaying, setIsPlaying] = useState(true); // Estado de reproducción del carrusel 
  const containerRef = useRef(null); // Referencia al contenedor de slides 
  const animationRef = useRef(null); // Referencia a la animación de requestAnimationFrame 
  const positionRef = useRef(0); // Posición actual del desplazamiento (px) 
  const speedRef = useRef(1); // Velocidad normal de desplazamiento (1 = 100%) 

  useEffect(() => {
    const animate = () => {
      if (!containerRef.current || !isPlaying) return;
      
      positionRef.current -= speedRef.current;
      const totalWidth = containerRef.current.firstChild.offsetWidth;
      
      if (Math.abs(positionRef.current) >= totalWidth) {
        positionRef.current = 0;
      }
      
      containerRef.current.style.transform = `translateX(${positionRef.current}px)`;
      animationRef.current = requestAnimationFrame(animate);
    };

    if (isPlaying) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  const handleMouseEnter = () => {
    speedRef.current = 0.5; // Baja la velocidad al 50% al pasar el mouse por encima
  };

  const handleMouseLeave = () => {
    speedRef.current = 1; // Restaura la velocidad normal al quitar el mouse de encima 
  };

  return (
    <div className="w-full overflow-hidden relative">
      <div className="w-full overflow-hidden">
        <div 
          className="flex will-change-transform"
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex gap-5 p-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex-none w-[300px] min-w-[300px]">
                <img 
                  src={`https://picsum.photos/600/400?random=${i + 1}`} 
                  alt={`Slide ${i + 1}`}
                  className="w-full h-[200px] object-cover rounded-[15px]"
                />
              </div>
            ))}
          </div>
          <div className="flex gap-5 p-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i + 5} className="flex-none w-[300px] min-w-[300px]">
                <img 
                  src={`https://picsum.photos/600/400?random=${i + 1}`} 
                  alt={`Slide ${i + 1}`}
                  className="w-full h-[200px] object-cover rounded-[15px]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Play/Pause Botón - Solamente visible por debajo de los 1024px (lg) */}
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className="lg:hidden relative float-right mr-4 z-10 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default SwiperNews;
