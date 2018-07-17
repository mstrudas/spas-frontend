module.exports = {
  configureWebpack: (conf) => {
    conf.entry['app'].push(require.resolve(`webpack-dev-server/client`) + '?http://sensational-atroxic.c9users.io:8080')
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    disableHostCheck: true,
    overlay: true,
    hot: true
  }
}