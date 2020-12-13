const withFonts = require('next-fonts');

module.exports = withFonts({
  enableSvg: true,
  webpack(config, options) {
    config.module.rules.push({
      test: /\.ttf$/,
      use: [
        {
          loader: 'ttf-loader',
          options: {
            name: './font/[hash].[ext]',
          },
        },
      ]
    })
    return config;
  },
  env: {
    PAYMENT_URL: process.env.PAYMENT_URL,
    MERCHANT_URL: process.env.MERCHANT_URL,
    MERCHANT_ID: process.env.MERCHANT_ID,
  },
}); 

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true'
// })

// module.exports = withBundleAnalyzer({})