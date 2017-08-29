<?php

use Mexitek\PHPColors\Color;

$filter = new Twig_SimpleFilter('complimentary_color', function ($color) {
  
  $myColor = new Color($color);
  
  return $myColor->complementary();

});
