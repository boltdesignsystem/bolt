let updatedConfig = require('./jest.config');
delete updatedConfig.testEnvironment;
delete updatedConfig.globalSetup;
delete updatedConfig.globalTeardown;
updatedConfig.setupFilesAfterEnv = ['jest-expect-message'];

delete updatedConfig.reporters.default;
updatedConfig.reporters.push(['jest-silent-reporter', { useDots: true }]);

module.exports = updatedConfig;
