workflow "Install" {
  on = "push"
  #   needs = ["install:php", "install:yarn"]
  resolves = [
    "install:yarn",
    "install:php:website",
    "install:php:twig-renderer",
    "install:php:twig-extensions",
    "build",
  ]
}

action "install:yarn" {
  uses = "Borales/actions-yarn@master"
  args = "install"
}

action "install:php:website" {
  uses = "pxgamer/composer-action@v1.0.1"
  runs = "install"
  args = "--no-ansi --no-interaction --no-scripts --no-suggest --no-progress --prefer-dist --working-dir docs-site"
}

action "install:php:core-php" {
  uses = "pxgamer/composer-action@v1.0.1"
  runs = "install"
  args = "--no-ansi --no-interaction --no-scripts --no-suggest --no-progress --prefer-dist --working-dir packages/core-php"
}

action "install:php:twig-renderer" {
  uses = "pxgamer/composer-action@v1.0.1"
  runs = "install"
  args = "--no-ansi --no-interaction --no-scripts --no-suggest --no-progress --prefer-dist --working-dir packages/twig-renderer"
}

action "install:php:twig-extensions" {
  uses = "pxgamer/composer-action@v1.0.1"
  runs = "install"
  args = "--no-ansi --no-interaction --no-scripts --no-suggest --no-progress --prefer-dist --working-dir packages/drupal-twig-extensions"
}

action "build" {
  uses = "docker://boltdesignsystem/bolt-docker:latest"
  needs = [
    "install:yarn",
    "install:php:website",
    "install:php:twig-renderer",
    "install:php:twig-extensions",
  ]
  runs = "yarn"
  args = "build"
}

# action "new-action" {
#   uses = "owner/repo/path@ref"
#   needs = ["install:php:core-php"]
# }# action "install:php:core-php" {
#   uses = "MilesChou/composer-action@master"
#   args = ""
# }
# action "install:php:twig-renderer" {
#   uses = "MilesChou/composer-action@master"
#   args = ""
# }
# action "install:php:twig-extensions" {
#   uses = "MilesChou/composer-action@master"
#   args = ""
# }
# action "install:php" {
#   needs = ["install:php:website", "install:php:core-php", "install:php:twig-renderer", "install:php:twig-extensions"]
# }
# action "build" {
#   uses = "docker://boltdesignsystem/bolt-docker:latest"
#   needs = ["build install"]
#   runs = "yarn"
#   args = "build"
# }
# action "yarn" {
#   uses = "yarn"
# }
# action "GitHub Action for Yarn" {
#   uses = "Borales/actions-yarn@1.1.0"
# }
