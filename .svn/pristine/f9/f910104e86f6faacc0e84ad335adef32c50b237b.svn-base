var fs = require('fs')
var ora = require('ora')
var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var dllConfig = require('../config/dll')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var NyanProgressPlugin = require('nyan-progress-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

function fileExist(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
}

var env = config.build.env

var entry = {
  app: './src/main.js'
};

var definePluginArr = [];
for (var key in dllConfig.entry) {
  // 模块入口
  entry[key] = dllConfig.entry[key];
  let manifestPath = resolve(`${/\.\.\//.test(dllConfig.outFile) ? dllConfig.outFile.slice(2) : dllConfig.outFile}/${key}_manifest.json`);
  // 检测模块依赖对应关系文件是否存在
  if (!fileExist(manifestPath)) {
    console.log(`! 系统未检测到 ${key} 模块的依赖关系文件 请先执行 npm run dll \n`);
    process.exit(1);
  }
  console.log(`- 正在添加 ${key} 模块的依赖关系`);
  // 记录模块依赖对应关系
  definePluginArr.push(new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: require(`${dllConfig.outFile}/${key}_manifest.json`)
  }))
}

var spinner = ora('building for production...').start()

var webpackConfig = merge(baseWebpackConfig, {
  entry,
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new NyanProgressPlugin({
      logger: function () {
      },
      getProgressMessage: function (progress, messages, styles) {
        spinner.text = '进度:' + (progress * 100).toFixed(2) + '%' + '  ' + messages[0] || messages[1];
        if (progress == 1) {
          console.log('\n进度:' + (progress * 100).toFixed(2) + '%', messages[0] || messages[1]);
          spinner.stop();
        }
      },
      restoreCursorPosition: true,
    }),
    ...definePluginArr,
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        // 移除测试打印
        drop_debugger: true,
        drop_console: true
      },
      sourceMap: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    // 移至base conf中
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,     //移除HTML中的注释
        collapseWhitespace: true,  //删除空白符与换行符
        removeAttributeQuotes: true  //
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../sasteacher'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
