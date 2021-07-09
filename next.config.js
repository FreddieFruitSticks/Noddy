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
    MERCHANT_KEY: process.env.MERCHANT_KEY,
    PAYFAST_SALT: process.env.PAYFAST_SALT,
    NEXT_PUBLIC_SEVER_HOST: process.env.NEXT_PUBLIC_SEVER_HOST,
  },
}); 

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true'
// })

// module.exports = withBundleAnalyzer({})