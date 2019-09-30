let updatedConfig = require('./jest.config');
delete updatedConfig.testEnvironment;
delete updatedConfig.globalSetup;
delete updatedConfig.globalTeardown;
updatedConfig.setupFilesAfterEnv = ['jest-expect-message'];

module.exports = updatedConfig;
