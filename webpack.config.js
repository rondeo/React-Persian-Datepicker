var path = require('path');
module.exports = {
  entry: [
    path.join(__dirname, 'demo/index.js'),
    path.join(__dirname, 'demo/style.scss')
  ],
    output: {
        path: path.join(__dirname, 'demo/assets'),
        filename: "bundle.js",
        publicPath: "assets"
  },
  devServer: {
    contentBase: path.join(__dirname, 'demo'),
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
          presets: ['@babel/preset-env']
        }
        }
      },
      {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [
              "style-loader",
              "css-loader",
              "sass-loader"
          ]
        }
    ]
  }
};
