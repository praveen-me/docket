const webpack = require("webpack");

const { NODE_ENV } = process.env;

const webpackConfig = require("./webpack.config")({ mode: NODE_ENV });
const compiler = webpack(webpackConfig);

module.exports = app => {
  app.use(
    require("webpack-dev-middleware")(compiler, {
      publicPath: webpackConfig.output.publicPath
    })
  );

  app.use(require("webpack-hot-middleware")(compiler));
};
