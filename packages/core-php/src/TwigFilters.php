<?php

namespace Bolt;

use \Twig_SimpleFilter;

class TwigFilters {

  public static function markdown() {
    return new Twig_SimpleFilter('markdown', function($string) {
      return Utils::convertMarkdown($string);
    });
  }

  public static function json_decode() {
    return new Twig_SimpleFilter('json_decode', function ($json) {
      return json_decode($json, true);
    });
  }
}
