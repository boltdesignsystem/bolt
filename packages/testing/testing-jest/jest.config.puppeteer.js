const path = require('path');

// generates a Jest configuration that's tailored for running Puppeteer-specific tests
module.exports = (baseDir = process.cwd()) => {
  const configDir = path.dirname(
    require.resolve('@bolt/jest-config/package.json'),
  );

  return {
    moduleDirectories: ['node_modules', path.relative(baseDir, configDir)],
    testEnvironment:
      '@bolt/jest-config/jest-environment-puppeteer-basichtml.js',
    transform: {
      '^.+\\.js?$': 'babel-jest',
    },
    globalSetup: '@bolt/jest-config/jest-global-setup.puppeteer-only.js',
    globalTeardown: '@bolt/jest-config/jest-global-teardown.puppeteer-only.js',
    setupFilesAfterEnv: [
      '@bolt/jest-config/jest-setup-files-after-env.puppeteer-only.js',
      'jest-expect-message',
    ],
    snapshotSerializers: ['jest-serializer-html'],
    reporters: ['default', '@bolt/jest-config/jest-reporter-vrt.js'],
  };
};
