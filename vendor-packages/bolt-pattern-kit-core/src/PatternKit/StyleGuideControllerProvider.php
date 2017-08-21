<?php
/**
 * @file StyleGuideControllerProvider.php
 */

namespace PatternKit;

use Silex\Application;
use Silex\ControllerProviderInterface;
use Mni\FrontYAML\Parser;

/**
 * Class StyleGuideControllerProvider
 *
 * @package PatternKit
 */
class StyleGuideControllerProvider implements ControllerProviderInterface
{
    /**
   * Creates a new controller based on the default route.
   *
   * @param \Silex\Application $app
   *
   * @return mixed
   */
  public function connect(Application $app)
  {
      $controllers = $app['controllers_factory'];

    //@TODO remove duplicate path functions. Currently needed as I cannot pass "index" into pattern
    $controllers->get('/', function ($pattern) use ($app) {
        $sg_path = get_asset_path($pattern, 'sg');
        $sg_file = file_get_contents('file://' . realpath($sg_path));



        $templateDir = $app['config']['paths']['templates'][0];

        // $twig = clone $app['twig'];
        // $twig->setLoader(new \Twig_Loader_String());
        // $sg_file = $twig->render(
        //   ,
        //   $data
        // );



        // $test = $app['twig']->render($sg_file, $contents);
        //
        // return $app['twig']->render("display-schema.twig", $data);

        $parser = new Parser();
        $sg_data = $parser->parse($sg_file);

        if (isset($app['config'])) {
            $data["app_config"] = $app['config'];
        }

        $data['secondary_nav'] = getDocNav($pattern);
        $data['nav']           = getNav($pattern);
        $data['sg_yaml']       = $sg_data->getYAML();
        $data['sg_content']    = $sg_data->getContent();

        $loaders   = array();

        // $filesystemLoader = new \Twig_Loader_Filesystem($filesystemLoaderPaths);
        // $filesystemLoader =
        // $loaders[] = $filesystemLoader




        // $fileSystemLoader = new \Twig_Loader_Filesystem($templateDir);
        $fileSystemLoader = new \Twig_Loader_Filesystem($app['config']['paths']['templates']);
        // $fileSystemLoader->addPath($templateDir, 'bolt');



        $fileSystemLoader->addPath($app['config']['namespaces']['layouts'], 'layouts');
        $fileSystemLoader->addPath($app['config']['namespaces']['includes'], 'includes');
        $fileSystemLoader->addPath($app['config']['namespaces']['patterns'], 'patterns');
        $fileSystemLoader->addPath($app['config']['namespaces']['bolt'], 'bolt');


        $stringLoader = new \Twig_Loader_String();
        // $twigLoader = new \Twig_Loader_Chain($loaders);

        $twigLoader = new \Twig_Loader_Chain(array(
          $fileSystemLoader,
          $stringLoader

        // //   new Alias_Loader($options['aliases']),
        //   // new Twig_Loader_Filesystem($rootDir),
        ));
        $instance   = new \Twig_Environment($twigLoader, array("autoescape" => false));


        // $tplName = uniqid( 'string_template_', true );
        $sg_data = $instance->render($sg_file, $data);
        $sg_data = $parser->parse($sg_data);

        $data['sg_yaml']       = $sg_data->getYAML();
        $data['sg_content']    = $sg_data->getContent();

        // $text = $instance->render(array("pattern" => $text, "data" => $data));
        // $twigLoader->addPath($templateDir, 'bolt');

        //
        // // $loader = clone $app['twig'];
        // // $env->setCache(false);
        // $loader = new \Twig_Loader_Array(array(
        //   // $tplName => $sg_file
        //   $tplName => $sg_file
        // ));
        // $loader->addPath();
        //
        // // $loader = new Twig_Loader_Chain(array(
        // // //   new Alias_Loader($options['aliases']),
        // //   // new Twig_Loader_Filesystem($rootDir),
        // // ));
        // $twig = new \Twig_Environment($loader, array('autoescape' => false));
        //
        // // $twig = new \Twig_Environment($loader, array(
        // //   'autoescape' => false
        // // ));
        //
        // $data['sg_content'] = $twig->render($tplName, $data);




        // $fileInfo = pathinfo($entry);
        //
        // $options = array_merge(array(
        //   'aliases' => array(),
        //   'context' => array(),
        //   'staticRoot' => ''
        // ), $options);
        //
        // // Get the root template directory either from the given file or specified in the options.
        // $isRootOption = array_key_exists('root', $options) && $options['root'];
        // $rootDir = $isRootOption ? $options['root'] : $fileInfo['dirname'];
        //
        // $prefix = _getFilepathPrefix($rootDir, $fileInfo['dirname']);
        // $staticRoot = $options['staticRoot'];
        //
        // $loader = new Twig_Loader_Chain(array(
        //   new Alias_Loader($options['aliases']),
        //   new Twig_Loader_Filesystem($rootDir),
        // ));
        // $twig = new Twig_Environment($loader, array('autoescape' => false));
        //
        //
        // $filter = new Twig_SimpleFilter('path', function ($path) use($staticRoot) {
        //   return rtrim($staticRoot, '/') . '/' . ltrim($path, '/');
        //   // return rtrim($staticRoot, '/') . '/' . ltrim($path, '/');
        // });
        // $twig->addFilter($filter);
        //
        // $filesystemLoaderPaths = array();
        // $filesystemLoader = new \Twig_Loader_Filesystem($filesystemLoaderPaths);

        // echo $twig->render($tplName, $data);

        // $html = new Response( $env->render( $tplName,  ));







        // print_r($rendered);

        $layout = "@layouts/display-sg";
        if ($data['sg_yaml']['layout']){
          $layout = '@layouts/' . $data['sg_yaml']['layout'];
        }


        return $app['twig']->render($layout . ".twig", $data);
    })->value('pattern', "index")->bind('styleguide-home');

      $controllers->get('/{pattern}', function ($pattern) use ($app) {
          $sg_path = get_asset_path($pattern, 'sg');
          $sg_file = file_get_contents('file://' . realpath($sg_path));

          $parser = new Parser();
          $sg_data = $parser->parse($sg_file);

          if (isset($app['config'])) {
              $data["app_config"] = $app['config'];
          }

          $data['secondary_nav'] = getDocNav($pattern);
          $data['nav']           = getNav($pattern);
          $data['sg_yaml']       = $sg_data->getYAML();
          $data['sg_content']    = $sg_data->getContent();

          return $app['twig']->render("@layouts/display-sg.twig", $data);
      })->bind('styleguide');

      return $controllers;
  }
}
