<?php


$function = new Twig_SimpleFunction('imagesize', function ($fileName) {
  $filePath = getcwd() . '/bolt-website' . $fileName;
  if (file_exists($filePath)){
    $size = getimagesize($filePath);
    return ($size[0]);
  }
});
