/*
This error happens because webpack doesn't support es6 modules

if you are using babel to transpile es6 code then use the default keyword like

require('./components/Hello').default
so the routes will be

const routes = [{
    path:"/",
    getComponents(location, callback) {
        require.ensure([], function (require) {
            callback(null, require('./components/Hello').default)
        })
    }
}];
see: http://stackoverflow.com/questions/36194806/invariant-violation-the-root-route-must-render-a-single-element-error-in-react
*/
const rootRoute = {
  path: 'todo-list',
  component: require('components/blank').default,  // eslint-disable-line global-require
  indexRoute: {
    component: require( // eslint-disable-line global-require
      'modules/todo/pages/home' // eslint-disable-line
    ).default,
  },
  childRoutes: [
    // require('modules/home/route'),
    // {
    //   path: '*',
    //   component: require( // eslint-disable-line global-require
    //     'modules/todo/pages/home' // eslint-disable-line
    //   ).default,
    // },
    // {
    //   path: '*',
    //   component: require( // eslint-disable-line global-require
    //     'modules/error/components/not-found.js' // eslint-disable-line
    //   ).default,
    // },
  ],
};

export default rootRoute;
