<?php

use \PatternLab\Config;
use \PatternLab\Dispatcher;
use \PatternLab\Template;
use \PatternLab\PatternEngine;

$baseDir = __DIR__ . "/";
require($baseDir . "vendor/autoload.php");

$payload = json_decode(file_get_contents("php://input"), true);
$template = (isset($payload['template'])) ? $payload['template'] : '';
$data = (isset($payload['data']) && is_array($payload['data'])) ? $payload['data'] : array();

Config::init($baseDir, $verbose = false); // So global config options are available + we can run PL w/o using the Console
Dispatcher::init(); // So plugins like Twig Namespaces work
PatternEngine::init();
Template::init();

$patternLoader = Template::getPatternLoader(); // So we don't need to worry about setting this up ourselves

$pattern = $patternLoader->render(array(
  "pattern" => $template,
  "data" => $data
));

print $pattern;