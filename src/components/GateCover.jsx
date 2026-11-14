import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function GateCover({ isOpen, onOpen, isMuted, onToggleSound, playSfx }) {
  const [isOpening, setIsOpening] = useState(false);
  const sparksCanvasRef = useRef(null);

  const handleEnter = useCallback(() => {
    if (isOpen || isOpening) return;
    setIsOpening(true);
    playSfx('shimmer');
    playSfx('part');

    setTimeout(() => {
      onOpen();
    }, 700);
  }, [isOpen, isOpening, onOpen, playSfx]);

  // Allow auto-proceed or wheel scroll to part the curtain
  useEffect(() => {
    if (isOpen || isOpening) return;

    // If user scrolls wheel or touches while curtain is up, open it
    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) > 5) {
        handleEnter();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isOpen, isOpening, handleEnter]);

  // Soft sparkling glints across the jasmine curtain
  useEffect(() => {
    const canvas = sparksCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 460);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 800);

    const particles = Array.from({ length: 32 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.8 + height * 0.1,
      size: Math.random() * 2 + 0.6,
      speedY: -Math.random() * 0.3 - 0.1,
      speedX: (Math.random() - 0.5) * 0.15,
      opacity: Math.random() * 0.7 + 0.3,
      pulse: Math.random() * Math.PI,
    }));

    function render() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.pulse += 0.035;
        const currentOpacity = Math.max(0, Math.sin(p.pulse) * p.opacity);

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 245, ${currentOpacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#fdf6db';
        ctx.fill();

        if (p.size > 1.8 && currentOpacity > 0.4) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${currentOpacity * 0.6})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p.x - 4, p.y);
          ctx.lineTo(p.x + 4, p.y);
          ctx.moveTo(p.x, p.y - 4);
          ctx.lineTo(p.x, p.y + 4);
          ctx.stroke();
        }
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    }

    render();

    const handleResize = () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isOpen && !isOpening) return null;

  return (
    <section
      id="gate"
      className={`gate fixed sm:absolute inset-0 z-50 overflow-hidden cursor-pointer select-none transition-all duration-700 ease-out ${
        isOpening ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
      onClick={handleEnter}
      aria-label="Your invitation"
    >
      <div className="gate-stage relative w-full h-full min-h-[100svh]">
        {/* Still Artwork: White marble arch, floral inlays, floor diyas, and jasmine */}
        <div
          className="c-still absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out"
          style={{
            backgroundImage: "url('/assets/cover/still.webp')",
            transform: isOpening ? 'scale(1.08)' : 'scale(1)',
          }}
        />

        {/* Curtain Parting Animation */}
        {isOpening && (
          <div className="absolute inset-0 flex pointer-events-none z-15">
            <div
              className="w-1/2 h-full bg-cover bg-left transition-all duration-700 ease-in-out -translate-x-full opacity-0"
              style={{
                backgroundImage: "url('/assets/cover/curtain.webp')",
                backgroundSize: '200% 100%',
                backgroundPosition: 'left center',
                filter: 'drop-shadow(8px 0 20px rgba(0,0,0,0.7))',
              }}
            />
            <div
              className="w-1/2 h-full bg-cover bg-right transition-all duration-700 ease-in-out translate-x-full opacity-0"
              style={{
                backgroundImage: "url('/assets/cover/curtain.webp')",
                backgroundSize: '200% 100%',
                backgroundPosition: 'right center',
                filter: 'drop-shadow(-8px 0 20px rgba(0,0,0,0.7))',
              }}
            />
          </div>
        )}

        {/* Sparks Canvas */}
        <canvas
          ref={sparksCanvasRef}
          className="c-sparks absolute inset-0 pointer-events-none z-20"
        />

        {/* Sound Toggle Button (Top Right) */}
        <button
          id="soundToggle"
          type="button"
          aria-pressed={!isMuted}
          aria-label={isMuted ? 'Sound is off' : 'Sound is on'}
          className="absolute top-4 right-4 z-40 w-10 h-10 rounded-full bg-[#0a1f30]/70 backdrop-blur-md border border-[#dce8f0]/45 flex items-center justify-center text-[#f4f1e8] transition-all hover:bg-[#0a1f30]/90 hover:scale-105 active:scale-95 shadow-md"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSound();
          }}
        >
          {isMuted ? (
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-currentColor stroke-[1.6]">
              <path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z" fill="currentColor" />
              <path d="M16 9.5l5 5M21 9.5l-5 5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-currentColor stroke-[1.6]">
              <path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z" fill="currentColor" />
              <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" strokeLinecap="round" />
            </svg>
          )}
        </button>

        {/* Center: "TOUCH THE JASMINE TO ENTER" */}
        <div className="absolute top-[49%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 text-center w-full px-4">
          <button
            id="coverHint"
            type="button"
            className="c-hint group relative px-6 py-3 rounded-full text-[#fbfaf3] font-cormorant font-bold text-xs sm:text-sm tracking-[0.3em] uppercase transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            style={{
              background: 'radial-gradient(closest-side, rgba(8,26,42,0.65), rgba(8,26,42,0.35) 58%, transparent)',
              textShadow: '0 0 8px rgba(8,26,42,0.9), 0 0 2px rgba(8,26,42,0.9)',
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleEnter();
            }}
          >
            <span>Touch the jasmine to enter</span>
          </button>
        </div>

        {/* Bottom Tag: "DEMO · AQD INVITES" */}
        <div className="absolute bottom-5 inset-x-0 z-30 text-center pointer-events-none">
          <p className="font-cormorant text-[10px] sm:text-[11px] font-semibold tracking-[0.35em] text-[#f4f1e8]/75 uppercase drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            DEMO &middot; AQD INVITES
          </p>
        </div>
      </div>
    </section>
  );
}
