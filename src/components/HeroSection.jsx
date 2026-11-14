import React, { useEffect, useRef } from 'react';

export default function HeroSection({ playSfx }) {
  const waterCanvasRef = useRef(null);
  const petalsCanvasRef = useRef(null);
  const ripplesRef = useRef([]);

  // Water ripples canvas
  useEffect(() => {
    const canvas = waterCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    let width = (canvas.width = canvas.parentElement.clientWidth || 460);
    let height = (canvas.height = canvas.parentElement.clientHeight || 800);

    function addRipple(x, y) {
      ripplesRef.current.push({
        x,
        y,
        radius: 2,
        maxRadius: Math.random() * 80 + 70,
        opacity: 0.8,
        speed: 1.8,
      });
    }

    window.__triggerHeroRipple = (x = width * 0.5, y = height * 0.65) => {
      addRipple(x, y);
      playSfx('plop');
    };

    function render() {
      ctx.clearRect(0, 0, width, height);

      const activeRipples = [];
      for (const r of ripplesRef.current) {
        r.radius += r.speed;
        r.opacity *= 0.982;

        if (r.opacity > 0.02 && r.radius < r.maxRadius) {
          activeRipples.push(r);

          ctx.save();
          ctx.beginPath();
          ctx.ellipse(r.x, r.y, r.radius, r.radius * 0.45, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(196, 212, 240, ${r.opacity * 0.5})`;
          ctx.lineWidth = 1.6;
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#c4d4f0';
          ctx.stroke();

          if (r.radius > 15) {
            ctx.beginPath();
            ctx.ellipse(r.x, r.y, r.radius - 12, (r.radius - 12) * 0.45, 0, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(244, 241, 232, ${r.opacity * 0.35})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
          ctx.restore();
        }
      }
      ripplesRef.current = activeRipples;

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
  }, [playSfx]);

  // Floating jasmine petals canvas
  useEffect(() => {
    const canvas = petalsCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    let width = (canvas.width = canvas.parentElement.clientWidth || 460);
    let height = (canvas.height = canvas.parentElement.clientHeight || 800);

    const petals = Array.from({ length: 24 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.8 + height * 0.2,
      size: Math.random() * 4 + 3.5,
      angle: Math.random() * Math.PI * 2,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: Math.random() * 0.25 + 0.1,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.4 + 0.5,
    }));

    function render() {
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.angle += p.rotSpeed;

        if (p.y > height + 10) {
          p.y = height * 0.4;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.scale(1, 0.5);

        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 1.8, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251, 248, 240, ${p.opacity})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(196, 212, 240, 0.4)';
        ctx.fill();

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    }

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  const handleWaterClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (window.__triggerHeroRipple) {
      window.__triggerHeroRipple(x, y);
    }
  };

  return (
    <section
      id="hero"
      data-section="hero"
      className="hero relative w-full h-[100svh] min-h-[500px] overflow-hidden flex flex-col items-center justify-between py-10 select-none"
      onClick={handleWaterClick}
      aria-labelledby="heroNames"
    >
      {/* Background garden scene - fitted 100% to match perspective */}
      <div
        className="h-garden absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/assets/hero/scene.webp')",
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Water Canvas */}
      <canvas
        ref={waterCanvasRef}
        className="h-water absolute inset-0 pointer-events-none z-10"
      />

      {/* Petals Canvas */}
      <canvas
        ref={petalsCanvasRef}
        className="h-petals absolute inset-0 pointer-events-none z-15"
      />

      {/* Title Calligraphy: Arham & Hareem */}
      <div className="relative z-20 text-center mt-12 px-6 pointer-events-none w-full">
        <h1
          id="heroNames"
          className="font-allura tracking-wider flex flex-col items-center drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]"
        >
          <span className="text-5xl sm:text-6xl md:text-7xl text-[#f4f1e8] font-normal tracking-wide">
            Arham
          </span>
          <span className="pearl glints text-3xl sm:text-4xl my-0.5 italic text-[#d4af37]">
            &amp;
          </span>
          <span className="text-5xl sm:text-6xl md:text-7xl text-[#f4f1e8] font-normal tracking-wide">
            Hareem
          </span>
        </h1>
      </div>

      {/* Interactive Controls & Down-Scroll Indicator */}
      <div className="relative z-20 flex flex-col items-center gap-4 mb-6">
        <button
          type="button"
          className="px-5 py-2.5 rounded-full bg-[#0b1c2a]/70 backdrop-blur-md border border-[#f8fbf4]/25 text-[#f4f1e8] font-cormorant text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:bg-[#0b1c2a] hover:border-[#f8fbf4]/60 hover:scale-105 active:scale-95 shadow-lg"
          onClick={(e) => {
            e.stopPropagation();
            if (window.__triggerHeroRipple) {
              window.__triggerHeroRipple();
            }
          }}
        >
          Ripple the water
        </button>

        {/* Scroll indicator with bouncing arrow */}
        <div className="flex flex-col items-center opacity-80 animate-bounce mt-1 pointer-events-none">
          <span className="w-2.5 h-2.5 rotate-45 border-b-2 border-r-2 border-[#f4f1e8]" />
        </div>
      </div>
    </section>
  );
}
