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
      }
    },
  },
  plugins: [],
}