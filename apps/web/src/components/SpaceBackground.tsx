import { useEffect } from 'react';

export const SpaceBackground = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const parallaxElements = document.querySelectorAll('.parallax-slow');
      
      parallaxElements.forEach((el) => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        (el as HTMLElement).style.transform = `translate3d(0, ${yPos}px, 0)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Nebula layers */}
      <div className="nebula-bg fixed inset-0 pointer-events-none" style={{ zIndex: -1 }} />
      
      {/* Additional star field */}
      <div className="fixed inset-0 pointer-events-none parallax-slow" style={{ zIndex: -1 }}>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white star-twinkle"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5 + 0.3,
              animationDelay: Math.random() * 3 + 's',
            }}
          />
        ))}
      </div>

      {/* Shooting stars */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
        {[...Array(3)].map((_, i) => (
          <div
            key={`shooting-${i}`}
            className="absolute h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent"
            style={{
              width: '100px',
              top: Math.random() * 50 + '%',
              left: '-100px',
              animation: `shoot ${5 + i * 3}s linear ${i * 4}s infinite`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes shoot {
          0% {
            transform: translateX(0) translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateX(120vw) translateY(60vh);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};
