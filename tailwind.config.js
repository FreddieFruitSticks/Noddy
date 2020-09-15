module.exports = {
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'src/**/*.tsx',
      'pages/**/*.tsx',
      'next.config.js'
    ]
  },
  theme: {
    extend: {
      colors: {
        orange: '#ff5614',
        grey: '#595959',
        background: '#f2f2f2',
        red: "#E1341E"
      },
    },
    screens: {
      'xl': {'max': '1279px'},
      'lg': {'max': '1023px'},
      'md': {'max': '767px'},
      'sm': {'max': '639px'},
      'xs': {'max': '339px'},
      
      'min-xl': {'min': '1279px'},
      'min-lg': {'min': '1023px'},
      'min-md': {'min': '767px'},
      'min-sm': {'min': '639px'},
    }
  },
  variants: {},
  plugins: [],
}
