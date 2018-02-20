<?php

namespace Bolt\Layout;

class BoltStringLoader {
  private $twig;

  function __construct() {
    $loader = new \Twig_Loader_String();
    $twig = new \Twig_Environment(($loader), [
      'debug' => true,
      'autoescape' => false,
    ]);
    $this->twig = $twig;
  }

  public function getInstance() {
    return $this->twig;
  }

  public function render($options = []) {
    return $this->twig->render($options['string'], $options['data']);
  }

}
