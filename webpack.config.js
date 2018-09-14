const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV === 'devlopment'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = {
  target: 'web',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: '[name].[hash:8].js',
    path: path.join(__dirname, 'dist')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"devlopment"' : '"production"'
      }
    }),
    // make sure to include the plugin for the magic
    new VueLoaderPlugin(),
    new HTMLPlugin(),
  ],
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 2048,
            name: '[name].[ext]'
          }
        }]
      }
    ]
  }
}
// config the dev mode
if (isDev) {
  //方便代码调试
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 8888,
    host: '0.0.0.0',
    overlay: {
      // show errors on browser
      errors: true
    },
    hot: true
  }

  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin
  )

  config.module.rules.push({
    test: /\.styl(us)?$/,
    use: [
      'vue-style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
      },
      'stylus-loader'
    ]
  })
} else {
  config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    vendor: ['vue']
  }
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push({
    test: /\.styl(us)?$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
      },
      'stylus-loader'
    ]
  })
  config.optimization = {

    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true
        }
      }
    },

    runtimeChunk: true

  }
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash:8].css",
      // chunkFilename: "[id].css"
    }),
  )
}

module.exports = config