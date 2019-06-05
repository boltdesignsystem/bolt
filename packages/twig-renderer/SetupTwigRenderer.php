<?php

require_once 'vendor/autoload.php';

function addBoltCoreExtensions(\Twig\Environment &$env, $config) {
  $env->addExtension(new \Bolt\TwigExtensions\BoltCore());
  $env->addExtension(new \Bolt\TwigExtensions\BoltCoreCompat());
  $env->addExtension(new \Twig_Extension_Debug());
  $env->addExtension(new \BasaltInc\TwigTools\TwigExtensions\BasaltFakerExtension());

  $env->addFunction(new \Twig_SimpleFunction('customTwigFunctionThatSaysWorld', function () {
    return 'Custom World';
  }));

  // temporarily disable Twig schema validation for the static site generator till the unknown 500 error being thrown is troubleshooted
  $env->addGlobal('enable_json_schema_validation', false);
}

function addBoltExtraExtensions(\Twig\Environment &$env, $config) {
  $env->addExtension(new \Bolt\TwigExtensions\BoltExtras());
}
