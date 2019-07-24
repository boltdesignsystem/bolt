<?php

require_once 'vendor/autoload.php';
use BasaltInc\TwigTools;
use \Webmozart\PathUtil\Path; // https://github.com/webmozart/path-util
use \Shudrum\Component\ArrayFinder\ArrayFinder;
// function initRuntime(\Twig\Environment $env) {
//   try {
//     $fullManifestPath = TwigTools\Utils::resolveTwigPath($env, '@bolt-data/full-manifest.bolt.json');
//     $dataDir = dirname($fullManifestPath);
//     $this->data = self::buildBoltData($dataDir);
//   } catch (\Exception $e) {

//   }
// }

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

function addBoltCoreExtensions(\Twig\Environment &$env, $config) {
  $env->addExtension(new \Bolt\TwigExtensions\BoltCore());
  $env->addExtension(new \Bolt\TwigExtensions\BoltCoreCompat());
  $env->addExtension(new \Twig_Extension_Debug());
  $env->addExtension(new \BasaltInc\TwigTools\TwigExtensions\BasaltFakerExtension());

  $env->addFunction(new \Twig_SimpleFunction('customTwigFunctionThatSaysWorld', function () {
    return 'Custom World';
  }));

  // temporarily disable Twig schema validation for the static site generator till the unknown 500 error being thrown is troubleshooted
  $env->addGlobal('enable_json_schema_validation', false);


  $fullManifestPath = TwigTools\Utils::resolveTwigPath($env, '@bolt-data/full-manifest.bolt.json');
  $dataDir = dirname($fullManifestPath);

  $data = [];
  $data['data'] = buildBoltData($dataDir)['fullManifest'];
  $env->addGlobal('bolt', $data);
}

// function addBoltExtraExtensions(\Twig\Environment &$env, $config) {
//   $env->addExtension(new \Bolt\TwigExtensions\BoltExtras());
// }
