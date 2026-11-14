/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'motia-dark': '#060b1a',
        'motia-deep': '#0b1c2a',
        'motia-night': '#081420',
        'motia-pearl': '#f4f1e8',
        'motia-gold': '#d4af37',
        'motia-gold-light': '#f4e5a9',
        'motia-blue': '#c4d4f0',
        'mehndi': '#3a6645',
        'nikah': '#c4d4f0',
        'baraat': '#7a2021',
        'walima': '#24455a',
      },
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        allura: ['Allura', 'cursive'],
        amiri: ['Amiri', 'serif'],
        nastaliq: ['"Noto Nastaliq Urdu"', 'serif'],
        jost: ['Jost', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

