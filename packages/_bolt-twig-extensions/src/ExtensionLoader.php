<?php

namespace Pega\TwigExtensions;

/**
 * Loads twig customizations from a dist directory.
 */
class ExtensionLoader {

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
    foreach (scandir(__DIR__ . '/../dist/' . $type) as $file) {
      if ($file[0] != '.' && $file[0] != '_') {
        static::load($type, __DIR__ . '/../dist/' . $type . '/' . $file);
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
            self::$objects['parsers'][] = new $class();
          }
        }
        break;
    }
  }
}

