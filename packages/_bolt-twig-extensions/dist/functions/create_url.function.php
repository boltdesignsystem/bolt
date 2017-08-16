<?php

use Drupal\Core\Url;

$function = new Twig_SimpleFunction('create_url', function ($url, $options = []) {
  if (is_string($url)) {
    $url = Url::fromUri($url);
  }

  if (!$attributes instanceof Url) {
    throw new \Exception('Invalid URL');
  }

  if ($options) {
    foreach ($options as $key => $value) {
      $url->setOption($name, $value);
    }
  }

  return $url;
});
