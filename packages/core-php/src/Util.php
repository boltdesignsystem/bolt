<?php

namespace Bolt;

use Symfony\Component\Yaml\Yaml;

class Util {

  /**
   * @param {string} $full_path - Absolute path to a JSON or Yaml file
   * @return array - Data file decoded
   * @throws \Exception
   */
  public static function getDataFile($full_path) {
    $file_data = [];

    if ($full_path !== '' && file_exists($full_path)) {
      $file_string = file_get_contents($full_path);
      $file_type = pathinfo($full_path)['extension'];

      switch ($file_type) {
        case 'json':
          $file_data = json_decode($file_string, true);
          break;
        case 'yaml' || 'yml':
          $file_data = Yaml::parse($file_string);
          break;
      }
    } else {
      throw new \Exception('Cannot find file when trying to run get_file_data: ' . $full_path);
    }
    return $file_data;
  }

  /**
   * @param {Twig_Environment} $env
   * @param {string} $templateName
   * @return {string} $full_path - Full path to where the Twig file resides
   * @throws \Exception
   */
  public static function resolveTwigPath(\Twig_Environment $env, $templateName) {
    /**
     * @var \Twig_Template $template
     * @url https://twig.symfony.com/api/1.x/Twig_Template.html
     * */
    $template = $env->resolveTemplate($templateName);

    /**
     * @var \Twig_Source $source
     * @url https://twig.symfony.com/api/1.x/Twig_Source.html
     */
    $source = $template->getSourceContext();

    /** @var string $full_path */
    $full_path = $source->getPath();
    if (!file_exists($full_path)) {
      throw new \Exception('Resolve Twig File does not exist, given `' . $templateName . '`, found path `' . $full_path . '`.');
    }
    return $full_path;
  }

}
