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
  public static function get_absolute_path($relativeFilePath) {
    $publicDir = '/dist';
    return getcwd() . $publicDir . $relativeFilePath;
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
    $repoBranchName = 'epic/refactor'; // @todo Change branch name to `master`
    $githubPath = Path::join('https://github.com/bolt-design-system/bolt/blob/', $repoBranchName, $relFilePath);
    return $githubPath;
  }

}
