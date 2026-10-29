import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import dotenv from "dotenv";

dotenv.config();

export default {
  mode: "development",

  entry: "./index.js",

  output: {
    filename: "main.js",
    path: path.resolve(import.meta.dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),

    new webpack.DefinePlugin({
      "process.env.API_KEY": JSON.stringify(process.env.API_KEY),
    }),
  ],

  devServer: {
    static: "./dist",
    open: true,
    hot: true,
  },
};
