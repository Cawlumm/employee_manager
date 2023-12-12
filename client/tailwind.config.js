/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,jsx}',
    './components/**/*.{html,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        whitesmoke: '#f5f5f5',
      },
      screens: {
        'sm': '0px',
        'md': '500px',
        'lg': '800px',
      },
    },
  },
  plugins: [],
}