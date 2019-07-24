<?php

namespace Bolt;

use Bolt\Layout\GridTagTokenParser;
use Bolt\Layout\GridCellTokenParser;
use Bolt\SSR\SSRTagTokenParser;
use \Twig_SimpleFunction;


class TwigTags {

  public static function grid_tag() {
    return new GridTagTokenParser();
  }

  public static function cell_tag() {
    return new GridCellTokenParser();
  }

  // public static function ssr_tag() {
  //   return new SSRTagTokenParser();
  // }
}
