<?php

namespace Bolt\TwigExtensions;

use Twig_Extension;
use Twig_ExtensionInterface;
use Twig_SimpleFunction;

class BoltCore extends Twig_Extension implements Twig_ExtensionInterface {

  public function getFunctions() {
    return [
      new Twig_SimpleFunction('get_data', 'Bolt\TwigFunctions::getData', [
        'needs_environment' => true,
      ]),
    ];
  }

}
