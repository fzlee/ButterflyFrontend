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
}