import manifest from '../../webpack-assets.json';
// export default (app) => {
//   app.locals.css = (file) => {
//     let realFile = manifest.styles[file] || '';
//     return `<link rel="stylesheet" href="${realFile}" />`;
//   };
//   app.locals.script = (file) => {
//     let realFile = manifest.javascript[file] || '';
//     return `<script type="text/javascript" src="${realFile}"></script>`;
//   };
// };
let func = null;
if (manifest.javascript) {
  func = (app) => {
    app.locals.css = (file) => {
      let realFile = manifest.styles[file] || '';
      return `<link rel="stylesheet" href="${realFile}" />`;
    };
    app.locals.script = (file) => {
      let realFile = manifest.javascript[file] || '';
      return `<script type="text/javascript" src="${realFile}"></script>`;
    };
  };
} else {
  func = (app) => {
    app.locals.css = (file) => {
      let realFile = manifest[file] || '';
      return `<link rel="stylesheet" href="${realFile.css}" />`;
    };
    app.locals.script = (file) => {
      let realFile = manifest[file] || '';
      return `<script type="text/javascript" src="${realFile.js}"></script>`;
    };
  };
}
export default func;
