import * as webpack from "webpack";
import { resolve } from "path";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const config: webpack.Configuration = {
  context: resolve(__dirname),
  entry: "./src/client/index.tsx",
  output: {
    filename: "[name].bundle.js",
    path: resolve(__dirname, "dist", "static"),
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.json",
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /node_modules/,
          name: "vendor",
          chunks: "initial",
        },
      },
    },
  },
  resolve: {
    plugins: [
      new TsconfigPathsPlugin({
        configFile: "tsconfig.json",
      }),
    ],
    extensions: [".ts", ".tsx", ".json", ".js"],
  },
  devtool: "inline-source-map",
};

export default config;
