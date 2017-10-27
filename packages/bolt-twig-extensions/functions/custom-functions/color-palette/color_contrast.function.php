<?php

// https://github.com/gdkraus/wcag2-color-contrast/blob/master/wcag2-color-contrast.php

$function = new Twig_SimpleFunction('color_contrast', function ($color1, $color2) {

// calculates the luminosity of an given RGB color
// the color code must be in the format of RRGGBB
// the luminosity equations are from the WCAG 2 requirements
// http://www.w3.org/TR/WCAG20/#relativeluminancedef
if (!function_exists('calculateLuminosity')) {
  function calculateLuminosity($color) {

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
}


// calculates the luminosity ratio of two colors
// the luminosity ratio equations are from the WCAG 2 requirements
// http://www.w3.org/TR/WCAG20/#contrast-ratiodef
  if (!function_exists('calculateLuminosityRatio')) {
    function calculateLuminosityRatio($color1, $color2) {
        $l1 = calculateLuminosity($color1);
        $l2 = calculateLuminosity($color2);

        if ($l1 > $l2) {
            $ratio = (($l1 + 0.05) / ($l2 + 0.05));
        } else {
            $ratio = (($l2 + 0.05) / ($l1 + 0.05));
        }
        return $ratio;
    }
  }


// returns an array with the results of the color contrast analysis
// it returns akey for each level (AA and AAA, both for normal and large or bold text)
// it also returns the calculated contrast ratio
// the ratio levels are from the WCAG 2 requirements
// http://www.w3.org/TR/WCAG20/#visual-audio-contrast (1.4.3)
// http://www.w3.org/TR/WCAG20/#larger-scaledef

  // function evaluateColorContrast($color1, $color2) {
  $ratio = calculateLuminosityRatio($color1, $color2);

  $colorEvaluation["levelAANormal"] = ($ratio >= 4.5 ? 'pass' : 'fail');
  $colorEvaluation["levelAALarge"] = ($ratio >= 3 ? 'pass' : 'fail');
  $colorEvaluation["levelAAMediumBold"] = ($ratio >= 3 ? 'pass' : 'fail');
  $colorEvaluation["levelAAANormal"] = ($ratio >= 7 ? 'pass' : 'fail');
  $colorEvaluation["levelAAALarge"] = ($ratio >= 4.5 ? 'pass' : 'fail');
  $colorEvaluation["levelAAAMediumBold"] = ($ratio >= 4.5 ? 'pass' : 'fail');
  $colorEvaluation["ratio"] = $ratio;

  return $colorEvaluation;
  // }

});
