<?php

$function = new Twig_SimpleFunction('inline', function ($fileName, $remote = false) {

  $documentRoot = trim(getcwd(), "pattern-lab");
  $filePath = $documentRoot . $fileName;
  
  if ($fileName !== '' && file_exists($filePath)) {
    $content = file_get_contents($filePath);
    return $content;
  } else {
    return '';
  }

});