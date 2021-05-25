module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] }, 
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      container:{
        padding:"1.00rem",
      }
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}