<?php

$function = new Twig_SimpleFunction('inline', function ($fileName, $prefix = '/dist') {

  $documentRoot = trim('../../', "");
  $filePath = $documentRoot . $prefix . $fileName;

  if ($fileName !== '' && file_exists($filePath)) {
    $content = file_get_contents($filePath);
    return $content;
  } else {
    return '';
  }

});