/* eslint-disable */
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: true, // eslint 错误处理，true表示对待eslint错误为warnings，warnings不会导致编译失败
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('store', resolve('src/store'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
      .set('api', resolve('src/api'))
      .set('utils', resolve('src/utils'))
      .set('model', resolve('src/model'))
      .set('config', resolve('src/config'))
  }
}
