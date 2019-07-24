<?php

// WARNING: not tested nor supported (though it's very close to working) - actual support is on `server--async.php`.

// require dirname(__DIR__) . '/vendor/autoload.php';

require_once 'vendor/autoload.php';

use BasaltInc\TwigRenderer\TwigRenderer;
use \Webmozart\PathUtil\Path; // https://github.com/webmozart/path-util
use \Shudrum\Component\ArrayFinder\ArrayFinder; // https://github.com/Shudrum/ArrayFinder

// HTTP Status Codes Used
// 200 OK - The standard response for successful HTTP requests.
// 202 Accepted - The request has been accepted but has not been processed yet. This code does not guarantee that the request will process successfully.
// 400 Bad request - The request could not be fulfilled due to the incorrect syntax of the request.
// 404 Not found - The resource could not be found. This is often used as a catch-all for all invalid URIs requested of the server.
// $responseCode = 202;
// $response = [];
// $data = [];
// $templatePath = '';
// $msgs = [];
// $json = '';
// $html = '';
// $twigRenderer = null;
// $configString = '';
// $config = [];

// print_r($data);

header('Access-Control-Allow-Origin: *');
// header('Content-Type: application/json');

$data = json_encode($_GET);
$data = json_decode($data ? $data : '{}', true);
$templatePath = $_GET["templatePath"];


$configFilePath = dirname(__FILE__) . '/data/shared-config.json';
try {
  $configString = file_get_contents($configFilePath);
} catch (\Exception $e) {
  $msgs[] = 'No configFile found at: ' . $configFilePath;
  $responseCode = 500;
}

try {
  $config = json_decode($configString, true);
} catch (\Exception $e) {
  $msgs[] = 'Error parsing JSON from config';
  $msgs[] = $e->getMessage();
  $responseCode = 500;
}

// // `GET` or `POST`
// $method = $_SERVER['REQUEST_METHOD'];
// // All query string params parsed
// $query = [];
// if (isset($_SERVER['QUERY_STRING'])) {
//   parse_str($_SERVER['QUERY_STRING'], $query);
// }

if ($config) {
  try {
    $twigRenderer = new TwigRenderer($config);
  } catch (\Exception $e) {
    $msg = 'Error creating Twig Environment. ' . $e->getMessage();
    $msgs[] = $msg;
    $responseCode = 400;
    $response['ok'] = false;
    $response['message'] = $msg;
  }
}

if ($twigRenderer) {
  // if (key_exists('templatePath', $query)) {
  //   $templatePath = $query['templatePath'];
  // } else {
  //   // @todo Provide more clear way to "ping" the server and know that it is ready.
  //   $msgs[] = "Url must have a query param of 'templatePath' for which twig template to render, but yes - the server is running.";
  //   $responseCode = 202;
  // }

  if ($templatePath && $method === 'POST') {
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
      $response = $twigRenderer->render($templatePath, $data);
      $responseCode = 200;

      // print_r($response);

      // header("Content-Type: text/html");
      echo $response["html"];
    } catch (\Exception $e) {
      $msgs[] = $e->getMessage();
      $responseCode = 400;
    }
  }

//   // if ($templatePath && $method === 'GET') {
//   //   $data = (isset($payload['data']) && is_array($payload['data'])) ? $payload['data'] : array();
//   // }
//   // echo $_GET;

//   // $data = [];
//   $data = json_encode($_GET);



//   // $newData = [];
//   // $newData['data'] = $data;
//   // print_r($newData);

//   $data = json_decode($data ? $data : '{}', true);





} else {
  print "Twig Renderer Not Found!";
}

$msgs = [];

if ($msgs) {
  print_r($msgs);
  // header('Warning: ' . join(' ', $msgs));
//  $response['message'] = join(' ', $msgs);
}

// http_response_code($responseCode);


