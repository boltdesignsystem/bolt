<?php
namespace PatternKit;


use Silex\Application;
use Silex\ControllerProviderInterface;
use Symfony\Component\HttpFoundation\Request;

class ApiControllerProvider implements ControllerProviderInterface
{
    public function connect(Application $app)
    {
        // creates a new controller based on the default route
        $controllers = $app['controllers_factory'];

        $controllers->post('/render/{target}', function (Request $request, $target) use ($app) {

            if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {

                $contents = json_decode($request->getContent(), true);

                if (isset($app['config'])) {
                    $contents["app_config"] = $app['config'];
                }

                if ($target == "page") {
                  if ($contents['name'] || $contents['template']) {
                      return $app['twig']->render("basic.twig", $contents);
                  }
                  else {
                    return "sorry";
                  }
                }

                if (!empty($contents["template"])) {
                    return $app['twig']->render($contents["template"], $contents);
                }
                else {
                    return $app['twig']->render($contents["name"] . '.twig', $contents);
                }
            }
        });



        $controllers->post('/validate', function (Request $request) use ($app) {

            if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {

                function traverse($data, &$to_test, $i=0, $path="root") {
                    foreach ($data as $key => &$value) {
                        if (is_array($value)) {
                            $array_name = $key;
                            foreach ($value as $key=>$item) {
                                if (is_object($item)) {
                                    if ($item->name) {
                                        $location = $path . "." . $array_name . "." . $key;
                                        $to_test[] = array("depth" => $i, "obj" => $item, "path" => $location);
                                    }
                                    traverse($item, $to_test, $i+1, $location);
                                }
                            }
                        }
                    }
                    usort($to_test, function($a, $b) {
                        return $b['depth'] - $a['depth'];
                    });
                }

                function test($data, &$reply) {
                    $retriever = new \JsonSchema\Uri\UriRetriever;
                    $refResolver = new \JsonSchema\RefResolver($retriever);
                    $refResolver::$maxDepth = 9999;
                    $validator = new \JsonSchema\Validator();
                    $valid  = true;
                    foreach ($data as $item) {
                        $path = get_asset_path($item['obj']->name, 'schemas');
                        $schema = $retriever->retrieve('file://' . realpath($path));
                        $refResolver->resolve($schema);

                        //Validate
                        $validator->check($item['obj'], $schema);

                        if (!$validator->isValid()) {
                            $valid = false;
                            foreach ($validator->getErrors() as $error) {
                                $path = $item['path'];
                                $name = $item['obj']->name;
                                $property = $error['property'];
                                $message = $error['message'];
                                $reply .= sprintf("Error at %s: <br> %s [%s] %s\n <br><br>", $path, $name, $property, $message);
                            }
                            break;
                        }
                    }
                }
                $to_test = array();
                $reply = "";
                $retriever = new \JsonSchema\Uri\UriRetriever;
                $refResolver = new \JsonSchema\RefResolver($retriever);
                $refResolver::$maxDepth = 9999;
                $validator = new \JsonSchema\Validator();

                $data = (object) json_decode($request->getContent());


                $path = get_asset_path($data->name, 'schemas');

                $schema = $retriever->retrieve('file://' . realpath($path));

                $refResolver->resolve($schema);

                //Validate
                $validator->check($data, $schema);

                if ($validator->isValid()) {
                    $reply =  "The supplied JSON validates against the schema.\n";
                } else {
                    $to_test[] = array("depth" => 0, "obj" => $data, "path" => "root");
                    traverse($data, $to_test);
                    test($to_test, $reply);
                }

                return $reply;

            }

        });


        return $controllers;
    }
}
?>
