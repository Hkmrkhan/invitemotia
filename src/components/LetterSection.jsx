import React, { useState } from 'react';

export default function LetterSection({ playSfx }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleLetter = () => {
    if (!isOpen) {
      playSfx('chime');
      playSfx('fold');
      playSfx('rise');
      setIsOpen(true);
    } else {
      playSfx('fold2');
      setIsOpen(false);
    }
  };

  return (
    <section
      id="letter"
      data-section="letter"
      aria-labelledby="letterFor"
      className="letter muslin seam-edged relative w-full py-16 px-4 bg-[#f0ebe0] text-[#173a52] overflow-hidden"
      style={{
        backgroundImage: "url('/assets/theme/muslin.webp')",
      }}
    >
      {/* Top Seam */}
      <div
        className="seam seam-top absolute top-0 inset-x-0 h-10 bg-repeat-x pointer-events-none z-10"
        style={{
          backgroundImage: "url('/assets/theme/seam.webp')",
          backgroundSize: 'auto 100%',
        }}
      />

      {/* Muslin Moon glow in background */}
      <div className="muslin-moon absolute top-12 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-white/40 blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="lt-head relative z-20 text-center mb-8">
        <p className="lt-kicker font-cormorant italic text-sm tracking-widest text-[#56717f] uppercase mb-1">
          A letter for
        </p>
        <h2 id="letterFor" className="lt-for font-cormorant text-3xl sm:text-4xl font-medium tracking-wide">
          <span className="ink text-[#173a52] font-serif">Family &amp; Friends</span>
        </h2>
      </header>

      {/* Interactive Parcel & Letter Stage */}
      <div className="lt-stage relative z-20 max-w-md mx-auto min-h-[460px] flex flex-col items-center justify-center">
        {/* The Folded Parcel Button (When closed) */}
        {!isOpen ? (
          <div className="lt-keep flex flex-col items-center">
            <button
              id="letterParcel"
              type="button"
              aria-controls="letterSheet"
              aria-expanded="false"
              onClick={toggleLetter}
              className="lt-parcel group relative w-64 h-48 sm:w-72 sm:h-52 rounded-sm shadow-[0_16px_36px_rgba(11,28,42,0.18)] transition-transform duration-500 hover:scale-105 active:scale-95 cursor-pointer bg-[#e9e3d3] border border-[#d5cbba] overflow-hidden"
            >
              {/* Envelope Flaps Effect */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url('/assets/letter/parcel.webp')",
                }}
              />

              {/* Jasmine Gajra Garland */}
              <div
                className="pc-gajra absolute inset-0 bg-contain bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: "url('/assets/letter/gajra.webp')",
                }}
              />

              {/* Wax Seal */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-contain bg-center bg-no-repeat drop-shadow-md"
                style={{
                  backgroundImage: "url('/assets/letter/seal.webp')",
                }}
              />

              {/* Shimmer on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>

            <p className="lt-hint mt-5 font-cormorant italic text-sm tracking-wider text-[#56717f] animate-pulse">
              Touch the jasmine to open your letter
            </p>
          </div>
        ) : (
          /* Opened Letter Sheet */
          <div className="lt-slot w-full transition-all duration-700 ease-out animate-fadeIn">
            <article
              id="letterSheet"
              aria-label="Your letter"
              className="lt-letter relative bg-[#faf8f2] border border-[#e2dacf] rounded-sm p-6 sm:p-8 shadow-[0_20px_45px_rgba(11,28,42,0.18)] text-center text-[#173a52]"
              style={{
                backgroundImage: "url('/assets/letter/paper-top.webp')",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'top center',
                backgroundSize: '100% auto',
              }}
            >
              {/* Quranic Verse in Arabic */}
              <p
                className="lt-verse font-amiri text-xl sm:text-2xl leading-relaxed text-[#12324a] mb-3 mt-4"
                lang="ar"
                dir="rtl"
              >
                وَمِنْ ءَايَٰتِهِۦٓ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَٰجًا لِّتَسْكُنُوٓا۟ إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
              </p>

              {/* English translation */}
              <p className="lt-verse-en font-cormorant italic text-sm sm:text-base leading-relaxed text-[#355264] max-w-xs mx-auto mb-1">
                &ldquo;And of His signs is that He created for you from yourselves mates that you may find tranquillity in them; and He placed between you affection and mercy.&rdquo;
              </p>

              {/* Reference */}
              <p className="lt-verse-ref font-cormorant text-xs tracking-widest text-[#788e9b] uppercase mb-5">
                Surah Ar-Rum &middot; 30:21
              </p>

              {/* Golden divider rule */}
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto my-5" />

              {/* Greeting */}
              <p className="lt-greeting font-cormorant font-semibold text-lg sm:text-xl text-[#12324a] mb-3">
                Dear Family &amp; Friends,
              </p>

              {/* Letter body */}
              <div className="space-y-3 font-cormorant text-base sm:text-lg leading-relaxed text-[#244256] text-justify sm:text-center px-1">
                <p>
                  Together with our families, we joyfully invite you to celebrate our wedding.
                </p>
                <p>
                  After all the love and duas that brought us here, it would mean the world to have you beside us as we begin our life together.
                </p>
                <p>
                  Come and celebrate with us under the full moon, in a garden where the jasmine is in bloom and every diya is lit.
                </p>
              </div>

              {/* Urdu calligraphy */}
              <div className="my-5 py-2">
                <p
                  className="lt-urdu font-nastaliq text-xl sm:text-2xl text-[#173a52] leading-loose mb-1"
                  lang="ur"
                  dir="rtl"
                >
                  آپ کی شرکت ہمارے لیے باعثِ مسرت ہوگی
                </p>
                <p className="lt-urdu-en font-cormorant italic text-xs tracking-wider text-[#56717f]">
                  Your presence will be our joy.
                </p>
              </div>

              {/* Closing */}
              <div className="mt-4 pt-2">
                <p className="lt-closing font-cormorant italic text-sm text-[#56717f]">
                  With love and duas,
                </p>
                <p className="lt-sign font-cormorant font-medium text-2xl text-[#12324a] mt-1 tracking-wide">
                  Huzaifa &amp; Asia
                </p>
              </div>

              {/* Monogram Wax Seal */}
              <div
                className="lt-seal w-12 h-12 mx-auto mt-4 bg-contain bg-center bg-no-repeat drop-shadow-sm flex items-center justify-center font-cormorant text-xs font-semibold text-[#8c6b1f]"
                style={{
                  backgroundImage: "url('/assets/letter/seal.webp')",
                }}
              >
                A&amp;H
              </div>

              {/* Close / Fold back button */}
              <button
                type="button"
                onClick={toggleLetter}
                className="mt-6 text-xs font-cormorant italic tracking-wider text-[#788e9b] hover:text-[#173a52] transition-colors underline underline-offset-4"
              >
                Fold the letter back
              </button>
            </article>
          </div>
        )}
      </div>

      {/* Bottom Seam */}
      <div
        className="seam seam-bot absolute bottom-0 inset-x-0 h-10 bg-repeat-x pointer-events-none z-10"
        style={{
          backgroundImage: "url('/assets/theme/seam.webp')",
          backgroundSize: 'auto 100%',
        }}
      />
    </section>
  );
}

