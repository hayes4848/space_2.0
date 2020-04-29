const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');


 module.exports = {
   entry: {
     app: './src/index.js',
  },
   plugins: [
     new HtmlWebpackPlugin({
      title: 'Star Wars SoFi',
      template: './index.html',
     }),
   ],
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ]
      },
      {
        test: /\.obj$/,
        use: ['url-loader',]
      }, 
      {
        test: /\.mtl$/,
        loader: 'mtl-loader',
      },
    ],
  },
};