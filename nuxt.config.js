const pkg = require('./package')

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      // eslint-disable-next-line standard/object-curly-even-spacing
      { hid: 'og:url', property: 'og:url', content: 'https://deploy-preview-16--dairynomics.netlify.com/' },
      { hid: 'og:description', property: 'og:description', content: 'You will leave here a better farmer, We promise' },
      { hid: 'twitter:card', name: 'twitter:card', content: 'twitter:card' },
      { hid: 'og:title', property: 'og:title', content: 'Is your farm performing well?' },
      { hid: 'og:type', property: 'og:type', content: 'article' },
      { hid: 'og:image', property: 'og:image', content: '{{imageEl}}' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Comfortaa' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // eslint-disable-next-line standard/object-curly-even-spacing
    { src: '~/plugins/socialSharePlugin.js' },
    '~/plugins/socialSharePlugin.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-fontawesome',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    // extend(config, ctx) {
    // Run ESLint on save
    // if (ctx.isDev && ctx.isClient) {
    //   config.module.rules.push({
    //     enforce: 'pre',
    //     test: /\.(js|vue)$/,
    //     loader: 'eslint-loader',
    //     exclude: /(node_modules)/
    //   })
    // }
    // }
  }
}
