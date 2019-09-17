'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    // common:  ['vconsole','vue' ,'vue-router'],
    app: ["babel-polyfill", "./src/main.js"]
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    // publicPath: process.env.NODE_ENV === 'production'? '//uc-hub.heygears.com/uc_hub/static/':(process.env.NODE_ENV === 'prod_test'
    //   ? '//uc-hub.heygears.com/uc_hub/test_static/'
    //   : config.dev.assetsPublicPath)
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'config_axios': process.env.NODE_ENV === 'production' ? resolve('src/axios-config/prod_api.js') : (process.env.NODE_ENV === 'prod_test' ? resolve( 'src/axios-config/test_api.js') : resolve('src/axios-config/dev_api.js'))
    }
  },
  plugins:[
    new webpack.ProvidePlugin({
      _: 'lodash',
    })
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
