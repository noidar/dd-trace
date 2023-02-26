const { i18n } = require('./next-i18next.config');

// https://github.com/vercel/next.js/discussions/16600#discussioncomment-1653340
// This way will also not work 
// import 'dd-trace/init';

module.exports = {
  i18n,
  experimental: {
    outputStandalone: true,
},
}

