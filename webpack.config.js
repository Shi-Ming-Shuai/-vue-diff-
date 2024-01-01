const path = require('path')
// const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: './src/index.js',
    index2: './src/index2.js'
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: './js/[name].js'
  },
  resolve: {
    extensions: ['.js']
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    liveReload: true,
    hot: true
  },
  // 解决热更新需要刷新页面问题
  plugins: [
    // new webpack.HotModuleReplacementPlugin()
    // new HtmlWebpackPlugin({
    //   template: path.join(__dirname, 'public/index.html')
    // })
  ],
  // optimization: {
  //   runtimeChunk: 'single'
  // }
}
