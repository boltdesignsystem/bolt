<?php

use Gregwar\Image\Image;
use PHPExif\Exif;
use PHPExif\Reader\Reader as ExifReader;

$function = new Twig_SimpleFunction('base64', function ($fileName) {

  if (class_exists('Drupal')) {
    $filePath = getcwd() . $fileName;

    if (file_exists($filePath)) {
      $fileExtension = substr(strrchr($fileName,'.'),1);

      if ($fileExtension == 'png') {
        $tempb64 = Image::open($filePath)
          ->resize('32,32')
          ->smooth('5')
          ->guess($quality = 50);
      }
      else {
        $tempb64 = Image::open($filePath)
          ->resize('32,32')
          ->smooth('5')
          ->jpeg($quality = 50);
      }

      return Image::open($tempb64)->inline();
    }
  }
  else {
    $documentRoot = trim(getcwd(), "pattern-lab") . '/source/';
    $newfileName = str_replace('/images', 'images', $fileName);
    $filePath = $documentRoot . $newfileName;


    if (file_exists($filePath)){
      $tempb64 = Image::open($filePath)->resize('16,16')->smooth('1')->jpeg($quality = 50);
      
      return Image::open($tempb64)->inline();
    }
  }
  
});
