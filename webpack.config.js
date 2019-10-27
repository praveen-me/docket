/* eslint-disable */
var webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const { NODE_ENV } = process.env;
module.exports = {
  mode: NODE_ENV,
  devtool: "inline-source-map",
  entry: "./client/src/index.js",
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" }
      },
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: "css-loader"
          },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {}
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader"
      }
    ]
  },
  output: {
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
    path: __dirname + "/dist/",
    publicPath: NODE_ENV !== "production" ? "/static/" : "/dist/"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    }),
    new MiniCssExtractPlugin({
      filename: "bundle.css"
    }),
  ]
};
