'use strict';

const gulp = require('gulp');

module.exports = (gulp, config, $) => {
  const tasks = {};
  
  
  // gulp.task('test:a11y', ['sass:compiled'], done => {
  //   const dirs = fs.readdirSync('./src/components');
  //   const componentName = axeArgs.name === undefined ? undefined : axeArgs.name;
  //   const options = {
  //     a11yCheckOptions: {
  //       rules: {
  //         'html-has-lang': { enabled: false },
  //         bypass: { enabled: false },
  //         'image-alt': { enabled: false },
  //       },
  //     },
  //     verbose: true,
  //     showOnlyViolations: true,
  //     exclude: '.offleft, #flex-col, #flex-row',
  //     tags: ['wcag2aa', 'wcag2a'],
  //     folderOutputReport: componentName === undefined ? 'tests/axe/allHtml' : 'tests/axe',
  //     saveOutputIn: componentName === undefined
  //       ? `a11y-html.json`
  //       : `a11y-${componentName}.json`,
  //     urls: componentName === undefined
  //       ? ['http://localhost:3000']
  //       : [`http://localhost:3000/components/${componentName}/`],
  //   };
  // 
  //   return axe(options, done);
  // });
  
  return tasks;
}