module.exports = {
  entry: {
    index: './src/index.js',
    index222: './src/index2.js'
  },
  output: {
    path: __dirname + '/public',
    filename: './js/[name].js'
  },
  resolve: {
    extensions: ['.js']
  },
  devServer: {
    contentBase: './public',
    inline: true,
    hot: true
  }
}
