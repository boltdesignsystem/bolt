<?php


$function = new Twig_SimpleFunction('imagesize', function ($fileName) {
  $filePath = getcwd() . '/dist' . $fileName;
  if (file_exists($filePath)){
    $size = getimagesize($filePath);
    return ($size[0]);
  }
});
