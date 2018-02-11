<?php

namespace Bolt;

require __DIR__ . '/../vendor/autoload.php';

use \Twig_SimpleFunction;
use \Drupal\Core\Template\Attribute;

class TwigFunctions {

  public static function deep_merge() {
    return new Twig_SimpleFunction('deep_merge', function($param1, $param2) {
      $result = array_merge_recursive( $param1, $param2 );
      // $result = array_replace_recursive( $param1, $param2 );
      return $result;
    });
  }


  // @todo Deprecate & remove this whole `pattern_template` function
  public static function pattern_template() {
    return new Twig_SimpleFunction('pattern_template', function($patternName) {

      switch ($patternName) {
        case 'button_group':
          return '@bolt/button-group.twig';
        case 'button':
          return '@bolt/button.twig';
        case 'card':
          return '@bolt/card.twig';
        case 'card-w-teaser':
          return '@bolt/card-w-teaser.twig';
        case 'eyebrow':
          return '@bolt/eyebrow.twig';
        case 'flag':
          return '@bolt/flag.twig';
        case 'headline':
          return '@bolt/headline.twig';
        case 'image':
          return '@bolt/image.twig';
        case 'link':
          return '@bolt/link.twig';
        case 'teaser':
          return '@bolt/teaser.twig';
        case 'text':
          return '@bolt/text.twig';
        case 'video':
          return '@bolt/video.twig';
        default:
          return 'ERROR: Template not found: '. $patternName;
      }

      // the full list of `$patternName` that uses this is:
      //button - @bolt/button.twig
      //button_group - @bolt-button-group/button-group.twig
      //card - @bolt-card/card.twig
      //eyebrow - @bolt-headline/eyebrow.twig
      //flag - @bolt-global/flag.twig
      //headline - @bolt-headline/headline.twig
      //image - @bolt-global/image.twig
      //teaser - @bolt-teaser/teaser.twig
      //text - @bolt-headline/text.twig
      //video - @bolt-video/video.twig
    });
  }


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



  // returns an array with the results of the color contrast analysis
  // it returns akey for each level (AA and AAA, both for normal and large or bold text)
  // it also returns the calculated contrast ratio
  // the ratio levels are from the WCAG 2 requirements
  // http://www.w3.org/TR/WCAG20/#visual-audio-contrast (1.4.3)
  // http://www.w3.org/TR/WCAG20/#larger-scaledef
  public static function color_contrast() {
    return new Twig_SimpleFunction('color_contrast', function($color1, $color2) {
      $ratio = self::calculateLuminosityRatio($color1, $color2);

      $contrast["levelAANormal"] = ($ratio >= 4.5 ? 'pass' : 'fail');
      $contrast["levelAALarge"] = ($ratio >= 3 ? 'pass' : 'fail');
      $contrast["levelAAMediumBold"] = ($ratio >= 3 ? 'pass' : 'fail');
      $contrast["levelAAANormal"] = ($ratio >= 7 ? 'pass' : 'fail');
      $contrast["levelAAALarge"] = ($ratio >= 4.5 ? 'pass' : 'fail');
      $contrast["levelAAAMediumBold"] = ($ratio >= 4.5 ? 'pass' : 'fail');
      $contrast["ratio"] = $ratio;

      return $contrast;
    });
  }

  // Backport the native create_attribute function from Drupal to natively work in Pattern Lab
  public static function create_attribute() {
    return new Twig_SimpleFunction('create_attribute', function($attributes) {
      return is_array($attributes) ? new Attribute($attributes) : $attributes;
      // print_r(Attribute);
    });
  }


}
