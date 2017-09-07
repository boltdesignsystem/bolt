<?php
  
  if (function_exists('rglob') == false) {
    function rglob($pattern, $flags = 0){
      $files = glob($pattern, $flags); 
      foreach (glob(dirname($pattern).'/*', GLOB_ONLYDIR|GLOB_NOSORT) as $dir) {
          $files = array_merge($files, rglob($dir.'/'.basename($pattern), $flags));
      }
      return $files;
    }
  }
  
  $function = new Twig_SimpleFunction('lastmodified', function($filename) {
    // $folder = getcwd() . "/source/";
    
    // var_dump();
    $found = rglob(getcwd() . '/source/*/' . $filename);
    
    if (file_exists($found[0])) {
      return filemtime($found[0]);
      // return strtotime( substr(, 15) );
        // echo "$filename was last modified: " . date ("F d Y H:i:s.", );
    }
    
    
    // 
    // $dir = new RecursiveDirectoryIterator($folder);
    // $ite = new RecursiveIteratorIterator($dir);
    // $files = new RegexIterator($ite, $filename, RegexIterator::GET_MATCH);
    // $fileList = array();
    // foreach($files as $file) {
    //     $fileList = array_merge($fileList, $file);
    // }
    // var_dump($fileList);
    // return $fileList;
    
    
    // $files = glob()
    // $found = glob(getcwd() . $filename);
    // var_dump($found);
    // $files = array();
    // 
    // foreach (glob("{$sourcedir}/*.{$types}") as $file) {
    //   $path_parts = pathinfo($file);
    // 
    //   $filename = $path_parts['filename'];
    // 
    //   $files[] = $filename;
    // }
    // 
    // return $files;

  });

