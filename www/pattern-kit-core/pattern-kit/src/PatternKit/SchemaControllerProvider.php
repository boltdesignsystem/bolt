<?php
namespace PatternKit;


use Silex\Application;
use Silex\ControllerProviderInterface;
use Symfony\Component\Yaml\Yaml;


class SchemaControllerProvider implements ControllerProviderInterface
{
    public function connect(Application $app)
    {
        // creates a new controller based on the default route
        $controllers = $app['controllers_factory'];

        $controllers->get('/{pattern}', function ($pattern) use ($app) {

            $retriever = new \JsonSchema\Uri\UriRetriever;
            $path = get_asset_path($pattern, 'schemas');
            $seed_path = get_asset_path($pattern, 'data');
            $template_path = get_asset_path($pattern, 'templates');
            $docs_path = get_asset_path($pattern, 'docs');
            $data = array();



            $schema = $retriever->retrieve('file://' . realpath($path));

            // Navigation
            $data['nav']= getNav($pattern);
            if (array_key_exists('sg', $app["config"]["paths"])) {
                $data['nav']['sg_active'] = true;
            }
            // end navigation

            if ($seed_path) {

                $seed_file = file_get_contents('file://' . realpath($seed_path));
                if (($pathinfo = pathinfo($seed_path)) && isset($pathinfo['extension']) && $pathinfo['extension'] == 'yaml') {

                    $seed_data = Yaml::parse($seed_file);

                }
                elseif (!empty($seed_file)) {
                    $seed_data = json_decode($seed_file, true);
                }
                else {
                    $seed_data = array();
                }
                data_replace($seed_data);
            }
            else $seed_data = array();


            $refResolver = new \JsonSchema\RefResolver($retriever);
            $refResolver::$maxDepth = 9999;
            $refResolver->resolve($schema);

            if (isset($app['config'])) {
                $data["app_config"] = $app['config'];
            }


            $docs_file = file_get_contents('file://' . realpath($docs_path));

            $parser = new \Mni\FrontYAML\Parser;;

            $docs_data = $parser->parse($docs_file);

            $data['docs_yaml'] = $docs_data->getYAML();
            $data['docs_content'] = $docs_data->getContent();

            $data['schema'] = json_encode($schema);
            $data['docs_json'] = (array) $seed_data;
            $data['starting'] = json_encode($seed_data);
            $data['raw_schema'] = (array) json_decode(file_get_contents($path), true);
            if ($template_path) {
                $template_file = file_get_contents('file://' . realpath($template_path));
                $data['template_markup'] = $template_file;

            }

            return $app['twig']->render("display-schema.twig", $data);

        })->bind('schema');

        return $controllers;
    }
}
?>
