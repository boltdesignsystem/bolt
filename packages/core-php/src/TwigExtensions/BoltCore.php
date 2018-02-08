<?php

namespace Bolt\TwigExtensions;

use Bolt;
use Twig_Extension;
use Twig_ExtensionInterface;
use BasaltInc\TwigTools;

class BoltCore extends Twig_Extension implements Twig_ExtensionInterface {

  public function getFunctions() {
    return [
      TwigTools\TwigFunctions::get_data(),
      TwigTools\TwigFunctions::validate_data_schema(),
    ];
  }

  public function getFilters() {
    return [
      Bolt\TwigFilters::json_decode(),
    ];
  }

}
