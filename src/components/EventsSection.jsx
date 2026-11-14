import React, { useState } from 'react';

const EVENTS = [
  {
    id: 'mehndi',
    day: 'Thursday',
    name: 'Mehndi',
    date: '11 November 2027',
    time: '7:30 pm onwards',
    place: 'Motia Bagh Farmhouse',
    addr: 'Chak Shahzad, Islamabad',
    colors: ['#d9962a', '#f0ebe0', '#86a093'],
    dressText: 'Marigold and ivory, with a touch of leaf green',
    note: 'An evening of henna, dholki and song under the jasmine.',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Motia+Bagh+Farmhouse%2C+Chak+Shahzad%2C+Islamabad',
    start: '20271111T143000Z', // 7:30pm PKT is 14:30 UTC
    end: '20271111T183000Z',
    pic: '/assets/events/pic-mehndi.webp',
    veil: '/assets/events/veil-mehndi.webp',
  },
  {
    id: 'nikah',
    day: 'Friday',
    name: 'Nikah',
    date: '12 November 2027',
    time: '3:00 pm, after Jumu’ah',
    place: 'Masjid-e-Sakoon',
    addr: 'F-7/3, Islamabad',
    colors: ['#e9e4d6', '#f4f1e8', '#aeb9c1'],
    dressText: 'Pearl, ivory and silver, modestly',
    note: 'The nikah follows Jumu’ah prayer; please come a little early.',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Masjid-e-Sakoon%2C+F-7%2F3%2C+Islamabad',
    start: '20271112T100000Z', // 3:00pm PKT
    end: '20271112T120000Z',
    pic: '/assets/events/pic-nikah.webp',
    veil: '/assets/events/veil-nikah.webp',
  },
  {
    id: 'baraat',
    day: 'Saturday',
    name: 'Baraat',
    date: '13 November 2027',
    time: '8:00 pm onwards',
    place: 'Qasr-e-Mahtab',
    addr: 'Club Road, Islamabad',
    colors: ['#a3263d', '#f0ebe0', '#aeb9c1'],
    dressText: 'Formal: deep rose red, ivory and silver',
    note: 'Dinner at 10 pm, followed by the rukhsati.',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Qasr-e-Mahtab%2C+Club+Road%2C+Islamabad',
    start: '20271113T150000Z', // 8:00pm PKT
    end: '20271113T190000Z',
    pic: '/assets/events/pic-baraat.webp',
    veil: '/assets/events/veil-baraat.webp',
  },
  {
    id: 'walima',
    day: 'Sunday',
    name: 'Walima',
    date: '14 November 2027',
    time: '8:30 pm onwards',
    place: 'Sadaf Marquee',
    addr: 'Park Road, Islamabad',
    colors: ['#6f93bd', '#aeb9c1', '#e9e4d6'],
    dressText: 'Moon blue, silver and pearl',
    note: 'Hosted by the Qureshi family, with dinner at 10 pm.',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Sadaf+Marquee%2C+Park+Road%2C+Islamabad',
    start: '20271114T153000Z', // 8:30pm PKT
    end: '20271114T193000Z',
    pic: '/assets/events/pic-walima.webp',
    veil: '/assets/events/veil-walima.webp',
  },
];

export default function EventsSection() {
  const [openCalDropdown, setOpenCalDropdown] = useState(null);
  const [liftedVeils, setLiftedVeils] = useState({});

  const toggleVeil = (eventId) => {
    setLiftedVeils((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
  };

  const generateGoogleCalUrl = (ev) => {
    const text = encodeURIComponent(`Arham & Hareem's ${ev.name}`);
    const details = encodeURIComponent(`${ev.note}\nDress code: ${ev.dressText}`);
    const location = encodeURIComponent(`${ev.place}, ${ev.addr}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${ev.start}/${ev.end}&details=${details}&location=${location}`;
  };

  const downloadIcs = (ev) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Aqd Invites//Motia Raat//EN
BEGIN:VEVENT
SUMMARY:Arham & Hareem's ${ev.name}
DESCRIPTION:${ev.note} Dress code: ${ev.dressText}
LOCATION:${ev.place}, ${ev.addr}
DTSTART:${ev.start}
DTEND:${ev.end}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${ev.name.toLowerCase()}-arham-hareem.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="events"
      data-section="events"
      aria-labelledby="evTitle"
      className="events muslin seam-edged relative w-full py-16 px-4 bg-[#f0ebe0] text-[#173a52] overflow-hidden"
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
      <header className="ev-head relative z-20 text-center mb-12">
        <p className="ev-kicker font-cormorant italic text-sm tracking-widest text-[#56717f] uppercase mb-1">
          Please join us for
        </p>
        <h2 id="evTitle" className="ev-title font-cormorant text-3xl sm:text-4xl font-medium tracking-wide">
          <span className="ink text-[#173a52] font-serif">The Celebrations</span>
        </h2>
        <p className="ev-sub font-cormorant italic text-sm sm:text-base text-[#56717f] mt-1">
          Four nights in Islamabad, under the jasmine moon
        </p>
      </header>

      {/* Events Cards List */}
      <div className="ev-list relative z-20 max-w-md mx-auto space-y-12">
        {EVENTS.map((ev) => {
          const isVeilLifted = liftedVeils[ev.id];
          const isCalOpen = openCalDropdown === ev.id;

          return (
            <article
              key={ev.id}
              id={`ev-${ev.id}`}
              className="ev relative bg-[#faf8f2] border border-[#e2dacf] rounded-sm shadow-[0_16px_36px_rgba(11,28,42,0.12)] overflow-hidden transition-transform duration-300 hover:shadow-xl"
            >
              {/* Event Face Card */}
              <div className="ev-face p-6 sm:p-8 flex flex-col items-center text-center">
                {/* Event Artwork Image */}
                <div
                  className="ev-pic w-full h-44 sm:h-52 bg-cover bg-center rounded-sm mb-6 border border-[#e8e1d5] shadow-inner"
                  style={{
                    backgroundImage: `url('${ev.pic}')`,
                  }}
                  role="img"
                  aria-label={ev.name}
                />

                <p className="ev-day font-cormorant italic text-xs tracking-widest text-[#788e9b] uppercase mb-1">
                  {ev.day}
                </p>
                <h3 className="ev-name font-cormorant text-2xl sm:text-3xl font-semibold text-[#12324a] tracking-wide mb-1">
                  {ev.name}
                </h3>
                <p className="ev-when font-cormorant text-sm sm:text-base text-[#244256] mb-4">
                  <span className="ev-dmy font-medium">{ev.date}</span> &middot;{' '}
                  <span className="ev-time text-[#56717f]">{ev.time}</span>
                </p>

                {/* Divider Rule */}
                <div className="w-16 h-px bg-[#d5cbba] my-3" />

                {/* Venue */}
                <p className="ev-place font-cormorant text-lg sm:text-xl font-medium text-[#12324a]">
                  {ev.place}
                </p>
                <p className="ev-addr font-cormorant text-xs sm:text-sm text-[#788e9b] mb-4">
                  {ev.addr}
                </p>

                {/* Dress Code */}
                <div className="ev-dress my-3 p-3 bg-[#f3ede1]/60 rounded border border-[#e5dccf] w-full max-w-xs">
                  <p className="ev-label font-cormorant italic text-[11px] tracking-wider text-[#788e9b] uppercase mb-1">
                    Dress code
                  </p>
                  <div className="flex justify-center items-center gap-2 mb-1.5">
                    {ev.colors.map((c, idx) => (
                      <span
                        key={idx}
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-sm"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                  <p className="ev-dress-words font-cormorant text-xs sm:text-sm text-[#355264]">
                    {ev.dressText}
                  </p>
                </div>

                <p className="ev-note font-cormorant italic text-xs sm:text-sm text-[#56717f] max-w-xs my-3">
                  {ev.note}
                </p>

                {/* Buttons: Directions & Calendar */}
                <div className="ev-btns flex items-center gap-3 mt-4">
                  <a
                    className="ev-btn ev-btn-map px-4 py-2 rounded-full border border-[#173a52]/30 text-xs font-cormorant font-semibold tracking-wider uppercase text-[#173a52] hover:bg-[#173a52] hover:text-[#f8fbf4] transition-all"
                    href={ev.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Directions
                  </a>

                  {/* Add to Calendar Menu */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setOpenCalDropdown(isCalOpen ? null : ev.id)}
                      className="ev-btn ev-btn-cal px-4 py-2 rounded-full border border-[#173a52]/30 text-xs font-cormorant font-semibold tracking-wider uppercase text-[#173a52] hover:bg-[#173a52] hover:text-[#f8fbf4] transition-all"
                    >
                      Add to calendar
                    </button>

                    {isCalOpen && (
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-44 bg-[#faf8f2] border border-[#d5cbba] rounded shadow-lg py-1 z-30 text-left text-xs font-cormorant">
                        <a
                          href={generateGoogleCalUrl(ev)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-3 py-1.5 text-[#173a52] hover:bg-[#f0ebe0]"
                        >
                          Google Calendar
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            downloadIcs(ev);
                            setOpenCalDropdown(null);
                          }}
                          className="w-full text-left px-3 py-1.5 text-[#173a52] hover:bg-[#f0ebe0]"
                        >
                          Apple / iCal (.ics)
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Translucent Muslin Veil overlay (Can be lifted) */}
              {!isVeilLifted && (
                <div
                  className="ev-veil absolute inset-0 bg-cover bg-center transition-all duration-700 cursor-pointer flex items-end justify-center pb-6"
                  style={{
                    backgroundImage: `url('${ev.veil}')`,
                    backgroundColor: 'rgba(240, 235, 224, 0.45)',
                  }}
                  onClick={() => toggleVeil(ev.id)}
                >
                  <span className="px-3.5 py-1.5 rounded-full bg-[#0b1c2a]/70 text-[#f4f1e8] font-cormorant italic text-xs tracking-wider shadow-md hover:scale-105 transition-transform">
                    Touch to lift veil
                  </span>
                </div>
              )}
            </article>
          );
        })}
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

