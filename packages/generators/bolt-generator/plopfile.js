const shelljs = require('shelljs');
const updateBoltRcConfig = require('./helpers/update-boltrc');
const updateBoltPackage = require('./helpers/add-bolt-package');
const answersValidate = require('./helpers/validation');
const aggregateActions = require('./helpers/aggregate-data');
const plopPrompt = require('./helpers/plop-prompt');

const config = {
  bolt: {
    version: require('../../../docs-site/package.json').version,
    coreVersion: require('../../../packages/core-v3.x/package.json').version,
  },
  component: {
    dir: 'packages/components',
    patternLab: 'docs-site/src/pages/pattern-lab/_patterns/40-components',
    src: 'src',
    templates: 'templates/component',
    test: '__tests__',
  },
  element: {
    dir: 'packages/elements',
    patternLab: 'docs-site/src/pages/pattern-lab/_patterns/20-elements',
    src: 'src',
    templates: 'templates/element',
    test: '__tests__',
  },
  git: {
    email: shelljs
      .exec('git config user.email', { silent: true })
      .stdout.replace(/\n/g, ''),
    name: shelljs
      .exec('git config user.name', { silent: true })
      .stdout.replace(/\n/g, ''),
    url: 'https://github.com/bolt-design-system/bolt',
  },
  root: '../../..',
};

const addToBoltRC = (packageName, path) => data =>
  updateBoltRcConfig(packageName, path);
const addToPackageJSON = (packageName, path) => data =>
  updateBoltPackage(packageName, path);

module.exports = plop => {
  plop.setGenerator('component', {
    description: 'Generator for Bolt Components',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message:
          'What is the name of your Bolt component? (e.g. `button`, `card`, etc):',
        validate: answer => answersValidate(answer, 'component'),
      },
      {
        type: 'confirm',
        name: 'isWebComponent',
        default: false,
        message: 'Is this component a web component?:',
      },
      {
        type: 'input',
        name: 'description',
        message:
          'Could you write a sentence or two that describes your new Bolt component:',
      },
    ],
    actions(data) {
      const boltPackageName = plop.renderString(
        '@bolt/components-{{ kebabCase name }}',
        data,
      );

      data = aggregateActions('component', config, data, 40);
      data.component.dest = plop.renderString(
        `${data.component.dir}/bolt-{{ kebabCase name }}`,
        data,
      );

      let dynamicActions = [];
      let messageActions = [];
      const basicActions = [
        {
          type: 'add',
          path: `${data.root}/${data.component.dest}/index.js`,
          templateFile: `${data.component.templates}/component.index.js`,
        },
        {
          type: 'add',
          path: `${data.root}/${data.component.dest}/index.scss`,
          templateFile: `${data.component.templates}/component.index.scss`,
        },
        {
          type: 'add',
          path: `${data.root}/${data.component.dest}/package.json`,
          templateFile: `${data.component.templates}/component.package.json`,
        },
        {
          type: 'add',
          path: `${data.root}/${data.component.dest}/README.md`,
          templateFile: `${data.component.templates}/README.md`,
        },
        {
          type: 'add',
          path: `${data.root}/${data.component.dest}/{{ kebabCase name }}.schema.js`,
          templateFile: `${data.component.templates}/component.schema.js`,
        },
        {
          type: 'add',
          path: `${data.root}/${data.component.dest}/${data.component.src}/{{ kebabCase name }}.scss`,
          templateFile: `${data.component.templates}/component.scss`,
        },
        {
          type: 'add',
          path: `${data.root}/${data.component.patternLab}/{{ kebabCase name }}/00-{{ kebabCase name }}-docs.twig`,
          templateFile: `${data.component.templates}/component.docs.twig`,
        },
        {
          type: 'add',
          path: `${data.root}/${data.component.patternLab}/{{ kebabCase name }}/05-{{ kebabCase name }}.twig`,
          templateFile: `${data.component.templates}/05-component.docs.twig`,
        },
      ];

      if (data.isWebComponent) {
        basicActions.push(
          {
            type: 'add',
            path: `${data.root}/${data.component.dest}/${data.component.test}/{{ kebabCase name }}.js`,
            templateFile: `${data.component.templates}/web-component.test.js`,
          },
          {
            type: 'add',
            path: `${data.root}/${data.component.dest}/${data.component.src}/{{ kebabCase name }}.js`,
            templateFile: `${data.component.templates}/web-component.js`,
          },
          {
            type: 'add',
            path: `${data.root}/${data.component.dest}/${data.component.src}/{{ kebabCase name }}.twig`,
            templateFile: `${data.component.templates}/web-component.twig`,
          },
        );
      } else {
        basicActions.push(
          {
            type: 'add',
            path: `${data.root}/${data.component.dest}/${data.component.test}/{{ kebabCase name }}.js`,
            templateFile: `${data.component.templates}/component.test.js`,
          },
          {
            type: 'add',
            path: `${data.root}/${data.component.dest}/${data.component.src}/{{ kebabCase name }}.js`,
            templateFile: `${data.component.templates}/component.js`,
          },
          {
            type: 'add',
            path: `${data.root}/${data.component.dest}/${data.component.src}/{{ kebabCase name }}.twig`,
            templateFile: `${data.component.templates}/component.twig`,
          },
        );
      }

      if (data.isTest) {
        dynamicActions.push(
          addToBoltRC(boltPackageName, `${data.component.tmp}/.boltrc.js`),
          addToPackageJSON(
            boltPackageName,
            `${data.component.tmp}/package.json`,
          ),
        );
      } else {
        dynamicActions.push(
          addToBoltRC(boltPackageName),
          addToPackageJSON(boltPackageName),
        );
      }

      messageActions.push(plopPrompt('component'));

      return [...basicActions, ...dynamicActions, ...messageActions];
    },
  });

  plop.setGenerator('element', {
    description: 'Generator for Bolt Elements',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message:
          'What is the name of your Bolt element? (e.g. `button`, `link`, etc):',
        validate: answer => answersValidate(answer, 'element'),
      },
      {
        type: 'input',
        name: 'description',
        message:
          'Could you write a sentence or two that describes your new Bolt element:',
      },
    ],
    actions(data) {
      const boltPackageName = plop.renderString(
        '@bolt/elements-{{ kebabCase name }}',
        data,
      );

      data = aggregateActions('element', config, data, 20);
      data.element.dest = plop.renderString(
        `${data.element.dir}/bolt-{{ kebabCase name }}`,
        data,
      );

      let dynamicActions = [];
      let messageActions = [];
      const basicActions = [
        {
          type: 'add',
          path: `${data.root}/${data.element.dest}/index.scss`,
          templateFile: `${data.element.templates}/element.index.scss`,
        },
        {
          type: 'add',
          path: `${data.root}/${data.element.dest}/package.json`,
          templateFile: `${data.element.templates}/element.package.json`,
        },
        {
          type: 'add',
          path: `${data.root}/${data.element.dest}/CHANGELOG.md`,
          templateFile: `${data.element.templates}/CHANGELOG.md`,
        },
        {
          type: 'add',
          path: `${data.root}/${data.element.dest}/README.md`,
          templateFile: `${data.element.templates}/README.md`,
        },
        {
          type: 'add',
          path: `${data.root}/${data.element.dest}/{{ kebabCase name }}.schema.js`,
          templateFile: `${data.element.templates}/element.schema.js`,
        },
        {
          type: 'add',
          path: `${data.root}/${data.element.dest}/${data.element.src}/{{ kebabCase name }}.scss`,
          templateFile: `${data.element.templates}/element.scss`,
        },
        {
          type: 'add',
          path: `${data.root}/${data.element.dest}/${data.element.src}/{{ kebabCase name }}.twig`,
          templateFile: `${data.element.templates}/element.twig`,
        },
        {
          type: 'add',
          path: `${data.root}/${data.element.dest}/${data.element.test}/{{ kebabCase name }}.js`,
          templateFile: `${data.element.templates}/element.test.js`,
        },
        {
          type: 'add',
          path: `${data.root}/${data.element.patternLab}/{{ kebabCase name }}/00-{{ kebabCase name }}-docs.twig`,
          templateFile: `${data.element.templates}/element.docs.twig`,
        },
        {
          type: 'add',
          path: `${data.root}/${data.element.patternLab}/{{ kebabCase name }}/05-{{ kebabCase name }}.twig`,
          templateFile: `${data.element.templates}/05-element.docs.twig`,
        },
      ];

      if (data.isTest) {
        dynamicActions.push(
          addToBoltRC(boltPackageName, `${data.element.tmp}/.boltrc.js`),
          addToPackageJSON(boltPackageName, `${data.element.tmp}/package.json`),
        );
      } else {
        dynamicActions.push(
          addToBoltRC(boltPackageName),
          addToPackageJSON(boltPackageName),
        );
      }

      messageActions.push(plopPrompt('element'));

      return [...basicActions, ...dynamicActions, ...messageActions];
    },
  });
};
