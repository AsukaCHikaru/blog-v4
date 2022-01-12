import * as webpack from "webpack";
import { resolve } from "path";

const config: webpack.Configuration = {
  context: resolve(__dirname),
  entry: "./src/server/index.ts",
  output: {
    filename: "server.bundle.js",
    path: resolve(__dirname, "dist", "server"),
  },
  target: "node",
  node: {
    __dirname: false,
    __filename: false,
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
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NOTION_API_TOKEN: JSON.stringify(process.env.NOTION_API_TOKEN) || "",
        NOTION_DATABASE_ID:
          JSON.stringify(process.env.NOTION_DATABASE_ID) || "",
      },
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".json", ".js"],
  },
  devtool: "inline-source-map",
};

export default config;
