![license](https://img.shields.io/github/license/pattern-lab/edition-php-twig-standard.svg)
[![Packagist](https://img.shields.io/packagist/v/pattern-lab/edition-twig-standard.svg)](https://packagist.org/packages/pattern-lab/edition-mustache-webdesignday) [![Gitter](https://img.shields.io/gitter/room/pattern-lab/php.svg)](https://gitter.im/pattern-lab/php)

# Pattern Lab Standard Edition for Twig

The Standard Edition for Twig gives developers and designers a clean and stable base from which to develop a Twig-based pattern library.

## Packaged Components

The Standard Edition for Twig comes with the following components:

* `pattern-lab/core`: [GitHub](https://github.com/pattern-lab/patternlab-php-core), [Packagist](https://packagist.org/packages/pattern-lab/core)
* `pattern-lab/patternengine-twig`: [documentation](https://github.com/pattern-lab/patternengine-php-twig#twig-patternengine-for-pattern-lab-php), [GitHub](https://github.com/pattern-lab/patternengine-php-twig), [Packagist](https://packagist.org/packages/pattern-lab/patternengine-twig)
* `pattern-lab/styleguidekit-assets-default`: [GitHub](https://github.com/pattern-lab/styleguidekit-assets-default), [Packagist](https://packagist.org/packages/pattern-lab/styleguidekit-assets-default)
* `pattern-lab/styleguidekit-twig-default`: [GitHub](https://github.com/pattern-lab/styleguidekit-twig-default), [Packagist](https://packagist.org/packages/pattern-lab/styleguidekit-twig-default)

## Installing

There are two methods for downloading and installing the Standard Edition for Twig:

* [Download a pre-built project](#download-a-pre-built-package)
* [Use Composer to create a project](#use-composer-to-create-a-project)

### Download a pre-built project

The fastest way to get started with the Standard Edition for Twig is to [download the pre-built version](https://github.com/pattern-lab/edition-php-twig-standard/releases) from the [releases page](https://github.com/pattern-lab/edition-php-twig-standard/releases). The pre-built project comes with the [Base StarterKit for Twig](https://github.com/pattern-lab/starterkit-twig-base) installed by default.

**Please note:** Pattern Lab uses [Composer](https://getcomposer.org/) to manage project dependencies. To upgrade the Standard Edition for Twig or to install plug-ins you'll need to [install Composer](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx). We recommend that you [install it globally](https://getcomposer.org/doc/00-intro.md#globally).

### Use Composer to create a project

Pattern Lab uses [Composer](https://getcomposer.org/) to manage project dependencies.

#### 1. Install Composer

Please follow the directions for [installing Composer](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx) on the Composer website. We recommend you [install it globally](https://getcomposer.org/doc/00-intro.md#globally).

#### 2. Install the Standard Edition for Twig

Use Composer's [`create-project` command](https://getcomposer.org/doc/03-cli.md#create-project) to install the Standard Edition for Twig into a location of your choosing. In Terminal type:

    cd install/location/
    composer create-project pattern-lab/edition-twig-standard your-project-name && cd $_

This will install the Standard Edition for Twig into a directory called `your-project-name` in `install/location/`. During the set-up process you will be asked to install an appropriate StarterKit. You will be automatically dropped into the project directory after the process is finished.

## Updating Pattern Lab

To update Pattern Lab please refer to each component's GitHub repository. The components are listed at the top of the README.

## Helpful Commands

These are some helpful commands you can use on the command line for working with Pattern Lab.

### List all of the available commands

To list all available commands type:

    php core/console --help

To list the options for a particular command type:

    php core/console --help --[command]

### Generate Pattern Lab

To generate the front-end for Pattern Lab type:

    php core/console --generate

### Watch for changes and re-generate Pattern Lab

To watch for changes and re-generate the front-end for Pattern Lab type:

    php core/console --watch

### Start a server to view Pattern Lab

You can use PHP's built-in web server to review your Pattern Lab project in a browser. In a seperate window type:

    php core/console --server

Then open [http://localhost:8080](http://localhost:8080) in your browser.

### Install a StarterKit

To install a near-empty StarterKit as a starting point for your project type:

    php core/console --starterkit --init

To install a specific StarterKit from GitHub type:

    php core/console --starterkit --install <starterkit-vendor/starterkit-name>
