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
}
