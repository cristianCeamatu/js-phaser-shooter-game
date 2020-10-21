const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    main: './src/game.js',
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ca]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(gif|png|jpe?g|svg|xml)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(wav|ogg|mp3|m4a)$/i,
        use: 'file-loader',
      },
    ],
  },
  plugins: [new Dotenv()],
};
