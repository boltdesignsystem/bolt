const shelljs = require('shelljs');
const updateBoltRcConfig = require('./helpers/update-boltrc');
const updateBoltPackage = require('./helpers/add-bolt-package');
const answersValidate = require('./helpers/validation');

const config = {
  bolt: {
    version: require('../../../docs-site/package.json').version,
    coreVersion: require('../../../packages/core-v3.x/package.json').version,
  },
  component: {
    dir: 'packages/components',
    patternLab: 'docs-site/src/pages/pattern-lab/_patterns/40-components',
    src: 'src',
    test: '__tests__',
    templates: 'templates/component',
  },
  element: {
    dir: 'packages/generators/tmp/packages/elements',
    patternLab: 'packages/generators/tmp/docs-site/src/pages/pattern-lab/_patterns/20-elements',
    src: 'src',
    test: '__tests__',
    templates: 'templates/elements',
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
  root: '../../../',
};

const addToBoltRC = (packageName, path) => data => updateBoltRcConfig(packageName, path);
const addToPackageJSON = (packageName, path) => data => updateBoltPackage(packageName, path);

module.exports = plop => {
  plop.setGenerator('component', {
    description: 'Generator for Bolt Components',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your Bolt component? (e.g. `button`, `card`, etc):',
        validate: answer => answersValidate(answer, 'component'),
      },
      {
        type: 'input',
        name: 'description',
        message: 'Could you write a sentence or two that describes your new Bolt component:'
      }
    ],
    actions(data) {
      const isTest = data['name'] === 'Test';
      const boltComponentPackageName = plop.renderString('@bolt/components-{{ kebabCase name }}', data);

      if (isTest) {
        config.component.dir = 'packages/generators/tmp/packages/components';
        config.component.patternLab = 'packages/generators/tmp/docs-site/src/pages/pattern-lab/_patterns/40-components';
        config.component.tmp = 'packages/generators/tmp'
        config.git.name = 'Test User';
        config.git.email = 'test@example.org';
        config.bolt.version = '0.0.0';
        config.bolt.coreVersion = '0.0.0';
      }

      config.component.dest = plop.renderString(`${config.component.dir}/bolt-{{ kebabCase name }}`, data);
      data = Object.assign(data, config);

      let dynamicActions = [];
      const basicActions = [
        {
          type: 'add',
          path: `${data.root}/${data.component.dest}/index.js`,
          templateFile: `${data.component.templates}/component.index.js`
        },
        {
          type: 'add',
          path: `${data.root}/${data.component.dest}/index.scss`,
          templateFile: `${data.component.templates}/component.index.scss`
        },
        {
          type: 'add',
          path: `${data.root}/${data.component.dest}/package.json`,
          templateFile: `${data.component.templates}/component.package.json`
        },
        {
          type: 'add',
          path: `${data.root}/${data.component.dest}/README.md`,
          templateFile: `${data.component.templates}/README.md`
        },
        {
          type: 'add',
          path: `${data.root}/${data.component.dest}/{{ kebabCase name }}.schema.js`,
          templateFile: `${data.component.templates}/component.schema.js`
        },
        {
          type: 'add',
          path: `${data.root}/${data.component.dest}/${data.component.src}/{{ kebabCase name }}.js`,
          templateFile: `${data.component.templates}/component.js`
        },
        {
          type: 'add',
          path: `${data.root}/${data.component.dest}/${data.component.src}/{{ kebabCase name }}.scss`,
          templateFile: `${data.component.templates}/component.scss`
        },
        {
          type: 'add',
          path: `${data.root}/${data.component.dest}/${data.component.src}/{{ kebabCase name }}.twig`,
          templateFile: `${data.component.templates}/component.html.twig`
        },
        {
          type: 'add',
          path: `${data.root}/${data.component.dest}/${data.component.test}/{{ kebabCase name }}.js`,
          templateFile: `${data.component.templates}/component.test.js`
        },
        {
          type: 'add',
          path: `${data.root}/${data.component.patternLab}/{{ kebabCase name }}/00-{{ kebabCase name }}-docs.twig`,
          templateFile: `${data.component.templates}/component.docs.twig`
        },
      ];

      if (isTest) {
        dynamicActions.push(
          addToBoltRC(boltComponentPackageName, `${data.component.tmp}/.boltrc.js`),
          addToPackageJSON(boltComponentPackageName, `${data.component.tmp}/package.json`),
        );
      } else {
        dynamicActions.push(
          addToBoltRC(boltComponentPackageName),
          addToPackageJSON(boltComponentPackageName),
        );
      }

      return [...basicActions, ...dynamicActions];
    }
  });

  plop.setGenerator('element', {
    description: 'Generator for Bolt Elements',
    prompts: [
      {
      type: 'input',
      name: 'name',
      message: 'What is the name of your Bolt element? (e.g. `button`, `link`, etc):',
      validate: answer => answersValidate(answer, 'element'),
    },
    {
      type: 'input',
      name: 'description',
      message: 'Could you write a sentence or two that describes your new Bolt element:'
    }
    ],
    actions(data) {
      config.element.dest = plop.renderString(`${config.element.dir}/bolt-{{ kebabCase name }}`, data);
      data = Object.assign(data, config);

      const basicActions = [
        {
          type: 'add',
          path: `${data.root}/${data.element.dest}/README.md`,
          templateFile: `${data.element.templates}/README.md`
        },
      ];

      console.log('DATA', data);
      return [...basicActions]
    }
  });
};