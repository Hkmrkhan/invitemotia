import React, { useState, useEffect } from 'react';

const BUDS = [
  { i: 0, x: -79.38, y: 2.73 },
  { i: 1, x: -66.15, y: 18.09 },
  { i: 2, x: -52.92, y: 30.66 },
  { i: 3, x: -39.69, y: 40.43 },
  { i: 4, x: -26.46, y: 47.41 },
  { i: 5, x: -13.23, y: 51.6 },
  { i: 6, x: 0, y: 53 },
  { i: 7, x: 13.23, y: 51.6 },
  { i: 8, x: 26.46, y: 47.41 },
  { i: 9, x: 39.69, y: 40.43 },
  { i: 10, x: 52.92, y: 30.66 },
  { i: 11, x: 66.15, y: 18.09 },
  { i: 12, x: 79.38, y: 2.73 },
];

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Smooth progress counter from 0 to 100%
    const startTime = Date.now();
    const duration = 2200; // 2.2 seconds animation

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(1, elapsed / duration);
      // Easing curve
      const p = Math.pow(rawProgress, 0.95);
      setProgress(p);

      if (rawProgress >= 1) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFading(true);
          setTimeout(() => {
            setIsDone(true);
            onComplete?.();
          }, 800);
        }, 300);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    setProgress(1);
    setIsFading(true);
    setTimeout(() => {
      setIsDone(true);
      onComplete?.();
    }, 400);
  };

  if (isDone) return null;

  const pctNumber = Math.min(100, Math.floor(progress * 100));

  return (
    <div
      id="loader"
      role="status"
      aria-live="polite"
      aria-label="Loading your invitation"
      className={`fixed inset-0 z-[2147483000] flex flex-col items-center justify-center gap-3.5 p-6 bg-[#0b1c2a] text-[#f4f1e8] select-none transition-opacity duration-800 ease-out ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        '--p': progress,
      }}
    >
      {/* SVG Art: Twinkling stars, full moon, string arc, and 13 blooming buds */}
      <div className="w-[min(56vw,220px)] h-[min(56vw,220px)] relative">
        <svg
          viewBox="-110 -110 220 220"
          className="w-full h-full block overflow-visible"
        >
          <defs>
            <radialGradient id="ldm">
              <stop offset=".55" stopColor="#f4f1e8" stopOpacity=".35" />
              <stop offset="1" stopColor="#f4f1e8" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Twinkling Stars */}
          <g fill="#dfe8f0">
            <circle className="ld-tw animate-pulse" style={{ animationDelay: '0s' }} cx="-78" cy="-78" r="1.3" />
            <circle className="ld-tw animate-pulse" style={{ animationDelay: '0.8s' }} cx="70" cy="-88" r="1" />
            <circle className="ld-tw animate-pulse" style={{ animationDelay: '1.6s' }} cx="88" cy="-40" r="1.4" />
            <circle className="ld-tw animate-pulse" style={{ animationDelay: '0.4s' }} cx="-96" cy="-30" r="1" />
            <circle className="ld-tw animate-pulse" style={{ animationDelay: '1.2s' }} cx="-40" cy="-98" r="0.9" />
            <circle className="ld-tw animate-pulse" style={{ animationDelay: '2s' }} cx="30" cy="-64" r="1" />
          </g>

          {/* Moon Glowing Halo & Disc */}
          <circle className="ld-halo" cy="-52" r="44" fill="url(#ldm)" />
          <circle cy="-52" r="25" fill="#f4f1e8" />
          <circle cx="-7" cy="-58" r="5" fill="#e3ddcf" />
          <circle cx="8" cy="-46" r="3.4" fill="#e3ddcf" />

          {/* Garland String Curve */}
          <path
            d="M-86 -6 Q 0 112 86 -6"
            fill="none"
            stroke="#9fb2c2"
            strokeOpacity=".5"
            strokeWidth=".9"
          />

          {/* 13 Jasmine Buds along the curve */}
          <g fill="#fbf8f0">
            {BUDS.map((bud) => {
              // Calculate bloom state for bud based on current progress
              // Formula: clamp(0, progress * 13 - i, 1)
              const threshold = progress * 13 - bud.i;
              const factor = Math.max(0, Math.min(1, threshold));
              const opacity = 0.18 + 0.82 * factor;
              const scale = 0.35 + 0.65 * factor;

              return (
                <g key={bud.i} transform={`translate(${bud.x} ${bud.y})`}>
                  <g
                    style={{
                      opacity,
                      transform: `scale(${scale})`,
                      transformOrigin: 'center',
                    }}
                  >
                    <ellipse rx="2.6" ry="5" cy="-4.6" transform="rotate(0)" />
                    <ellipse rx="2.6" ry="5" cy="-4.6" transform="rotate(72)" />
                    <ellipse rx="2.6" ry="5" cy="-4.6" transform="rotate(144)" />
                    <ellipse rx="2.6" ry="5" cy="-4.6" transform="rotate(216)" />
                    <ellipse rx="2.6" ry="5" cy="-4.6" transform="rotate(288)" />
                    <circle r="1.8" fill="#e8d59a" />
                  </g>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* "Stringing the jasmine" label */}
      <p className="mt-2.5 font-cormorant italic font-medium text-xl sm:text-2xl tracking-wide text-[#e9eef2] text-center">
        Stringing the jasmine
      </p>

      {/* Percentage Number */}
      <p className="m-0 font-cormorant font-semibold text-xs tracking-[0.32em] text-[#e9eef2]/60 tabular-nums">
        {pctNumber} %
      </p>

      {/* Skip button if taking time */}
      <button
        type="button"
        onClick={handleSkip}
        className="mt-6 text-xs font-cormorant italic text-[#e9eef2]/40 hover:text-[#e9eef2]/80 transition-colors underline underline-offset-4 cursor-pointer"
      >
        Taking a while? Open now
      </button>
    </div>
  );
}

