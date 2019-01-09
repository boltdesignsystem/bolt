#!/usr/bin/env node
const { outputBanner } = require('ci-utils');
const { createCheckRun } = require('./check-run');

outputBanner('Sending sample check run!');

createCheckRun({
  name: 'ima tester',
  status: 'in_progress',
  output: {
    title: 'ima output title',
    summary: 'ima output summary',
    text: 'ima output text *with* markdown!!',
    images: [
      {
        alt: 'img 1',
        image_url:
          'https://design.basalt.io/images/brand-stock/julentto-photography-184055.jpg',
        caption: 'ima caption for img 1',
      },
      {
        alt: 'img 2',
        image_url:
          'https://design.basalt.io/images/brand-stock/clarisse-meyer-304306.jpg',
        caption: 'ima caption for img 2',
      },
    ],
  },
})
  .then(results => {
    outputBanner('Sample check run received');
    console.log(results);
  })
  .catch(error => {
    console.error('check run error', error);
    process.exit(1);
  });
