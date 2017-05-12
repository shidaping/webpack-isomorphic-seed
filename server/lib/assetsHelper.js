import manifest from '../../webpack-assets.json';
export default (app) => {
  app.locals.css = (file) => {
    let realFile = manifest.styles[file] || '';
    return `<link rel="stylesheet" href="${realFile}" />`;
  };
  app.locals.script = (file) => {
    let realFile = manifest.javascript[file] || '';
    return `<script type="text/javascript" src="${realFile}"></script>`;
  };
};
