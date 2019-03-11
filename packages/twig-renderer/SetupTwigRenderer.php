<?php

$default_autoload_path = 'vendor/autoload.php';
$alt_autoload_path = getcwd() . '/vendor/autoload.php';

if (file_exists($default_autoload_path)){
  require $default_autoload_path;
} else {
  require $alt_autoload_path;
}

function addBoltExtensions(\Twig_Environment &$env, $config) {
  $env->addExtension(new \Bolt\TwigExtensions\BoltCore());
  $env->addExtension(new \Bolt\TwigExtensions\BoltExtras());
  $env->addExtension(new \Twig_Extension_Debug());
  $env->addExtension(new \BasaltInc\TwigTools\TwigExtensions\BasaltFakerExtension());

  $env->addFunction(new \Twig_SimpleFunction('customTwigFunctionThatSaysWorld', function () {
    return 'Custom World';
  }));

  // temporarily disable Twig schema validation for the static site generator till the unknown 500 error being thrown is troubleshooted
  $env->addGlobal('enable_json_schema_validation', false); 
}
