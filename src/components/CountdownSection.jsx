import React, { useState, useEffect } from 'react';

const TARGET_DATE = new Date('2027-11-13T20:00:00+05:00').getTime();

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [areCloudsParted, setAreCloudsParted] = useState(false);

  useEffect(() => {
    function updateCountdown() {
      const now = new Date().getTime();
      const difference = TARGET_DATE - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSaveTheDate = () => {
    const text = encodeURIComponent("Huzaifa & Asia's Baraat");
    const details = encodeURIComponent("Wedding ceremony at Qasr-e-Mahtab, Islamabad.");
    const location = encodeURIComponent("Qasr-e-Mahtab, Club Road, Islamabad");
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=20271113T150000Z/20271113T190000Z&details=${details}&location=${location}`;
    window.open(url, '_blank');
  };

  return (
    <section
      id="countdown"
      data-section="countdown"
      aria-labelledby="cdTitle"
      className="countdown relative w-full py-20 px-4 bg-[#081420] text-[#f4f1e8] overflow-hidden select-none"
    >
      {/* Background Night Sky */}
      <div
        className="cd-sky absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: "url('/assets/countdown/sky.webp')",
        }}
      />

      {/* Moon in sky */}
      <div className="cd-moon absolute top-[28%] left-1/2 -translate-x-1/2 w-28 h-28 rounded-full bg-gradient-to-br from-[#ffffff] via-[#f4f1e8] to-[#c9d6de] shadow-[0_0_80px_rgba(201,214,222,0.65)] pointer-events-none" />

      {/* Floating Clouds (left & right halves that can part) */}
      <div
        className="cd-clouds absolute inset-0 pointer-events-none transition-transform duration-1000 ease-out"
        style={{
          transform: areCloudsParted ? 'scale(1.2)' : 'none',
        }}
      >
        <div
          className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
            areCloudsParted ? 'opacity-30 -translate-y-8' : 'opacity-85 translate-y-0'
          }`}
          style={{
            backgroundImage: "url('/assets/countdown/clouds.webp')",
          }}
        />
      </div>

      {/* Content */}
      <div className="cd-scene relative z-20 max-w-md mx-auto text-center flex flex-col items-center">
        <header className="cd-head mb-3">
          <p className="cd-kicker font-cormorant italic text-sm tracking-widest text-[#aeb9c1] uppercase mb-1">
            Counting down to
          </p>
          <h2 id="cdTitle" className="cd-title font-cormorant text-3xl sm:text-4xl font-medium tracking-wide">
            <span className="pearl glints font-serif">The Baraat</span>
          </h2>
        </header>

        <p className="cd-date font-cormorant text-sm sm:text-base text-[#c9d6de] tracking-wider mb-8">
          Saturday &middot; 13 November 2027 &middot; 8:00 pm
        </p>

        {/* Ticking Countdown Boxes */}
        <div className="cd-count flex items-center justify-center gap-3 sm:gap-4 my-4">
          <div className="flex flex-col items-center p-3 sm:p-4 rounded-xl bg-[#0b1c2a]/60 backdrop-blur-md border border-[#f8fbf4]/15 min-w-[68px] sm:min-w-[76px] shadow-lg">
            <span className="pearl glints font-serif text-2xl sm:text-3xl font-normal">
              {timeLeft.days}
            </span>
            <small className="font-cormorant italic text-xs tracking-wider text-[#aeb9c1] uppercase mt-1">
              Days
            </small>
          </div>

          <div className="flex flex-col items-center p-3 sm:p-4 rounded-xl bg-[#0b1c2a]/60 backdrop-blur-md border border-[#f8fbf4]/15 min-w-[68px] sm:min-w-[76px] shadow-lg">
            <span className="pearl glints font-serif text-2xl sm:text-3xl font-normal">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <small className="font-cormorant italic text-xs tracking-wider text-[#aeb9c1] uppercase mt-1">
              Hours
            </small>
          </div>

          <div className="flex flex-col items-center p-3 sm:p-4 rounded-xl bg-[#0b1c2a]/60 backdrop-blur-md border border-[#f8fbf4]/15 min-w-[68px] sm:min-w-[76px] shadow-lg">
            <span className="pearl glints font-serif text-2xl sm:text-3xl font-normal">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <small className="font-cormorant italic text-xs tracking-wider text-[#aeb9c1] uppercase mt-1">
              Minutes
            </small>
          </div>

          <div className="flex flex-col items-center p-3 sm:p-4 rounded-xl bg-[#0b1c2a]/60 backdrop-blur-md border border-[#f8fbf4]/15 min-w-[68px] sm:min-w-[76px] shadow-lg">
            <span className="pearl glints font-serif text-2xl sm:text-3xl font-normal">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <small className="font-cormorant italic text-xs tracking-wider text-[#aeb9c1] uppercase mt-1">
              Seconds
            </small>
          </div>
        </div>

        <p className="cd-line font-cormorant italic text-sm text-[#aeb9c1] tracking-wider my-4">
          Until the full moon of our wedding night
        </p>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-3 mt-4">
          <button
            type="button"
            onClick={handleSaveTheDate}
            className="cd-btn px-6 py-2.5 rounded-full bg-[#f4f1e8] text-[#0b1c2a] font-cormorant text-xs font-semibold uppercase tracking-widest hover:bg-[#ffffff] hover:scale-105 active:scale-95 transition-all shadow-md"
          >
            Save the date
          </button>

          <button
            type="button"
            onClick={() => setAreCloudsParted(!areCloudsParted)}
            className="cd-part text-xs font-cormorant italic text-[#aeb9c1] tracking-wider hover:text-white transition-colors underline underline-offset-4 mt-2"
          >
            {areCloudsParted ? 'Return the clouds' : 'Touch to part the clouds'}
          </button>
        </div>
      </div>
    </section>
  );
}

