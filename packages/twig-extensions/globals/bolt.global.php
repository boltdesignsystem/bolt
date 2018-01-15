<?php

class Twig_Extension_bolt extends Twig_Extension implements Twig_Extension_GlobalsInterface {
    public static $data;

    // /Users/sghoweri/sites/bolt-master/

    function __construct(){
      $cwd = getcwd();

      $config = exec("node -e 'const config = require('\'$cwd/.boltrc.js\''); console.log(JSON.stringify(config));'");

      // $buildPath = json_decode($config)->wwwDir;


      // $dataPath = exec("node -e 'console.log(path.resolve('\'$cwd/$buildPath/data/image-sizes/image-sizes.data.json\''));'");

      // $json = file_get_contents($dataPath);
      // self::$data = json_decode($json)->boltImageSizes;
    }

    public static function getImageSizes() {
        return self::$data;
    }

   public function getGlobals(){
        return array(
            'globalBoltImageSizes' => self::getImageSizes(),
            'TWIG_ENV' => 'pl',
            'disable_validate_json_schema' => false,
        );
    }
}
