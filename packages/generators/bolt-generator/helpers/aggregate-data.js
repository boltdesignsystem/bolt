const aggregateData = (generatorType, configObject, actionData, nestingNumber)  => {
  const aggData = Object.assign(actionData, configObject);

  aggData.isTest = actionData['name'] === 'Test';

  if (aggData.isTest) {
    aggData[`${generatorType}`].dir = `packages/generators/tmp/${generatorType}s/packages`;
    aggData[`${generatorType}`].patternLab = `packages/generators/tmp/${generatorType}s/docs-site/src/pages/pattern-lab/_patterns/${nestingNumber}-${generatorType}s`;
    aggData[`${generatorType}`].tmp = 'packages/generators/tmp'
    aggData.git.name = 'Test User';
    aggData.git.email = 'test@example.org';
    aggData.bolt.version = '0.0.0';
    aggData.bolt.coreVersion = '0.0.0';
  }

  return aggData;
}

module.exports = aggregateData;
