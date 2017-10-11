<?php

$filter = new Twig_SimpleFilter('webpack', function ($name, $manifestFile = '/bolt-website/bolt-manifest.json', $removeQueryString = true) {
  
  $documentRoot = trim(getcwd(), "");
  $filePath = $documentRoot . $manifestFile;
  
  $jsonContents   = file_get_contents($filePath);
  $manifestData = json_decode($jsonContents, true);
  
  // Remove cache-busting query string from file path value if the asset being referenced needs to be inlined (aka, removeQueryString is set to true)
  $manifestData[$name] = $removeQueryString ? preg_replace('/\?.*/', '', $manifestData[$name]) : $manifestData[$name];

  $manifestData[$name] = str_replace('/./', '/', $manifestData[$name]);

  return $manifestData[$name];
  // return $manifestData[$name];
});
