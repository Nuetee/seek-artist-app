//path: root directory
const path = require('path')
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/server-api': {
          'target' : process.env.VUE_APP_SERVER_URL,
          'changeOrigin' : true,
          'secure' : false
      },
      // Proxy for naver api
      '/naver-login-api': {
          'target' : process.env.VUE_APP_NAVER_API,
          'pathRewrite' : { 
              '^/naver-login-api' : ''
          },
          'changeOrigin' : true,
          'secure' : false
      }
    },
    client: {
      overlay: false
    }
  },
  pwa: {
    name: 'seek for artist',
    workboxOptions: {
      exclude: ['_redirects']
    }
  },
  productionSourceMap: process.env.NODE_ENV === 'production'
    ? false
    : true,
  configureWebpack: process.env.NODE_ENV === 'production'
    ? {
        mode: 'production',
        performance : {
            hints : false
        }
    }
    : {
        mode: 'development',
    },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src/'))
  },
  lintOnSave: false
})
