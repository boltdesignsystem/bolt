# Editable with SimpleMDE Plugin

The **Editable with SimpleMDE** Plugin is for [Grav CMS](http://github.com/getgrav/grav). It allows frontend users to edit page content using the [SimpleMDE editor](https://simplemde.com/).

Markdown content in normal Grav pages can be made editable. However, modular pages can not be edited as their content is dynamically created.

## Installation

Installing the plugin can be done in one of two ways. The GPM (Grav Package Manager) installation method enables you to quickly and easily install the plugin with a simple terminal command, while the manual method enables you to do so via a zip file.

> NOTE: This plugin is a modular component for Grav which requires [Grav](http://github.com/getgrav/grav) and the [Error](https://github.com/getgrav/grav-plugin-error) and [Problems](https://github.com/getgrav/grav-plugin-problems) to operate.

### GPM Installation (Preferred)

The simplest way to install this plugin is via the [Grav Package Manager (GPM)](http://learn.getgrav.org/advanced/grav-gpm) through your system's terminal (also called the command line).  From the root of your Grav install type:

    bin/gpm install editable-simplemde

This will install the plugin into your `/user/plugins` directory within Grav. It's files can be found under `/your/site/grav/user/plugins/editable-simplemde`.

### Manual Installation

To install this plugin, just download the zip version of this repository and unzip it under `/your/site/grav/user/plugins`. Then, rename the folder to `editable-simplemde`.

You should now have all the plugin files under

    /your/site/grav/user/plugins/editable-simplemde

## Configuration

Before configuring this plugin, you should copy the `user/plugins/editable-simplemde/editable-simplemde.yaml` to `user/config/plugins/editable-simplemde.yaml` and only edit that copy.

Here is the default configuration and an explanation of available options:

```yaml
enabled: true
```

Setting `enabled` tot `true` enables or activates the plugin.

## Usage


### Frontend User Accounts

To enable users to edit content in the frontend they must be able to login. Grav separates backend (Admin) and frontend users into separate sessions. Access to the frontend requires a seperate login as documented in the [Grav Login plugin](https://github.com/getgrav/grav-plugin-login) or the [Private Grav Plugin](https://github.com/Diyzzuf/grav-plugin-private).

Add the required authorization to each user in the user's account file:

```
access:
  site:
    login: 'true'
    editable: 'true'
```

### Enabling page editing

To make a single page editable add these lines to the page header or frontmatter:

```
editable-simplemde:
    self: true
```

In case all pages need to be made editable make the setting site wide by adding the above lines to the plugin configuration file. In that case, to exclude pages from being editable set `self` to `false`.

### Page Media

Images and files that are uploaded are saved in the same folder as the corresponding page. Uploaded images and files that are no longer referenced in the markdown content are automatically deleted when the page is saved.

## Credits

Thanks go to Team Grav and everyone on the [Grav Forum](https://getgrav.org/forum) for creating and supporting Grav.

## To Do

- [ ] Turn the editor toolbar into an affix style toolbar so it stays in view when editing longer texts. Help is required!

