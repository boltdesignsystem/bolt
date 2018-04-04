---
title: Bolt Core 
---

## [Twig Filters](http://twig.symfony.com/doc/1.x/templates.html#filters)

### `json_decode`

Let's you decode json. Uses [PHP's `json_decode`](http://php.net/manual/en/function.json-decode.php). It complements Twig's native [`json_encode` filter](http://twig.symfony.com/doc/1.x/filters/json_encode.html).

#### Example
```twig
{% set data = '{ "title": "hi" }' | json_decode %}
```



## [Twig Functions](http://twig.symfony.com/doc/1.x/templates.html#functions)

### `get_data( path )`

Takes the path to a `.json`, `.yml`, or `.yaml` file and returns the data for use in Twig. 

#### Parameters
- `path` {string} Either absolute path, relative path from CWD, or Twig Namespace path like `@namespace/file.json`.

#### Example
```twig
{% set schema = get_data('@bolt-components-headline/headline.schema.yml') %}
```


### `pattern_template( patternName )`

Takes the name of a component and returns the component's template. 

_Warning_: This function is marked for deprecation in future releases of the Bolt Design System.  

#### Parameters
- `patternName` {string} Name of the pattern to include, such as "card", "button", or "link".

#### Example
```twig
{% include pattern_template("button_group") with {
    "buttons": buttons
  } only %}
```


### `validate_data_schema( path, _self )`

Takes the path to a `.json`, `.yml`, or `.yaml` data schema file and validates the data being used by the twig template file in which the validate function is included. As a standard, this should be the last thing included in a twig template file.

Note: Within the Bolt system, validation is managed by the global `enable_json_schema_validation`

#### Parameters
- `path` {string} Either absolute path, relative path from CWD, or Twig Namespace path like `@bolt-components-foo/foo.schema.json`.
<!--@todo Salem or Evan, not sure how we should document the second parameter "_self". Can this be changed, or is it just a required input?-->

#### Example
```twig
{% if enable_json_schema_validation %}
  {{ validate_data_schema('@bolt-components-chip/chip.schema.yml', _self) | raw }}
{% endif %}
```


### `publicpath( fileName )`

Takes a file name. If the `drupal_get_path` function exists (for example, if Bolt is being used in a Drupal environment), it will return the public path to the file. Otherwise, returns the regular public path to the file.

#### Parameters
- `fileName` {string} Name of the file for which the public path is needed.

#### Example
```twig
{# Get the file name based on a provided source url `src` #}
{% set fileName = src|split('.' ~ ext)|first %}

{# Get the public path to the file #}
{% set path = publicpath(fileName) %}
```


### `base64( path )`

Takes the relative path to an image and generates a low resolution base 64 image. Used to create placeholder images for lazy loading. Only converts `.jpg` and `.png` files. 

#### Parameters
- `path` {string} Relative path to an image file.

#### Example
```twig
{% set placeholderImage = base64(sampleImageSrc) %}
```


### `bgcolor( path )`

Takes the relative path to an image and returns the average color. 

#### Parameters
- `path` {string} Relative path to an image file.

#### Example
```twig
{% set placeholderImage = base64(sampleImageSrc) %}
```


### `ratio( path, ratioType="width" )`

Takes the relative path to an image and returns the width to height ratio (default) or the height to width ratio. 

#### Parameters
- `path` {string} Relative path to an image file.
- `rationType` {string} *Optional* Either "width" or "height". Allows return of height to width ratio.

#### Example
```twig
{% set width = ratio(src, 'width') %}

{% set height = ratio(src, 'height') %}
```


<!--@todo Salem/Evan I'mm thinking, since these are the only custom tags, that this information should be in/connect to more thurough documentation on the custom grid system and how to use it.-->
## [Twig Tags](https://twig.symfony.com/doc/1.x/advanced.html#tags)

### `grid`

Bolt's grid system. Wraps the custom [`cell`](#-cell-)

#### Parameters
- `classes` {string} Space separated string of classes to by applied to the grid.

#### Example
```twig
{% grid "o-bolt-grid--center o-bolt-grid--full" %}

  ...
  
{% endgrid %}
```


### `cell`

A cell to be used in the Bolt grid system.

#### Parameters
- `classes` {string} Space separated string of classes to by applied to the grid.

#### Example
```twig
{% cell "u-bolt-width-1/1 u-bolt-width-2/3@small" %}

  ...

{% endcell %}
```

