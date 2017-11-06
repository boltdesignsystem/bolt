<?php

use Symfony\Component\Yaml\Yaml;

$function = new \Twig_SimpleFunction('pattern_template', function (Twig_Environment $env, $context, $patternName, $manifestPath = '/bolt-manifest.yml') {

  $originalPatternName = $patternName;

  $patternName = preg_replace('/\\.[^.\\s]{3,4}$/', '', $patternName); // Remove file extension if it was specified
  $patternName = ltrim($patternName, '_'); // Remove _ prefix
  $patternName = preg_replace('/^[0-9\-]+/', '', $patternName); // remove number prefix, if it exists
  $patternName = str_replace('.', '_', $patternName); // replace all dots with underscores
  $patternName = str_replace('-', '_', $patternName); // replace all dahses with underscores

  

  // From get_data.function.php TODO: figure out how to call one twig extension from another twig extension
  /**
   * @var \Twig_Template $template
   * @url https://twig.symfony.com/api/1.x/Twig_Template.html
   * */
  // $template = $env->resolveTemplate($manifestPath);
  // $source = $template->getSourceContext();

  /** @var string $full_path */
  $full_path = __DIR__ . '/../../../../..' . $manifestPath;

  $file_data = [];

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

  if (isset($file_data[$patternName])){
    return $file_data[$patternName]["namespace"];
  } else {
    return $originalPatternName;
  }




  // /**
  //  * @var \Twig_Template $template
  //  * @url https://twig.symfony.com/api/1.x/Twig_Template.html
  //  * */
  // $template = $env->resolveTemplate('@bolt/' . $template . '.twig');
  

  // // /**
  // //  * @var \Twig_Source $source
  // //  * @url https://twig.symfony.com/api/1.x/Twig_Source.html
  // //  */
  // $source = $template->getSourceContext();


  // return $env->resolveTemplate($twig_self)->getSourceContext()->getPath();




  // $name = $template->getTemplateName();
  
  // print_r($name);

  // echo '
  
  
  // ';

  // print_r($template);

  // /** @var string $full_path */
  // $full_path = $source->getPath();


  // print_r($template);

  // return $full_path;

  // $file_data = [];

  // // @todo error handling for no file
  // $file_string = file_get_contents($full_path);
  // $file_type = pathinfo($full_path)['extension'];

  // switch ($file_type) {
  //   case 'json':
  //     $file_data = json_decode($file_string, true);
  //     break;
  //   case 'yaml' || 'yml':
  //     $file_data = Yaml::parse($file_string);
  //     break;
  // }

  // return $file_data;
}, [
  'needs_environment' => true,
  'needs_context' => true
]);

?>