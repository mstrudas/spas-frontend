module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    disableHostCheck: true,
    overlay: true,
    hot: true
  },
  configureWebpack: {
    devtool: 'source-map'
  }
}