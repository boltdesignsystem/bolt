<?php

namespace Drupal\bolt_connect;

use \BasaltInc\TwigTools;
use \Webmozart\PathUtil\Path;

class BoltConnectTwigNamespaces extends \Twig_Loader_Filesystem {
  public $twigLoaderConfig = [];

  public function __construct() {
    $config = \Drupal::config('bolt_connect.settings');

    if ($config->get('twig_namespaces_file_path') === '') {// @todo Better conditional
      drupal_set_message('Bolt Twig Namespaces cannot register', 'warning');
      return;
    }

    try {
      $namespacePathRoot = Path::join(DRUPAL_ROOT, dirname($config->get('boltrc_file_path')));
      $filePath = Path::join(DRUPAL_ROOT, $config->get('twig_namespaces_file_path'));
      $fileData = TwigTools\Utils::getData($filePath);

      $this->twigLoaderConfig = TwigTools\Namespaces::buildLoaderConfig($fileData, $namespacePathRoot);

      foreach ($this->twigLoaderConfig as $key => $value) {
        foreach ($value['paths'] as $path) {
          if (file_exists($path)) {
            $this->addPath($path, $key);
          } else {
            $message = 'Twig Namespace path does not exist: ' . $path;
            \Drupal::logger('bolt_connect')->warning($message);
            drupal_set_message($message, 'error');
          }
        }
      }

    } catch (Exception $exception) {
      $errorMsg = 'Error adding Twig Namespaces from: ' . $filePath;
      \Drupal::logger('bolt_connect')->error($errorMsg);
      drupal_set_message($errorMsg, 'error');
    }
  }

}
