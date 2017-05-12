import { AJAX_GET_NEWS_LIST } from '../constants';
import { ajaxGetNewsList } from '../ajax/news';
export function actionAjaxGetNewsList(dispatch, requestData) {
  ajaxGetNewsList(requestData).then(function(data) {
    dispatch({
      type: AJAX_GET_NEWS_LIST,
      data: data,
    });
  });
}

