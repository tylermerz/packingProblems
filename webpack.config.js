module.exports = {
  entry: "./testVisResult.ts",
  output: {
    filename: 'visTestBundle.js',
    path: './1DOnline/',
    libraryTarget: 'var',
    library: 'EntryPoint'
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  ts: {
    transpileOnly: true
  }
}
