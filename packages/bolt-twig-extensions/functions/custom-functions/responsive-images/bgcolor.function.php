<?php

use Gregwar\Image\Image;
use Gregwar\Image\GarbageCollect;
use ColorThief\ColorThief;


/**
  * Handle garbage collection w/ the temp images generated locally
  */
$lastRunLog = getcwd() . '/bolt-website/last-run.log';
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


  if (!function_exists('rgb2hex')) {
    function rgb2hex($rgb) {
      $hex = "#";
      $hex .= str_pad(dechex($rgb[0]), 2, "0", STR_PAD_LEFT);
      $hex .= str_pad(dechex($rgb[1]), 2, "0", STR_PAD_LEFT);
      $hex .= str_pad(dechex($rgb[2]), 2, "0", STR_PAD_LEFT);
      return $hex; // returns the hex value including the number sign (#)
    }
  }

  
  $publicDir = '/bolt-website';
  $absoluteImagePath = getcwd() . $publicDir . $relativeImagePath;

  if(file_exists($absoluteImagePath)){
    $fileExt = pathinfo($absoluteImagePath, PATHINFO_EXTENSION);

    if (($fileExt != "jpg") && ($fileExt != "png")){ // Skip over non-jpg or png files.
      return;
    }

    // Resize and optimize the image before running through ColorThief
    $resizedImage = \Gregwar\Image\Image::open($absoluteImagePath)->resize('640,640')->jpeg($quality = 50);
    
    // if ($colorOrGradient == 'gradient'){
      // $palette = ColorThief::getPalette($resizedImage, 4, 5);
      // // $gradients = array();
      // // // print_r($palette);
      
      // // foreach ($palette as $color) {
      //   //   $gradients[] = rgb2hex($color);
      //   // }
      //   return 'yay';
      //   return $palette;
      //   // return $gradients;
        
      // } else {
      $color = ColorThief::getColor($resizedImage, 5);
      return rgb2hex($color);
    // }
  } else {
    return;
  }

  // if (!function_exists('getImage')){
  //   /* gets the contents of a file if it exists, otherwise grabs and caches */
  //   function getImage($filename, $url) {
  //     //vars
  //     //$current_time = time(); $expire_time = $hours * 60 * 60; $file_time = filemtime($file);
  //     //decisions, decisions
  //     if(file_exists(getcwd() . $imageDirectory . $file)) {
  //       //echo 'returning from cached file';
  //       return getcwd() . '/src/images/' . $filename;
  //     }
  //     else {
  //       $content = file_get_contents($url);
  //       // file_put_contents('/my/folder/flower.jpg', $content);
  //       file_put_contents(getcwd() . '/src/images/' . $filename, $content);
  //       // if($fn) { $content = $fn($content,$fn_args); }
  //       // $content.= '<!-- cached:  '.time().'-->';
  //       echo 'retrieved fresh from '.$url;
  //       return getcwd() . '/src/images/' . $filename;
  //     }
  //   }
  // }

  // if (!function_exists('is_path_remote')){
  //   function is_path_remote($path) {
  //     $my_host_names = array(
  //       'boltdesignsystem.com'
  //     );
  //     $host = parse_url($path, PHP_URL_HOST);
  //     if ($host === NULL || in_array($host, $my_host_names)) {
  //         return false;
  //     } else {
  //         return true;
  //     }
  //   }
  // }


  // // TODO: share this function w/ the publicpath.function.php file.
  // if (!function_exists('public_path')){
  //   function getPath($fileName){
  //      if (function_exists('drupal_get_path')) {
  //       $rootDirectory = '/bolt-website/images'
  //       return '/' . drupal_get_path('theme', 'bolt') . '/public/' . $fileName;
  //     }
  //   }
    
  //   else {
  //     return $fileName;
  //   }
  // }
 




//   if (class_exists('Drupal')) {

//         // return $filePath;
//         //

// //        if (!function_exists('rgb2hex')) {
// //          function rgb2hex($rgb) {
// //            $hex = "#";
// //            $hex .= str_pad(dechex($rgb[0]), 2, "0", STR_PAD_LEFT);
// //            $hex .= str_pad(dechex($rgb[1]), 2, "0", STR_PAD_LEFT);
// //            $hex .= str_pad(dechex($rgb[2]), 2, "0", STR_PAD_LEFT);
// //
// //            return $hex; // returns the hex value including the number sign (#)
// //          }
// //        }

//   $filePath = getcwd() . $fileName;
// //
// //
// //        $newfileName = str_replace('/images', 'images', $fileName);
// //
// //        $filePath = $documentRoot . $newfileName;

//         // $filePath = $documentRoot . $fileName;

//         if ($filePath !== '' && file_exists($filePath)) {
//           $color = ColorThief::getColor($filePath, 8);
//           $hex = $this->rgb2hex($color);
//           return $hex;
//         }

//         //return $hex;
//   }
//   else {

//     // $documentRoot = getcwd() . '/source';
//     // $filePath = $documentRoot . $fileName;
    
    
//     // $InstanceCache = CacheManager::getInstance('files');
//     // $key = $filePath . '_hex';
//     // $CachedHex = $InstanceCache->getItem($key);
    
//     if (!function_exists('rgb2hex')) {
//       function rgb2hex($rgb) {
//          $hex = "#";
//          $hex .= str_pad(dechex($rgb[0]), 2, "0", STR_PAD_LEFT);
//          $hex .= str_pad(dechex($rgb[1]), 2, "0", STR_PAD_LEFT);
//          $hex .= str_pad(dechex($rgb[2]), 2, "0", STR_PAD_LEFT);
    
//          return $hex; // returns the hex value including the number sign (#)
//       }
//     }
    
    // return $filePath;
  // 
  
  // $documentRoot = trim(getcwd(), "pattern-lab") . '/source/';
  // $newfileName = str_replace('/images', 'images', $fileName);
 
  // $filename = basename($image);
  
  
  // if (class_exists('Drupal')) {
  //   $imageDirectory = '/sites/default/files/';
  // } 
  // else if (is_path_remote($imageFilename)) {
  //   get_content($fileName, $imageFilename);
  // }

  // 
  


  // 
  // var_dump();


   
  

  // // $TWITTER_FOLLOWERS_FILE_NAME = 'twitter-followers.txt';
  // // $TWITTER_FOLLOWERS_URL = 'http://twitter.com/users/show.json?screen_name=davidwalshblog';

  // // $TWITTER_FOLLOWERS = get_content($TWITTER_FOLLOWERS_FILE_NAME,$TWITTER_FOLLOWERS_URL,3);

  // echo $imagePath;
  // print is_path_remote($imagePath);


  // return $imagePath;
  
  // SystemArchitect.jpg 385w
    
  
  // // $filePath = $documentRoot . $fileName;

  // if ($fileName !== '' && file_exists($filePath)) {
  //   $tempImg = \Gregwar\Image\Image::open($filePath)->resize('32,32')->jpeg($quality = 50);
  
  //   $color = ColorThief::getColor($tempImg, 7);
  //   $hex = rgb2hex($color);
  // }
  
  //   // if (is_null($CachedHex->get())) {
      
      
  //     // $cache->save($filePath . '_hex', $hex , 8640000);
      
  //     // $CachedHex->set($hex)->expiresAfter(3600);//in seconds, also accepts Datetime
  //     // $InstanceCache->save($CachedHex); // Save the cache item just like you do with doctrine and entities
      
  //     // $hex = $CachedHex->get();
  //   //   
  //   // } else {
  //   //   $hex = $CachedHex->get();
  //   // }
  
  //   if ($hex) {
  //     return $hex;
  //   }
  // }
});

?>
