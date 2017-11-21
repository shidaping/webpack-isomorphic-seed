import { AJAX_GET_NEWS_LIST } from '../constants';
import { ajaxGetNewsList } from '../ajax/news';

export function actionAjaxGetNewsList(opt) {
  return (dispatch) => {
    ajaxGetNewsList(opt)
    .then(function(data) {
      dispatch({
        type: AJAX_GET_NEWS_LIST,
        data: data,
      });
    });
  };
}

