<?php

namespace Bolt;

class TwigFunctions {

  /**
   * @param \Twig_Environment $env
   * @param {string} $twigPath - Like `@namespace/file.json`
   * @return array - `file.json` turned into data
   * @throws \Exception
   */
  public static function getData(\Twig_Environment $env, $twigPath) {
    $full_path = Util::resolveTwigPath($env, $twigPath);
    $file_data = Util::getDataFile($full_path);
    return $file_data;
  }


}
