export function ajaxGetNewsList(requestData) {
  console.log(requestData);
  return fetch('/data/newsList')
  .then(res => res.json())
  .catch(err => console.error(err));
}
