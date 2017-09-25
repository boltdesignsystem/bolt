<?php
namespace PatternKit;


use Silex\Application;
use Silex\ControllerProviderInterface;
use Mni\FrontYAML\Parser;

class StyleGuideControllerProvider implements ControllerProviderInterface
{
    public function connect(Application $app)
    {
        // creates a new controller based on the default route
        $controllers = $app['controllers_factory'];

        //@TODO remove duplicate path functions. Currently needed as I cannot pass "index" into pattern
        $controllers->get('/', function ($pattern) use ($app) {


            $sg_path = get_asset_path($pattern, 'sg');

            $sg_file = file_get_contents('file://' . realpath($sg_path));

            $parser = new Parser();

            $sg_data = $parser->parse($sg_file);

            if (isset($app['config'])) {
                $data["app_config"] = $app['config'];
            }


            $data['secondary_nav'] = getDocNav($pattern);
            $data['nav']= getNav($pattern);
            $data['sg_yaml'] = $sg_data->getYAML();
            $data['sg_content'] = $sg_data->getContent();

            return $app['twig']->render("display-sg.twig", $data);
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
            $data['nav']= getNav($pattern);
            $data['sg_yaml'] = $sg_data->getYAML();
            $data['sg_content'] = $sg_data->getContent();

            return $app['twig']->render("display-sg.twig", $data);
        })->bind('styleguide');


        return $controllers;
    }
}
?>


