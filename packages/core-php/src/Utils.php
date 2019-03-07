<?php

namespace Bolt;

use Michelf\MarkdownExtra;
use \Webmozart\PathUtil\Path;

// https://github.com/nabil1337/case-helper
use CaseHelper\CaseHelperFactory;

class Utils {

  const repoRoot = __DIR__ . '/../../../';

  /**
   * Convert markdown to HTML.
   *
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
   * Try to resolve an optionally-needed Twig path -- good for lazy and async work (esp local dev work).
   *
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
   * Dashes to camelCase string converter.
   *
   * @param $string - Takes something like `my-cool-string`
   * @return string - Returns `myCoolString`
   */
  public static function dashesToCamelCase($string) {
    $str = str_replace('-', '', ucwords($string, '-'));
    return lcfirst($str);
  }

  /**
   * Map input case type to CaseHelper reference name.
   *
   * @param string $type - Exact name of a case type
   * @return number - Returns a number that refers to a CaseHelper input type
   */
  protected static function mapInputCaseType($type) {
    $types = [
      'camelcase'          => CaseHelperFactory::INPUT_TYPE_CAMEL_CASE,
      'kebabcase'          => CaseHelperFactory::INPUT_TYPE_KEBAB_CASE,
      'snakecase'          => CaseHelperFactory::INPUT_TYPE_SNAKE_CASE,

      // The following case types are available but not currently in use
      // 'spacecase'          => CaseHelperFactory::INPUT_TYPE_SPACE_CASE,
      // 'pascalcase'         => CaseHelperFactory::INPUT_TYPE_PASCAL_CASE,
      // 'screamingsnakecase' => CaseHelperFactory::INPUT_TYPE_SCREAMING_SNAKE_CASE,
      // 'traincase'          => CaseHelperFactory::INPUT_TYPE_TRAIN_CASE,
    ];

    if (isset($types[$type])) {
      return $types[$type];
    } else {
      return $types['camelcase'];
    }
  }

  /**
   * Get a string's case type, used when converting case type. Note: can only reliably detect snake and kebab case.
   *
   * @param string $string - String to be checked
   * @return string - Returns detected case type name, defaults to camelcase
   */
  public static function checkCaseType($string) {
    if (strpos($string, '_')) {
      return "snakecase";
    } elseif (strpos($string, '-')) {
      return "kebabcase";
    } else {
      return "camelcase";
    }
  }
  
  /**
   * Convert string to snake_case.
   *
   * @param string $string - String to be converted
   * @param string $type - Name of current string format
   * @return string - Returns string formatted in snake_case
   */
  public static function convertToSnakeCase($string, $type) {
    $ch = CaseHelperFactory::make(self::mapInputCaseType($type));
    return $ch->toSnakeCase($string);
  }

  /**
   * Convert string to kebab-case.
   *
   * @param string $string - String to be converted
   * @param string $type - Name of current string format
   * @return string - Returns string formatted in kebab-case
   */
  public static function convertToKebabCase($string, $type) {
    $ch = CaseHelperFactory::make(self::mapInputCaseType($type));
    return $ch->toKebabCase($string);
  }

  /**
   * Get path to file on GitHub.
   *
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

  /**
   * Check that schema "type" does not equal "array" or "object", nor does it contain an array with either of those values.
   *
   * @param string|array $type - The schema "type" value, can be passed as string or array
   * @return boolean - Returns true if "type" is allowed, i.e. no "array" or "object" values
   */
  public static function isAllowedSchemaType($type) {
    if ((is_string($type) && $type !== "array" && $type !== "object") || (is_array($type) && !in_array("array", $type) && !in_array("object", $type))){
      return true;
    }
  }

  /**
   * Build an array of props by checking Twig "_context" against the schema, only returns top-level schema props. By default prop keys are converted to kebab-case.
   *
   * @param array $items - Twig "_context", all the available template variables
   * @param array $schema - The schema object for a particular component
   * @param boolean $isInternal - If true default schema values are included in returned array and keys converted to snake_case
   * @return array - An associative array of props
   */
  public static function buildPropsArray($items, $schema, $isData = false) {
    $props = array_key_exists("attributes", $items) ? $items["attributes"] : array();

    // If schema has properties to check against
    if (!empty($schema["properties"])) {
      foreach ($schema["properties"] as $key => $value) {
        if ($key != "attributes") {
          // If schema prop is in the list of items (skip attributes)
          if (array_key_exists($key, $items)){
            // Check the schema "type", skip over any that contain the value "array" or "object"
            if (array_key_exists("type", $schema["properties"][$key]) && self::isAllowedSchemaType($schema["properties"][$key]["type"])){
              if ($isData) {
                $props[self::convertToSnakeCase($key, self::checkCaseType($key))] = $items[$key];
              } else {
                $props[self::convertToKebabCase($key, self::checkCaseType($key))] = $items[$key];
              }
            }
          } else if ($isData && array_key_exists("default", $schema["properties"][$key])) {
            $props[self::convertToSnakeCase($key, self::checkCaseType($key))] = $schema["properties"][$key]["default"];
          }
        }
      }
    }

    return $props;
  }
}
