import renderUtil from '../lib/renderUtil.js';
export default (app) => {
  app.get('*', (req, res, next) => {
    const context = {
      html: 'aaa',
    };
    renderUtil.serverRender(res, 'all', context, 1, 2);
  });
};
