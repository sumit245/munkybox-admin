const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

new webpack.ProvidePlugin({
  $: "jquery",
  jQuery: "jquery",
});

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: './public/index.html'
  })],
  devServer: {
    historyApiFallback: true,
    allowedHosts: 'auto' | 'all' | Array[string]
  },
  externals: {
    config: JSON.stringify({
      apiUrl: 'http://localhost:5000'
    })
  }
}
