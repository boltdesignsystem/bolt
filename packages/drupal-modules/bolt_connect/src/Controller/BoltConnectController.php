<?php

namespace Drupal\bolt_connect\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\StreamWrapper\PublicStream;

class BoltConnectController extends ControllerBase {

  public function customPage() {
    /** @var \Twig\Environment $twig */
    $twig = \Drupal::service('twig');
    $boltCoreEnabled = $twig->hasExtension('\Bolt\TwigExtensions\BoltCore');

    $functions = [];
    $filters = [];

    if ($boltCoreEnabled) {
      $boltCore = $twig->getExtension('\Bolt\TwigExtensions\BoltCore');
      $boltCore->initRuntime($twig);
      $boltData = $boltCore->data;

      // kint($boltCore);

      /**
       * @var $function \Twig_SimpleFunction
       */
      foreach ($boltCore->getFunctions() as $function) {
        $functions[] = [
          'name' => $function->getName(),
        ];
      }

      /**
       * @var $function \Twig_SimpleFilter
       */
      foreach ($boltCore->getFilters() as $filter) {
        $filters[] = [
          'name' => $filter->getName(),
        ];
      }
    }

    $config = \Drupal::config('bolt_connect.settings');
    $twig_namespaces = \Drupal::service('bolt_connect.twig_namespaces');

    $namespaces = [];
    foreach ($twig_namespaces->getNamespaces() as $namespace) {
      $namespaces[$namespace]['paths'] = $twig_namespaces->getPaths($namespace);
    }

    return [
      '#theme' => 'bolt_info_page',
      '#namespaces' => $namespaces,
      '#functions' => $functions,
      '#filters' => $filters,
    ];

  }

}
