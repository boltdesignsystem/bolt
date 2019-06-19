# Drupal Lab + Bolt Design System integration

## First time setup

In order to get up and running with the Drupal Lab and the Bolt Starter Theme, three things need to happen first:

1. Any Composer and NPM dependnecies (via Yarn) used will need to get installed.

2. The front-end Bolt-powered Drupal theme needs to get compiled for the very first time (for Twig namespaces, etc).

> This is important as some important JSON config data that's used by the Bolt Connect module in Drupal for knowing where Twig templates live (automatically configuring Twig Namespaces) + auto-wiring up the shared Twig extensions that ship in Bolt.

3. And finally, the Drupal sandbox needs to setup, configurations imported, fake content generated for the SQLite database, etc.


Thankfully there's a quick NPM command available to take care of all three of these automatically:

```bash
composer run setup
```

> Under the hood this command is actually running `composer install`, `composer run bolt:setup`, which Yarn installs the front-end dependencies + runs `npm run build`, and `composer run build` for building Drupal -- in case you need to re-run any of these separately.

Finally to start up the local PHP dev server for Drupal run:

```bash
composer run serve
```

And, if you also want to watch your front-end codebase for local changes (ex. changing any Sass or JS and automatically recompiling -- which you probably want), run the following in a separate terminal / console tab:

```bash
composer run bolt:start
```


### Compiling theme-specific front-end Sass and JavaScript
Check out the `.boltrc` config example used in Bolt's [Pattern Lab configuration](https://github.com/bolt-design-system/bolt/blob/master/docs-site/.boltrc.js#L132). This example shows that you can combine and build components coming from Bolt with additional front-end code that lives locally in your site theme using one unified build process!


#### Workflows

1. Make changes
2. Export your config with `composer run export`
3. Rebuild site to test with `composer run build`
4. Commit

#### Commands

- `composer run serve` - Start a PHP webserver for Drupal
- `composer run cr` - Clear Drupal cache via `drush cr`
- `composer run export` - Export database config to yml files via `drush config:export`
- `composer run build` - Drop the current database, install site, import config, generate dummy content, clear the cache and carry on.
- `composer run start` - Run `build`, then `serve`
