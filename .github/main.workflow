workflow "Install / Build / Test" {
  on = "push"
  needs = ["install:php", "install:yarn"],
  resolves = ["Smoke Tests: Unit Tests (Jest)", "install", "Smoke Tests: Linting"]
}

# Install composer dependencies
action "install:php:website" {
  uses = "MilesChou/composer-action@master"
  args = "cd docs-site && composer install -q --no-ansi --no-interaction --no-scripts --no-suggest --no-progress --prefer-dist"
}

action "install:php:core-php" {
  uses = "MilesChou/composer-action@master"
  args = "cd packages/core-php && composer install -q --no-ansi --no-interaction --no-scripts --no-suggest --no-progress --prefer-dist"
}

action "install:php:twig-renderer" {
  uses = "MilesChou/composer-action@master"
  args = "cd packages/twig-renderer && composer install -q --no-ansi --no-interaction --no-scripts --no-suggest --no-progress --prefer-dist"
}

action "install:php:twig-extensions" {
  uses = "MilesChou/composer-action@master"
  args = "cd packages/drupal-twig-extensions && composer install -q --no-ansi --no-interaction --no-scripts --no-suggest --no-progress --prefer-dist"
}


action "install:yarn" {
  uses = "Borales/actions-yarn@master"
  args = "install"
}

action "install:php" {
  needs = ["install:php:website", "install:php:core-php", "install:php:twig-renderer", "install:php:twig-extensions"]
}


action "build" {
  uses = "docker://boltdesignsystem/bolt-docker:latest"
  needs = ["build install"]
  runs = "yarn"
  args = "build"
}
