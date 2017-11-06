<?php


$function = new Twig_SimpleFunction('imagesize', function ($fileName) {
  $filePath = __DIR__ . '/../../../../../dist';
  if (file_exists($filePath)){
    $size = getimagesize($filePath);
    return ($size[0]);
  }
});
