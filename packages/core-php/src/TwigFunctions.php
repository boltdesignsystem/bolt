<?php

namespace Bolt;

use \Twig_SimpleFunction;
use \Drupal\Core\Template\Attribute;

class TwigFunctions {


  // @todo: integrate with existing Link component
  // Better Link function - improvement over off the shelf Drupal `Link` function Pattern Lab's Twig Extensions Plugin provided.
  public static function link() {
    return new Twig_SimpleFunction('link', function ($title, $url, $attributes) {
      if (!empty($attributes)) {
        if (is_array($attributes)) {
          $attributes = new Attribute($attributes);
        }
        return '<a href="' . $url . '"' . $attributes . '>' . $title . '</a>';
      } else {
        return '<a href="' . $url . '">' . $title . '</a>';
      }
    }, array('is_safe' => array('html')));
  }


  // Same overall idea as https://jmperezperez.com/medium-image-progressive-loading-placeholder/, we just started working on this a few years prior ^_^
  public static function base64() {
    return new Twig_SimpleFunction('base64', function($relativeImagePath) {
      return Images::generate_base64_image_placeholder($relativeImagePath);
    });
  }


  // Return the average color of the image path passed in
  public static function bgcolor() {
    return new Twig_SimpleFunction('bgcolor', function($relativeImagePath) {
      return Images::calculate_average_image_color($relativeImagePath);
    });
  }

  // Return the aspect ratio of the image passed in
  public static function ratio() {
    return new Twig_SimpleFunction('ratio', function($relativeImagePath) {
      return Images::calculate_image_aspect_ratio($relativeImagePath);
    });
  }


  // Originally was required...? Keeping for now till full responsive images solution back up and running
  public static function imagesize() {
    return new Twig_SimpleFunction('imagesize', function($relativeImagePath) {
      return Images::get_image_dimensions($relativeImagePath);
    });
  }


  public static function deep_merge() {
    return new Twig_SimpleFunction('deep_merge', function($param1, $param2) {
      $result = array_merge_recursive( $param1, $param2 );
      // $result = array_replace_recursive( $param1, $param2 );
      return $result;
    });
  }


  // @todo: rename to public_path? we should also look into what'd be required to support `drupal_get_path`
  public static function publicpath() {
    return new Twig_SimpleFunction('publicpath', function($fileName) {
      if (function_exists('drupal_get_path')) {
        return '/' . drupal_get_path('theme', 'bolt') . '/public/' . $fileName;
      }
      else {
        return $fileName;
      }
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


  // returns an array with the results of the color contrast analysis
  // it returns akey for each level (AA and AAA, both for normal and large or bold text)
  // it also returns the calculated contrast ratio
  // the ratio levels are from the WCAG 2 requirements
  // http://www.w3.org/TR/WCAG20/#visual-audio-contrast (1.4.3)
  // http://www.w3.org/TR/WCAG20/#larger-scaledef
  public static function color_contrast() {
    return new Twig_SimpleFunction('color_contrast', function($color1, $color2) {
      $ratio = Colors::calculateLuminosityRatio($color1, $color2);

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
