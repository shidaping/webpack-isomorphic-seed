var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = require('./config');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var AssetsWebpackPlugin = require('assets-webpack-plugin');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

var nodeModulesDir = path.join(__dirname, 'node_modules');


var env = config.env;
var entry = {};
var webackConfig;
if (config.env === 'development') {
  entry = {
    all: ['./client/modules/all/index.js'],
    // vendor: [],
  };
} else {
  entry = {
    all: ['./client/modules/all/index.js'],
    'todo-list': ['./client/modules/todo/index.js'],
    // vendor: [],
  };
}

console.log('aaaacccccccccccc');
console.log(env);

webackConfig = {
  entry: entry,
  devtool: 'sourcemap',
  output: {
    publicPath: config.publicPath,
    path: path.resolve(__dirname, 'dist'),
    filename: env === 'development' ? '[name].js' : '[name]-[chunkhash].js',
    // chunkFilename: "[id].js"
  },

  // externals: {
  // require('jquery') is external and available
  //  on the global var jQuery
  //   'jquery': 'jQuery'
  // },
  resolve: {
    alias: {
      // 'font-awesome.css': path.resolve(nodeModulesDir, 'font-awesome/css/font-awesome.min.css'),
      // jquery: path.resolve(nodeModulesDir, 'jquery/dist/jquery.min.js'),
      // client: path.resolve('./client'),
      // vue: 'vue/dist/vue.js',
    },
    modules: [
      'node_modules',
      'client',
    ],
    extensions: ['.js', '.jsx', '.less', '.ts'],
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    new ExtractTextPlugin(
      (env !== 'development') ? '[name]-[chunkhash].css' : '[name].css',
      { allChunks: true }
    ),
    // function() {
    //   this.plugin('done', function(stats) {
    //     fs.writeFileSync(
    //       path.join(__dirname, 'manifest.json'),
    //       JSON.stringify(stats.toJson().assetsByChunkName)
    //     );
    //   });
    // },
  ],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: ['react-hot-loader/webpack','babel-loader'],
    // }, {
    //   test: /\.less$/,
    //  css?-autoprefixer!postcss!less
    //   loader: ExtractTextPlugin.extract('style', 'css?-autoprefixer!postcss!less')
    // }, {
    //   test: /\.css$/,
    //   loader: 'style!css'

    }, {
      test: /\.ts$/,
      loaders: ['babel-loader'],
      exclude: /(node_modules)/,
    }, {
      test: /(\.less|\.css)$/,
      // use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader'],
      use: env === 'development' ? ['style-loader', 'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: (loader) => {
              console.log('333333333333');
              [
                require('postcss-import')({ root: loader.resourcePath }),
                require('postcss-cssnext')(),
                require('autoprefixer')(),
                require('cssnano')(),
              ]
            },
            // config: {
            //   path: './postcss.config.js'
            // }
          }
        },
        'less-loader'] :
        ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'less-loader'],
        }),

    // }, {
    //   test: /\.css$/,
    //   loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
    }, {
      test: /\.jpg|\.png$/,
      loader: 'file-loader',
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&minetype=application/font-woff',
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader',
    }, {
      test: /\.html$/,
      loader: 'html-loader',
    }],

  },
  devServer: {
    host: '0.0.0.0',
    port: config.staticFilePort,
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};
// if (env === 'production') {
webackConfig.plugins.push(new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: config.env !== 'development' ? JSON.stringify('production') : JSON.stringify('development'),
    BABEL_ENV: config.env !== 'development' ? JSON.stringify('production') : JSON.stringify('development'),
  },
}));
// }

webackConfig.plugins.push(
  new AssetsWebpackPlugin()
);

if (config.env !== 'development') {
  webackConfig.plugins.push(
    new HtmlWebpackPlugin({
      filename: 'views/all.html',
      template: path.join(__dirname, './client/views/template.html'),
      chunks: ['vendor', 'all'],
      minify: {
        collapseWhitespace: true,
      },
    })
  );

  webackConfig.plugins.push(
    new HtmlWebpackPlugin({
      filename: 'views/todo-list.html',
      template: path.join(__dirname, './client/views/todo-list.html'),
      chunks: ['vendor', 'todo-list'],
      minify: {
        collapseWhitespace: true,
      }
    })
  );
}
if (config.notUseDevServer) {
  var hotClient = 'webpack-hot-middleware/client';
  for (var key in webackConfig.entry) {
    // 为entry增加热加载
    console.log(webackConfig.entry[key])
    webackConfig.entry[key].push(hotClient);
    webackConfig.entry[key] = ['react-hot-loader/patch'].concat(webackConfig.entry[key]);
  }
  webackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  webackConfig.plugins.push(
    // webpack-isomorphic-tools with development
    webpackIsomorphicToolsPlugin.development()
  );
}
module.exports = webackConfig;
