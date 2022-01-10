import * as webpack from "webpack";
import { resolve } from "path";

const config: webpack.Configuration = {
  context: resolve(__dirname),
  entry: "./src/client/index.tsx",
  output: {
    filename: "bundle.js",
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
  resolve: {
    extensions: [".ts", ".tsx", ".json", ".js"],
  },
  devtool: "inline-source-map",
};

export default config;
