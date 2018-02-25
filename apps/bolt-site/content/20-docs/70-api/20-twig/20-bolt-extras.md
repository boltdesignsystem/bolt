---
title: Bolt Extras 
---

## [Twig Filters](http://twig.symfony.com/doc/1.x/templates.html#filters)


### `markdown`

Filters a string of markdown and converts it to HTML.

#### Example
```twig
{{ source(readmeFile) | markdown }}
```


### `rgb2hex`

Filters an rgb color value as a string in the form of "_rgb( n, m, o)_" and converts it to hexadecimal notation. 

#### Example
```twig
{% set colorValue = 'rgb( 255, 99, 71)' %}
{# This is the rgb value for the color _tomato_ #}

{% set color = colorValue | rgb2hex %}
{# color is now the hex value for _tomato_, '#ff6347' #}
```


### `text_contrast`

Filters a color in the form of a string and determines if the contrasting text is 'black' or 'white'.

#### Example
```twig
<div class="c-bolt-swatch__text" style="color: {{ colorValue | text_contrast }}">
```



## [Twig Functions](http://twig.symfony.com/doc/1.x/templates.html#functions)


### `console_log( data )`

Outputs data to the browser's console log. 

#### Parameters
- `data` Any data you would like to log to the console from a twig template.

#### Example
```twig
{{ console_log(page.meta) }}
```


### `deep_merge( array1, array2 )`

Does a recursive or 'deep' merge of two arrays using [PHP array_merge_recursive](http://php.net/manual/en/function.array-merge-recursive.php) and returns the result. 

#### Parameters
- `array` {array} A multi-dimensional array.
- `array` {array} A multi-dimensional array.

#### Example
```twig
{% set colorsOne = ['red', 'blue'] %}
{% set colorsTwo = ['green', ['yello', 'teal']] %}
{% set allColors = deep_merge(colorsOne, colorsTwo) %}
{# `allColors` will now equal ['red', 'blue', 'green', 'yellow', 'teal'] #}
```


### `color_contrast( color1, color2 )`

Does an accessibility analysis of two colors based on the [WCAG 2](https://www.w3.org/TR/WCAG20/) requirements for [visual audio contrast](http://www.w3.org/TR/WCAG20/#visual-audio-contrast) and [large scale text](http://www.w3.org/TR/WCAG20/#larger-scaledef).
Returns results as an array with a key for each level (AA, AAA, both for normal, large, and bold text) as well as the calculated contrast ratio.

#### Parameters
- `color` {string} A string representing a color value in the form of a hexadecimal (without the leading '#').
- `color` {string} A string representing a color value in the form of a hexadecimal (without the leading '#').

#### Example
```twig
{% set results = color_contrast(color, 'ffffff') %}
{# Compares accessibility compliance of `color` with white #}

{% set results = color_contrast(color, '000000') %}
{# Compares accessibility compliance of `color` with black #}
```


