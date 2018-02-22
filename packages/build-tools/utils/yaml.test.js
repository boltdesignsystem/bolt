const yaml = require('./yaml');

test('JSON to Yaml conversion', () => {
  const testData = {
    title: 'Testing Yaml',
    tags: ['a', 'b', 'c'],
  };
  const expectedResults = `title: Testing Yaml
tags:
  - a
  - b
  - c
`;
  expect(yaml.toYaml(testData)).toBe(expectedResults);
});
