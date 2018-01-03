<?php

$filter = new Twig_SimpleFilter('deep_replace', function ($param1, $param2) {
  $result = array_replace_recursive( $param1, $param2 );
  return $result;
});
