const withFonts = require('next-fonts');

module.exports = withFonts({
  enableSvg: true,
  webpack(config, options) {
    return config;
  },
  env: {
    PAYMENT_URL: process.env.PAYMENT_URL,
    MERCHANT_URL: process.env.MERCHANT_URL,
    MERCHANT_ID: process.env.MERCHANT_ID,
  },
}); 
