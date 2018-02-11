<?php

namespace Bolt;

require __DIR__ . '/../vendor/autoload.php';

use Bolt\Layout\GridTagTokenParser;
use Bolt\Layout\GridCellTokenParser;
use \Twig_SimpleFunction;


class TwigTags {

  public static function grid_tag() {
    return new GridTagTokenParser();
  }

  public static function cell_tag() {
    return new GridCellTokenParser();
  }
}
