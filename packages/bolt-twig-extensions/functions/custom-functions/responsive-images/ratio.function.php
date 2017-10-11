<?php

$function = new Twig_SimpleFunction('ratio', function ($fileName, $heightOrWidthRatio = 'width') {

  // if (class_exists('Drupal')) {
  //       $filePath = getcwd() . $fileName;

  //       if (file_exists($filePath)){
  //         $path_parts = pathinfo($filePath);
      
  //         if (isset($path_parts['extension']) && $path_parts['extension'] == "svg") {
  //           $svgfile = simplexml_load_file($filePath);
        
  //           $viewport = explode(" ", $svgfile['viewBox']);
  //           $height = $viewport[3];
  //           $width = $viewport[2];
  //           $ratio = (($height / $width) * 100);
  //         } elseif (!empty($fileName)) {
  //           // Get the dimensions of the image
  //           $size = getimagesize($filePath);
  //           $ratio = (($size[1] / $size[0]) * 100);
  //         }
  //         else {
  //           $ratio = '';
  //         }
  //       } else {
  //         $ratio = '56.251';
  //       }
  
  //       return $ratio . '%';
  // }
  // else {
  
  // $documentRoot = trim(getcwd(), "pattern-lab") . '/source';
  $filePath = getcwd() . '/bolt-website' . $fileName;
  
  
  
  if (file_exists($filePath)){
    // echo $filePath;
    $fileExt = pathinfo($filePath, PATHINFO_EXTENSION);
    
    if ($fileExt == "svg"){
      $svgfile = simplexml_load_file($filePath);
      
      $viewport = explode(" ", $svgfile['viewBox']);
      
      $height = $viewport[3];
      $width = $viewport[2];

      if ($heightOrWidthRatio == 'width'){
        return $width;
      } else {
        return $height;
      }
      // return $height . '/' . $width;
      
      // $ratio = (($height / $width) * 100);

    } else if (($fileExt == "jpg") || ($fileExt == "png")){
      // Get the dimensions of the image

      $size = getimagesize($filePath);

      if ($heightOrWidthRatio == 'width'){
        return $size[0];
      } else {
        return $size[1];
      }
      // $ratio = (($size[1] / $size[0]) * 100);
      // return '--aspect-ratio-h: ' .  . '/' . $size[1];
    }
  } else {
    // $ratio = '56.251';
  }
  
  // return $ratio . '%';

  // }
});
