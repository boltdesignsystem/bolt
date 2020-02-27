/* eslint-env jest */

'use strict';

const path = require('path');
const fs = require('fs-extra');
const readPkgUp = require('read-pkg-up');
const execa = require('execa');
const nn = require('normalize-newline');

const read = async file => {
  const filepath = path.isAbsolute(file) ? file : path.join(__dirname, '..', file);
  const content = await fs.readFile(filepath, 'utf8');
  return nn(content);
};

const checkAndDelete = file => {
  const filepath = path.isAbsolute(file) ? file : path.join(__dirname, '..', file);
  if (fs.existsSync(filepath)) {
    fs.removeSync(filepath);
    return true;
  }

  return false;
};

const strip = string => nn(string.replace(/[\r\n]+/gm, ' ').replace(/\s+/gm, ''));

const getBin = async () => {
  const {packageJson} = await readPkgUp();
  return path.join(__dirname, '../../', packageJson.bin['inline-critical']);
};

const run = async (args = []) => {
  const bin = await getBin();
  return execa('node', [bin, ...args]);
};

const getArgs = async (params = []) => {
  const bin = await getBin();
  const origArgv = process.argv;
  const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});

  jest.mock('../../index', () => jest.fn(() => ''));

  process.argv = ['node', bin, ...params];
  const inline = require('../..');

  require('../../cli'); // eslint-disable-line import/no-unassigned-import

  // wait for cli to run
  await new Promise(resolve => setTimeout(resolve, 200));
  const [args] = inline.mock.calls;
  const [html, styles, options] = args || ['', '', {}];
  expect(inline).toHaveBeenCalledTimes(1);
  inline.mockRestore();
  mockExit.mockRestore();
  process.argv = origArgv;
  return [html, styles, options];
};

const pipe = async (file, args = []) => {
  const filepath = path.isAbsolute(file) ? file : path.join(__dirname, '..', file);
  const cat = process.platform === 'win32' ? 'type' : 'cat';
  const bin = await getBin();
  const cmd = `${cat} ${path.normalize(filepath)} | node ${bin} ${args.join(' ')}`;
  return execa.shell(cmd);
};

module.exports = {
  read,
  checkAndDelete,
  strip,
  getBin,
  run,
  getArgs,
  pipe,
};
