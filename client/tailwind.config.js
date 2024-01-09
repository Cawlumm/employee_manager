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
      keyframes: {
        progressAnimation: {
          "0%": {
            width: "0%",
          },
          "100%": {
            width: "100%",
          },
        }
      },
      animation: {
        'progress-animation': 'progressAnimation 1s linear infinite',
      }
    },
  },
  plugins: [
  ],
}