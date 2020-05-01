const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js', 
    asteroids: './src/asteroids.js',
    explosion: './src/explosion.js',
    key_events: './src/key_events.js',
    laser_beam: './src/laser_beam.js',
    load_ship: './src/load_ship.js',
    sofi_logo: './src/sofi_logo.js',
    text_generator: './src/text_generator.js',
    tunnel: './src/tunnel.js',
  },
  mode: "development",
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Star Wars SoFi',
      template: './index.html',
    }),
    new CopyPlugin([{
      from: './src/images',
      to: 'images'
  }]),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devServer: {
    contentBase: './dist',
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
        test: /\.(svg|jpg|gif)$/,
        use: [
          'file-loader',
        ]
      },
      {
        test: /\.(png|obj)$/,
        use: ['url-loader',]
      }, 
      {
        test: /\.mtl$/,
        loader: 'mtl-loader',
      },
    ],
  },
};