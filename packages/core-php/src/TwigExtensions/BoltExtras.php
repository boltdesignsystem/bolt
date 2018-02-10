<?php

namespace Bolt\TwigExtensions;

use Bolt;
use Twig_Extension;
use Twig_ExtensionInterface;
use BasaltInc\TwigTools;

class BoltExtras extends Twig_Extension implements Twig_ExtensionInterface {

  public function getFunctions() {
    return [
      TwigTools\TwigFunctions::console_log(),
      Bolt\TwigFunctions::deep_merge(),
    ];
  }

  public function getFilters() {
    return [
      Bolt\TwigFilters::markdown(),
      Bolt\TwigFilters::rgb2hex(),
    ];
  }

}
