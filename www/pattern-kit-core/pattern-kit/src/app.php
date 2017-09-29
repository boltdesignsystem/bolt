<?php

use Silex\Application;
use Silex\Provider\HttpCacheServiceProvider;
// use Silex\Provider\MonologServiceProvider;
use Silex\Provider\ServiceControllerServiceProvider;
use DerAlex\Silex\YamlConfigServiceProvider;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Yaml\Yaml;
use Carbon\Carbon;
use Mni\FrontYAML\Parser;



date_default_timezone_set('America/Los_Angeles');

define("ROOT_PATH", __DIR__ . "/..");


$app = new Application();
$app->register(new YamlConfigServiceProvider("./.pk-config.yml"));
$app->register(new Silex\Provider\UrlGeneratorServiceProvider());


//handling CORS preflight request
$app->before(function (Request $request) {
   if ($request->getMethod() === "OPTIONS") {
       $response = new Response();
       $response->headers->set("Access-Control-Allow-Origin","*");
       $response->headers->set("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS");
       $response->headers->set("Access-Control-Allow-Headers","Content-Type");
       $response->setStatusCode(200);
       return $response->send();
   }
}, Application::EARLY_EVENT);

//handling CORS respons with right headers
$app->after(function (Request $request, Response $response) {
   $response->headers->set("Access-Control-Allow-Origin","*");
   $response->headers->set("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS");
});

// //accepting JSON
// $app->before(function (Request $request) {
//     if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
//         $data = json_decode($request->getContent(), true);
//         $request->request->replace(is_array($data) ? $data : array());
//     }
// });

$app->register(new ServiceControllerServiceProvider());

$app->register(new HttpCacheServiceProvider(), array("http_cache.cache_dir" => ROOT_PATH . "/storage/cache",));

// $app->register(new MonologServiceProvider(), array(
//     "monolog.logfile" => ROOT_PATH . "/storage/logs/" . Carbon::now('America/Los_Angeles')->format("Y-m-d") . ".log",
//     "monolog.name" => "application"
// ));

$app['debug'] = true;


// Set Up Twig

//// Twig Template Paths
$twig_template_paths = array();

array_push($twig_template_paths, ROOT_PATH . '/resources/templates');

if (is_string($app['config']['paths']['templates'])) {
    array_push($twig_template_paths, realpath('./' . $app['config']['paths']['templates']) );
}
elseif (is_array($app['config']['paths']['templates'])) {
    foreach ($app['config']['paths']['templates'] as $value) {
        array_push($twig_template_paths, realpath('./' . $value));
    }
}

//// Register Twig

$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => $twig_template_paths,
    'twig.options' => array(
        'strict_variables' => false
        ),
));


// Custom Functions


function data_replace(&$data) {
    if (is_array($data)) {
      foreach ($data as &$value) {
          if (is_array($value) ) {
              data_replace($value);
          }
          elseif (is_string($value) && $value[0] == '@') {
              $file_path = 'file://' . realpath(get_asset_path(substr($value, 1), 'data'));
              if (($pathinfo = pathinfo($file_path)) && isset($pathinfo['extension']) && $pathinfo['extension'] == 'yaml') {
                  $data_replace_with = Yaml::parse(file_get_contents($file_path));
              }
              else {
                  $data_replace_with = json_decode(file_get_contents($file_path), true);
              }

              $value = data_replace($data_replace_with);
          }
      }
    }
    return $data;
}

//// Get path to matching asset
function get_asset_path($name, $type) {
    global $app;

    if (in_array($type, array("templates", "data", "schemas", "docs", "sg", "test_data"))) {
        $return = NULL;
        $paths = $app['config']['paths'][$type];
        if (is_array($paths)) {
          $paths = array_reverse($paths);
        }
        if ($paths) {
            foreach ($paths as $path) {
                $extension = $app['config']['extensions'][$type];
                $yaml_extension = str_replace('.json', '.yaml', $extension);
                $dir =  './' . $path;
                $file_path = "{$dir}/{$name}{$extension}";
                $yaml_file_path = "{$dir}/{$name}{$yaml_extension}";
                if (is_dir($dir) && is_readable($file_path)) {
                    $return = $file_path;
                    break;
                }
                else if (is_dir($dir) && is_readable($yaml_file_path)) {
                  $return = $yaml_file_path;
                  break;
                }
            }
        }

        return $return;
    }
    else {
        throw new Exception($type . ' is not equal to template, data or schema');
    }
}

//// Create Primary Navigation for pattern library

function getNav($pattern) {
  global $app;
  $categories = $app['config']['categories'];
  $schema_paths = array();
  $nav = array();
  $nav['title'] = $app['config']['title'];

  foreach ($app['config']['paths']['schemas'] as $path) {
    $files = scandir("./" . $path);
    $schema_paths[] = array(
        'location' => $path,
        'files' => $files
      );
  }

  if ($categories) {
      foreach ($categories as $category) {
        $value = strtolower(str_replace(' ', '_', $category));
        $nav['categories'][$value] = array();
        $nav['categories'][$value]['title'] = $category;
        $nav['categories'][$value]['path'] = '/' . $value;
      }
  }


  foreach ($schema_paths as $path) {
    foreach ($path['files'] as $file) {
      if (strpos($file, 'json') !== false) {
        $nav_item = array();
        $contents = json_decode(file_get_contents('./' . $path['location'] . "/" . $file), true);
        $contents['name'] = substr($file, 0, -5);
        $category = isset($contents['category']) ? $contents['category'] : false;
        $nav_item['title'] = isset($contents['title']) ? $contents['title'] : $contents['name'];
        $nav_item['path'] = $contents['name'];
        if ($contents['name'] == $pattern) {
            $nav_item['active'] = true;
        }
        if ($category) {
            $nav['categories'][$category]['items'][] = $nav_item;
        }

      }
    }
  }
  return $nav;
}


//// Create secondary navigation for styleguide

function getDocNav($pattern) {
    global $app;
    $nav = array();
    $parser = new Parser();

    foreach ($app['config']['paths']['sg'] as $path) {
        $files = glob('./' . $path .'/*' . $app['config']['extensions']['sg']);
        foreach ($files as $value) {
            $value_parts = str_split(basename($value), strpos(basename($value), "."));
            $nav_item = array();
            $sg_file = file_get_contents($value);
            $sg_data = $parser->parse($sg_file);
            $data['sg_yaml'] = $sg_data->getYAML();
            $nav_item['title'] = $data['sg_yaml']['title'];
            $nav_item['order'] = $data['sg_yaml']['order'];
            $nav_item['path'] = $value_parts[0];
            if ($value_parts[0] == $pattern) {
                $nav_item['active'] = true;
            }
            if ($value_parts[0] == 'index') {
                $nav_item['path'] = NULL;
                array_unshift($nav, $nav_item);
            }
            else {
                $nav[] =  $nav_item;
            }
        }
    }
    return $nav;
}


// Mount Routes

$app->mount('/schema', new PatternKit\SchemaControllerProvider());
$app->mount('/api', new PatternKit\ApiControllerProvider());
$app->mount('/tests', new PatternKit\TestsControllerProvider());
$app->mount('/sg', new PatternKit\StyleGuideControllerProvider());


$app->get('/', function () use ($app) {
    $data = array();
    $data['nav'] = getNav('/');
    return $app['twig']->render("display-schema.twig", $data);
});


// $app->get('/{category}', function ($category) use ($app) {

//     if (in_array($category, $app['config']['categories']) ) {
//         foreach ($app['config']['paths']['schemas'] as $path) {
//           $files = scandir("./" . $path);
//           foreach ($files as $file) {
//               $contents = json_decode(file_get_contents('./' . $path . "/" . $file), true);

//           }
//         }
//     }

//     return $app['twig']->render("display-schema.twig", $data);
// }





// $app->error(function (\Exception $e, $code) use ($app) {
//     $app['monolog']->addError($e->getMessage());
//     $app['monolog']->addError($e->getTraceAsString());
//     return new JsonResponse(array("statusCode" => $code, "message" => $e->getMessage(), "stacktrace" => $e->getTraceAsString()));
// });

return $app;




?>
