import express from 'express';
import path from 'path';
import assetsHelper from './lib/assetsHelper';
import config from '../config';
import routes from './routes';
const app = express();

if (config.env === 'testing') {
  app.use('/projectName', express.static(path.join(__dirname, '../assets')));
}


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
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
app.listen(config.port, function () {
  console.log(`app listen at ${config.port}`);
});
