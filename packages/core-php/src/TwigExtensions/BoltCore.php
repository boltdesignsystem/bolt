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
      Bolt\TwigFunctions::pattern_template(),
      Bolt\TwigFunctions::publicpath(),
      Bolt\TwigFunctions::base64(),
      Bolt\TwigFunctions::bgcolor(),
      Bolt\TwigFunctions::ratio(),
    ];
  }

  public function getFilters() {
    return [
      Bolt\TwigFilters::json_decode(),
    ];
  }

  public function getTokenParsers() {
    return [
      Bolt\TwigTags::grid_tag(),
      Bolt\TwigTags::cell_tag()
    ];
  }
}
