// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
const basePath = path.resolve(__dirname, '..', '..', '..', 'app', 'ui');

module.exports = {
  resolve: {
    alias: {
      components: path.resolve(basePath, 'components'),
      foundations: path.resolve(basePath, 'foundations'),
      sections: path.resolve(basePath, 'sections'),
    },
  },
};
