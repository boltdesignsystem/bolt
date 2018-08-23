<?php
require_once 'vendor/autoload.php';

use Webmozart\PathUtil\Path;
use Symfony\Component\Finder\Finder;
use \Bolt\TwigRenderer;

$data = [];
$page = '';

// First arg to CLI - template path
$templatePath = $argv[1];
// Second arg to CLI - JSON string
if ($argv[2]) {
  $page = $argv[2]; // page we need specific data for
}

$json = file_get_contents($page);
$data = json_decode($json, true);

$twigRenderer = new TwigRenderer(
  '../../www/build/data/twig-namespaces.bolt.json',
  __DIR__,
  [],
  [
    '\Twig_Extension_Debug',
    '\PatternLab\DrupalTwigExtensions\Basic',
    '\BasaltInc\TwigTools\TwigExtensions\BasaltFakerExtension',
  ]
);

$msgs = [];
$html = '';

// Namespace path
if (strpos($templatePath, '@') !== false) {
  $html = trim($twigRenderer->render($templatePath, $data));

// Non-namespaced path
} else {
  $finder = new Finder();
  $finder->files()->in(__DIR__)->name($templatePath);

  foreach ($finder as $file) {
    $paths[] = $file->getRelativePathname();
  }

  $html = trim($twigRenderer->render('@bolt/' . $paths[0], $data));
}

echo $html;
    