var env = process.env.NODE_ENV || 'development';
var _ = require('lodash');
var ip = require('ip');
var config = require(`./${env}`);
var commonConfig = {
  port: 65100,
  ip: ip.address(),
  staticFilePort: 5100,
  staticFilePrefix: 'projectName',
  env: env,
};
if (env === 'development' || env === 'testing') {
  commonConfig = _.extend(commonConfig, {
    staticFileHost: commonConfig.ip,
  });
}
module.exports = _.extend(commonConfig, config);
