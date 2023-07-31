/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./main.jsx", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'bgColor' : '#212832',
        'cnColor' : '#fed36a',
        'inColor' : '#455a64'
      },
      gridTemplateColumns: {
        '1161': '1.2fr 1.6fr 1.2fr',
        '121': '1fr 2fr 1fr',
      },
      gridTemplateRows:{
        '224' : '1.5fr 1.5fr 3fr',
        '22' : '1fr 1fr'
      }
    },
  },
  plugins: [],
}
