<?php

$filter = new Twig_SimpleFilter('without', function ($element) {
  if ($element instanceof ArrayAccess) {
    $filtered_element = clone $element;
  }
  else {
    $filtered_element = $element;
  }
  $args = func_get_args();
  unset($args[0]);
  foreach ($args as $arg) {
    if (isset($filtered_element[$arg])) {
      unset($filtered_element[$arg]);
    }
  }
  return $filtered_element;
});
