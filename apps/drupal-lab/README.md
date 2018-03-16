# Drupal Lite

> Project template for a simple Drupal 8 using SQLite for easy dev testing.

## Usage

### Creating a new project

If you want to create a new project using this, run:

```
composer create-project basaltinc/drupal-lite some-dir --stability dev --no-interaction
```

- Commit the results
- Delete this section of "Creating a new project" as it's confusing.

### Using the current Drupal Lite project

#### First time setup

```bash
composer install
composer run build
composer run serve
```

#### Workflows

1. Make changes
2. Export your config with `composer run export`
3. Rebuild site to test with `composer run build`
4. Commit

#### Commands

- `composer run serve` - Start a webserver
- `composer run export` - Export database config to yml files via `drush config:export`
- `composer run build` - Drop the current database, install site, import config, generate dummy content, clear the cache and carry on.
- `composer run start` - Run `build`, then `serve`
