import { AJAX_GET_NEWS_LIST } from '../constants';

const initialState = {
  dataNewsList: [],
};

export default function update(state = initialState, action) {
  if (action.type === AJAX_GET_NEWS_LIST) {
    return { dataNewsList: action.data };
  }
  return state;
}
