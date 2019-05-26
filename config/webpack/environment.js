// eslint-disable-next-line @typescript-eslint/no-var-requires
const { environment } = require('@rails/webpacker');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const aliasConfig = require('./custom/alias');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const optimizationConfig = require('./custom/optimization');

environment.config.merge(aliasConfig);
environment.splitChunks(() => optimizationConfig);

module.exports = environment;
