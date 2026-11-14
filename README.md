# Motia Raat · Live Demo Replica (React & Tailwind CSS)

A 100% faithful, interactive React and Tailwind CSS reproduction of [aqdinvites.com/demo/motia-raat](https://aqdinvites.com/demo/motia-raat).

---

## ✨ Features Included

### 1. **Complete Demo Shell**
- **Top Navigation Bar:**
  - Back arrow navigation
  - Title `"Motia Raat"` with `"Live demo"` accent badge
  - **Device Switcher:**
    - **Phone:** Portrait smartphone frame (390 × 844 px, 50 px radius, speaker notch)
    - **iPad:** Portrait tablet frame (820 × 1180 px, 32 px radius)
    - **iPad sideways:** Landscape tablet frame (1180 × 820 px, 32 px radius)
  - **"Open in your browser":** Toggles full-screen mode to experience the invitation edge-to-edge
  - **"Book Now":** WhatsApp direct CTA button
- **Sidebars:**
  - Left: `"The real invitation"` with sample names description
  - Right: `"Things to try"` with interactive checklist
- **Footer Section Navigation:**
  - Jump directly between sections:
    `01 jasmine curtain` &middot; `02 garden` &middot; `03 letter` &middot; `04 families` &middot; `05 events` &middot; `06 countdown` &middot; `07 RSVP` &middot; `08 closing`
  - Active section highlight updates automatically as you scroll

### 2. **Interactive Wedding Invitation Sections**
1. **Jasmine Curtain Cover (`cover`):**
   - Parting curtain animation with strings of white jasmine flowers
   - Golden sparkling particle canvas
   - Flickering diya flames and Mughal arch frame
   - Mute / Unmute background wedding soundtrack toggle
   - Interactive `"Touch the jasmine to enter"` button
2. **Garden Hero (`hero`):**
   - Night garden scene with water ripples canvas on click/touch
   - Floating jasmine petals drifting on the water
   - Shimmering pearl calligraphy: *Huzaifa & Asia*
   - `"Ripple the water"` button & scroll indicator
3. **Letter for Family & Friends (`letter`):**
   - Muslin fabric texture and scalloped border seams
   - Folded muslin parcel tied with jasmine gajra and wax seal
   - Interactive opening: folds open flaps and lifts the letter with audio feedback
   - Quranic Verse (Surah Ar-Rum 30:21) in Arabic calligraphy + English translation
   - Urdu calligraphy: *آپ کی شرکت ہمارے لیے باعثِ مسرت ہوگی*
4. **Our Families (`families`):**
   - Starry night sky with twinkling canvas stars and glowing moon
   - Ornate Mughal Jaali background
   - Hanging brass lanterns for Groom's and Bride's families
   - Touch each lantern to light it with warm amber glow
   - Connecting threads of light that join to bless the couple
5. **The Celebrations (`events`):**
   - 4 Event Cards: **Mehndi**, **Nikah**, **Baraat**, and **Walima**
   - Artwork illustrations for each celebration
   - Date, time, venue, dress code swatches and notes
   - Interactive translucent veil lifting
   - `"Directions"` Google Maps link
   - `"Add to calendar"` menu (Google Calendar & Apple iCal `.ics` download)
6. **Countdown (`countdown`):**
   - Live real-time ticking countdown to Saturday, 13 November 2027 (Days, Hours, Minutes, Seconds)
   - Interactive `"Part the clouds"` / touch clouds to reveal the luminous full moon
   - `"Save the date"` action
7. **RSVP (`rsvp`):**
   - Interactive RSVP card
   - Stringing jasmine beads for each event selection with audio chime
   - Interactive guest counter stepper (`-` / `+`)
   - Personal note/dua textarea
   - `"Tie & send my reply"` with envelope fold animation and Shukriya confirmation
8. **Closing (`closing`):**
   - Lake night scene with Arabic & Urdu blessings
   - Interactive: Touch the water to light floating diyas with reflections
   - `"Replay the invitation"` button

### 3. **Audio System**
- Full authentic Pakistani wedding instrumental background soundtrack (`music.mp3`)
- Realistic sound effects: curtain parting, shimmer, tink, water plop, letter folding, and lantern lighting

---

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The Vite dev server will run at [http://127.0.0.1:3000/](http://127.0.0.1:3000/).

