/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.ENV === 'development';

module.exports = {
  entry: './src/index.tsx',
  devtool: 'source-map',
  output: {
    path: path.resolve('dist'),
    filename: '[name].bundle.[contenthash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [path.resolve('node_modules')],
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.json',
          },
        },
      },
      {
        test: /\.css$/,
        include: [path.resolve('node_modules')],
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              url: true,
              modules: {
                mode: 'global',
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: [path.resolve('node_modules')],
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              url: true,
              modules: {
                auto: /\.module\.css$/,
                localIdentName: isDev ? '[path][name]__[local]' : '[contenthash]',
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        dependency: { not: ['url'] },
        use: [
          {
            loader: 'file-loader',
            options: {
              name: isDev ? '[name].[ext]' : 'images/[contenthash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        dependency: { not: ['url'] },
        use: [
          {
            loader: '@svgr/webpack',
          },
        ],
      },
    ],
  },
  plugins: [
    !isDev
      ? new MiniCssExtractPlugin({
          filename: 'static/css/[name].[contenthash].css',
        })
      : false,
    new HtmlWebpackPlugin({
      template: path.resolve('./src/index.html'),
    }),
  ].filter(Boolean),
  stats: 'minimal',
  devServer: {
    hot: true,
    historyApiFallback: true,
    host: 'localhost',
    port: 3000,
    compress: true,
    proxy: {
      // http-proxy-middleware
      '/api/': {
        target: 'http://localhost:3010',
      },
    },
  },
  // вебпак добавит в html sript тэг, который загрузит яндекс карты, тэг после этого уберётся.
  externalsType: 'script',
  externals: {
    // говорим вебпаку, чтобы не бандлил импорты яндекс карт в коде из модуля `import something from ymaps3`
    // подставьте свой апиключ вместо _APIKEY_
    ymaps3: ['https://api-maps.yandex.ru/3.0/?apikey=d7eb28d6-96a1-4b8b-a602-eb13aa7bd8ba&lang=ru-RU', 'ymaps3'],
  },
};
