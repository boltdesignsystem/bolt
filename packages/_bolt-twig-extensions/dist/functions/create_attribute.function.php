<?php

use Drupal\Core\Template\Attribute;

$function = new Twig_SimpleFunction('create_attribute', function ($attributes) {
  if (!empty($attributes)) {
    $attributes = [];
  }

  if (is_array($attributes)) {
    $attributes = new Attributes($attributes);
  }

  if (!$attributes instanceof Attribute) {
    throw new \Exception('Invalid attributes');
  }

  return $attributes;
});
