<?php

use Mexitek\PHPColors\Color;

$filter = new Twig_SimpleFilter('text_contrast', function ($color) {
  
  $myColor = new Color($color);
  
  if ($myColor->isLight()){
    return 'black';
  } else {
    return 'white';
  }
  
});
