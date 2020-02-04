#!/usr/bin/env node

/*jshint -W097 */
'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const shelljs = require('shelljs');
const changeCase = require('change-case');
const program = require('commander');

const { updateBoltRcConfig } = require('./update-boltrc');
const { addBoltPackage } = require('./add-bolt-package');

const currentBoltVersion = require('../../../../../docs-site/package.json')
  .version;

program
  .version(currentBoltVersion)
  .option('-N, --name [name]', 'button')
  .option(
    '-D, --description [description]',
    'The button component -- part of the Bolt Design System.',
  )
  .option('-T, --test', 'Test path for yeoman')
  .parse(process.argv);

module.exports = class extends Generator {
  constructor(args, opts) {
    // Calling the super constructor
    // eslint-disable-next-line prefer-rest-params
    super(args, opts);
    this.option('noinstall');

    this.gitUrl = 'https://github.com/bolt-design-system/bolt';

    this.folders = {
      src: 'packages/components',
      patternLabFolder:
        'docs-site/src/pages/pattern-lab/_patterns/02-components',
      test: '__tests__',
    };

    this.gitInfo = {
      name: shelljs
        .exec('git config user.name', { silent: true })
        .stdout.replace(/\n/g, ''),
      email: shelljs
        .exec('git config user.email', { silent: true })
        .stdout.replace(/\n/g, ''),
      github: shelljs
        .exec('git config github.user', { silent: true })
        .stdout.replace(/\n/g, ''),
    };

    this.boltVersion = currentBoltVersion;

    if (program.test) {
      this.testData = {
        componentName: program.name,
        description: program.description,
        tmpPath:
          'packages/generators/yeoman-create-component/generators/component/tmp',
      };

      this.folders.src = `${this.testData.tmpPath}/${this.folders.src}`;
      this.folders.patternLabFolder = `${this.testData.tmpPath}/${this.folders.patternLabFolder}`;
      this.gitInfo.name = 'Test User';
      this.gitInfo.email = 'test@example.org';
      this.gitInfo.github = '';
      this.boltVersion = '0.0.0';
    }
  }

  initializing() {
    this.log(yosay('Generating a new Bolt Design System component!'));
  }

  updateComponentName(value) {
    return {
      original: value,
      camelCase: changeCase.camelCase(value),
      pascalCase: changeCase.pascalCase(value),
      snakeCase: changeCase.snakeCase(value),
      kebabCase: changeCase.paramCase(value),
      noCase: changeCase.noCase(value),
      titleCase: changeCase.titleCase(value),
    };
  }

  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'componentName',
        message:
          'What is the name of your Bolt component? (for example: `button`, `card`, carousel`, etc)',
        required: true,
        default: typeof program.name === 'string' ? program.name : '',
        when: !program.test,
        validate: input => {
          if (typeof input !== 'string') {
            this.log(chalk.red('You must pass a valid component name!'));
            return false;
          } else if (input.includes('_')) {
            this.log(
              chalk.red("Don't include underscores in your component name!"),
            );
            return false;
          } else if (input.includes(' ')) {
            this.log(
              chalk.red("Don't include any spaces in your component name!"),
            );
            return false;
          } else if (input.includes('bolt')) {
            this.log(
              chalk.red(
                "Make sure you aren't including the word `bolt` in your component name -- we take care of adding that automatically!",
              ),
            );
            return false;
          } else if (input.length === 0) {
            this.log(
              chalk.red('You need to name your new Bolt component something!'),
            );
            return false;
          }
          return true;
        },
        filter: input => {
          this.name = this.updateComponentName(input);

          return (
            input.charAt(0).toUpperCase() + input.slice(1).replace(' ', '-')
          );
        },
      },
      {
        type: 'input',
        name: 'description',
        message:
          'Could you write a sentence or two that describes your new Bolt component?',
        required: false,
        default:
          typeof program.description === 'string'
            ? program.description
            : () => {
                return `The ${this.name.noCase} component - part of the Bolt Design System.`;
              },
        when: !program.test,
        validate: input => {
          if (typeof input !== 'string') {
            this.log(chalk.red('You must pass a valid string !'));
            return false;
          }
          return true;
        },
      },
    ]).then(props => {
      this.props = !program.test ? props : this.testData;
      this.props.name = !program.test
        ? this.name
        : this.updateComponentName(this.testData.componentName);
      this.props.gitUrl = this.gitUrl;
      this.props.boltVersion = this.boltVersion;
      this.props.gitInfo = this.gitInfo;
      this.props.packageName = `@bolt/components-${this.props.name.kebabCase}`;
      this.props.dest = `${this.folders.src}/bolt-${this.props.name.kebabCase}`;
      this.props.gitPath =
        this.gitUrl +
        '/tree/master/packages/components/bolt-' +
        this.props.name.kebabCase;
    });
  }

  writing() {
    // component-specific scss
    this.fs.copyTpl(
      this.templatePath('component.scss'),
      this.destinationPath(
        `${this.props.dest}/src/${this.props.name.kebabCase}.scss`,
      ),
      { props: this.props },
    );
    // index.scss in the component root
    this.fs.copyTpl(
      this.templatePath('index.component.scss'),
      this.destinationPath(`${this.props.dest}/index.scss`),
      { props: this.props },
    );

    // component-specific Twig template
    this.fs.copyTpl(
      this.templatePath('component.html.twig'),
      this.destinationPath(
        `${this.props.dest}/src/${this.props.name.kebabCase}.twig`,
      ),
      { props: this.props },
    );

    // component-specific schema
    this.fs.copyTpl(
      this.templatePath('component.schema.yml'),
      this.destinationPath(
        `${this.props.dest}/${this.props.name.kebabCase}.schema.yml`,
      ),
      { props: this.props },
    );

    // component-specific web component base class
    this.fs.copyTpl(
      this.templatePath('component.js'),
      this.destinationPath(
        `${this.props.dest}/src/${this.props.name.kebabCase}.js`,
      ),
      { props: this.props },
    );

    // component-specific web component root file -- polyfills before pulling in the main component JS
    this.fs.copyTpl(
      this.templatePath('index.component.js'),
      this.destinationPath(`${this.props.dest}/index.js`),
      { props: this.props },
    );

    // basic component Jest tests
    this.fs.copyTpl(
      this.templatePath('component.test.js'),
      this.destinationPath(`${this.props.dest}/__tests__/index.js`),
      { props: this.props },
    );

    // component README.md
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath(`${this.props.dest}/README.md`),
      {
        props: this.props,
        folders: this.folders,
      },
    );

    // component package.json
    this.fs.copyTpl(
      this.templatePath('package.tpl.json'),
      this.destinationPath(`${this.props.dest}/package.json`),
      {
        props: this.props,
        folders: this.folders,
      },
    );

    // main component docs page in Pattern Lab
    this.fs.copyTpl(
      this.templatePath('component-docs.twig'),
      this.destinationPath(
        `${this.folders.patternLabFolder}/${this.props.name.kebabCase}/00-${this.props.name.kebabCase}-docs.twig`,
      ),
      {
        props: this.props,
        folders: this.folders,
      },
    );
  }

  install() {
    if (program.test) {
      updateBoltRcConfig(this.props.packageName, this.testData.tmpPath);
      addBoltPackage(this.props.packageName, this.testData.tmpPath);
    } else {
      updateBoltRcConfig(this.props.packageName);
      addBoltPackage(this.props.packageName);

      shelljs.exec('yarn');

      shelljs.exec(
        `npx prettier ${this.props.dest}/**/*.{js,scss,json} --write`,
      );
    }
  }
};
