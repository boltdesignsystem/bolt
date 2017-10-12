<?php


$function = new Twig_SimpleFunction('imagesize', function ($fileName) {

  // if (class_exists('Drupal')) {
  //   if (function_exists('drupal_get_path')) {
  //     $documentRoot = DRUPAL_ROOT . '/' . drupal_get_path('theme', 'pegakit');
  //   }
  //   else {
  //     $documentRoot = getcwd();
  //   }
  //   $documentRoot .= '/source/';

  //   $newfileName = str_replace('/images', 'images', $fileName);
  //   $filePath = $documentRoot . $newfileName;

  //   if (file_exists($filePath) && !empty($fileName)){
  //     $size = getimagesize($filePath);
      
  //     return ($size[0]);
  //   }
  // }
  // else {
  if (!function_exists('debug_to_console')){
    function debug_to_console( $data ) {
      $output = $data;
      if ( is_array( $output ) )
      $output = implode( ',', $output);

      echo "<script>console.log( 'Debug Objects: " . $output . "' );</script>";
    }
  }


  $filePath = getcwd() . '/bolt-website' . $fileName;
  if (file_exists($filePath)){
    // debug_to_console( $filePath );
    $size = getimagesize($filePath);
    return ($size[0]);
  }
    // $documentRoot = trim(getcwd(), "pattern-lab") . '/source';

    // $newfileName = str_replace('/images', 'images', $fileName);
    // $filePath = $documentRoot . '/' . $newfileName;
  
    // if (file_exists($filePath)){
      
    
      
  // }
    
});
