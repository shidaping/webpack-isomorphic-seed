import express from 'express';
import path from 'path';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import assetsHelper from './lib/assetsHelper';
import config from '../config';
import routes from './routes';


const app = express();
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(cookieParser());
// parse application/json
app.use(bodyParser.json({ limit: '50mb' }));
app.use(morgan('common'));

if (config.env === 'testing') {
  app.use('/projectName', express.static(path.join(__dirname, '../assets')));
}

if (config.notUseDevServer && config.env === 'development') {
  const webpack = require('webpack'); //
  const webpackConfig = require('../webpack.config.js');
  const compiler = webpack(webpackConfig);
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const serverOptions = {
    // contentBase: 'http://' + host + ':' + port,
    // quiet: true,
    noInfo: true,
    hot: true,
    // inline: true,
    // lazy: false,
    publicPath: webpackConfig.output.publicPath,
    headers: { 'Access-Control-Allow-Origin': '*' },
    // stats: { colors: true }
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  };
  app.use(webpackDevMiddleware(compiler, serverOptions));
  app.use(webpackHotMiddleware(compiler));
}

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(function(req, res, next) {
  console.log(req.cookies);
  let envArrays = ['production', 'development', 'testing'];
  if (!req.cookies['_e'] && config.env !== 'production') {
    res.cookie('_e', envArrays.indexOf(config.env));
  }
  next();
});


assetsHelper(app);
routes(app);


// 设置模板路径，默认为./views
if (config.env === 'development') {
  app.set('views', path.join(__dirname, '../client/views/'));
} else {
  app.set('views', path.join(__dirname, '../assets/views/'));
}
app.disable('x-powered-by');
app.enable('trust proxy');
app.listen(config.port, function() {
  console.log(`app listen at ${config.port}`);
});
