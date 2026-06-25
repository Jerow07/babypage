/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFF8F3',
        rosa: { DEFAULT: '#F7C5CC', dark: '#e8a0aa' },
        lila: { DEFAULT: '#D8C5F0', dark: '#b89fe0' },
        menta: { DEFAULT: '#C5E8D5', dark: '#9fd4ba' },
        arena: '#B5A8A0',
        cacao: '#5C3D2E',
      },
      fontFamily: {
        display: ['Nunito', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        soft: '0 2px 16px 0 rgba(92,61,46,0.08)',
        card: '0 4px 24px 0 rgba(92,61,46,0.10)',
      },
    },
  },
  plugins: [],
}
