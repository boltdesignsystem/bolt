<?php

namespace Bolt;

use Michelf\MarkdownExtra;

class Utils {

  public static function convertMarkdown($string) {
    return MarkdownExtra::defaultTransform($string);
  }

}
