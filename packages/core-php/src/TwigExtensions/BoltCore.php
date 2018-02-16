<?php

namespace Bolt\TwigExtensions;

use Bolt;
use BasaltInc\TwigTools;
use RecursiveIteratorIterator;
use RecursiveDirectoryIterator;
use \Webmozart\PathUtil\Path; // https://github.com/webmozart/path-util
use \Shudrum\Component\ArrayFinder\ArrayFinder; // https://github.com/Shudrum/ArrayFinder


class BoltCore extends \Twig_Extension implements \Twig_Extension_InitRuntimeInterface {

  public $data = [];

  function initRuntime(\Twig_Environment $env) {
    $fullManifestPath = TwigTools\Utils::resolveTwigPath($env, '@bolt-data/full-manifest.bolt.json');
    $dataDir = dirname($fullManifestPath);
    $this->data = self::buildBoltData($dataDir);
  }

  /**
   * @param $dataDir {string} - Path to data directory
   * @return {array} - All json files in data parsed as a single data array
   */
  function buildBoltData($dataDir) {
    // Looping through all the files in the data dir, we'll get ones that end in `bolt.json` like `my-stuff.bolt.json`
    // We're building up a big data array that will look like this:
    //  'data' => [
    //    'spacingSizes' => // contents of `spacing-sizes.bolt.json`
    //    'colors' => [
    //      'brand' => // contents of `colors/brand.bolt.json`
    //      'status' => // contents of `colors/status.bolt.json`
    //    ]
    //  ]
    $data = new ArrayFinder();
    $data->changeSeparator('/');
    $items = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dataDir), RecursiveIteratorIterator::SELF_FIRST);
    foreach ($items as $key => $item) {
      if ($item->isFile() && $item->getExtension() === 'json') {
        $fullPath = $item->getPathname();
        // `colors/my-stuff.bolt.json` => `my-stuff.bolt`
        $extensionLessFilename = Path::getFilenameWithoutExtension($fullPath);
        if (Path::hasExtension($extensionLessFilename, 'bolt')) {
          // if file is `colors/my-stuff.bolt.json`, this becomes `myStuff` (which is the key we'll store it's data under)
          $dataKey = Bolt\Utils::dashesToCamelCase(Path::getFilenameWithoutExtension($extensionLessFilename, 'bolt'));
          $fileString = file_get_contents($fullPath);
          $fileData = json_decode($fileString, true);
          $relativePath = Path::makeRelative($fullPath, $dataDir);
          // if file is `colors/my-stuff.bolt.json`, this is `colors`, if file is `my-stuff.bolt.json`, this is `.`
          $subDir = dirname($relativePath);
          if ($subDir === '.') {// not nested in sub directory
            $data->set($dataKey, $fileData);
          } else {// nested in sub directory
            $data->set($subDir . '/' . $dataKey, $fileData);
          }
        }
      }
    }
    return $data->get();
  }

  public function getGlobals() {
    return [
      'bolt' => [
        'data' => $this->data,
      ],
      'enable_json_schema_validation' => true,
    ];
  }

  public function getFunctions() {
    return [
      TwigTools\TwigFunctions::get_data(),
      TwigTools\TwigFunctions::validate_data_schema(),
      Bolt\TwigFunctions::pattern_template(),
      Bolt\TwigFunctions::publicpath(),
      Bolt\TwigFunctions::base64(),
      Bolt\TwigFunctions::bgcolor(),
      Bolt\TwigFunctions::ratio(),
    ];
  }

  public function getFilters() {
    return [
      Bolt\TwigFilters::json_decode(),
    ];
  }

  public function getTokenParsers() {
    return [
      Bolt\TwigTags::grid_tag(),
      Bolt\TwigTags::cell_tag()
    ];
  }
}
