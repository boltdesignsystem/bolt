<?php

use Gregwar\Image\Image;
use Gregwar\Image\GarbageCollect;


/**
  * Handle garbage collection w/ the temp images generated locally
  */
$lastRunLog = getcwd() . '/dist/last-run.log';

if (file_exists($lastRunLog)) {
  $lastRun = file_get_contents($lastRunLog);
  if (time() - $lastRun >= 86400) {
    //its been more than a day so run our cleanup task

    // This could be a cron called each day @3:00AM for instance
    // Removes all the files from ../cache that are more than 30 days
    // old. A verbose output will explain which files are deleted
    GarbageCollect::dropOldFiles(getcwd() .'/cache', 30, true);

    //update lastrun.log with current time
    file_put_contents($lastRunLog, time());
  }
} else {
  // If this is the first time we're running our cleanup task, create the initial cache file
  file_put_contents($lastRunLog, time());
}


$function = new Twig_SimpleFunction('bgcolor', function ($relativeImagePath){

  $publicDir = '/dist';
  $absoluteImagePath = getcwd() . $publicDir . $relativeImagePath;

  if (!function_exists('rgb2hexAlt')) {
    function rgb2hexAlt($rgb) {
      return '#' . sprintf('%02X%02X%02X', $rgb['r'], $rgb['g'], $rgb['b']);
    }
  }


  if(file_exists($absoluteImagePath)){
    $fileExt = pathinfo($absoluteImagePath, PATHINFO_EXTENSION);

    if (($fileExt != "jpg") && ($fileExt != "png")){ // Skip over non-jpg or png files.
      return;
    }

    // If this isn't a production compile, let's not do this long very memory intensive process.
    // `$_SERVER` holds Environmental Variables
    if (isset($_SERVER['NODE_ENV']) && $_SERVER['NODE_ENV'] === 'production') {
      // Read image file with Gregwar to cache resize before getting average color
      $resizedImage = \Gregwar\Image\Image::open($absoluteImagePath)->resize('16,16')->guess();
      $image = new Imagick($resizedImage);
      $image->resizeImage(1, 1, Imagick::FILTER_CATROM, 1);
      $pixel = $image->getImagePixelColor(0,0);
      $rgb = $pixel->getColor();

      return rgb2hexAlt($rgb);
    }
  } else {
    return;
  }
});

?>
