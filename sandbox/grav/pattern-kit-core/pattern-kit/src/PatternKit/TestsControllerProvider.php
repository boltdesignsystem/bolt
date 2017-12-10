<?php
namespace PatternKit;


use Silex\Application;
use Silex\ControllerProviderInterface;

class TestsControllerProvider implements ControllerProviderInterface
{
    public function connect(Application $app)
    {
        // creates a new controller based on the default route
        $controllers = $app['controllers_factory'];

        $controllers->get('/{name}/{data_array}', function ($name, $data_array) use ($app) {

            $data_path = get_asset_path($name, "test_data");

            if (file_exists($data_path)) {
                $file_data = json_decode(file_get_contents($data_path), true);
            }
            else {
                trigger_error($name . " is missing an associated data file. Create " . $name . ".tests.json in the " . $name . "/library folder. </br></br>");
                exit;
            }

            // Test if array of tests data
            if (array_keys($file_data) == range(0, count($file_data) - 1)) {
                $file_data = $file_data[$data_array]["data"];
            }

            if ($file_data['name'] || $file_data['template']) {
                if (isset($app['config'])) {
                    $file_data["app_config"] = $app['config'];
                }
                return $app['twig']->render("basic.twig", $file_data);
            }
            else {
                trigger_error($name . ".tests.json is missing a name or template value.</br></br>");
                exit;
            }

        })
        ->value('data_array', 0);

        return $controllers;
    }
}
?>


