import config from '../../config';
import renderUtil from '../lib/renderUtil.js';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Home from '../../client/modules/todo/pages/home';
import request from 'request';
export default (app) => {
  if (config.env !== 'development') {
    app.get('/todo-list', (req, res) => {
      request(
        {
          uri: `http://localhost:${config.port}/data/todoList`,
          method: 'get',
          json: true,
        },
        (err, response, body) => {
          renderUtil.serverStaticRender(
            res,
            'todo-list',
            ReactDOMServer.renderToStaticMarkup(
              <Home
                data={{ dataTodoList: body }}
              />
            )
          );
        }
      );
    });
  }
};
