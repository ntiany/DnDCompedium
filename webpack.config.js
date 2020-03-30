const path = require("path");

module.exports = {
  entry: ["@babel/polyfill", "./index.js"],
  mode: "development",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname) + "/public"
  },
  module: {
    rules: [
      {
        test:[ /\.s[ac]ss$/i],
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader"
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.html$/i,
        loader: "html-loader"
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
};
