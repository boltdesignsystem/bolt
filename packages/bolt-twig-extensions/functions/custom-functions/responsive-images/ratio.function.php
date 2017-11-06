<?php

$function = new Twig_SimpleFunction('ratio', function ($fileName, $heightOrWidthRatio = 'width') {
  $filePath = __DIR__ . '/../../../../../dist' . $fileName;
  
  if (file_exists($filePath)){
    $fileExt = pathinfo($filePath, PATHINFO_EXTENSION);
    
    if ($fileExt == "svg"){
      $svgfile = simplexml_load_file($filePath);
      
      $viewport = explode(" ", $svgfile['viewBox']);
      $svgHeight = $svgfile['height']; // if it exists
      $svgWidth = $svgfile['width']; // if it exists
      $height = '';
      $width = '';
      
      // If the SVG height / width values exist, use those first
      if ($svgHeight && $svgWidth) {
        $height = $svgHeight;
        $width = $svgWidth;

      // Otherwise try to calculate the aspect ratio via the viewport
      } else if ($viewport[3] && $viewport[2]){
        $height = $viewport[3];
        $width = $viewport[2];
      }
      
      // Only return a ratio value if we have the data to back it up
      if ($height != '' && $width != ''){
        if ($heightOrWidthRatio == 'width'){
          return $width;
        } else {
          return $height;
        }
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
