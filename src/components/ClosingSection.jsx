import React, { useState } from 'react';

const DIYA_IMAGES = [
  '/assets/closing/light-0.webp',
  '/assets/closing/light-1.webp',
  '/assets/closing/light-2.webp',
  '/assets/closing/light-3.webp',
  '/assets/closing/light-4.webp',
  '/assets/closing/light-5.webp',
  '/assets/closing/light-6.webp',
  '/assets/closing/light-7.webp',
  '/assets/closing/light-8.webp',
  '/assets/closing/light-9.webp',
];

export default function ClosingSection({ onReplay, playSfx }) {
  const [diyas, setDiyas] = useState([
    { id: 1, x: 28, y: 72, imgIndex: 0 },
    { id: 2, x: 68, y: 76, imgIndex: 3 },
  ]);

  const handleWaterClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Only add diya if clicked on the lower water area (y > 45%)
    if (y > 45) {
      playSfx('plop');
      const nextIndex = diyas.length % DIYA_IMAGES.length;
      setDiyas((prev) => [
        ...prev,
        { id: Date.now(), x: Math.max(10, Math.min(90, x)), y: Math.max(50, Math.min(88, y)), imgIndex: nextIndex },
      ]);
    }
  };

  return (
    <section
      id="closing"
      data-section="closing"
      aria-label="With love and duas"
      className="closing relative w-full min-h-[800px] py-16 px-4 bg-[#060b1a] text-[#f4f1e8] overflow-hidden flex flex-col justify-between select-none cursor-pointer"
      onClick={handleWaterClick}
    >
      {/* Background garden and lake scene */}
      <div
        className="cl-garden absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: "url('/assets/closing/scene.webp')",
        }}
      />

      {/* Dynamic Floating Lit Diyas */}
      <div className="absolute inset-0 pointer-events-none z-15">
        {diyas.map((diya) => (
          <div
            key={diya.id}
            className="absolute w-20 h-20 -translate-x-1/2 -translate-y-1/2 bg-contain bg-center bg-no-repeat animate-diya drop-shadow-[0_4px_16px_rgba(232,162,58,0.7)]"
            style={{
              left: `${diya.x}%`,
              top: `${diya.y}%`,
              backgroundImage: `url('${DIYA_IMAGES[diya.imgIndex]}')`,
            }}
          />
        ))}
      </div>

      {/* Top Blessing / Dua */}
      <div className="cl-sky relative z-20 text-center max-w-md mx-auto pt-4 pointer-events-none">
        <p className="cl-dua font-amiri text-lg sm:text-2xl text-[#f4e5a9] leading-relaxed mb-2" lang="ar" dir="rtl">
          بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
        </p>
        <p className="cl-dua-en font-cormorant italic text-xs sm:text-sm text-[#c4d4f0] leading-relaxed max-w-xs mx-auto mb-1">
          &ldquo;May Allah bless you both, shower His blessings upon you, and unite you in goodness.&rdquo;
        </p>
        <p className="cl-dua-ref font-cormorant text-[11px] tracking-widest text-[#788e9b] uppercase">
          Abu Dawud &middot; 2130
        </p>
      </div>

      {/* Center Water Interactive Hint */}
      <div className="relative z-20 text-center pointer-events-none my-8">
        <p className="cl-hint font-cormorant italic text-xs tracking-wider text-[#f4e5a9]/80 animate-pulse bg-[#060b1a]/40 backdrop-blur-sm px-4 py-1.5 rounded-full inline-block border border-[#f4e5a9]/20 shadow-sm">
          Touch the water to light the diyas
        </p>
      </div>

      {/* Bottom Families & Names */}
      <div className="cl-water relative z-20 text-center max-w-md mx-auto pb-4">
        <p className="cl-urdu font-nastaliq text-xl sm:text-2xl text-[#f4f1e8] leading-loose mb-2" lang="ur" dir="rtl">
          آپ کی شرکت ہمارے لیے باعثِ مسرت ہوگی
        </p>
        <p className="cl-kicker font-cormorant italic text-xs tracking-widest text-[#aeb9c1] uppercase mb-1">
          With love and duas
        </p>
        <p className="cl-families font-cormorant text-sm sm:text-base text-[#c4d4f0] mb-2">
          the Qureshi &amp; Chaudhry families
        </p>
        <p className="cl-names font-cormorant text-3xl sm:text-4xl font-medium tracking-wide my-1">
          <span className="pearl glints font-serif">Huzaifa &amp; Asia</span>
        </p>
        <p className="cl-date font-cormorant text-xs tracking-widest text-[#aeb9c1] uppercase mt-2 mb-6">
          11 &ndash; 14 November 2027 &middot; Islamabad
        </p>

        {/* Replay button */}
        <div className="cl-foot flex justify-center mb-4">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onReplay();
            }}
            className="cl-replay px-6 py-2.5 rounded-full bg-[#f8fbf4]/15 hover:bg-[#f8fbf4]/25 border border-[#f8fbf4]/30 text-xs font-cormorant tracking-widest uppercase text-[#f4f1e8] transition-all hover:scale-105 active:scale-95 shadow-lg backdrop-blur-md"
          >
            Replay the invitation
          </button>
        </div>

        <p className="cl-by font-cormorant text-[11px] tracking-wider text-[#aeb9c1]/60">
          Invitation by Aqd Invites
        </p>
      </div>
    </section>
  );
}

