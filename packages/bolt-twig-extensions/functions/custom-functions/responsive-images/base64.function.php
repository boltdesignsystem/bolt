<?php

use Gregwar\Image\Image;
use PHPExif\Exif;
use PHPExif\Reader\Reader as ExifReader;

$function = new Twig_SimpleFunction('base64', function ($relativeImagePath) {

  // if (class_exists('Drupal')) {
  //   $filePath = getcwd() . $fileName;

  //   if (file_exists($filePath)) {
  //     $fileExtension = substr(strrchr($fileName,'.'),1);

  //     if ($fileExtension == 'png') {
  //       $tempb64 = Image::open($filePath)
  //         ->resize('32,32')
  //         ->smooth('5')
  //         ->guess($quality = 50);
  //     }
  //     else {
  //       $tempb64 = Image::open($filePath)
  //         ->resize('32,32')
  //         ->smooth('5')
  //         ->jpeg($quality = 50);
  //     }

  //     return Image::open($tempb64)->inline();
  //   }
  // }
  // else {
  $publicDir = '/bolt-website';
  $absoluteImagePath = getcwd() . $publicDir . $relativeImagePath;

  if(file_exists($absoluteImagePath)){
    $fileExt = pathinfo($absoluteImagePath, PATHINFO_EXTENSION);

    if (($fileExt != "jpg") && ($fileExt != "png")){ 
      return; // Skip over non-jpg or png files.
    }

    $base64ImagePlaceholder = Image::open($absoluteImagePath)->resize('16,16')->smooth('1')->jpeg($quality = 50);
    
    return Image::open($base64ImagePlaceholder)->inline();
  }
});
