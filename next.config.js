const withFonts = require('next-fonts');

module.exports = withFonts({
  enableSvg: true,
  webpack(config, options) {
    return config;
  },
  env: {
    PAYMENT_URL: process.env.PAYMENT_URL,
  },
}); 
