<?php
require_once 'vendor/autoload.php';

use \Bolt\TwigRenderer;

$staticSiteLoader = new Twig_Loader_Filesystem('templates');

$twigRenderer = new TwigRenderer(
    '../../www/build/data/twig-namespaces.bolt.json',
    __DIR__,
    [ $staticSiteLoader ],
    [ '\PatternLab\DrupalTwigExtensions\Basic' ]
);

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/html');

$json = file_get_contents('php://input');
$postData = json_decode($json, true);

$data = $postData['data'];
$templatePath = $postData['templatePath'];

$responseData = [
    'ok' => false,
];

if ($templatePath && $data) {
  $html = $twigRenderer->render($templatePath, $data);

  $responseData['ok'] = true;
  $responseData['html'] = $html;

  echo $html;
} else {
  echo json_encode($responseData);
}
