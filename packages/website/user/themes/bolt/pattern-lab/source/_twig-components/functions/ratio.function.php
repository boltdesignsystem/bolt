<?php

$function = new Twig_SimpleFunction('ratio', function ($fileName) {

  if (class_exists('Drupal')) {
        $filePath = getcwd() . $fileName;

        if (file_exists($filePath)){
          $path_parts = pathinfo($filePath);
      
          if (isset($path_parts['extension']) && $path_parts['extension'] == "svg") {
            $svgfile = simplexml_load_file($filePath);
        
            $viewport = explode(" ", $svgfile['viewBox']);
            $height = $viewport[3];
            $width = $viewport[2];
            $ratio = (($height / $width) * 100);
          } elseif (!empty($fileName)) {
            // Get the dimensions of the image
            $size = getimagesize($filePath);
            $ratio = (($size[1] / $size[0]) * 100);
          }
          else {
            $ratio = '';
          }
        } else {
          $ratio = '56.251';
        }
  
        return $ratio . '%';
  }
  else {
  
  $documentRoot = trim(getcwd(), "pattern-lab") . '/source';
  $filePath = $documentRoot . $fileName;
  
  
  
  if (file_exists($filePath)){
    // echo $filePath;
    $path_parts = pathinfo($filePath);
    
    if ($path_parts['extension'] == "svg"){
      $svgfile = simplexml_load_file($filePath);
      
      $viewport = explode(" ", $svgfile['viewBox']);
      
      $height = $viewport[3];
      $width = $viewport[2];
      
      $ratio = (($height / $width) * 100);

    } else {
      // Get the dimensions of the image
      $size = getimagesize($filePath);
      $ratio = (($size[1] / $size[0]) * 100);
    }
  } else {
    $ratio = '56.251';
  }
  
  return $ratio . '%';

  }
});
