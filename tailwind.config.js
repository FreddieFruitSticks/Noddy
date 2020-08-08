module.exports = {
  purge: [],
  theme: {
    extend: {
      colors: {
        orange: '#ff5614',
        grey: '#595959'
      },
    },
    screens: {
      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }      
      
      'min-xl': {'min': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'min-lg': {'min': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'min-md': {'min': '767px'},
      // => @media (max-width: 767px) { ... }

      'min-sm': {'min': '639px'},
      // => @media (max-width: 639px) { ... }
    }
  },
  variants: {},
  plugins: [],
}
