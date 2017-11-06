<?php

use Gregwar\Image\Image;
use Gregwar\Image\GarbageCollect;
use ColorThief\ColorThief;


/**
  * Handle garbage collection w/ the temp images generated locally
  */
// $lastRunLog = getcwd() . '/dist/last-run.log';

// if (file_exists($lastRunLog)) {
//   $lastRun = file_get_contents($lastRunLog);
//   if (time() - $lastRun >= 86400) {
//     //its been more than a day so run our cleanup task

//     // This could be a cron called each day @3:00AM for instance
//     // Removes all the files from ../cache that are more than 30 days
//     // old. A verbose output will explain which files are deleted
//     GarbageCollect::dropOldFiles(getcwd() .'/cache', 30, true);

//     //update lastrun.log with current time
//     file_put_contents($lastRunLog, time());
//   }
// } else {
//   // If this is the first time we're running our cleanup task, create the initial cache file
//   file_put_contents($lastRunLog, time());
// }


$function = new Twig_SimpleFunction('bgcolor', function ($relativeImagePath){
  if (!function_exists('rgb2hex')) {
    function rgb2hex($rgb) {
      $hex = "#";
      $hex .= str_pad(dechex($rgb[0]), 2, "0", STR_PAD_LEFT);
      $hex .= str_pad(dechex($rgb[1]), 2, "0", STR_PAD_LEFT);
      $hex .= str_pad(dechex($rgb[2]), 2, "0", STR_PAD_LEFT);
      return $hex; // returns the hex value including the number sign (#)
    }
  }

  
  $publicDir = __DIR__ . '/../../../../../dist';
  $absoluteImagePath = $publicDir . $relativeImagePath;

  if(file_exists($absoluteImagePath)){
    $fileExt = pathinfo($absoluteImagePath, PATHINFO_EXTENSION);

    if (($fileExt != "jpg") && ($fileExt != "png")){ // Skip over non-jpg or png files.
      return;
    }

    // Resize and optimize the image before running through ColorThief
    $resizedImage = \Gregwar\Image\Image::open($absoluteImagePath)->resize('640,640')->jpeg($quality = 50);
      $color = ColorThief::getColor($resizedImage, 5);
      return rgb2hex($color);
    // }
  } else {
    return;
  }
});

?>
