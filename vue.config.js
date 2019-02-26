const path = require('path')
const webpack = require('webpack')

// vue.config.js
module.exports = {
  lintOnSave: true,
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 4000,
    https: false,
    hotOnly: false,
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
    proxy: {
      '/api': {
          target: 'http://127.0.0.1:8000',
      }
    }, // string | Object
    before: app => {}
  },
  chainWebpack: config => {
    config.module.rule('eslint').use('eslint-loader').options({
      fix: true
    })
  },
  configureWebpack: {
    resolve: {
      alias: {
        'bootstrap-components': path.resolve(__dirname, 'node_modules/bootstrap-vue/es/components')
        // 'highlight.js': path.resolve(__dirname, 'src/libs/highlight.js')
      }
    }
  }
}
