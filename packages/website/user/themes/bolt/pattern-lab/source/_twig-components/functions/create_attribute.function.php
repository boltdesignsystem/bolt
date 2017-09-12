<?php

use Drupal\Core\Template\Attribute;

$function = new Twig_SimpleFunction('create_attribute', function ($attributes) {
  return is_array($attributes) ? new Attribute($attributes) : $attributes;
});
