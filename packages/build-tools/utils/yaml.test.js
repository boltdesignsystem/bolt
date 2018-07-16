const fs = require('fs');
const path = require('path');
const del = require('del');
const yaml = require('./yaml');

// @todo Use `bigJson` and `bigYaml` to do more tests similar to those smaller ones already done below
const bigJson = {
  string: 'string',
  notInQuotes: 'string',
  american: ['Boston Red Sox', 'Detroit Tigers', 'New York Yankees'],
  players: [
    {
      name: 'Mark McGwire',
      hr: 65,
      avg: 0.278,
    },
    {
      name: 'Sammy Sosa',
      hr: 63,
      avg: 0.288,
    },
  ],
  sequenceOfSequence: [
    ['name', 'hr', 'avg'],
    ['Mark McGwire', 65, 0.278],
    ['Sammy Sosa', 63, 0.288],
  ],
  'Mark McGwire': {
    hr: 65,
    avg: 0.278,
  },
  'Sammy Sosa': {
    hr: 63,
    avg: 0.288,
  },
  bestPlayer: {
    name: 'Mark McGwire',
    accomplishment: 'Mark set a major league home run record in 1998.\n',
    stats: '65 Home Runs\n0.278 Batting Average\n',
  },
  exponential: 1230.15,
  fixed: 1230.15,
  booleans: [true, false],
};

const bigYaml = `
string: 'string'
notInQuotes: string
american:
  - Boston Red Sox
  - Detroit Tigers
  - New York Yankees
players:
  - name: Mark McGwire
    hr:   65
    avg:  0.278
  - name: Sammy Sosa
    hr:   63
    avg:  0.288
sequenceOfSequence:
  - [name        , hr, avg  ]
  - [Mark McGwire, 65, 0.278]
  - [Sammy Sosa  , 63, 0.288]
Mark McGwire: {hr: 65, avg: 0.278}
Sammy Sosa: {
    hr: 63,
    avg: 0.288
  }
bestPlayer:
  name: Mark McGwire
  accomplishment: >
    Mark set a major league
    home run record in 1998.
  stats: |
    65 Home Runs
    0.278 Batting Average
exponential: 12.3015e+02
fixed: 1230.15
booleans: [ true, false ]
`;

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

describe('Yaml Files', () => {
  const dataToWrite = {
    title: 'Testing Yaml',
    tags: ['a', 'b', 'c'],
  };
  const testFile = path.join(__dirname, 'yamlFile.test.yml');

  test('Write Yaml file, file is created', async () => {
    await yaml.writeYamlFile(testFile, dataToWrite);
    expect(fs.existsSync(testFile)).toEqual(true);
  });

  test('Read Yaml file', async () => {
    const fileData = await yaml.readYamlFile(testFile);
    expect(fileData).toEqual(dataToWrite);
  });

  test('Read Yaml file sync', () => {
    const fileData = yaml.readYamlFileSync(testFile);
    expect(fileData).toEqual(dataToWrite);
  });

  afterAll(async () => {
    await del([testFile]);
  });
});

describe('data', () => {
  test('Read this package.json name value', async () => {
    const file = path.join(__dirname, '../package.json');
    const results = await yaml.getDataFile(file);
    expect(results.name).toEqual('@bolt/build-tools');
  });

  test('Read basic Json/Yaml file', async () => {
    const fileYaml = path.join(__dirname, 'test-sample-files/basic.yml');
    const resultsYaml = await yaml.getDataFile(fileYaml);
    const fileJson = path.join(__dirname, 'test-sample-files/basic.json');
    const resultsJson = await yaml.getDataFile(fileJson);
    expect(resultsJson).toEqual(resultsYaml);
  });
});
