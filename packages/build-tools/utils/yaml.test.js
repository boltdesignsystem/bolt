const yaml = require('./yaml'),
      fs   = require('fs'),
      path = require('path');

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

test('Read Yaml file sync', () => {
  const fileData = yaml.readYamlFileSync('./packages/build-tools/utils/yaml.test.yml');
  expect(fileData).toEqual(testFileJson);
});

test('Write Yaml file, file is created', () => {
  const dataToWrite = {
    title: 'Testing Yaml',
    tags: ['a', 'b', 'c'],
  };
  const testFileName = 'writeYamlFile.test.yml';
  const testFilePath = path.join(testDirectory, testFileName);

  const writeFile = yaml.writeYamlFile(testFilePath, dataToWrite);

  writeFile.then(() => expect(fs.existsSync(testFilePath)).toBe(true));
  writeFile.then(() => expect(
    yaml.readYamlFileSync(testFilePath)).toEqual(dataToWrite)
  );
});

// @todo Look further into testing this. Node was giving me the following warning...
// (node:46133) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): Error: ENOENT: no such file or directory, open './packages/build-tools/utils/notThere.test.yml'
// (node:46133) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
// test('Read Yaml file async, Promise Error', () => {
//   const testData = yaml.readYamlFile('./packages/build-tools/utils/notThere.test.yml');
//   const expectedError = 'File doesn\'t exist';
//   const err = new Error();
//
//   //Test is promise resolves to correct value
//   // testData.then(fileData => expect(fileData).toThrow(expectedResults));
//   return expect(testData.reject(err)).rejects.toHaveProperty('code', 404);
// });