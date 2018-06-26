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
header('Content-Type: application/json');

$responseData = [
    'ok' => false,
];

$data = [];
$templatePath = '';
$msgs = [];
$json = '';

try {
  $json = file_get_contents('php://input');
} catch(\Exception $e) {
  $msgs[] = 'No POST body found. ' . $e->getMessage();
}


if ($json) {
  $postData = [];
  try {
    $postData = json_decode($json, true);
  } catch (\Exception $e) {
    $msgs[] = 'Not able to parse JSON. ' . $e->getMessage();
  }

  if ($postData) {
    $data = [];
    $templatePath = '';

    if (key_exists('data', $postData)) {
      $data = $postData['data'];
    } else {
      $msgs[] = "POST body must have a key of 'data'.";
    }

    if (key_exists('templatePath', $postData)) {
      $templatePath = $postData['templatePath'];
    } else {
      $msgs[] = "POST body must have a key of 'templatePath'.";
    }

    if ($data && $templatePath) {
      try {
        $html = trim($twigRenderer->render($templatePath, $data));
        $responseData['ok'] = true;
        $responseData['html'] = $html;
      } catch (\Exception $e) {
        $msgs[] = 'Error trying to render twig template.';
        $msgs[] = $e->getMessage();
      }
    }
  }
}

if ($msgs) {
  $responseData['message'] = join('\n', $msgs);
}
echo json_encode($responseData);
