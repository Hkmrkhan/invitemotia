import React, { useState } from 'react';

const CELEBRATIONS = [
  { id: 'mehndi', name: 'Mehndi', day: 'Thu', date: '11 Nov', bead: '/assets/rsvp/bead-mehndi.webp' },
  { id: 'nikah', name: 'Nikah', day: 'Fri', date: '12 Nov', bead: '/assets/rsvp/bead-nikah.webp' },
  { id: 'baraat', name: 'Baraat', day: 'Sat', date: '13 Nov', bead: '/assets/rsvp/bead-baraat.webp' },
  { id: 'walima', name: 'Walima', day: 'Sun', date: '14 Nov', bead: '/assets/rsvp/bead-walima.webp' },
];

export default function RsvpSection({ playSfx }) {
  const [name, setName] = useState('');
  const [selectedEvents, setSelectedEvents] = useState(['mehndi', 'nikah', 'baraat', 'walima']);
  const [seats, setSeats] = useState(4);
  const [wishes, setWishes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleEvent = (eventId) => {
    playSfx('tink');
    setSelectedEvents((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
    );
  };

  const handleStep = (delta) => {
    setSeats((prev) => Math.max(1, Math.min(8, prev + delta)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }
    if (selectedEvents.length === 0) {
      setErrorMessage('Please select at least one celebration you will join.');
      return;
    }

    setErrorMessage('');
    playSfx('fold2');
    setIsSubmitted(true);
  };

  const getSummaryText = () => {
    if (selectedEvents.length === 0) {
      return 'Touch a bead to string it for each celebration you will join';
    }
    const names = selectedEvents.map((id) => CELEBRATIONS.find((c) => c.id === id)?.name);
    if (names.length === 1) return `Stringing for ${names[0]}`;
    if (names.length === 2) return `Stringing for ${names[0]} and ${names[1]}`;
    return `Stringing for ${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
  };

  return (
    <section
      id="rsvp"
      data-section="rsvp"
      aria-labelledby="rsTitle"
      className="rsvp muslin seam-edged relative w-full py-16 px-4 bg-[#f0ebe0] text-[#173a52] overflow-hidden"
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

      {/* Header */}
      <header className="rs-head relative z-20 text-center mb-8">
        <p className="rs-kicker font-cormorant italic text-sm tracking-widest text-[#56717f] uppercase mb-1">
          Kindly reply
        </p>
        <h2 id="rsTitle" className="rs-title font-cormorant text-3xl sm:text-4xl font-medium tracking-wide">
          <span className="ink text-[#173a52] font-serif">Will You Join Us?</span>
        </h2>
        <p className="rs-by font-cormorant italic text-sm sm:text-base text-[#56717f] mt-1">
          by Friday, 15 October 2027
        </p>
      </header>

      {/* Form / Shukriya Confirmation Stage */}
      <div className="rs-table relative z-20 max-w-md mx-auto">
        {!isSubmitted ? (
          <form
            onSubmit={handleSubmit}
            className="rs-card relative bg-[#faf8f2] border border-[#e2dacf] rounded-sm p-6 sm:p-8 shadow-[0_16px_36px_rgba(11,28,42,0.14)] space-y-6"
          >
            {/* Name Input */}
            <div className="rs-field">
              <label className="block text-left">
                <span className="rs-label block font-cormorant text-sm uppercase tracking-wider text-[#788e9b] mb-1.5 font-medium">
                  Your name
                </span>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="as you would sign a card"
                  required
                  className="rs-name w-full px-4 py-2.5 rounded bg-[#f5efe4] border border-[#d5cbba] text-[#173a52] font-cormorant text-base sm:text-lg focus:outline-none focus:border-[#173a52] transition-colors placeholder:text-[#a0b0bb]"
                />
              </label>
            </div>

            {/* Celebrations Beads String */}
            <div className="rs-events text-left">
              <legend className="rs-label block font-cormorant text-sm uppercase tracking-wider text-[#788e9b] mb-3 font-medium">
                Which celebrations will you join?
              </legend>

              {/* String line */}
              <div
                className="w-full h-2 bg-contain bg-center bg-no-repeat mb-2 opacity-60"
                style={{
                  backgroundImage: "url('/assets/rsvp/string.webp')",
                }}
              />

              {/* Beads Row */}
              <div className="rs-evs grid grid-cols-4 gap-2">
                {CELEBRATIONS.map((c) => {
                  const isChecked = selectedEvents.includes(c.id);
                  return (
                    <div
                      key={c.id}
                      onClick={() => toggleEvent(c.id)}
                      className={`rs-ev flex flex-col items-center p-2 rounded-lg cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-[#e8decb]/60 border border-[#c4b7a1]'
                          : 'bg-transparent border border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      {/* Jasmine Bead */}
                      <div
                        className={`w-9 h-9 sm:w-11 sm:h-11 bg-contain bg-center bg-no-repeat transition-transform duration-300 ${
                          isChecked ? 'scale-110 drop-shadow-md' : 'scale-90 grayscale'
                        }`}
                        style={{
                          backgroundImage: `url('${c.bead}')`,
                        }}
                      />
                      <span className="font-cormorant font-semibold text-xs sm:text-sm text-[#12324a] mt-1.5">
                        {c.name}
                      </span>
                      <span className="font-cormorant text-[11px] text-[#788e9b]">
                        {c.day} {c.date}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Live dynamic stringing summary */}
              <p className="rs-summary font-cormorant italic text-xs text-[#56717f] text-center mt-3">
                {getSummaryText()}
              </p>
            </div>

            {/* Party Stepper */}
            <div className="rs-party text-left border-t border-[#e8e1d5] pt-5">
              <p className="rs-label font-cormorant text-sm uppercase tracking-wider text-[#788e9b] mb-2 font-medium">
                How many of you will come?
              </p>
              <div className="flex items-center gap-4">
                <div className="rs-stepper inline-flex items-center border border-[#d5cbba] rounded-full bg-[#f5efe4] px-1 py-0.5">
                  <button
                    type="button"
                    onClick={() => handleStep(-1)}
                    className="rs-step w-8 h-8 rounded-full flex items-center justify-center text-lg text-[#173a52] hover:bg-[#e8e1d5] transition-colors"
                  >
                    &minus;
                  </button>
                  <output className="rs-count font-cormorant text-lg font-semibold w-8 text-center text-[#173a52]">
                    {seats}
                  </output>
                  <button
                    type="button"
                    onClick={() => handleStep(1)}
                    className="rs-step w-8 h-8 rounded-full flex items-center justify-center text-lg text-[#173a52] hover:bg-[#e8e1d5] transition-colors"
                  >
                    +
                  </button>
                </div>
                <p className="rs-seats font-cormorant text-xs sm:text-sm text-[#56717f]">
                  We have kept <span className="font-semibold text-[#173a52]">{seats} seats</span> in your honour
                </p>
              </div>
            </div>

            {/* Wishes Textarea */}
            <div className="rs-field text-left border-t border-[#e8e1d5] pt-5">
              <label className="block">
                <span className="rs-label block font-cormorant text-sm tracking-wider text-[#788e9b] mb-1.5">
                  A note or dua for Arham &amp; Hareem <em className="text-xs opacity-75">(optional)</em>
                </span>
                <textarea
                  name="wishes"
                  rows="3"
                  value={wishes}
                  onChange={(e) => setWishes(e.target.value)}
                  className="rs-wishes w-full px-4 py-2.5 rounded bg-[#f5efe4] border border-[#d5cbba] text-[#173a52] font-cormorant text-sm sm:text-base focus:outline-none focus:border-[#173a52] transition-colors resize-none"
                />
              </label>
            </div>

            {errorMessage && (
              <p className="rs-error text-xs font-cormorant text-red-600 italic text-center">
                {errorMessage}
              </p>
            )}

            {/* Submit button */}
            <div className="rs-send-row pt-2 text-center">
              <button
                type="submit"
                className="rs-send px-8 py-3 rounded-full bg-[#173a52] text-[#f8fbf4] font-cormorant text-xs font-semibold uppercase tracking-widest hover:bg-[#12324a] hover:scale-105 active:scale-95 transition-all shadow-md"
              >
                Tie &amp; send my reply
              </button>
            </div>
          </form>
        ) : (
          /* Shukriya Confirmation Box */
          <div className="rs-thanks bg-[#faf8f2] border border-[#e2dacf] rounded-sm p-8 text-center shadow-[0_20px_45px_rgba(11,28,42,0.18)] animate-fadeIn">
            <p className="rs-kicker font-cormorant italic text-sm tracking-widest text-[#56717f] uppercase mb-1">
              Your reply has been tied
            </p>
            <h3 className="rs-thanks-title font-cormorant text-3xl font-medium text-[#12324a] mb-3">
              Shukriya, <span className="font-semibold">{name}</span>
            </h3>
            <p className="rs-thanks-text font-cormorant text-base sm:text-lg text-[#355264] max-w-xs mx-auto mb-4">
              We look forward to celebrating together under the full jasmine moon!
            </p>

            <div className="my-4 p-4 rounded bg-[#f3ede1] border border-[#e5dccf] inline-block text-left text-xs font-cormorant">
              <p className="font-semibold text-[#173a52] mb-1">Reserved for {seats} guests:</p>
              <ul className="list-disc list-inside space-y-0.5 text-[#56717f]">
                {selectedEvents.map((id) => {
                  const ev = CELEBRATIONS.find((c) => c.id === id);
                  return <li key={id}>{ev?.name} ({ev?.day} {ev?.date})</li>;
                })}
              </ul>
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="rs-change text-xs font-cormorant italic tracking-wider text-[#788e9b] hover:text-[#173a52] transition-colors underline underline-offset-4"
              >
                Change my reply
              </button>
            </div>
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

