/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#04050c',
        primary: '#97A5E1',
        secondary: '#21347f',
        accent: '#4460d2',
        text: '#DFE3F4'
      }
    }
  },
  plugins: []
}
