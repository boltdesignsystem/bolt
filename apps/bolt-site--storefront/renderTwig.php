<?php
require_once 'vendor/autoload.php';
// Twig docs for this: https://twig.symfony.com/doc/2.x/api.html

$data = [];

// First arg to CLI - template path
$templatePath = $argv[1];
// Second arg to CLI - JSON string
if ($argv[2]) {
  $data = json_decode($argv[2], true);
}

// Creates Twig Loader, uses `./templates` as default directory to look for Twig files
$loader = new Twig_Loader_Filesystem('templates');

// Add as many Twig Namespaces as you'd like
//$loader->addPath(getcwd() . '/..', 'upone');

// Create Twig Environment with the `$loader` just made and some global settings
$twig = new Twig_Environment($loader, [
  'debug' => true,
]);

// Load the template that was first arg to this script
$template = $twig->load($templatePath);

// Pass data to template and get back HTML
$html = $template->render($data);

echo $html;
