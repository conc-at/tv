// eslint-disable-next-line @typescript-eslint/no-var-requires
const { environment } = require('@rails/webpacker');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const aliasConfig = require('./custom/alias');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const optimizationConfig = require('./custom/optimization');

// Issue: https://github.com/rails/rails/issues/35501
const nodeModulesLoader = environment.loaders.get('nodeModules');
if (!Array.isArray(nodeModulesLoader.exclude)) {
  nodeModulesLoader.exclude =
    nodeModulesLoader.exclude == null ? [] : [nodeModulesLoader.exclude];
}
nodeModulesLoader.exclude.push(/actioncable/);

environment.config.merge(aliasConfig);
environment.splitChunks(() => optimizationConfig);

module.exports = environment;
