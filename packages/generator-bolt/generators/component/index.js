/*jshint -W097 */
'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const shelljs = require('shelljs');
const caseFilter = require('../../utils/case-filters.js')();

const { updateBoltRcConfig } = require('./update-boltrc');
const { addBoltPackage } = require('./add-bolt-package');

const currentBoltVersion = require('../../../../docs-site/package.json').version;

var validateString = function(input) {
  if (typeof input !== 'string') {
    this.log(chalk.red('You must pass a valid string !'));
    return false;
  } else if (input.length === 0) {
    this.log(chalk.red('Tss Tss Tss, Write something !'));
    return false;
  }
  return true;
};

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

    this.boltVersion = currentBoltVersion;

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
  }

  initializing() {
    this.log(yosay('Generating a new Bolt Design System component!'));
  }

  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'componentName',
        message:
          'What is the name of your Bolt component? (for example: `button`, `card`, carousel`, etc)',
        required: true,
        default: 'component',
        validate: function(input) {
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
        }.bind(this),
        filter: function(input) {
          let isPlural = input.slice(-1) === 's';
          let singular = isPlural ? input.slice(0, input.length - 1) : input;
          let plural = isPlural ? input : input + 's';

          this.names = {
            camelcase: {
              singular: caseFilter.toCamelCase(singular),
              plural: caseFilter.toCamelCase(plural),
              default: caseFilter.toCamelCase(input),
            },
            pascalcase: {
              singular: caseFilter.toPascalCase(singular),
              plural: caseFilter.toPascalCase(plural),
              default: caseFilter.toPascalCase(input),
            },
            kebabcase: {
              singular: caseFilter.toKebabCase(singular),
              plural: caseFilter.toKebabCase(plural),
              default: caseFilter.toKebabCase(input),
            },
            lowercase: {
              singular: caseFilter.toLowerCase(singular),
              plural: caseFilter.toLowerCase(plural),
              default: caseFilter.toLowerCase(input),
            },
            uppercase: {
              singular: caseFilter.toUpperCase(singular),
              plural: caseFilter.toUpperCase(plural),
              default: caseFilter.toUpperCase(input),
            },
            capitalcase: {
              singular: caseFilter.toCapitalCase(singular),
              plural: caseFilter.toCapitalCase(plural),
              default: caseFilter.toCapitalCase(input),
            },
            snakecase: {
              singular: caseFilter.toSnakeCase(singular),
              plural: caseFilter.toSnakeCase(plural),
              default: caseFilter.toSnakeCase(input),
            },
            attachedcase: {
              singular: caseFilter.toAttachedCase(singular),
              plural: caseFilter.toAttachedCase(plural),
              default: caseFilter.toAttachedCase(input),
            },
          };

          return (
            input.charAt(0).toUpperCase() + input.slice(1).replace(' ', '-')
          );

          this.componentName = this.input;
        }.bind(this),
      },
      {
        type: 'input',
        name: 'description',
        message:
          'Could you write a sentence or two that describes your new Bolt component?',
        required: false,
        default: function(answers) {
          return `The ${
            this.names.kebabcase.default
          } component -- part of the Bolt Design System.`;
        }.bind(this),
        validate: function(input) {
          if (typeof input !== 'string') {
            this.log(chalk.red('You must pass a valid string !'));
            return false;
          }
          return true;
        }.bind(this),
      },
    ]).then(
      function(props) {
        this.props = props;
        this.props.names = this.names;
        this.props.gitUrl = this.gitUrl;
        this.props.boltVersion = this.boltVersion;
        this.props.gitInfo = this.gitInfo;
        this.props.packageName = `@bolt/components-${
          this.names.kebabcase.default
        }`;
        this.props.dest = `${this.folders.src}/bolt-${
          this.props.names.kebabcase.default
        }`;
        this.props.gitPath =
          this.gitUrl +
          '/tree/master/packages/components/bolt-' +
          this.names.lowercase.default;
      }.bind(this),
    );
  }

  writing() {
    // component-specific scss
    this.fs.copyTpl(
      this.templatePath('component.scss'),
      this.destinationPath(
        `${this.props.dest}/src/${this.props.names.kebabcase.default}.scss`,
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
        `${this.props.dest}/src/${this.props.names.kebabcase.default}.twig`,
      ),
      { props: this.props },
    );

    // component-specific schema
    this.fs.copyTpl(
      this.templatePath('component.schema.yml'),
      this.destinationPath(
        `${this.props.dest}/${this.props.names.kebabcase.default}.schema.yml`,
      ),
      { props: this.props },
    );

    // component-specific web component base class
    this.fs.copyTpl(
      this.templatePath('component.js'),
      this.destinationPath(
        `${this.props.dest}/src/${this.props.names.kebabcase.default}.js`,
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
      this.destinationPath(
        `${this.folders.src}/bolt-${
          this.props.names.kebabcase.default
        }/__tests__/index.js`,
      ),
      { props: this.props },
    );

    // component README.md
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath(
        `${this.folders.src}/bolt-${
          this.props.names.kebabcase.default
        }/README.md`,
      ),
      {
        props: this.props,
        folders: this.folders,
      },
    );

    // component package.json
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath(
        `${this.folders.src}/bolt-${
          this.props.names.kebabcase.default
        }/package.json`,
      ),
      {
        props: this.props,
        folders: this.folders,
      },
    );

    // main component docs page in Pattern Lab
    this.fs.copyTpl(
      this.templatePath('component-docs.twig'),
      this.destinationPath(
        `${this.folders.patternLabFolder}/${
          this.props.names.kebabcase.default
        }/${this.props.names.kebabcase.default}-docs.twig`,
      ),
      {
        props: this.props,
        folders: this.folders,
      },
    );
  }

  install() {
    updateBoltRcConfig(this.props.packageName);
    addBoltPackage(this.props.packageName);

    shelljs.exec('yarn');
  }
};
