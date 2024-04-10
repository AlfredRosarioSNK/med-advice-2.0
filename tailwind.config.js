/ @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./pages//*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '50v': '75vh',
        '1/1': '30%',
        '1/0': '20%',
        '50': '50px',
        '30': '30px',
      },
      components: {
        '.card': {
          width: '100%', 
          height: '50vh', 
          backgroundColor: '#FFFFFF', 
          margin: '0.5rem', 
          borderRadius: '0.5rem', 
          '&:hover': {
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
          },
          cursor: 'pointer', 
        }
      },
      borderRadius: {
        'none': '0',
        'sm': '50px',
        DEFAULT: '0.25rem',
        DEFAULT: '4px',
        'md': '0.375rem',
        'lg': '0.5rem',
        'full': '9999px',
        'large': '12px',
      }


    },
  },
  plugins: [],
}