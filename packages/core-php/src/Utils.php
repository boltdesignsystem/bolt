<?php

namespace Bolt;

use Michelf\MarkdownExtra;

class Utils {

  /**
   * Markdown to HTML
   * @param $string - String of Markdown
   * @return string - HTML from Markdown
   */
  public static function convertMarkdown($string) {
    return MarkdownExtra::defaultTransform($string);
  }

  /**
   * Dashes to camelCase string converter
   * @param $string - Takes something like `my-cool-string`
   * @return string - Returns `myCoolString`
   */
  public static function dashesToCamelCase($string) {
    $str = str_replace('-', '', ucwords($string, '-'));
    return lcfirst($str);
  }

}
