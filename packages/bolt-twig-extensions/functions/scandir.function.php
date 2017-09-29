<?php

  $function = new Twig_SimpleFunction('scandir', function ($sourcedir) {

    // $files = scandir($sourcedir);
    $files = array_diff(scandir($sourcedir), array('..', '.', '.DS_Store'));

    $files = array_map(function($e){
      return pathinfo($e, PATHINFO_FILENAME);
    }, $files);

    return $files;

  });
