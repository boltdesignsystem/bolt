# Drupal Lab

## Usage

#### First time setup

Install and build Drupal:

```bash
composer install
composer run build
```

Compile assets in theme using Bolt Build Tools:

```bash
cd web/themes/flash
npm run build
cd ../../../
```

Next, run a `git status` and you'll notice that `settings.php` has been modified. Please revert those changes, possibliy needing to use `sudo`. @todo This step needs to be improved.

Start up the web server:

```bash
composer run serve
```

#### Workflows

1. Make changes
2. Export your config with `composer run export`
3. Rebuild site to test with `composer run build`
4. Commit

#### Commands

- `composer run serve` - Start a webserver
- `composer run cr` - Clear Drupal cache via `drush cr`
- `composer run export` - Export database config to yml files via `drush config:export`
- `composer run build` - Drop the current database, install site, import config, generate dummy content, clear the cache and carry on.
- `composer run start` - Run `build`, then `serve`
