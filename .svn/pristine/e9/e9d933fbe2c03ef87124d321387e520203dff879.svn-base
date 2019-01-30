const path = require('./index')
module.exports = {
  entry: {
    // 这里的依赖顺序必须是：对象从上往下依赖，数组从右到左依赖（如果互不依赖的可以忽略顺序）
    ui: ['iview', 'element-ui'],
    tool: ['lodash', 'jquery', 'axios'],
    vue: ['vue', 'vuex', 'vue-router', 'vue-cookie'],
    swriper: ['vue-awesome-swiper']
  },
  outFile: '.' + path.build.assetsSubDirectory + '/dll'
}
