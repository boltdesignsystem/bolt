<?php
require_once 'vendor/autoload.php';
require_once 'beautify-html.php';

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

$beautify = new Beautify_Html(array(
  'indent_inner_html' => false,
  'indent_char' => " ",
  'indent_size' => 2,
  'wrap_line_length' => 32786,
  'unformatted' => ['code', 'pre'],
  'preserve_newlines' => false,
  'max_preserve_newlines' => 32786,
  'indent_scripts'	=> 'normal', // keep|separate|normal
));

echo $beautify->beautify($html);
