# Pattern Kit

Pattern Kit is an application that lets you preview your library of templates and manipulate their content by interacting with a form built from the schemas. It is both a development tool and a public facing pattern library.

For a demo check out [Pattern Kit Demo](http://patternkit.info/sg/). 

# Installation

Note, by following these instructions you do _not_ need to clone this git repository.

## Create composer.json at pattern library root and require pattern kit

```
"require": {
    "pattern-builder/pattern-kit": "@dev"
},
"repositories": [
  {
    "type": "vcs",
    "url": "https://github.com/PatternBuilder/pattern-kit"
  }
]
```

## Add index.php at pattern library root
```
<?php

require_once __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/vendor/pattern-builder/pattern-kit/src/app.php';

$app['http_cache']->run();

```

## Add .pk-config.yml at pattern library root

- Create arrays of paths to your data, schema, template, docs and styleguide files (relative to config)
- Set the file extensions for each file type
- List categories in order you'd like them to appear in navigation
- Create arrays of assets for css, js and footer js (including live reload if necessary)

```

title: Project Title

paths:  # relative to your pattern library root
  data:
    - path/to/sample/data
  schemas:
    - path/to/schemas
  templates:
    - path/to/templates
  docs:
    - path/to/schemas-docs
  sg:
    - path/to/stylelguide/docs
extensions:
  data: .docs.json
  schemas: .json
  templates: .twig
  docs: .docs.md
  sg: .sg.md
categories:
    - Pattern
    - Sub Pattern
    - Layout
    - Component
    - Atom
assets:
  css:
    - path/to/css
    - path/to/othercss
  js:
    - path/to/js
    - path/to/otherjs
  footer_js:
    - path/to/footer_js
    - path/to/otherfooter_js
    - //localhost:1336/livereload.js
```

In your terminal, 

```
$ cd [pattern library root]
$ composer install
```

# Use Pattern Kit

Point MAMP or local PHP server at your index.php file

php -S 0:9001 -t ./
