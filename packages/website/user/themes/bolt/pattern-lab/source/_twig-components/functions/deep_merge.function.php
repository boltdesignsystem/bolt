<?php

  // if (function_exists('deepMerge') == false) {
  //   function deepMerge($a, &$new) {
  //     foreach($a as $kA1 => $vA1) {
  //       if (!isset($new[$kA1])) {
  //         $new[$kA1] = $vA1;
  //       }
  //       if (is_array($vA1) && is_array($new[$kA1])) {
  //         deepMerge($vA1, $new[$kA1]);
  //       }
  //     }
  //   }
  // }

$function = new Twig_SimpleFunction('deep_merge', function ($param1, $param2) {

    
    $result = array_replace_recursive( $param1, $param2 );
    
    print_r($result);
 
    return $result;

});