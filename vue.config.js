module.exports = {
  publicPath: './',
  outputDir: 'YiNuoMoney',
  lintOnSave: true,
  productionSourceMap: false,
  runtimeCompiler: true,
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8081,
    https: false,
    hotOnly: false,
    proxy: null, // string | Object
    before: app => {}
  }
}
