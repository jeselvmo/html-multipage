const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';

const entry = {};
const htmlWebpackPlugins = [];

//读取src/pages目录所有page入口
(function () {
  glob.sync('./src/pages/**/index.js').forEach(function (filename) {
    var prefix = './src/pages/';
    var suffix = '/index.js';
    var start = filename.indexOf(prefix) + prefix.length;
    var end = filename.indexOf(suffix);
    var name = filename.slice(start, end);
    entry[name] = filename;

    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        filename: `${name}.html`,
        template: `${prefix}${name}/index.html`,
        chunks: [name],
        minify: false, //
        inject: 'body',
      })
    );
  });
})();

// console.log('🚀 ~ entry', entry);
// console.log('🚀 ~ htmlWebpackPlugins', htmlWebpackPlugins);

const webpackConfig = {
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? false : 'eval-source-map',
  entry: entry,
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'js/[name].[hash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
  },
  resolve: {
    extensions: ['.js', '.less'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      styles: path.resolve(__dirname, './src/styles/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|public\/)/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: ['@babel/preset-env'],
          plugins: [['@babel/plugin-transform-runtime']],
        },
      },
      {
        test: /\.css$/,
        use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: ['file-loader?limit=1024&name=[hash].[ext]&outputPath=images/'],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: ['file-loader?limit=1024&name=[hash].[ext]&outputPath=fonts/'],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    allowedHosts: 'all',
    hot: true,
    host: '0.0.0.0',
    port: '3000',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: 'static' }],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css',
      chunkFilename: 'css/[name].[chunkhash:8].chunk.css',
    }),
    ...htmlWebpackPlugins,
  ],
};

module.exports = webpackConfig;
