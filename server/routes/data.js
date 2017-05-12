export default (app) => {
  app.get('/data/newsList', (req, res) => {
    console.log(req.query);
    res.json([
      {
        id: 1,
        title: 'news 1',
      },
      {
        id: 2,
        title: 'news 2',
      },
    ]);
  });
  app.get('/data/todoList', (req, res) => {
    console.log(req.query);
    res.json([
      'todo 1',
      'todo 2',
    ]);
  });
};
