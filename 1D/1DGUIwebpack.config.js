const BabiliPlugin = require("babili-webpack-plugin");
var webpack = require("webpack");

module.exports = {
  entry: './1DPackGUI.tsx',
  output: {
    filename: '1DPackGUIBundle.js',
    path: './testing/'
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  plugins: [
    new BabiliPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],
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
