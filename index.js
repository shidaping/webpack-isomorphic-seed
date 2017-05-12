require('./babel-register.js');
var WebpackIsomorphicTools = require('webpack-isomorphic-tools'); // eslint disabled line
/**
 * Define isomorphic & server constants
 */
global.CLIENT = false;
global.SERVER = true;
global.ENV = process.env.ENV || 'devlopment';
// global.__ALLOW_ISOMORPHIC_PROXY__ = process.env.ALLOW_ISOMORPHIC_PROXY === 'true';
global.DEBUG = process.env.DEBUG === 'true';

// sync DEPLOY_ENV 'prd' with NODE_ENV 'production'
// if (global.__ENV__ === 'prd') {
//   process.env.NODE_ENV = 'production';
// }


global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('./webpack-isomorphic-tools'))
  .server(__dirname, function() {
    require('./server/app.js');
  });
