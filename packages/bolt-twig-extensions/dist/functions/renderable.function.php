<?php

$function = new Twig_SimpleFunction('renderable', function ($x) {

  // See https://www.drupal.org/docs/8/api/render-api/render-arrays
  $hints = [
    '#type',
    '#cache',
    '#markup',
    '#plain_text',
    '#prefix',
    '#suffix',
    '#pre_render',
    '#post_render',
    '#theme_wrappers',
  ];

  foreach ($hints as $hint) {
    if (isset($x[$hint])) {
      return true;
    }
  }

  return false;
});
