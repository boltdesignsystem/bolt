<?php

$function = new \Twig_SimpleFunction('publicpath', function ($fileName) {
  if (function_exists('drupal_get_path')) {
    return '/' . drupal_get_path('theme', 'bolt') . '/public/' . $fileName;
  }
  else {
    return $fileName;
  }
});
