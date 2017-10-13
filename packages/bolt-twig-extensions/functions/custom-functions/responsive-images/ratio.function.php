<?php

$function = new Twig_SimpleFunction('ratio', function ($fileName, $heightOrWidthRatio = 'width') {
  $filePath = getcwd() . '/bolt-website' . $fileName;
  
  if (file_exists($filePath)){
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
    } else if (($fileExt == "jpg") || ($fileExt == "png")){
      // Get the dimensions of the image
      $size = getimagesize($filePath);

      if ($heightOrWidthRatio == 'width'){
        return $size[0];
      } else {
        return $size[1];
      }
    }
  } else {
    // $ratio = '56.251';
  }
});
