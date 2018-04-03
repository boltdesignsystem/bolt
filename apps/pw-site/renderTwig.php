<?php
require_once 'vendor/autoload.php';
// Twig docs for this: https://twig.symfony.com/doc/1.x/api.html

$data = [];

// First arg to CLI - template path
$templatePath = $argv[1];
// Second arg to CLI - JSON string
if ($argv[2]) {
  $data = json_decode($argv[2], true);
}

// Creates Twig Loader, uses `./templates` as default directory to look for Twig files
$staticSiteLoader = new Twig_Loader_Filesystem('templates');

// Add as many Twig Namespaces as you'd like
//$staticSiteLoader->addPath(getcwd() . '/..', 'upone');

$twigNamespaceConfig = \BasaltInc\TwigTools\Utils::getData('www/build/data/twig-namespaces.bolt.json');
$twigLoaderConfig = \BasaltInc\TwigTools\Namespaces::buildLoaderConfig($twigNamespaceConfig, __DIR__);
$boltTwigLoader = \BasaltInc\TwigTools\Namespaces::addPathsToLoader($twigLoaderConfig);

$loaders = new \Twig_Loader_Chain([
  $staticSiteLoader,
  $boltTwigLoader,
]);

// Create Twig Environment with the `$loaders` just made and some global settings
$twig = new Twig_Environment($loaders, [
  'debug' => true,
  'autoescape' => false,
]);

// Add all our Twig Extensions for our custom functions, filters, etc
// Not a Drupal site, but Bolt components use some of the custom Twig functions, filters etc
$twig->addExtension(new \PatternLab\DrupalTwigExtensions\Basic());
$twig->addExtension(new \Bolt\TwigExtensions\BoltCore());
$twig->addExtension(new \Bolt\TwigExtensions\BoltExtras());

// Load the template that was first arg to this script
$template = $twig->load($templatePath);

// Pass data to template and get back HTML
$html = $template->render($data);

echo $html;
