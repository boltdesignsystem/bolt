const shell = require('shelljs');
const fs = require('fs');
const internalTasks = require('@bolt/build-tools/tasks/internal-tasks');
const dir = require('node-dir');

const dirs = {
  global:
    'packages/generators/yeoman-create-component/generators/component/tmp',
  js: 'test.js',
  scss: 'test.scss',
  test: 'index.js',
  package: 'package.json',
  readme: 'README.md',
  schema: 'test.schema.yml',
  boltrc: '.boltrc.js',
};

dirs.component = `${dirs.global}/packages/components/bolt-test`;
dirs.src = `${dirs.component}/src`;
dirs.testing = `${dirs.component}/__tests__`;
dirs.patternLab = `${dirs.global}/docs-site/src/pages/pattern-lab/_patterns/02-components/test/00-test-docs.twig`;

describe('Yeoman component generator', () => {
  beforeAll(async () => {
    shell.exec(`rm -rf ${dirs.global}`);
    shell.exec('yarn run cc -N Test -D "Test Description" -T');
  });

  afterAll(async () => {
    await internalTasks.clean(dirs.global);
  });

  test('pattern lab file exist', async () => {
    const results = fs.readFileSync(dirs.patternLab, 'utf8');

    expect(results).toMatchSnapshot();
  });

  test('JS file exist', async () => {
    const results = fs.readFileSync(`${dirs.src}/${dirs.js}`, 'utf8');

    expect(results).toMatchSnapshot();
  });

  test('SCSS file exist', async () => {
    const results = fs.readFileSync(`${dirs.src}/${dirs.scss}`, 'utf8');

    expect(results).toMatchSnapshot();
  });

  test('tests file exist', async () => {
    const results = fs.readFileSync(`${dirs.testing}/${dirs.test}`, 'utf8');

    expect(results).toMatchSnapshot();
  });

  test('index JS file exist', async () => {
    const results = fs.readFileSync(`${dirs.component}/index.js`, 'utf8');

    expect(results).toMatchSnapshot();
  });

  test('index SCSS file exist', async () => {
    const results = fs.readFileSync(`${dirs.component}/index.scss`, 'utf8');

    expect(results).toMatchSnapshot();
  });

  test('package.json file exist', async () => {
    const results = fs.readFileSync(
      `${dirs.component}/${dirs.package}`,
      'utf8',
    );

    expect(results).toMatchSnapshot();
  });

  test('readme file exist', async () => {
    const results = fs.readFileSync(`${dirs.component}/${dirs.readme}`, 'utf8');

    expect(results).toMatchSnapshot();
  });

  test('schema file exist', async () => {
    const results = fs.readFileSync(`${dirs.component}/${dirs.schema}`, 'utf8');

    expect(results).toMatchSnapshot();
  });

  test('bolt package.json file is updated', async () => {
    const results = fs.readFileSync(`${dirs.global}/${dirs.package}`, 'utf8');

    expect(results.includes('@bolt/components-test')).toBe(true);
  });

  test('.boltrc.js is updated', async () => {
    const results = fs.readFileSync(`${dirs.global}/${dirs.boltrc}`, 'utf8');

    expect(results.includes('@bolt/components-test')).toBe(true);
  });

  test('folder structure of component package is correct', async () => {
    const results = await dir.files(dirs.global, { sync: true });

    expect(results).toMatchSnapshot();
  });
});
