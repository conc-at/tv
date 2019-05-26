// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defaults } = require('jest-config');

module.exports = {
  ...defaults,
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  moduleDirectories: ['node_modules', 'app/ui'],
  roots: ['app/ui'],
  setupFilesAfterEnv: ['./node_modules/jest-enzyme/lib/index.js'],
};
