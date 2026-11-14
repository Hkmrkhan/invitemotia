import React, { useState, useEffect, useRef, useCallback } from 'react';
import Invitation from './Invitation';
import { useSound } from '../hooks/useSound';

const DEVICES = [
  { id: 'phone', label: 'Phone', w: 390, h: 844, pad: 10, r: 50 },
  { id: 'ipad', label: 'iPad', w: 820, h: 1180, pad: 14, r: 32 },
  { id: 'ipadl', label: 'iPad sideways', w: 1180, h: 820, pad: 14, r: 32 },
];

const SECTIONS = [
  { id: 'cover', num: '01', name: 'jasmine curtain' },
  { id: 'hero', num: '02', name: 'garden' },
  { id: 'letter', num: '03', name: 'letter' },
  { id: 'families', num: '04', name: 'families' },
  { id: 'events', num: '05', name: 'events' },
  { id: 'countdown', num: '06', name: 'countdown' },
  { id: 'rsvp', num: '07', name: 'RSVP' },
  { id: 'closing', num: '08', name: 'closing' },
];

export default function DemoView() {
  const [deviceId, setDeviceId] = useState('phone');
  const [scale, setScale] = useState(0.85);
  const [isFullBrowser, setIsFullBrowser] = useState(false);
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);

  const stageRef = useRef(null);
  const inviteScrollRef = useRef(null);
  const currentDevice = DEVICES.find((d) => d.id === deviceId) || DEVICES[0];

  const { isMuted, toggleSound, playSfx, startMusic } = useSound();

  // Responsive scale calculation
  const updateScale = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const totalW = currentDevice.w + 2 * currentDevice.pad;
    const totalH = currentDevice.h + 2 * currentDevice.pad;
    const scaleX = (stage.clientWidth - 32) / totalW;
    const scaleY = (stage.clientHeight - 48) / totalH;
    setScale(Math.min(1, Math.max(0.3, Math.min(scaleX, scaleY))));
  }, [currentDevice]);

  useEffect(() => {
    updateScale();
    const ro = new ResizeObserver(updateScale);
    if (stageRef.current) ro.observe(stageRef.current);
    window.addEventListener('resize', updateScale);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateScale);
    };
  }, [updateScale]);

  // Jump to section handler
  const handleJumpToSection = (index) => {
    const section = SECTIONS[index];
    setActiveSectionIdx(index);

    if (section.id === 'cover') {
      setIsCurtainOpen(false);
      inviteScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (!isCurtainOpen) {
      setIsCurtainOpen(true);
      startMusic();
    }

    setTimeout(() => {
      const container = inviteScrollRef.current;
      if (!container) return;
      const targetEl = container.querySelector(`[data-section="${section.id}"]`);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleCurtainOpen = () => {
    setIsCurtainOpen(true);
    startMusic();
    setActiveSectionIdx(1);
  };

  return (
    <div
      className="DemoView-module__hnNVUW__page w-full h-[100svh] min-h-[600px] bg-[#060b1a] text-[#f8fbf4] relative grid grid-rows-[68px_minmax(0,1fr)_72px] overflow-hidden select-none"
      style={{
        '--accent-d': '#c4d4f0',
        '--base': 'rgb(6, 11, 26)',
        '--glow-d': '150, 180, 240',
      }}
    >
      {/* Ambient background with blurred mockup */}
      <img
        alt=""
        src="/media/designs/motia-raat-phone.webp"
        className="DemoView-module__hnNVUW__amb absolute inset-0 w-full h-full object-cover filter blur-[70px] saturate-[1.3] opacity-40 scale-110 pointer-events-none"
      />
      <div className="DemoView-module__hnNVUW__shade absolute inset-0 bg-[radial-gradient(ellipse_55%_70%_at_50%_50%,rgba(6,11,26,0.15),rgba(6,11,26,0.92)_100%)] pointer-events-none" />

      {/* TOP HEADER */}
      <header className="DemoView-module__hnNVUW__top relative z-30 px-7 bg-[#060b1a]/75 backdrop-blur-md border-b border-[#f8fbf4]/10 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center">
        {/* Title */}
        <div className="DemoView-module__hnNVUW__title flex items-center gap-4">
          <a
            aria-label="Back to Motia Raat"
            className="DemoView-module__hnNVUW__back w-11 h-11 rounded-full flex items-center justify-center text-[#f8fbf4] hover:bg-[#f8fbf4]/10 transition-colors"
            href="#card"
            onClick={(e) => {
              e.preventDefault();
              handleJumpToSection(0);
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 10H4M8.5 5.5L4 10l4.5 4.5" />
            </svg>
          </a>
          <div>
            <div className="DemoView-module__hnNVUW__name font-serif text-2xl leading-none">
              Motia Raat
            </div>
            <div className="DemoView-module__hnNVUW__tag font-jost text-[10px] font-medium tracking-[0.22em] uppercase text-[#c4d4f0] mt-1">
              Live demo
            </div>
          </div>
        </div>

        {/* Device Switcher */}
        <div
          className="DemoView-module__hnNVUW__seg hidden md:flex items-center p-1 rounded-full bg-[#f8fbf4]/5 border border-[#f8fbf4]/15 shadow-inner"
          role="radiogroup"
          aria-label="Preview on"
        >
          {DEVICES.map((d) => {
            const isChecked = deviceId === d.id;
            return (
              <button
                key={d.id}
                type="button"
                role="radio"
                aria-checked={isChecked}
                onClick={() => setDeviceId(d.id)}
                className={`h-10 px-4 rounded-full text-[11px] font-medium tracking-[0.16em] uppercase flex items-center gap-2 transition-all duration-200 ${
                  isChecked
                    ? 'bg-[#f8fbf4] text-[#060b1a] shadow-sm'
                    : 'text-[#f8fbf4] hover:text-white'
                }`}
              >
                {d.id === 'phone' && (
                  <svg width="14" height="16" viewBox="0 0 14 16" fill="none" stroke="currentColor" strokeWidth="1.3">
                    <rect x="3" y="0.8" width="8" height="14.4" rx="2" />
                    <path d="M6 3h2" />
                  </svg>
                )}
                {d.id === 'ipad' && (
                  <svg width="14" height="16" viewBox="0 0 14 16" fill="none" stroke="currentColor" strokeWidth="1.3">
                    <rect x="1" y="0.8" width="12" height="14.4" rx="1.6" />
                  </svg>
                )}
                {d.id === 'ipadl' && (
                  <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="currentColor" strokeWidth="1.3">
                    <rect x="0.8" y="1.5" width="16.4" height="11" rx="1.6" />
                  </svg>
                )}
                {d.label}
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="DemoView-module__hnNVUW__acts flex items-center justify-end gap-3">
          <button
            type="button"
            className="DemoView-module__hnNVUW__ghost hidden sm:inline-flex items-center gap-2 h-11 px-4 rounded border border-[#f8fbf4]/35 text-[11px] font-medium tracking-[0.18em] uppercase text-[#f8fbf4] hover:bg-[#f8fbf4]/10 transition-colors"
            onClick={() => setIsFullBrowser(true)}
          >
            Open in your browser
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5.5 2.5h-3v9h9v-3M8 2h4v4M12 2L6.5 7.5" />
            </svg>
          </button>

          <a
            className="DemoView-module__hnNVUW__cta inline-flex items-center gap-2 h-11 px-5 rounded bg-[#c4d4f0] text-[#060b1a] text-[11px] font-medium tracking-[0.18em] uppercase hover:shadow-[0_0_0_1px_rgba(150,180,240,0.4),0_18px_40px_-12px_rgba(150,180,240,0.55)] transition-shadow"
            href="https://wa.me/923185533816?text=Assalam%20o%20Alaikum!%20I'd%20like%20to%20book%20the%20Motia%20Raat%20invitation%20from%20Aqd%20Invites."
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
              <path d="M2.5 13.5l1-3a5.5 5.5 0 112 2z" />
            </svg>
            Book Now
          </a>
        </div>
      </header>

      {/* BODY (Sidebars & Center Stage) */}
      <div className="DemoView-module__hnNVUW__body relative z-20 min-h-0 px-6 sm:px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)_240px] xl:grid-cols-[270px_minmax(0,1fr)_270px] items-center gap-6">
        {/* Left Sidebar */}
        <aside className="DemoView-module__hnNVUW__side hidden lg:block text-left">
          <div className="DemoView-module__hnNVUW__sideEyebrow font-cormorant italic font-medium text-lg text-[#d6dfd0] flex items-center gap-2.5">
            <span className="inline-block w-1.5 h-1.5 border border-current rotate-45" />
            The real invitation
          </div>
          <p className="DemoView-module__hnNVUW__sideBig font-serif text-2xl xl:text-3xl leading-snug mt-3">
            Filled with sample names, so you can open it just as a guest would.
          </p>
          <p className="DemoView-module__hnNVUW__sideSmall text-[#f8fbf4]/70 text-sm leading-relaxed mt-4">
            Switch between phone and iPad above, or open it on its own in your browser.
          </p>
        </aside>

        {/* Center Stage: Device Mockup */}
        <div ref={stageRef} className="DemoView-module__hnNVUW__stage relative w-full h-full min-h-0 flex items-center justify-center overflow-hidden">
          <div
            className="DemoView-module__hnNVUW__device absolute transition-all duration-300 ease-out origin-center"
            style={{
              width: `${currentDevice.w + 2 * currentDevice.pad}px`,
              height: `${currentDevice.h + 2 * currentDevice.pad}px`,
              padding: `${currentDevice.pad}px`,
              borderRadius: `${currentDevice.r + currentDevice.pad}px`,
              transform: `translate(-50%, -50%) scale(${scale})`,
              top: '50%',
              left: '50%',
              background: '#0b0507',
              border: '1px solid rgba(248, 251, 244, 0.2)',
              boxShadow: '0 0 0 1px rgba(150, 180, 240, 0.3), 0 60px 110px -40px rgba(0, 0, 0, 0.95)',
            }}
          >
            {/* Screen Viewport */}
            <div
              className="relative w-full h-full overflow-hidden bg-black shadow-inner"
              style={{
                borderRadius: `${currentDevice.r}px`,
              }}
            >
              {/* Dynamic Island / Speaker notch for Phone */}
              {deviceId === 'phone' && (
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-40 flex items-center justify-end pr-3 border border-white/5 pointer-events-none">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#111] border border-white/10" />
                </div>
              )}

              {/* The Live Invitation Component */}
              <Invitation
                isCurtainOpen={isCurtainOpen}
                setIsCurtainOpen={handleCurtainOpen}
                isMuted={isMuted}
                toggleSound={toggleSound}
                playSfx={playSfx}
                onSectionVisible={setActiveSectionIdx}
                containerRef={inviteScrollRef}
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="DemoView-module__hnNVUW__side DemoView-module__hnNVUW__right hidden lg:block text-left">
          <div className="font-jost text-xs uppercase tracking-wider text-[#f8fbf4]/60 font-medium">
            Things to try
          </div>
          <ul className="mt-4 space-y-4 text-sm leading-relaxed text-[#f8fbf4]">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-[#c4d4f0] rotate-45 flex-none mt-2" />
              <span>Tap the jasmine curtain to part it.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-[#c4d4f0] rotate-45 flex-none mt-2" />
              <span>Scroll down through the sections.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-[#c4d4f0] rotate-45 flex-none mt-2" />
              <span>Pick events in the RSVP. Nothing is sent from the demo.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-[#c4d4f0] rotate-45 flex-none mt-2" />
              <span>Tap Directions under any event.</span>
            </li>
          </ul>
        </aside>
      </div>

      {/* BOTTOM FOOTER (Jump Chips) */}
      <footer className="DemoView-module__hnNVUW__bottom relative z-30 px-7 bg-[#060b1a]/75 backdrop-blur-md border-t border-[#f8fbf4]/10 flex items-center gap-4">
        <span className="DemoView-module__hnNVUW__jumpLabel hidden sm:inline-block font-jost text-[11px] font-medium tracking-[0.22em] uppercase text-[#f8fbf4]/60 flex-none">
          Jump to
        </span>

        {/* 8 Chips */}
        <div className="DemoView-module__hnNVUW__chips flex-1 flex justify-start sm:justify-center items-center gap-2 overflow-x-auto py-2 scrollbar-none">
          {SECTIONS.map((sec, idx) => {
            const isCurrent = activeSectionIdx === idx;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => handleJumpToSection(idx)}
                aria-current={isCurrent ? 'true' : undefined}
                className={`h-9 px-3.5 rounded-full border text-[11px] font-medium tracking-[0.08em] whitespace-nowrap flex items-center gap-1.5 transition-all flex-none ${
                  isCurrent
                    ? 'bg-[rgba(150,180,240,0.18)] border-[#c4d4f0] text-[#f8fbf4]'
                    : 'bg-transparent border-[#f8fbf4]/20 text-[#f8fbf4]/75 hover:border-[#f8fbf4]/50 hover:text-white'
                }`}
              >
                <span className="font-serif italic text-sm">{sec.num}</span>
                {sec.name}
              </button>
            );
          })}
        </div>

        <span className="DemoView-module__hnNVUW__note hidden xl:block text-right text-xs leading-tight text-[#f8fbf4]/55 w-44 flex-none">
          Sound on: each design plays its own music.
        </span>
      </footer>

      {/* FULLSCREEN BROWSER OVERLAY (When "Open in your browser" is clicked) */}
      {isFullBrowser && (
        <div className="DemoView-module__hnNVUW__full fixed inset-0 z-50 bg-[#060b1a] text-[#f8fbf4] flex flex-col animate-fadeIn">
          {/* Top Pill Controls */}
          <div className="absolute top-3 inset-x-4 z-50 h-13 px-4 rounded-full bg-[#060b1a]/85 backdrop-blur-md border border-[#f8fbf4]/15 flex items-center justify-between shadow-2xl">
            <div className="flex items-center gap-3">
              <span className="font-serif text-lg">Motia Raat</span>
              <span className="font-jost text-[9px] uppercase tracking-widest text-[#c4d4f0]">
                Live demo
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsFullBrowser(false)}
              className="px-4 py-1.5 rounded-full border border-[#f8fbf4]/30 text-[10px] font-medium tracking-widest uppercase hover:bg-[#f8fbf4]/15 transition-colors"
            >
              Exit Full View
            </button>
          </div>

          {/* Full Invitation */}
          <div className="w-full h-full pt-16">
            <Invitation
              isCurtainOpen={isCurtainOpen}
              setIsCurtainOpen={handleCurtainOpen}
              isMuted={isMuted}
              toggleSound={toggleSound}
              playSfx={playSfx}
              onSectionVisible={setActiveSectionIdx}
            />
          </div>

          {/* Bottom Dock WhatsApp Button */}
          <div className="absolute bottom-5 inset-x-4 z-50 flex justify-center">
            <a
              href="https://wa.me/923185533816?text=Assalam%20o%20Alaikum!%20I'd%20like%20to%20book%20the%20Motia%20Raat%20invitation%20from%20Aqd%20Invites."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-sm h-12 rounded-full bg-[#c4d4f0] text-[#060b1a] flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-transform"
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M2.5 13.5l1-3a5.5 5.5 0 112 2z" />
              </svg>
              Book Now on WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

