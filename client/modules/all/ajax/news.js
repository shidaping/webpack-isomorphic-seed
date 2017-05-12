import $ from 'jquery'; // here we use jquery to send ajax request, use fetch or other lib instead.
export function ajaxGetNewsList(requestData) {
  return new Promise(
    (resolve, reject) => {
      $.ajax({
        method: 'GET',
        url: '/data/newsList',
        data: requestData,
        success: function(data) {
          resolve(data);
        },
        error: function(err) {
          reject(err);
        },
      });
    }
  );
}
