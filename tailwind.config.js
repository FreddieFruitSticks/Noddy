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
        background2: '#D8D8D8',
        background3: '#fffdfb',
        green:'#6BBE66',
        yellow:'#EFCE4A',
        red: "#E1341E",
        blue: "#1b3de4",
        fadedRed: '#f16159',
        lightFadedRed: '#f47d77',
        lighterFadedRed: '#FCDDDC',
        fadedGreen: '#59F161',
        lightFadedGreen: '#77F47D',
        lighterFadedGreen: '#DCFCDD',
        fadedBlue: '#6159F1',
        lightFadedBlue: '#7D77F4',
        lighterFadedBlue: '#DDDCFC'
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
