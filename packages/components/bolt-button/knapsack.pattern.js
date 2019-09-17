const schema = require('./button.schema');

module.exports = {
  id: 'button',
  templates: [
    {
      alias: '@bolt-components-button/button.twig',
      path: './src/button.twig',
      id: 'twig',
      title: 'Twig',
      docPath: './README.md',
      selector: 'bolt-button',
      schema,
      demoDatas: [
        {
          style: 'primary',
          text: 'Simple Primary Button',
        },
        {
          style: 'secondary',
          text: 'Secondary with Link',
          link: 'https://www.mskcc.org',
        },
        {
          style: 'secondary',
          text: 'Secondary',
          video: true,
          videoLength: '10:05',
        },
        {
          style: 'hollow',
          text: 'Hollow',
          video: true,
          videoLength: '10:05',
        },
      ],
    },
  ],
};
