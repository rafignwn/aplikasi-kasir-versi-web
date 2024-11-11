/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,tsx,jsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({addUtilities}) {
      addUtilities({
        '.hide-scrollbar': {
          'scrollbar-width': 'none', /* Untuk Firefox */
          '-ms-overflow-style': 'none', /* Untuk IE dan Edge */
        },
        // Hilangkan scrollbar di browser berbasis Webkit (Chrome/Safari)
        '.hide-scrollbar::-webkit-scrollbar': {
          'display': 'none', /* Sembunyikan scrollbar di Chrome/Safari */
        },
      })
    }
  ],
}

