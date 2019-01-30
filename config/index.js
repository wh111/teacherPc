'use strict'
// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/sasteacher/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: './sasteacher',
    assetsPublicPath: '/',
    productionSourceMap: false,
    cssSourceMap: false,
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
    index: 'index.html',
    port: 6031,
    autoOpenBrowser: true,
    assetsSubDirectory: './sasteacher',
    assetsPublicPath: '/',
    proxyTable: {
      '/api/': {
        target: 'http://192.168.1.135:9901', //杨明辉
        changeOrigin: true
      }
      /*'/stu/': {
        // target: 'http://192.168.1.165:9901', //邢杰6083
        // target: 'http://192.168.1.150:9901', // 关燊6081
        // target: 'http://192.168.1.185:9901', // 王静6082
        target: 'http://192.168.1.203:9099', // 测试服
        // target: 'http://192.168.1.222:9901', //安世魁6083
        changeOrigin: true
      },
      '/api/teacher/': {
       // target: 'http://192.168.1.137:9901', // 王静6082
      // target: 'http://192.168.1.33:9901', // 王静6082
         target: 'http://192.168.1.236:9901',
        // target: 'http://192.168.1.150:9901', // 关燊6081
        //target: 'http://192.168.1.185:9901', // 王静6082
        // target: 'http://192.168.1.165:9901', //邢杰6083
        // target: 'http://192.168.1.51:9901', //雷朋6083
        // target: 'http://192.168.1.222:9901', //安世魁6083
        // target: 'http://192.168.1.33:9901', // 张泽林 6084
        changeOrigin: true
      },
      '/manager/': {
        // target: 'http://192.168.1.165:9901', //邢杰6083
        // target: 'http://192.168.1.150:9901', // 关燊6081
        target: 'http://192.168.1.185:9901', // 王静6082
        // target: 'http://192.168.1.51:9901', //雷朋6083
        // target: 'http://192.168.1.222:9901', //安世魁6083
        changeOrigin: true
      }*/
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}