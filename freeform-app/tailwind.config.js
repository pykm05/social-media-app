/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{html,js,jsx}",
    "./src/components/*{jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'custom-dark': '#081026',
        'custom-dark2': '#060f29',
        'custom-dark3': '#1f2740',
        'custom-dark4': '#6676ad',
        'custom-cream': '#f0e7c9',
        'custom-rosegray': '#C9E5F0',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        
      },
    },
  },
  plugins: [],
}

