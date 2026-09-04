// 实际编译浏览器依赖图，补足仅用 Node/模板测试无法发现的模块解析问题。
const assert = require('assert')
const path = require('path')
const webpack = require('webpack')
const MemoryFS = require('memory-fs')
const compiler = webpack({
  mode: 'development',
  target: 'web',
  devtool: false,
  entry: path.resolve(__dirname, '../docs/.vuepress/api/question-bank-controller.js'),
  output: { path: path.resolve(__dirname, '../.temp/question-bank-bundle-check'), filename: 'check.js' },
  resolve: { modules: [path.resolve(__dirname, '../node_modules'), 'node_modules'] }
})
compiler.outputFileSystem = new MemoryFS()
compiler.run((error, stats) => {
  if (error || stats.hasErrors()) {
    console.error(error || stats.toString({ all: false, errors: true }))
    process.exitCode = 1
    return
  }
  const modules = stats.toJson({ all: false, modules: true }).modules
  assert(modules.some(m => m.name.includes('markdown-it/dist/markdown-it.js')))
  assert(!modules.some(m => m.name.includes('entities/maps/entities.json')))
  console.log('PASS: 题库控制器及依赖完成 webpack 浏览器打包，无 entities 模块解析错误（产物仅在内存中）')
})
