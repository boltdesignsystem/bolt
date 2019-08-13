<?php

namespace Bolt;

use Bolt;
use \Twig_SimpleFilter;

class TwigFilters {
  // ported over from https://github.com/craftcms/cms/blob/develop/src/web/twig/Extension.php#L459
  /**
   * Replaces Twig's |replace filter, adding support for passing in separate
   * search and replace arrays.
   *
   * @param mixed $str
   * @param mixed $search
   * @param mixed $replace
   * @return mixed
   */
  public static function replaceFilter() {
    return new Twig_SimpleFilter('replace', function($str, $search, $replace = null) {
      // Are they using the standard Twig syntax?
      if (is_array($search) && $replace === null) {
        return strtr($str, $search);
      }
      // Is this a regular expression?
      if (preg_match('/^\/.+\/[a-zA-Z]*$/', $search)) {
        return preg_replace($search, $replace, $str);
      }
      // Otherwise use str_replace
      return str_replace($search, $replace, $str);
    });
  }

  public static function markdown() {
    return new Twig_SimpleFilter('markdown', function($string) {
      return Utils::convertMarkdown($string);
    });
  }

  public static function json_decode() {
    return new Twig_SimpleFilter('json_decode', function ($json) {
      return json_decode($json, true);
    });
  }


  public static function bolt_ssr() {
    return new Twig_SimpleFilter('bolt_ssr', function(\Twig\Environment $env, $context, $html) {
      $result = Bolt\TwigFunctions::bolt_ssr($context, $html);
      return $result;
    }, [
      'needs_environment' => true,
      'needs_context' => true,
    ]);
  }

  public static function without() {
    return new Twig_SimpleFilter('without', function ($element) {
      if ($element instanceof ArrayAccess) {
        $filtered_element = clone $element;
      }
      else {
        $filtered_element = $element;
      }
      $args = func_get_args();
      unset($args[0]);
      foreach ($args as $arg) {
        if (isset($filtered_element[$arg])) {
          unset($filtered_element[$arg]);
        }
      }
      return $filtered_element;
    });
  }

  public static function t() {
    return new Twig_SimpleFilter('t', function ($string) {
      return $string;
    });
  }

  public static function rgb2hex() {
    return new Twig_SimpleFilter('rgb2hex', function ($rgb) {
      $rgb = str_replace('rgb(', '', $rgb);
      $rgb = str_replace(')', '', $rgb);
      $rgb = str_replace(' ', '', $rgb);

      $rgbArray = explode(',', $rgb);

      // Round RGB values in case JSON RGB output contains decimal points
      $rgbArray[0] = round($rgbArray[0], 0);
      $rgbArray[1] = round($rgbArray[1], 0);
      $rgbArray[2] = round($rgbArray[2], 0);

      $hex = "#";
      $hex .= str_pad(dechex($rgbArray[0]), 2, "0", STR_PAD_LEFT);
      $hex .= str_pad(dechex($rgbArray[1]), 2, "0", STR_PAD_LEFT);
      $hex .= str_pad(dechex($rgbArray[2]), 2, "0", STR_PAD_LEFT);

      return $hex;
    });
  }

  public static function text_contrast() {
    return new Twig_SimpleFilter('text_contrast', function ($color) {
      return Colors::calculateTextContrast($color);
    });
  }
}
