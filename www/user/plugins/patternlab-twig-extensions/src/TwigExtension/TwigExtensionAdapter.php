<?php
//use PatternLab\TwigExtensionLoader;
// namespace Drupal\unified_twig_ext\TwigExtension;
require 'TwigExtensionLoader.php';
// use PatternLab\TwigExtensionLoader;

// use Drupal\unified_twig_ext\TwigExtension\ExtensionLoader;


// namespace Drupal\unified_twig_ext\TwigExtension;
/**
 * Adapts pattern-lab extensions to Drupal.
 */
class Twig_Extensions_Extension_Adapter extends Twig_Extension {
    // /**
    //  * {@inheritdoc}
    //  */
    // public function getFilters()
    // {
    //     $filters = array(
    //          new Twig_SimpleFilter('shuffle', 'twig_shuffle_filter'),
    //     );
    //
    //     return $filters;
    // }
    //
    // /**
    //  * {@inheritdoc}
    //  */
    // public function getName()
    // {
    //     return 'array';
    // }
    /**
   * Creates the adapter twig extension.
   *
   * This will load from the default pattern-lab twig extension locations.
   */
  public function __construct() {
    TwigExtensionLoader::init();
  }
  /**
   * {@inheritdoc}
   */
  public function getFunctions() {
    return TwigExtensionLoader::get('functions');
  }
  /**
   * {@inheritdoc}
   */
  public function getFilters() {
    return TwigExtensionLoader::get('filters');
  }
  /**
   * {@inheritdoc}
   */
  public function getTokenParsers() {
    return TwigExtensionLoader::get('parsers');
  }
  /**
   * {@inheritdoc}
   */
  public function getName() {
    return 'twig_extension_adapter';
  }
}

// /**
//  * Shuffles an array.
//  *
//  * @param array|Traversable $array An array
//  *
//  * @return array
//  */
// function twig_shuffle_filter($array, $associative = false)
// {
//     if ($array instanceof Traversable) {
//         $array = iterator_to_array($array, false);
//     }
//
//     if($associative) {
//         $keys = array_keys($array);
//         shuffle($keys);
//
//         foreach($keys as $key) {
//             $new[$key] = $array[$key];
//         }
//         $array = $new;
//     }
//     else {
//         shuffle($array);
//     }
//
//     return $array;
// }
