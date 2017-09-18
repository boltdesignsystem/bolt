<?php

use ColorThief\ColorThief;

$function = new Twig_SimpleFunction('bgcolor', function ($fileName){

  if (class_exists('Drupal')) {

        // return $filePath;
        //

//        if (!function_exists('rgb2hex')) {
//          function rgb2hex($rgb) {
//            $hex = "#";
//            $hex .= str_pad(dechex($rgb[0]), 2, "0", STR_PAD_LEFT);
//            $hex .= str_pad(dechex($rgb[1]), 2, "0", STR_PAD_LEFT);
//            $hex .= str_pad(dechex($rgb[2]), 2, "0", STR_PAD_LEFT);
//
//            return $hex; // returns the hex value including the number sign (#)
//          }
//        }

  $filePath = getcwd() . $fileName;
//
//
//        $newfileName = str_replace('/images', 'images', $fileName);
//
//        $filePath = $documentRoot . $newfileName;

        // $filePath = $documentRoot . $fileName;

        if ($filePath !== '' && file_exists($filePath)) {
          $color = ColorThief::getColor($filePath, 8);
          $hex = $this->rgb2hex($color);
          return $hex;
        }

        //return $hex;
  }
  else {

    // $documentRoot = getcwd() . '/source';
    // $filePath = $documentRoot . $fileName;
    
    
    // $InstanceCache = CacheManager::getInstance('files');
    // $key = $filePath . '_hex';
    // $CachedHex = $InstanceCache->getItem($key);
    
    if (!function_exists('rgb2hex')) {
      function rgb2hex($rgb) {
         $hex = "#";
         $hex .= str_pad(dechex($rgb[0]), 2, "0", STR_PAD_LEFT);
         $hex .= str_pad(dechex($rgb[1]), 2, "0", STR_PAD_LEFT);
         $hex .= str_pad(dechex($rgb[2]), 2, "0", STR_PAD_LEFT);
    
         return $hex; // returns the hex value including the number sign (#)
      }
    }
    
    // return $filePath;
  // 
  
  $documentRoot = trim(getcwd(), "pattern-lab") . '/source/';
  
  
  $newfileName = str_replace('/images', 'images', $fileName);
  
  $filePath = $documentRoot . $newfileName;
    
  
  // $filePath = $documentRoot . $fileName;

  if ($fileName !== '' && file_exists($filePath)) {
    $tempImg = \Gregwar\Image\Image::open($filePath)->resize('32,32')->jpeg($quality = 50);
  
    $color = ColorThief::getColor($tempImg, 7);
    $hex = rgb2hex($color);
  }
  
    // if (is_null($CachedHex->get())) {
      
      
      // $cache->save($filePath . '_hex', $hex , 8640000);
      
      // $CachedHex->set($hex)->expiresAfter(3600);//in seconds, also accepts Datetime
      // $InstanceCache->save($CachedHex); // Save the cache item just like you do with doctrine and entities
      
      // $hex = $CachedHex->get();
    //   
    // } else {
    //   $hex = $CachedHex->get();
    // }
  
    
    return $hex;
  }
});

?>
