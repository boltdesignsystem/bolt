<?php

namespace Bolt\TwigExtensions;

use Bolt;
use Twig_Extension;
use Twig_ExtensionInterface;
use BasaltInc\TwigTools;

// Twig extensions for better Drupal / UI Patterns module compatibility
class BoltCoreCompat extends Twig_Extension implements Twig_ExtensionInterface {

  public function getFunctions() {
    return [
      Bolt\TwigFunctions::create_attribute(),
      Bolt\TwigFunctions::pattern_template(),
      Bolt\TwigFunctions::link(),
    ];
  }

  public function getFilters() {
    return [
      Bolt\TwigFilters::without(),
      Bolt\TwigFilters::t(),
    ];
  }

  public function getTokenParsers() {
    return [
      // Bolt\TwigTags::ssr_tag(),
    ];
  }
}
