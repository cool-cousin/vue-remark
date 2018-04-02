module.exports = {
  output: {
    libraryTarget: 'umd',
    libraryExport: 'default',
    library: 'VueRemark',
    umdNamedDefine: true,
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  }
}