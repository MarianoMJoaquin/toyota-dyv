import React, { useEffect, useRef } from 'react';

const SwiperApple = () => {
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const positionRef = useRef(0);
  const speedRef = useRef(1); // pixels per frame

  useEffect(() => {
    const animate = () => {
      if (!containerRef.current) return;
      
      positionRef.current -= speedRef.current;
      const totalWidth = containerRef.current.firstChild.offsetWidth;
      
      if (Math.abs(positionRef.current) >= totalWidth) {
        positionRef.current = 0;
      }
      
      containerRef.current.style.transform = `translateX(${positionRef.current}px)`;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    speedRef.current = 0.5; // Slow down
  };

  const handleMouseLeave = () => {
    speedRef.current = 1; // Normal speed
  };

  return (
    <div className="w-full overflow-hidden">
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
    </div>
  );
};

export default SwiperApple;
