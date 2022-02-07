const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['images.prismic.io']
  },

  pwa: {
    dest: 'public',
    runtimeCaching
  },
});
