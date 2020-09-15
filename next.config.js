const withFonts = require('next-fonts');
const withPurgeCss = require('next-purgecss')

module.exports = withPurgeCss(withFonts({
  enableSvg: true,
  webpack(config, options) {
    return config;
  }
})); 
