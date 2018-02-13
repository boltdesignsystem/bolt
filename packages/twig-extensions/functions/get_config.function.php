<?php

use Symfony\Component\Yaml\Yaml;

$function = new \Twig_SimpleFunction('get_config', function (Twig_Environment $env, $context, $path) {

  /**
   * @var \Twig_Template $template
   * @url https://twig.symfony.com/api/1.x/Twig_Template.html
   * */
  $template = $env->resolveTemplate($path);

  /**
   * @var \Twig_Source $source
   * @url https://twig.symfony.com/api/1.x/Twig_Source.html
   */
  $source = $template->getSourceContext();

  /** @var string $full_path */
  $full_path = $source->getPath();

  $config = exec("node -e 'const config = require('\'$full_path\''); console.log(JSON.stringify(config));'");

  return $config;

}, [
  'needs_environment' => true,
  'needs_context' => true,
]);

?>