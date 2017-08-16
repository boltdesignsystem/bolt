<?php

namespace Pega\TwigExtensions;

/**
 * Adapts pegakit's pattern-lab extensions to Drupal.
 */
class ExtensionAdapter extends \Twig_Extension {

  /**
   * Creates the adapter twig extension.
   *
   * This will load from the default pattern-lab twig extension locations.
   */
  public function __construct() {
    ExtensionLoader::init();
  }

  /**
   * {@inheritdoc}
   */
  public function getFunctions() {
    return ExtensionLoader::get('functions');
  }

  /**
   * {@inheritdoc}
   */
  public function getFilters() {
    return ExtensionLoader::get('filters');
  }

  /**
   * {@inheritdoc}
   */
  public function getTokenParsers() {
    return ExtensionLoader::get('parsers');
  }

  /**
   * {@inheritdoc}
   */
  public function getName() {
    return 'pegakit_ext_adapter';
  }

}
