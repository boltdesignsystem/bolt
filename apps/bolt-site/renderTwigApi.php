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

if (key_exists('templatePath', $query)) {
  $templatePath = $query['templatePath'];
} else {
  $msgs[] = "Url must have a query param of 'templatePath' for which twig template.";
  $responseCode = 400;
}

if ($method === 'POST') {
  try {
    $json = file_get_contents('php://input');
  } catch(\Exception $e) {
    $msgs[] = 'No POST body found. ' . $e->getMessage();
    $responseCode = 400;
  }
  if ($json) {
    try {
      $data = json_decode($json, true);
    } catch (\Exception $e) {
      $msgs[] = 'Not able to parse JSON. ' . $e->getMessage();
      $responseCode = 400;
    }
  }
}

if ($templatePath) {
  try {
    $html = trim($twigRenderer->render($templatePath, $data));
    $responseCode = 200;
  } catch (\Exception $e) {
    $msgs[] = 'Error trying to render twig template.';
    $msgs[] = $e->getMessage();
    $responseCode = 400;
  }
}

if ($msgs) {
  $responseData['message'] = join(' ', $msgs);
  header('Warning: ' . join(' ', $msgs));
}

http_response_code($responseCode);

if ($html) {
  header('Content-Type: application/html');
  echo $html;
} else {
  echo json_encode($responseData);
}
