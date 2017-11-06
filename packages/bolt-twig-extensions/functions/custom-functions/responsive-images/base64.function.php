<?php

use Gregwar\Image\Image;
use PHPExif\Exif;
use PHPExif\Reader\Reader as ExifReader;

$function = new Twig_SimpleFunction('base64', function ($relativeImagePath) {

  $publicDir = __DIR__ . '/../../../../../dist';
  $absoluteImagePath = $publicDir . $relativeImagePath;

  if(file_exists($absoluteImagePath)){
    $fileExt = pathinfo($absoluteImagePath, PATHINFO_EXTENSION);

    if (($fileExt != "jpg") && ($fileExt != "png")){ 
      return; // Skip over non-jpg or png files.
    }

    $base64ImagePlaceholder = Image::open($absoluteImagePath)->resize('16,16')->smooth('1')->jpeg($quality = 50);
    
    return Image::open($base64ImagePlaceholder)->inline();
  }
});
