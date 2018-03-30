import config from '../../config';
export default {
  serverRender: (res, page, context, ...options) => {
    res.render(page, context);
  },
  serverStaticRender: (res, page, component, data) =>  {
    let script = '';
    if (data) {
      script = `window.__data = ${JSON.stringify(data)};`;
    }
    console.log(component);
    res.render(page, {
      html: component || '',
      script,
    });
  },
};
