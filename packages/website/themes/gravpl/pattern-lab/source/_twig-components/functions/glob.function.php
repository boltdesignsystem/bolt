<?php

  $function = new Twig_SimpleFunction('glob', function($sourcedir, $types) {
    
    $documentRoot = getcwd();
    if (strpos($documentRoot, 'pattern-lab')) {
      $documentRoot = trim($documentRoot, "pattern-lab");
    }
    $documentRoot = rtrim($documentRoot, '/') . '/';
    $filePath = $documentRoot . $sourcedir;
    
    
    $files = array();

    foreach (glob("{$filePath}/*.{$types}") as $file) {
      $path_parts = pathinfo($file);
      $filename = $path_parts['filename'];

      $files[] = $filename;
    }

    return $files;

  });

