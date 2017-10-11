<?php

// $global = function () {
class Twig_Extension_bolt_image_sizes extends Twig_Extension implements Twig_Extension_GlobalsInterface {
    public static $data;

    function __construct(){
        $documentRoot = getcwd();
        $json = file_get_contents($documentRoot . '/packages/bolt-common/image-sizes/image-sizes.data.json');
        self::$data = json_decode($json)->boltImageSizes;
    }

    public static function getImageSizes() {
        return self::$data;
    }

   public function getGlobals(){
        return array(
            'globalBoltImageSizes' => self::getImageSizes(),
        );
    }
}
//   return is_array($attributes) ? new Attribute($attributes) : $attributes;
// };

// class classname
// {
//     function __construct()
//     {
//         echo __METHOD__,"\n";
//     }
// }

// class Twig_Extension_bolt_test extends Twig_Extension implements Twig_Extension_GlobalsInterface {
  
//   public static function getVariable() {
//     echo 'get Variable!';

//     return '42';
//   }


// $bar= new $classname("test");



//   public function getGlobals(){
//       return array(
//           'bolt_test' => self::getVariable(),
//           // ...
//       );
//   }
// }

// /**
//  * @author Salem Ghoweri <me@salemghoweri.com>
//  */
// // $filter = new Twig_SimpleFilter('clean_class', function ($string) {
// //   return $string;
// // });
// $global =  twig_Extension_Colors(){
//   echo 'hi';

//   return '42';
// };

// // function twig_colors(){
// //   $sizes = array(50, 100, 150);

// //   return $sizes;
// // }


// class Twig_Extension_Colors extends Twig_Extension
// {
//   public function getGlobals(){
//     $globals = array(
//       new addGlobal('colors', twig_colors),
//     );
//     return $globals;
//   }

//   public function getName(){
//     return 'colors';
//   }
// }

// /**
//  * Shuffles an array.
//  *
//  * @param array|Traversable $array An array
//  *
//  * @return array
//  */
