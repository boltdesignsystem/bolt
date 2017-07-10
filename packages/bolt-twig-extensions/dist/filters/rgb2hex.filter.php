<?php

$filter = new Twig_SimpleFilter('rgb2hex', function ($rgb) {
  $rgb = str_replace('rgb(', '', $rgb);
  $rgb = str_replace(')', '', $rgb);

  $rgbArray = explode(',', $rgb);
  

  $hex = "#";
  $hex .= str_pad(dechex($rgbArray[0]), 2, "0", STR_PAD_LEFT);
  $hex .= str_pad(dechex($rgbArray[1]), 2, "0", STR_PAD_LEFT);
  $hex .= str_pad(dechex($rgbArray[2]), 2, "0", STR_PAD_LEFT);


  return $hex;
  
});
