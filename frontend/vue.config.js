const { defineConfig } = require('@vue/cli-service')
const path = require("path")
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  outputDir: path.resolve(__dirname, "../backend/public"), // 指定打包路径
  lintOnSave: false, // 关闭ESlint语法检查
  configureWebpack: {
    plugins: [
      new NodePolyfillPlugin()
    ]
  }
})
