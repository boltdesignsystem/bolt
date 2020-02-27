/* eslint-env jest */

'use strict';

const path = require('path');
const readPkgUp = require('read-pkg-up');
const {read, strip, run, getArgs, pipe} = require('./helper');

jest.setTimeout(10000);

describe('acceptance', () => {
  test('Return version', async () => {
    const {packageJson} = await readPkgUp();
    const {stdout, stderr, code} = await run(['--version', '--no-update-notifier']);

    expect(stderr).toBeFalsy();
    expect(code).toBe(0);
    expect(stdout).toBe(packageJson.version);
  });

  test('should work well with the critical CSS & html file passed as input', async () => {
    const expected = await read('expected/index-inlined-async-final.html');
    const {stdout, code} = await run(['test/fixtures/index.html', 'test/fixtures/critical.css', '--no-minify']);

    expect(code).toBe(0);
    expect(strip(stdout)).toBe(strip(expected));
  });

  test('should work well with the critical CSS passed as input & html file passed as option', async () => {
    const expected = await read('expected/index-inlined-async-final.html');
    const {stdout, code} = await run([
      '--html',
      'test/fixtures/index.html',
      'test/fixtures/critical.css',
      '--no-minify',
    ]);

    expect(code).toBe(0);
    expect(strip(stdout)).toBe(strip(expected));
  });

  test('should work well with the critical CSS passed as option & html file passed as input', async () => {
    const expected = await read('expected/index-inlined-async-final.html');
    const {stdout, code} = await run([
      '--css',
      'test/fixtures/critical.css',
      'test/fixtures/index.html',
      '--no-minify',
    ]);

    expect(code).toBe(0);
    expect(strip(stdout)).toBe(strip(expected));
  });

  test('Work well with the critical CSS file piped to inline-critical and html file as input', async () => {
    const expected = await read('expected/index-inlined-async-final.html');
    const {stdout, code} = await pipe('fixtures/critical.css', ['test/fixtures/index.html', '--no-minify']);

    expect(code).toBe(0);
    expect(strip(stdout)).toBe(strip(expected));
  });

  test('Work well with the html file piped to inline-critical and critical CSS file as input', async () => {
    const expected = await read('expected/index-inlined-async-final.html');
    const {stdout, code} = await pipe('fixtures/index.html', ['test/fixtures/critical.css', '--no-minify']);

    expect(code).toBe(0);
    expect(strip(stdout)).toBe(strip(expected));
  });

  test('Exit with code != 0 and show help', async () => {
    expect.assertions(2);
    try {
      await run(['fixtures/not-exists.html']);
    } catch (error) {
      expect(error.stderr).toMatch('Usage:');
      expect(error.code).not.toBe(0);
    }
  });
});

describe('Mocked', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('Pass the correct opts when using short opts', async () => {
    const [html, css, args] = await getArgs([
      '-c',
      'test/fixtures/critical.css',
      '-h',
      'test/fixtures/index.html',
      '-i',
      'ignore-me',
      '-i',
      '/regexp/',
      '-b',
      'basePath',
      '-s',
      'selector',
      '-m',
      '-e',
    ]);

    const cssExpected = await read('fixtures/critical.css');
    const htmlExpected = await read('fixtures/index.html');
    expect(html).toBe(htmlExpected);
    expect(css).toBe(cssExpected);
    expect(args).toMatchObject({
      selector: 'selector',
      ignore: ['ignore-me', /regexp/],
      minify: true,
      extract: true,
    });
  });

  test('should pass the correct opts when using long opts', async () => {
    const [html, css, args] = await getArgs([
      '--css',
      path.join(__dirname, 'fixtures/critical.css'),
      '--html',
      path.join(__dirname, 'fixtures/index.html'),
      '--ignore',
      'ignore-me',
      '--ignore',
      '/regexp/',
      '--base',
      'basePath',
      '--selector',
      'selector',
      '--minify',
      '--extract',
      '--noscript',
      'head',
    ]);

    const cssExpected = await read('fixtures/critical.css');
    const htmlExpected = await read('fixtures/index.html');
    expect(html).toBe(htmlExpected);
    expect(css).toBe(cssExpected);
    expect(args).toMatchObject({
      selector: 'selector',
      ignore: ['ignore-me', /regexp/],
      minify: true,
      extract: true,
      noscript: 'head',
    });
  });
});
