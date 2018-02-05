<?php
class Twig_Extension_bolt extends Twig_Extension implements Twig_Extension_GlobalsInterface {
    public static $data;
    // /Users/sghoweri/sites/bolt-master/
    function __construct(){
//        $documentRoot = getcwd();
        // $json = file_get_contents($documentRoot . '/www/build/data/image-sizes/image-sizes.data.json');
        // self::$data = json_decode($json)->boltImageSizes;
    }
    public static function getImageSizes() {
        return self::$data;
    }
   public function getGlobals(){
        return array(
            // 'globalBoltImageSizes' => self::getImageSizes(),
            'TWIG_ENV' => 'pl',
            'enable_json_schema_validation' => true,
        );
    }
}
