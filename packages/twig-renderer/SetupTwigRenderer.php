<?php

require_once 'vendor/autoload.php';

function addBoltExtensions(\Twig_Environment &$env, $config) {
  $env->addExtension(new \Bolt\TwigExtensions\BoltCore());
  $env->addExtension(new \Bolt\TwigExtensions\BoltExtras());
  $env->addExtension(new \Twig_Extension_Debug());
  $env->addExtension(new \BasaltInc\TwigTools\TwigExtensions\BasaltFakerExtension());

  $env->addFunction(new \Twig_SimpleFunction('customTwigFunctionThatSaysWorld', function () {
    return 'Custom World';
  }));
}
