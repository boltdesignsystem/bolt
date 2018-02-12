<?php

namespace Bolt;

use \Twig_SimpleFunction;

class TwigFunctions {

  public static function deep_merge() {
    return new Twig_SimpleFunction('deep_merge', function($param1, $param2) {
      $result = array_merge_recursive( $param1, $param2 );
      // $result = array_replace_recursive( $param1, $param2 );
      return $result;
    });
  }

  public static function getSpacingScaleSequence() {
    return new Twig_SimpleFunction('getSpacingScaleSequence', function($context) {
      // Mainly just a demo for how to access the global `bolt` data.
      $data = $context['bolt']['data']['spacing']['scale'];
      $scaleValues = array_values($data);
      sort($scaleValues);
      return $scaleValues;
    }, [
      'needs_context' => true,
    ]);
  }

}
