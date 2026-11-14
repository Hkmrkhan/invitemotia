import React, { useRef, useEffect } from 'react';
import GateCover from './GateCover';
import HeroSection from './HeroSection';
import LetterSection from './LetterSection';
import FamiliesSection from './FamiliesSection';
import EventsSection from './EventsSection';
import CountdownSection from './CountdownSection';
import RsvpSection from './RsvpSection';
import ClosingSection from './ClosingSection';

export default function Invitation({
  isCurtainOpen,
  setIsCurtainOpen,
  isMuted,
  toggleSound,
  playSfx,
  onSectionVisible,
  containerRef,
}) {
  const localContainerRef = useRef(null);
  const scrollContainer = containerRef || localContainerRef;

  // Track active visible section as user scrolls
  useEffect(() => {
    const container = scrollContainer.current;
    if (!container) return;

    const sections = [
      'cover',
      'hero',
      'letter',
      'families',
      'events',
      'countdown',
      'rsvp',
      'closing',
    ];

    const handleScroll = () => {
      if (!isCurtainOpen) {
        onSectionVisible?.(0);
        return;
      }

      const containerTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const midpoint = containerTop + containerHeight * 0.4;

      let activeIdx = 1;
      for (let i = 1; i < sections.length; i++) {
        const el = container.querySelector(`[data-section="${sections[i]}"]`);
        if (el) {
          const top = el.offsetTop;
          if (midpoint >= top) {
            activeIdx = i;
          }
        }
      }
      onSectionVisible?.(activeIdx);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isCurtainOpen, onSectionVisible, scrollContainer]);

  const handleReplay = () => {
    setIsCurtainOpen(false);
    if (scrollContainer.current) {
      scrollContainer.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={scrollContainer}
      className="card relative w-full h-full overflow-y-auto overflow-x-hidden scroll-smooth bg-[#060b1a]"
      style={{
        scrollbarWidth: 'thin',
      }}
    >
      {/* 01: Jasmine Curtain Gate */}
      <GateCover
        isOpen={isCurtainOpen}
        onOpen={() => setIsCurtainOpen(true)}
        isMuted={isMuted}
        onToggleSound={toggleSound}
        playSfx={playSfx}
      />

      {/* Main Invitation Sections */}
      <main id="card" className="w-full">
        {/* 02: Garden Hero */}
        <HeroSection playSfx={playSfx} />

        {/* 03: Letter */}
        <LetterSection playSfx={playSfx} />

        {/* 04: Our Families */}
        <FamiliesSection playSfx={playSfx} />

        {/* 05: The Celebrations */}
        <EventsSection />

        {/* 06: Countdown */}
        <CountdownSection />

        {/* 07: RSVP */}
        <RsvpSection playSfx={playSfx} />

        {/* 08: Closing & Replay */}
        <ClosingSection onReplay={handleReplay} playSfx={playSfx} />
      </main>
    </div>
  );
}

