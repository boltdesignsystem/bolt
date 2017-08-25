<?php


$function = new Twig_SimpleFunction('imagesize', function ($fileName) {

  if (class_exists('Drupal')) {
    if (function_exists('drupal_get_path')) {
      $documentRoot = DRUPAL_ROOT . '/' . drupal_get_path('theme', 'pegakit');
    }
    else {
      $documentRoot = getcwd();
    }
    $documentRoot .= '/source/';

    $newfileName = str_replace('/images', 'images', $fileName);
    $filePath = $documentRoot . $newfileName;

    if (file_exists($filePath) && !empty($fileName)){
      $size = getimagesize($filePath);
      
      return ($size[0]);
    }
  }
  else {
    $documentRoot = trim(getcwd(), "pattern-lab") . '/source';
    $newfileName = str_replace('/images', 'images', $fileName);
    $filePath = $documentRoot . '/' . $newfileName;
  
    if (file_exists($filePath)){
      $size = getimagesize($filePath);
    
      return ($size[0]);
    }
  }
    
});
