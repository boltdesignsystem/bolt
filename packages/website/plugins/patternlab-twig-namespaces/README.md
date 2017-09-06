# Twig Extensions Plugin

The **Twig Extensions** plugin is for [Grav CMS](http://github.com/getgrav/grav). It pulls in a subset of the official [Twig Extensions](https://github.com/twigphp/Twig-extensions), v1.4.0.

For a demo, [visit my blog](https://perlkonig.com/demos/twig-extensions).

## Installation

Installing the Twig Extensions plugin can be done in one of two ways. The GPM (Grav Package Manager) installation method enables you to quickly and easily install the plugin with a simple terminal command, while the manual method enables you to do so via a zip file.

### GPM Installation (Preferred)

The simplest way to install this plugin is via the [Grav Package Manager (GPM)](http://learn.getgrav.org/advanced/grav-gpm) through your system's terminal (also called the command line).  From the root of your Grav install type:

    bin/gpm install twig-extensions

This will install the Twig Extensions plugin into your `/user/plugins` directory within Grav. Its files can be found under `/your/site/grav/user/plugins/twig-extensions`.

### Manual Installation

To install this plugin, just download the zip version of this repository and unzip it under `/your/site/grav/user/plugins`. Then, rename the folder to `twig-extensions`. You can find these files on [GitHub](https://github.com/Perlkonig/grav-plugin-twig-extensions) or via [GetGrav.org](http://getgrav.org/downloads/plugins#extras).

You should now have all the plugin files under

    /your/site/grav/user/plugins/twig-extensions
  
> NOTE: This plugin is a modular component for Grav which requires [Grav](http://github.com/getgrav/grav) and the [Error](https://github.com/getgrav/grav-plugin-error) and [Problems](https://github.com/getgrav/grav-plugin-problems) to operate.

## Configuration

Below is the default configuration. An explanation of the various fields follows. To customize, first copy `twig-extensions.yaml` to your `user/config/plugins` folder and edit that copy.

```
enabled: true
modules: [array, intl, date]

```

* The `enabled` field turns the plugin off and on.

* The `modules` array tells the plugin which modules you want imported. This plugin only imports three of the five modules. These are the only valid options.

## Usage

Simply enable the plugin to use these Twig filters. There are three modules available:

* The `Intl` module provides three filters:
  * `localizeddate` formats a date based on the locale.
  * `localizednumber` formats a number based on the locale.
  * `localizedcurrency` formats a number based on a given currency code.

* The `Array` module provides a single filter:
  * `shuffle` randomizes an array.
  * **Note:** This code was slightly modified to allow shuffling associative arrays. Simply pass `true` to enable this feature: `{{ myArray | shuffle(true) }}`.

The `Date` module also only provides a single filter:
  * `time_diff` dispays the delta between two dates in a human readable form (e.g., `2 days ago`).

For more information, [read the official documentation](http://twig.sensiolabs.org/doc/extensions/index.html).

### Omitted Modules

* The `Text` module is omitted because Grav already has `truncate` built in, and the `wordwrap` provided here is not very helpful.

* The `I18n` module is omitted because Grav already has extensive i18n features.


