module.exports = {
  publicPath: '/city-walker/',
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/style/_variable.scss";`
      }
    }
  },
  devServer: {
    open: true,
  }
}