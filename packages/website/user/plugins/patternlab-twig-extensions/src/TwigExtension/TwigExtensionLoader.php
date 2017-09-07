<?php
// namespace Drupal\unified_twig_ext\TwigExtension\ExtensionLoader;
use Grav\Common\Grav;
/**
 * Loads twig customizations from a dist directory.
 */
class TwigExtensionLoader {
  /** @var array */
  static $objects = [];
  /**
   * Loads a singleton registry of plugin objects.
   */
  static public function init() {
    if (!self::$objects) {
      static::loadAll('filters');
      static::loadAll('functions');
      static::loadAll('tags');
    }
  }
  /**
   * Gets all plugin objects of a given type.
   *
   * @param string $type
   *   The plugin type to load.
   *
   * @return array
   *   An array of loaded objects to be provided by the twig extension for a
   *   given type.
   */
  static public function get($type) {
    return !empty(self::$objects[$type]) ? self::$objects[$type] : [];
  }
  /**
   * Loads all plugins of a given type.
   *
   * This should be called once per $type.
   *
   * @param string $type
   *   The type to load all plugins for.
   */
  static protected function loadAll($type) {
    $theme = Grav::instance()['locator']->findResources('theme://')[0];
    $themePath = $theme . '/' . 'pattern-lab/source';
    // $theme = \Drupal::config('system.theme')->get('default');
    // $themeLocation =
    // print_r($themePath);
    // $patternLabPatternsDir = $theme_dir . '/pattern-lab/source/_patterns';
    // $patternLabSourceDir = $theme_dir . '/pattern-lab/source';


    $extensionPaths = glob($themePath . '*/_twig-components/');

    // print_r($extensionPaths);

    foreach ($extensionPaths as $extensionPath) {
      $fullPath = $extensionPath;

      // print_r($fullPath);

      foreach (scandir($fullPath . $type) as $file) {
        $fileInfo = pathinfo($file);
        print_r($fileInfo['extension']);

        if ($fileInfo['extension'] === 'php') {
          if ($file[0] != '.' && $file[0] != '_' && substr($file, 0, 3) != 'pl_') {
            static::load($type, $fullPath . $type . '/' . $file);
          }
        }
      }
    }
  }
  /**
   * Loads a specific plugin instance.
   *
   * @param string $type
   *   The type of the plugin to be loaded.
   * @param string $file
   *   The fully qualified path of the plugin to be loaded.
   */
  static protected function load($type, $file) {
    include $file;

    switch ($type) {
      case 'filters':
        self::$objects['filters'][] = $filter;
        break;
      case 'functions':
        self::$objects['functions'][] = $function;
        break;
      case 'tags':
        if (preg_match('/^([^\.]+)\.tag\.php$/', basename($file), $matches)) {
          $class = "Project_{$matches[1]}_TokenParser";
          if (class_exists($class)) {
            print("yay!");
            self::$objects['parsers'][] = new $class();
          }
        }
        break;
    }
  }
}
