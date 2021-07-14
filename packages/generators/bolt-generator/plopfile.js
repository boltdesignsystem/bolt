const shelljs = require('shelljs');
const chalk = require('chalk');
const updateBoltRcConfig = require('./helpers/update-boltrc');
const updateBoltPackage = require('./helpers/add-bolt-package');

const config = {
  root: '../../../',
  component: {
    dir: 'packages/components',
    patternLab: 'docs-site/src/pages/pattern-lab/_patterns/40-components',
    src: 'src',
    test: '__tests__',
    templates: 'templates/component',
  }
};
const gitInfo = {
  email: shelljs
    .exec('git config user.email', { silent: true })
    .stdout.replace(/\n/g, ''),
  name: shelljs
    .exec('git config user.name', { silent: true })
    .stdout.replace(/\n/g, ''),
  url: 'https://github.com/bolt-design-system/bolt',
};

const bolt = {
  version: require(`${config.root}/docs-site/package.json`).version,
  coreVersion: require(`${config.root}/packages/core-v3.x/package.json`).version,
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
        message: 'What is the name of your Bolt component? (for example: `button`, `card`, carousel`, etc):',
        validate: input => {
          if (input.includes('_')) {
            console.log(
              chalk.red(" Don't include underscores in your component name!"),
            );
            return false;
          } else if (input.includes(' ')) {
            console.log(
              chalk.red(" Don't include any spaces in your component name!"),
            );
            return false;
          } else if (input.includes('bolt')) {
            console.log(
              chalk.red(
                " Make sure you aren't including the word `bolt` in your component name -- we take care of adding that automatically!",
              ),
            );
            return false;
          } else if (input.length === 0) {
            console.log(
              chalk.red('You need to name your new Bolt component something!'),
            );
            return false;
          }
          return true;
        }
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

      config.component.dest = plop.renderString(`${config.component.dir}/bolt-{{ kebabCase name }}`, data);

      if (isTest) {
        config.component.dir = 'packages/generators/tmp/packages/components';
        config.component.patternLab = 'packages/generators/tmp/docs-site/src/pages/pattern-lab/_patterns/40-components';
        config.component.tmp = 'packages/generators/tmp'
        gitInfo.name = 'Test User';
        gitInfo.email = 'test@example.org';
        bolt.version = '0.0.0';
        bolt.coreVersion = '0.0.0';
      }

      plop.setPartial('BOLTVERSION', bolt.version);
      plop.setPartial('BOLTCOREVERSION', bolt.coreVersion);
      plop.setPartial('GITURL', gitInfo.url);
      plop.setPartial('GITUSERNAME', gitInfo.name);
      plop.setPartial('GITUSEREMAIL', gitInfo.email);

      let actions = [
        {
          type: 'add',
          path: `${config.root}/${config.component.dest}/index.js`,
          templateFile: `${config.component.templates}/component.index.js`
        },
        {
          type: 'add',
          path: `${config.root}/${config.component.dest}/index.scss`,
          templateFile: `${config.component.templates}/component.index.scss`
        },
        {
          type: 'add',
          path: `${config.root}/${config.component.dest}/package.json`,
          templateFile: `${config.component.templates}/component.package.json`
        },
        {
          type: 'add',
          path: `${config.root}/${config.component.dest}/README.md`,
          templateFile: `${config.component.templates}/README.md`
        },
        {
          type: 'add',
          path: `${config.root}/${config.component.dest}/{{ kebabCase name }}.schema.js`,
          templateFile: `${config.component.templates}/component.schema.js`
        },
        {
          type: 'add',
          path: `${config.root}/${config.component.dest}/${config.component.src}/{{ kebabCase name }}.js`,
          templateFile: `${config.component.templates}/component.js`
        },
        {
          type: 'add',
          path: `${config.root}/${config.component.dest}/${config.component.src}/{{ kebabCase name }}.scss`,
          templateFile: `${config.component.templates}/component.scss`
        },
        {
          type: 'add',
          path: `${config.root}/${config.component.dest}/${config.component.src}/{{ kebabCase name }}.twig`,
          templateFile: `${config.component.templates}/component.html.twig`
        },
        {
          type: 'add',
          path: `${config.root}/${config.component.dest}/${config.component.test}/{{ kebabCase name }}.js`,
          templateFile: `${config.component.templates}/component.test.js`
        },
        {
          type: 'add',
          path: `${config.root}/${config.component.patternLab}/{{ kebabCase name }}/00-{{ kebabCase name }}-docs.twig`,
          templateFile: `${config.component.templates}/component.docs.twig`
        },
      ];

      if(isTest) {
        actions = actions.concat([
          addToBoltRC(
            boltComponentPackageName,
            `${config.component.tmp}/.boltrc.js`
          ),
          addToPackageJSON(
            boltComponentPackageName,
            `${config.component.tmp}/package.json`
          ),
        ]);
      } else {
        actions = actions.concat([
          addToBoltRC(boltComponentPackageName),
          addToPackageJSON(boltComponentPackageName),
        ]);
      }

      return actions;
    }
  });
};