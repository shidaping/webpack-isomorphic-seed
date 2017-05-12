import ReactDOMServer from 'react-dom/server';
import all from './all.js';
import data from './data.js';
import todo from './todo.js';
import config from '../../config';
import renderUtil from '../lib/renderUtil.js';

export default (app) => {
  data(app);
  todo(app);
  all(app);
};
