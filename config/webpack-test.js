var path = require('path');
var webpack = require('webpack');

var projectRoot = path.resolve(__dirname, '..');
var srcRoot = path.resolve(projectRoot, 'src');

module.export = {
  devtool: 'inline-source-map',
  context: projectRoot,
  resolve: {
    extensions: ['.ts', '.js'],
  },
  entry: {
    test: path.resolve(srcRoot, 'test.js')
  },
  output: {
    path: path.resolve(projectRoot, 'dist.test'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'tslint-loader',
        exclude: [
          /\.spec\.ts/,
          /node_modules/
        ],
        options: {
          emitErrors: true,
          failOnHint: false,
          resourcePath: path.resolve(projectRoot)
        },
        enforce: 'pre'
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'source-map-loader',
        exclude: [
          /node_modules/
        ]
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              tsconfig: path.resolve(srcRoot, 'tsconfig.json'),
              module: 'commonjs',
              target: 'es5',
              forkChecker: true
            }
          }
        ]
      },
      {
        test: /\.(js|ts)$/, loader: 'sourcemap-istanbul-instrumenter-loader',
        enforce: 'post',
        exclude: [
          /\.spec\.ts$/,
          /node_modules/
        ],
        options: {'force-sourcemap': true}
      }
    ]
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: null, // if no value is provided the sourcemap is inlined
      test: /\.(ts|js)($|\?)/i // process .js and .ts files only
    }),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      srcRoot
    )
  ],
  node: {
    fs: 'empty',
    global: true,
    crypto: 'empty',
    tls: 'empty',
    net: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};
