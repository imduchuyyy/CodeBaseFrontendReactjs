const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const cssnano = require('cssnano')
const AutoDllPlugin = require('autodll-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const WebpackBar = require('webpackbar')
const Dotenv = require('dotenv-webpack')

const isDev = true
const staticPath = 'static'

const threadLoader = {
  loader: 'thread-loader',
  options: {
    workers: require('os').cpus().length,
    workerParallelJobs: 2
  }
}

const alias = {
  '@components': path.resolve(__dirname, './src/components'),
  '@tools': path.resolve(__dirname, './src/tools'),
  '@configs': path.resolve(__dirname, './src/configs'),
  '@pages': path.resolve(__dirname, './src/pages'),
  '@assets': path.resolve(__dirname, './src/assets'),
  '@utils': path.resolve(__dirname, './src/utils'),
  '@constants': path.resolve(__dirname, './src/constants')
}

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: [require('autoprefixer')]
  }
}

const pluginsOfProc = [
  new MiniCssExtractPlugin({
    filename: `${staticPath}/css/[hash].css`,
    chunkFilename: `${staticPath}/css/chunk/[contenthash].chunk.css`,
    ignoreOrder: false
  }),
  new OptimizeCSSAssetsPlugin({
    cssProcessor: cssnano,
    cssProcessorOptions: {
      discardComments: {
        removeAll: true
      }
    }
  }),
  new AutoDllPlugin({
    inject: true,
    filename: '[hash].dll.js',
    debug:true,
    path: `${staticPath}/dll`,
    // entry: {
    //   vendor: [
    //     'react',
    //     'react-dom',
    //     'react-router-dom'
    //   ]
    // },
    plugins: [
      new webpack.optimize.MinChunkSizePlugin({
        minChunkSize: 512
      })
    ]
  }),
]

module.exports = {
  resolve: {
    modules: [
      path.resolve(__dirname, './src'),
      path.resolve(__dirname, './node_modules')
    ],
    extensions: ['.js', '.jsx'],
    alias: {
      ...alias,
      'react-dom': '@hot-loader/react-dom'
    }
  },
  cache: true,
  entry: [path.resolve(__dirname, './src/index.js')],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    chunkFilename: `${staticPath}/js/chunk/[contenthash].chunk.js`,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/,
            sideEffects: true,
            use: [
              {
                loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader
              },
              {
                loader: 'css-loader'
              },
              { ...postcssLoader },
              { ...threadLoader }
            ]
          },
          {
            test: /\.(scss|sass)$/,
            sideEffects: true,
            use: [
              {
                loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader
              },
              { loader: 'css-loader' },
              { ...postcssLoader },
              { loader: 'sass-loader' },
              { ...threadLoader }
            ]
          },
          {
            test: /\.less$/,
            sideEffects: true,
            use: [
              {
                loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader
              },
              { loader: 'css-loader' },
              { ...postcssLoader },
              {
                loader: 'less-loader',
                options: {
                  javascriptEnabled: true,
                  modifyVars: {
                    '@font-family': `'Nunito Sans', sans-serif`
                  }
                }
              },
              { ...threadLoader }
            ]
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          { ...threadLoader },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                'react-hot-loader/babel',
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/plugin-proposal-class-properties', { loose: true }],
                '@babel/plugin-transform-runtime',
                '@babel/plugin-proposal-optional-chaining',
                ['@babel/plugin-proposal-private-methods', { loose: true }],
                ...(isDev ? [] : ['transform-remove-console']),
                [
                  'import',
                  {
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: true
                  },
                  'antd'
                ],
                [
                  'import',
                  {
                    libraryName: 'react-use',
                    libraryDirectory: 'lib',
                    camel2DashComponentName: false
                  },
                  'react-use'
                ],
              ]
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              failOnWarning: true,
              failOnError: true
            }
          }
        ]
      },
      {
        test: /\.css/,
        sideEffects: true,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devtool: isDev ? 'cheap-module-eval-source-map' : '',
  mode: isDev ? 'development' : 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new Dotenv({
      path: isDev
        ? path.resolve(__dirname, './.env.development.local')
        : path.resolve(__dirname, './.env.production.local'),
      safe: true,
      systemvars: true,
      silent: true
    }),
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 512
    }),
    ...(isDev ? [new webpack.HotModuleReplacementPlugin()] : pluginsOfProc),
    new WebpackBar(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      inject: true
    }),
  ],
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      },
      ...(isDev
        ? {
          minSize: 10000,
          maxAsyncRequests: Infinity,
          maxInitialRequests: Infinity
        }
        : {
          minSize: 30000,
          maxAsyncRequests: 5,
          maxInitialRequests: 3
        })
    },
    ...(isDev && {
      usedExports: true
    }),
    ...(!isDev && {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          terserOptions: {
            parse: { ecma: 8 },
            compress: { ecma: 5 },
            output: { ecma: 5 }
          }
        })
      ]
    })
  },
  performance: {
    hints: false
  },
  devServer: {
    compress: true,
    contentBase: path.resolve(__dirname, "dist"),
    historyApiFallback: {
      disableDotRule: true,
    },
    index: 'public/index',
    hot: true,
    liveReload: false,
    hotOnly: true,
    port: process.env.PORT || 3000,
    stats: {
      colors: true,
      hash: true,
      timings: true,
      assets: true,
      chunks: true,
      chunkModules: false,
      modules: false,
      children: true,
    },
    watchContentBase: true,
    watchOptions: {
      ignored: /node_modules/,
      poll: true,
    },
    writeToDisk: true,
  },
}