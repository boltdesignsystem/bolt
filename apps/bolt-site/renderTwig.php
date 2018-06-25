<?php
require_once 'vendor/autoload.php';

use \Bolt\TwigRenderer;

// Creates Twig Loader, uses `./templates` as default directory to look for Twig files
$staticSiteLoader = new Twig_Loader_Filesystem('templates');

$twigRenderer = new TwigRenderer(
    '../../www/build/data/twig-namespaces.bolt.json',
    __DIR__,
    [ $staticSiteLoader ],
    [ '\PatternLab\DrupalTwigExtensions\Basic' ]
);

$data = [];
$page = '';

// First arg to CLI - template path
$templatePath = $argv[1];
// Second arg to CLI - JSON string
if ($argv[2]) {
  $page = $argv[2]; // page we need specific data for
}

$json = file_get_contents('http://localhost:3001/' . $page);
$data = json_decode($json, true);

$html = $twigRenderer->render($templatePath, $data);
echo $html;
