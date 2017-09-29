<?php
namespace Grav\Plugin;

use Grav\Common\Plugin;
use RocketTheme\Toolbox\Event\Event;
use Symfony\Component\Finder\Finder;

/**
 * Class TwigExtensionsPlugin
 * @package Grav\Plugin
 */
class PatternLabTwigExtensionsPlugin extends Plugin {

  /** @var array */
  static $objects = [];

  /**
   * @return array
   *
   * The getSubscribedEvents() gives the core a list of events
   *     that the plugin wants to listen to. The key of each
   *     array section is the event that the plugin listens to
   *     and the value (in the form of an array) contains the
   *     callable (or function) as well as the priority. The
   *     higher the number the higher the priority.
   */
  public static function getSubscribedEvents()
  {
    return [
      'onPluginsInitialized' => ['onPluginsInitialized', 0]
    ];
  }

  /**
   * Initialize the plugin
   */
  public function onPluginsInitialized()
  {
      // Don't proceed if we are in the admin plugin
      if ($this->isAdmin()) {
          return;
      }

      // Enable the main event we are interested in
      $this->enable([
          'onTwigExtensions' => ['onTwigExtensions', -100],
      ]);
  }

  /**
   * Loads a singleton registry of plugin objects.
   */
  public function onTwigExtensions()
  {
      $modules = $this->grav['config']->get('plugins.patternlab-twig-extensions.extensions');

      // if (!self::$objects) {
      //   static::loadAll('filters');
      //   static::loadAll('functions');
      //   static::loadAll('tags');
      // }

      // if (in_array('intl', $modules)) {
      //     require_once(__DIR__ . '/vendor/Twig/Intl.php');
      //     $this->grav['twig']->twig->addExtension(new \Twig_Extensions_Extension_Intl());
      // }
      if (in_array('extension_loader', $modules)) {
          require_once(__DIR__ . '/src/TwigExtension/TwigExtensionAdapter.php');
          $this->grav['twig']->twig->addExtension(new \Twig_Extensions_Extension_Adapter());
      }
      // if (in_array('date', $modules)) {
      //     require_once(__DIR__ . '/vendor/Twig/Date.php');
      //     $this->grav['twig']->twig->addExtension(new \Twig_Extensions_Extension_Date());
      // }




  }


  //
  // /**
  //  * Gets all plugin objects of a given type.
  //  *
  //  * @param string $type
  //  *   The plugin type to load.
  //  *
  //  * @return array
  //  *   An array of loaded objects to be provided by the twig extension for a
  //  *   given type.
  //  */
  // static public function get($type) {
  //   return !empty(self::$objects[$type]) ? self::$objects[$type] : [];
  // }
  // /**
  //  * Loads all plugins of a given type.
  //  *
  //  * This should be called once per $type.
  //  *
  //  * @param string $type
  //  *   The type to load all plugins for.
  //  */
  // static protected function loadAll($type) {
  //   $themeLocation = $this->grav['locator']->findResources('theme://')[0];
  //   $themePath = $themeLocation . '/*/_twig-components/';
  //   // $themeLocation = drupal_get_path('theme', $theme);
  //
  //   $extensionPaths = new Finder();
  //   $extensionPaths->directories()->depth(0)->in($themePath);
  //
  //   // $themeLocation = $this->grav['locator']->findResources('theme://')[0];
  //   // $patternLabTwigExtensions = $theme_dir . '/pattern-lab/source/_twig-components';
  //
  //   foreach ($extensionPaths as $extensionPath) {
  //     $fullPath = $extensionPath;
  //     print $fullPath;
  //
  //     foreach (scandir($fullPath . $type) as $file) {
  //       $fileInfo = pathinfo($file);
  //       if ($fileInfo['extension'] === 'php') {
  //         if ($file[0] != '.' && $file[0] != '_' && substr($file, 0, 3) != 'pl_') {
  //           static::load($type, $fullPath . $type . '/' . $file);
  //         }
  //       }
  //     }
  //   }
  // }
  // /**
  //  * Loads a specific plugin instance.
  //  *
  //  * @param string $type
  //  *   The type of the plugin to be loaded.
  //  * @param string $file
  //  *   The fully qualified path of the plugin to be loaded.
  //  */
  // static protected function load($type, $file) {
  //   include $file;
  //   switch ($type) {
  //     case 'filters':
  //       self::$objects['filters'][] = $filter;
  //       break;
  //     case 'functions':
  //       self::$objects['functions'][] = $function;
  //       break;
  //     case 'tags':
  //       if (preg_match('/^([^\.]+)\.tag\.php$/', basename($file), $matches)) {
  //         $class = "Project_{$matches[1]}_TokenParser";
  //         if (class_exists($class)) {
  //           self::$objects['parsers'][] = new $class();
  //         }
  //       }
  //       break;
  //   }
  // }
}
