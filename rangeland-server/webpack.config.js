const path = require('path');
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'model.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
      rules: [
        {
            test:/\.(scss|sass)$/,
            use:['style-loader','css-loader','sass-loader']
        }
      ]
  },
  devServer: {
      hot:true
  },
  plugins: [
      new webpack.HotModuleReplacementPlugin()
  ]
};