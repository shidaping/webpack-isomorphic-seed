var ip = require('ip');
module.exports = {
  mock: true,
  // publicPath: `//${ip.address()}:5100/static/`,
  publicPath: '/static/',
  notUseDevServer: true,
};
