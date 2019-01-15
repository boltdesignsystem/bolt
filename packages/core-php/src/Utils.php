<?php

namespace Bolt;

use Michelf\MarkdownExtra;
use \Webmozart\PathUtil\Path;

class Utils {

  const repoRoot = __DIR__ . '/../../../';

  /**
   * Markdown to HTML
   * @param $string - String of Markdown
   * @return string - HTML from Markdown
   */
  public static function convertMarkdown($string) {
    return MarkdownExtra::defaultTransform($string);
  }

  // Given a relative file path, return the resolved absolute path
  public static function get_absolute_path($relativeFilePath, $baseDir) {// @todo Refactor and tighten - this was put together quickly as it was a final 1.0 launch blocker
    if (self::isRemoteUrl($relativeFilePath)) {
      return $relativeFilePath;
    }
    $absoluteBasePath = Path::makeAbsolute($baseDir, getcwd());

    // If it's a root relative path like `/images/hi.jpg`
    if (substr($relativeFilePath, 0, 1) === '/') {
      $relativeFilePath = ltrim($relativeFilePath, '/');
    }

    $absolutePath = Path::makeAbsolute($relativeFilePath, $absoluteBasePath);
    if (!file_exists(realpath($absolutePath))) {
      throw new \Exception('Cannot get_absolute_path of: ' . $absolutePath . ' Trying to get it from this relativePath: '. $relativeFilePath . ' and using this absoluteBasePath: ' . $absoluteBasePath);
    }
    return $absolutePath;
  }


  // Try to resolve an optionally-needed Twig path -- good for lazy and async work (esp local dev work);
   /**
   * @param {Twig_Environment} $env
   * @param {string} $templateName
   * @return {string} $full_path - Full path to where the Twig file resides
   */
  public static function optionallyResolveTwigPath(\Twig_Environment $env, $templateName) {
    /**
     * @var \Twig_Template $template
     * @url https://twig.symfony.com/api/1.x/Twig_Template.html
     * */
    $template = $env->resolveTemplate($templateName);

    /**
     * @var \Twig_Source $source
     * @url https://twig.symfony.com/api/1.x/Twig_Source.html
     */
    $source = $template->getSourceContext();

    /** @var string $full_path */
    $full_path = $source->getPath();

    if (!file_exists($full_path)) {
      return false;
    }
    return $full_path;
  }

  /**
   * @param \Twig_Environment $env
   * @return mixed
   * @throws \Twig_Error_Runtime
   */
  public static function getData(\Twig_Environment $env) {
    $boltCore = $env->getExtension('Bolt\TwigExtensions\BoltCore');
    $boltData = $boltCore->data;
    return $boltData;
  }

  // Given an absolute file path, return the file's extension info
  public static function get_file_ext($absoluteFilePath) {
    return pathinfo($absoluteFilePath, PATHINFO_EXTENSION);
  }

  /**
   * Dashes to camelCase string converter
   * @param $string - Takes something like `my-cool-string`
   * @return string - Returns `myCoolString`
   */
  public static function dashesToCamelCase($string) {
    $str = str_replace('-', '', ucwords($string, '-'));
    return lcfirst($str);
  }

  /**
   * Get path to file on GitHub
   * @param string $filePath - Absolute path to a file in repo
   * @return string - URL to file on GitHub
   */
  public static function gitHubUrl($filePath) {
    $relFilePath = Path::makeRelative($filePath, self::repoRoot);
    $repoBranchName = 'master';
    $githubPath = Path::join('https://github.com/bolt-design-system/bolt/blob/', $repoBranchName, $relFilePath);
    return $githubPath;
  }

  public static function isRemoteUrl($url) {
    if ($url === '' || !is_string($url)) {
      return false;
    }
    if (substr($url, 0, 4) === 'http') {
      return true;
    } elseif (substr($url, 0, 2) === '//') {
      return true;
    }
    return false;
  }

  public static function setProp($key, $value, $schema, $array) {
    // If key is in schema
    if (!empty($schema["properties"]) && array_key_exists($key, $schema["properties"])){
      // skip "attributes" key
      if ($key != "attributes") {
        // if value is array, call this function on array with that segment of the schema
        if (is_array($value)) {
          $obj = $value;
          $objSchema = $schema["properties"][$key];
          foreach ($obj as $objKey => $objValue) {
            $array = self::setProp($objKey, $objValue, $objSchema, $array);
          }
        } else {
          // otherwise set key
          $keyName = $key;
          if (array_key_exists("name", $schema["properties"][$key])) {
            // use "name" from schema if set
            $keyName = $schema["properties"][$key]["name"];
          }
          $array[$keyName] = $value;
        }
      }
    }

    return $array;
  }

}
