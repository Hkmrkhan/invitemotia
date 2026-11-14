import React, { useState, useEffect, useRef } from 'react';

export default function FamiliesSection({ playSfx }) {
  const [isGroomLit, setIsGroomLit] = useState(false);
  const [isBrideLit, setIsBrideLit] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const starsCanvasRef = useRef(null);

  // Twinkling stars canvas
  useEffect(() => {
    const canvas = starsCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    let width = (canvas.width = canvas.parentElement.clientWidth || 390);
    let height = (canvas.height = canvas.parentElement.clientHeight || 700);

    const stars = Array.from({ length: 40 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.7,
      size: Math.random() * 1.5 + 0.6,
      opacity: Math.random() * 0.8 + 0.2,
      pulse: Math.random() * Math.PI,
    }));

    function render() {
      ctx.clearRect(0, 0, width, height);
      stars.forEach((s) => {
        s.pulse += 0.035;
        const currentOpacity = Math.max(0.1, Math.sin(s.pulse) * s.opacity);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244, 241, 232, ${currentOpacity})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#fff';
        ctx.fill();
      });
      animId = requestAnimationFrame(render);
    }

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  // When both lit, trigger joint blessing
  useEffect(() => {
    if (isGroomLit && isBrideLit && !isJoined) {
      setIsJoined(true);
      playSfx('join');
    }
  }, [isGroomLit, isBrideLit, isJoined, playSfx]);

  const toggleGroom = () => {
    if (!isGroomLit) {
      playSfx('light');
      setIsGroomLit(true);
    } else {
      setIsGroomLit(false);
    }
  };

  const toggleBride = () => {
    if (!isBrideLit) {
      playSfx('light');
      setIsBrideLit(true);
    } else {
      setIsBrideLit(false);
    }
  };

  return (
    <section
      id="families"
      data-section="families"
      aria-labelledby="famTitle"
      className="families relative w-full py-16 px-4 bg-[#081420] text-[#f4f1e8] overflow-hidden select-none"
    >
      {/* Background Jaali Screen */}
      <div
        className="fm-jaali absolute inset-0 bg-repeat opacity-25 pointer-events-none"
        style={{
          backgroundImage: "url('/assets/families/jaali.webp')",
          backgroundSize: '160px 160px',
        }}
      />

      {/* Moon in sky */}
      <div className="absolute top-8 right-12 w-20 h-20 rounded-full bg-gradient-to-br from-[#f4f1e8] to-[#c9d6de] shadow-[0_0_50px_rgba(201,214,222,0.45)] pointer-events-none opacity-80" />

      {/* Stars canvas */}
      <canvas
        ref={starsCanvasRef}
        className="fm-stars absolute inset-0 pointer-events-none z-10"
      />

      {/* Soft Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-[#12324a]/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-[#0b1c2a]/60 blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="fm-head relative z-20 text-center mb-10">
        <p className="fm-kicker font-cormorant italic text-sm tracking-widest text-[#aeb9c1] uppercase mb-1">
          With the blessings of
        </p>
        <h2 id="famTitle" className="fm-title font-cormorant text-3xl sm:text-4xl font-medium tracking-wide">
          <span className="pearl glints font-serif">Our Families</span>
        </h2>
      </header>

      {/* Lamps and Families layout */}
      <div className="fm-lamps relative z-20 max-w-lg mx-auto flex flex-col items-center">
        {/* Hanging Lanterns Row */}
        <div className="w-full flex justify-between items-start px-2 sm:px-6">
          {/* Groom's Lantern */}
          <div className="fm-side fm-side-a flex flex-col items-center flex-1 text-center">
            <div className="fm-hang flex flex-col items-center">
              {/* Chain */}
              <div
                className="w-1.5 h-16 bg-repeat-y opacity-70"
                style={{
                  backgroundImage: "url('/assets/families/chain.webp')",
                  backgroundSize: '100% auto',
                }}
              />
              {/* Lamp button */}
              <button
                type="button"
                onClick={toggleGroom}
                aria-pressed={isGroomLit}
                aria-label="Light the lantern for the groom's family"
                className="fm-lamp group relative w-16 h-24 sm:w-20 sm:h-28 transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                {/* Unlit or Lit lantern */}
                <div
                  className={`absolute inset-0 bg-contain bg-center bg-no-repeat transition-opacity duration-500 ${
                    isGroomLit ? 'opacity-0' : 'opacity-100'
                  }`}
                  style={{
                    backgroundImage: "url('/assets/families/lantern-unlit.webp')",
                  }}
                />
                <div
                  className={`absolute inset-0 bg-contain bg-center bg-no-repeat transition-opacity duration-500 ${
                    isGroomLit ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    backgroundImage: "url('/assets/families/lantern-lit.webp')",
                  }}
                />
                {/* Warm Halo Glow when lit */}
                {isGroomLit && (
                  <div
                    className="absolute -inset-4 bg-contain bg-center bg-no-repeat animate-pulse pointer-events-none"
                    style={{
                      backgroundImage: "url('/assets/families/lantern-glow.webp')",
                    }}
                  />
                )}
              </button>
            </div>
            {/* Groom's Family Names */}
            <div className="fm-names mt-4">
              <p className="fm-label font-cormorant italic text-xs tracking-wider text-[#aeb9c1] uppercase mb-1">
                The groom&rsquo;s family
              </p>
              <p className="fm-parents font-cormorant text-base sm:text-lg font-medium text-[#f4f1e8] leading-tight">
                Mr &amp; Mrs Faisal Ahmed Qureshi
              </p>
            </div>
          </div>

          {/* Bride's Lantern */}
          <div className="fm-side fm-side-b flex flex-col items-center flex-1 text-center">
            <div className="fm-hang flex flex-col items-center">
              {/* Chain */}
              <div
                className="w-1.5 h-16 bg-repeat-y opacity-70"
                style={{
                  backgroundImage: "url('/assets/families/chain.webp')",
                  backgroundSize: '100% auto',
                }}
              />
              {/* Lamp button */}
              <button
                type="button"
                onClick={toggleBride}
                aria-pressed={isBrideLit}
                aria-label="Light the lantern for the bride's family"
                className="fm-lamp group relative w-16 h-24 sm:w-20 sm:h-28 transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <div
                  className={`absolute inset-0 bg-contain bg-center bg-no-repeat transition-opacity duration-500 ${
                    isBrideLit ? 'opacity-0' : 'opacity-100'
                  }`}
                  style={{
                    backgroundImage: "url('/assets/families/lantern-unlit.webp')",
                  }}
                />
                <div
                  className={`absolute inset-0 bg-contain bg-center bg-no-repeat transition-opacity duration-500 ${
                    isBrideLit ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    backgroundImage: "url('/assets/families/lantern-lit.webp')",
                  }}
                />
                {isBrideLit && (
                  <div
                    className="absolute -inset-4 bg-contain bg-center bg-no-repeat animate-pulse pointer-events-none"
                    style={{
                      backgroundImage: "url('/assets/families/lantern-glow.webp')",
                    }}
                  />
                )}
              </button>
            </div>
            {/* Bride's Family Names */}
            <div className="fm-names mt-4">
              <p className="fm-label font-cormorant italic text-xs tracking-wider text-[#aeb9c1] uppercase mb-1">
                The bride&rsquo;s family
              </p>
              <p className="fm-parents font-cormorant text-base sm:text-lg font-medium text-[#f4f1e8] leading-tight">
                Mr &amp; Mrs Tariq Mehmood Chaudhry
              </p>
            </div>
          </div>
        </div>

        {/* Connecting Threads of Light SVG */}
        <div className="relative w-full h-12 pointer-events-none">
          <svg className="w-full h-full overflow-visible">
            {isGroomLit && (
              <path
                d="M 80 0 Q 140 30 195 40"
                fill="none"
                stroke="#e8d59a"
                strokeWidth="1.5"
                strokeDasharray="4 2"
                className="animate-pulse"
              />
            )}
            {isBrideLit && (
              <path
                d="M 310 0 Q 250 30 195 40"
                fill="none"
                stroke="#e8d59a"
                strokeWidth="1.5"
                strokeDasharray="4 2"
                className="animate-pulse"
              />
            )}
          </svg>
        </div>

        {/* Center Union Blessing */}
        <div
          className={`fm-union text-center mt-2 p-6 rounded-2xl transition-all duration-700 max-w-sm ${
            isJoined
              ? 'bg-[#12324a]/60 border border-[#e8d59a]/40 shadow-[0_0_30px_rgba(232,213,154,0.2)]'
              : 'bg-transparent'
          }`}
        >
          <p className="fm-couple font-cormorant text-2xl sm:text-3xl font-medium tracking-wide text-[#f4f1e8] mb-3">
            <span className="pearl glints font-serif">Huzaifa</span>{' '}
            <i className="font-allura text-2xl text-[#d4af37] px-1">&amp;</i>{' '}
            <span className="pearl glints font-serif">Asia</span>
          </p>

          <div className="fm-blessing space-y-2">
            <p className="fm-dua font-amiri text-lg sm:text-xl text-[#e8d59a] leading-relaxed" lang="ar" dir="rtl">
              اللَّهُمَّ أَلِّفْ بَيْنَ قُلُوبِنَا، وَأَصْلِحْ ذَاتَ بَيْنِنَا
            </p>
            <p className="fm-dua-en font-cormorant italic text-sm text-[#c9d6de] leading-relaxed">
              &ldquo;O Allah, bring our hearts together, and set right what is between us.&rdquo;
            </p>
            <p className="fm-dua-ref font-cormorant text-xs tracking-widest text-[#788e9b] uppercase">
              Sunan Abi Dawud &middot; 969
            </p>
          </div>
        </div>

        {/* Interactive hint */}
        <p className="fm-hint mt-6 font-cormorant italic text-xs tracking-wider text-[#aeb9c1] animate-pulse">
          Touch each lantern to light it
        </p>
      </div>
    </section>
  );
}

