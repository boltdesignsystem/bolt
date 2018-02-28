const yaml = require('./yaml');
const fs   = require('fs');
const path = require('path');

// For testing file reads. This json matches the correct conversion of the yaml file `yaml.test.yml`
const testFileJson = {
  "string": "string",
  "notInQuotes": "string",
  "american": [
    "Boston Red Sox",
    "Detroit Tigers",
    "New York Yankees"
  ],
  "players": [
    {
      "name": "Mark McGwire",
      "hr": 65,
      "avg": 0.278
    },
    {
      "name": "Sammy Sosa",
      "hr": 63,
      "avg": 0.288
    }
  ],
  "sequenceOfSequence": [
    [
      "name",
      "hr",
      "avg"
    ],
    [
      "Mark McGwire",
      65,
      0.278
    ],
    [
      "Sammy Sosa",
      63,
      0.288
    ]
  ],
  "Mark McGwire": {
    "hr": 65,
    "avg": 0.278
  },
  "Sammy Sosa": {
    "hr": 63,
    "avg": 0.288
  },
  "bestPlayer": {
    "name": "Mark McGwire",
    "accomplishment": "Mark set a major league home run record in 1998.\n",
    "stats": "65 Home Runs\n0.278 Batting Average\n"
  },
  "exponential": 1230.15,
  "fixed": 1230.15,
  "booleans": [
    true,
    false
  ]
};
// @todo Set up a temp directory for file read,write, and destroy. Clean up as part of testing
// @todo It would be nice to programmatically generate yaml.test.yml (used for import test) in the test directory as well
const testDirectory = './';

// @todo This is needed to clean up after the tests, but it is also causing the tests to throw an error
// afterAll(() => {
//   return fs.unlinkSync('./writeYamlFile.test.yml');
// });

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

test('Yaml to JSON conversion', () => {
  const testData = `title: Testing Yaml
tags:
  - a
  - b
  - c
`;
  const expectedResults = {
    title: 'Testing Yaml',
    tags: ['a', 'b', 'c'],
  };

  expect(yaml.fromYaml(testData)).toEqual(expectedResults);
});

test('Read Yaml file async, promise Resolves', () => {
  const testData = yaml.readYamlFile('./packages/build-tools/utils/yaml.test.yml');
  testData.then(fileData => expect(fileData).toEqual(testFileJson));
});

test('Write Yaml file, file is created, data written', async () => {
  const dataToWrite = {
    title: 'Testing Yaml',
    tags: ['a', 'b', 'c'],
  };
  const testFileName = 'writeYamlFile.test.yml';
  const testFilePath = path.join(testDirectory, testFileName);
  const writeFile = await yaml.writeYamlFile(testFilePath, dataToWrite);

  expect(fs.existsSync(testFilePath)).toBe(true);
  expect(yaml.readYamlFileSync(testFilePath)).toEqual(dataToWrite);
});

test('Read Yaml file sync', () => {
  const fileData = yaml.readYamlFileSync('./packages/build-tools/utils/yaml.test.yml');
  expect(fileData).toEqual(testFileJson);
});

// test('Read Yaml file async, error thrown if file does not exist', async () => {
//   const testData = await yaml.readYamlFile('./packages/does/not/exist.test.yml');
//   const expectedError = 'File doesn\'t exist';
//
//   expect(await yaml.readYamlFile('./packages/does/not/exist.test.yml')).toThrow();
// });