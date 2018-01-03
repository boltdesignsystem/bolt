<?php
$function = new Twig_SimpleFunction('deep_replace', function ($param1, $param2) {
  // $result = array_merge_recursive( $param1, $param2 );
  $result = array_replace_recursive( $param1, $param2 );
  return $result;
});