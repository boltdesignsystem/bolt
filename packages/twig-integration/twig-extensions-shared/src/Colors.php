<?php

namespace Bolt;

use Mexitek\PHPColors\Color;

class Colors {

  // calculates the luminosity of an given RGB color
  // the color code must be in the format of RRGGBB
  // the luminosity equations are from the WCAG 2 requirements
  // http://www.w3.org/TR/WCAG20/#relativeluminancedef
  public static function calculateLuminosity($color) {
    $r = hexdec(substr($color, 0, 2)) / 255; // red value
    $g = hexdec(substr($color, 2, 2)) / 255; // green value
    $b = hexdec(substr($color, 4, 2)) / 255; // blue value
    if ($r <= 0.03928) {
      $r = $r / 12.92;
    } else {
      $r = pow((($r + 0.055) / 1.055), 2.4);
    }

    if ($g <= 0.03928) {
      $g = $g / 12.92;
    } else {
      $g = pow((($g + 0.055) / 1.055), 2.4);
    }

    if ($b <= 0.03928) {
      $b = $b / 12.92;
    } else {
      $b = pow((($b + 0.055) / 1.055), 2.4);
    }

    $luminosity = 0.2126 * $r + 0.7152 * $g + 0.0722 * $b;
    return $luminosity;
  }


  // calculates the luminosity ratio of two colors
  // the luminosity ratio equations are from the WCAG 2 requirements
  // http://www.w3.org/TR/WCAG20/#contrast-ratiodef
  public static function calculateLuminosityRatio($color1, $color2) {
    $l1 = self::calculateLuminosity($color1);
    $l2 = self::calculateLuminosity($color2);

    if ($l1 > $l2) {
      $ratio = (($l1 + 0.05) / ($l2 + 0.05));
    } else {
      $ratio = (($l2 + 0.05) / ($l1 + 0.05));
    }
    return $ratio;
  }



  public static function calculateTextContrast($color) {
    $myColor = new Color($color);

    if ($myColor->isLight()){
      return 'black';
    } else {
      return 'white';
    }
  }

}
