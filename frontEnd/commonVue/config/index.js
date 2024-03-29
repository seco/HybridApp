
'use strict'
// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const serverConfig = {
  //本地开发环境
  SIT:{
    apiUrl: 'http://192.168.101.146:5004/api'
  },
  LOCALDEV: {
    apiUrl: 'http://test.api.him3d.cn/api'
  }
}

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../../../www/index.html'),
    // index: path.resolve(__dirname, './../../Views/DigitalApplicationForm/Index.cshtml'),
    assetsRoot: path.resolve(__dirname, '../../../www'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: process.env.PORT || 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        target: 'http://test.hub-server.heygears.com:23456/api',
        changeOrigin: true,
        // secure: false
        pathRewrite: {
          '^/api':''
        }
      },
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
