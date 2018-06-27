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

// HTTP Status Codes Used
// 200 OK - The standard response for successful HTTP requests.
// 202 Accepted - The request has been accepted but has not been processed yet. This code does not guarantee that the request will process successfully.
// 400 Bad request - The request could not be fulfilled due to the incorrect syntax of the request.
// 404 Not found - The resource could not be found. This is often used as a catch-all for all invalid URIs requested of the server.
$responseCode = 202;
// `GET` or `POST`
$method = $_SERVER['REQUEST_METHOD'];
// All query string params parsed
$query = [];
if (isset($_SERVER['QUERY_STRING'])) {
  parse_str($_SERVER['QUERY_STRING'], $query);
}

$responseData = [
    'ok' => false,
    'meta' => [
      'query' => $query,
      'method' => $method,
//      'server' => $_SERVER,
    ],
];

$data = [];
$templatePath = '';
$msgs = [];
$json = '';

try {
  $json = file_get_contents('php://input');
} catch(\Exception $e) {
  $msgs[] = 'No POST body found. ' . $e->getMessage();
  $responseCode = 400;
}


if ($json) {
  $postData = [];
  try {
    $postData = json_decode($json, true);
  } catch (\Exception $e) {
    $msgs[] = 'Not able to parse JSON. ' . $e->getMessage();
    $responseCode = 400;
  }

  if ($postData) {
    $data = [];
    $templatePath = '';

    if (key_exists('data', $postData)) {
      $data = $postData['data'];
    }

    if (key_exists('templatePath', $postData)) {
      $templatePath = $postData['templatePath'];
    } else {
      $msgs[] = "POST body must have a key of 'templatePath'.";
      $responseCode = 400;
    }

    if ($data && $templatePath) {
      try {
        $html = trim($twigRenderer->render($templatePath, $data));
        $responseData['ok'] = true;
        $responseData['html'] = $html;
        $responseCode = 200;
      } catch (\Exception $e) {
        $msgs[] = 'Error trying to render twig template.';
        $msgs[] = $e->getMessage();
        $responseCode = 400;
      }
    }
  }
}

if ($msgs) {
  $responseData['message'] = join(' ', $msgs);
}

http_response_code($responseCode);
echo json_encode($responseData);
