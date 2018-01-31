<?php

use Symfony\Component\Yaml\Yaml;

$function = new \Twig_SimpleFunction('get_data', function (Twig_Environment $env, $context, $path) {

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
  $file_data = [];

  if ($full_path !== '' && file_exists($full_path)) {
    // @todo error handling for no file
    $file_string = file_get_contents($full_path);
    $file_type = pathinfo($full_path)['extension'];

    switch ($file_type) {
    case 'json':
      $file_data = json_decode($file_string, true);
      break;
    case 'yaml' || 'yml':
      $file_data = Yaml::parse($file_string);
        break;
    }

    return $file_data;
  } else {
    print "get_data.function.php Twig Error: Can't find " . $path;
    return $full_path;
  }
}, [
  'needs_environment' => true,
  'needs_context' => true,
]);

?>