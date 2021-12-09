const webpack = require("webpack");
new webpack.ProvidePlugin({
  $: "jquery",
  jQuery: "jquery",
});
