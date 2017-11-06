<?php
/**
 * @file app.php
 *
 * The main app code, contains all initialization.
 */

use Silex\Application;
use Silex\Provider\HttpCacheServiceProvider;
use Silex\Provider\ServiceControllerServiceProvider;
use DerAlex\Silex\YamlConfigServiceProvider;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Yaml\Yaml;
use Mni\FrontYAML\Parser;

date_default_timezone_set('America/New_York');

define("ROOT_PATH", __DIR__ . "/..");

$app = new Application();
$app->register(new YamlConfigServiceProvider("./.pk-config.yml"));
$app->register(new Silex\Provider\UrlGeneratorServiceProvider());

// Handling CORS preflight request.
$app->before(function (Request $request) {
    if ($request->getMethod() === "OPTIONS") {
        $response = new Response();
        $response->headers->set("Access-Control-Allow-Origin", "*");
        $response->headers->set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
        $response->headers->set("Access-Control-Allow-Headers", "Content-Type");
        $response->setStatusCode(200);
        return $response->send();
    }
    return null;
}, Application::EARLY_EVENT);

// Handling CORS response with right headers.
$app->after(function (Request $request, Response $response) {
    $response->headers->set("Access-Control-Allow-Origin", "*");
    $response->headers->set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
});

$app->register(new ServiceControllerServiceProvider());

$app->register(new HttpCacheServiceProvider(), array("http_cache.cache_dir" => ROOT_PATH . "/storage/cache",));

$app['debug'] = false;

/*
 * Set Up Twig Template Paths.
 */

// Initialize an empty array to collect the templates.
$twig_template_paths = array();

array_push($twig_template_paths, ROOT_PATH . '/resources/templates');

// If there is a single template in config, it'll be a string, array otherwise.
if (is_string($app['config']['paths']['templates'])) {
    array_push($twig_template_paths, realpath('./' . $app['config']['paths']['templates']));
} elseif (is_array($app['config']['paths']['templates'])) {
    foreach ($app['config']['paths']['templates'] as $value) {
        array_push($twig_template_paths, realpath('./' . $value));
    }
}

// Register Twig.
$app->register(new Silex\Provider\TwigServiceProvider(), array(
  'twig.path'    => $twig_template_paths,
  'twig.options' => array(
    'strict_variables' => false,
  ),
));

/*
 * Custom Functions
 */

/**
 * Recursively loads or parses YAML/JSON file data into PHP structures.
 *
 * @param $data
 *
 * @return mixed
 */
function data_replace(&$data)
{
    if (is_array($data)) {
        foreach ($data as &$value) {
            if (is_array($value)) {
                data_replace($value);
            } elseif (is_string($value) && $value[0] == '@') {
                $file_path = 'file://' . realpath(get_asset_path(substr($value, 1), 'data'));
                if (($pathinfo = pathinfo($file_path)) && isset($pathinfo['extension']) && $pathinfo['extension'] == 'yaml') {
                    $data_replace_with = Yaml::parse(file_get_contents($file_path));
                } else {
                    $data_replace_with = json_decode(file_get_contents($file_path), true);
                }

                $value = data_replace($data_replace_with);
            }
        }
    }
    return $data;
}

/**
 *  Get path to matching asset
 *
 * @param string $name
 *   The name of the asset.
 * @param string $type
 *   The type of data to find (eg templates, data, etc).
 *
 * @return null|string
 *   Path to the asset of interest.
 * @throws \Exception
 *   Exception thrown if type is not supported.
 */
function get_asset_path($name, $type)
{
    global $app;

    if (in_array($type, array(
    "templates",
    "data",
    "schemas",
    "docs",
    "sg",
    "test_data",
  ))) {
        $return = null;
        $paths  = $app['config']['paths'][$type];
        if (is_array($paths)) {
            $paths = array_reverse($paths);
        }
        if ($paths) {
            foreach ($paths as $path) {
                $extension      = $app['config']['extensions'][$type];
                $yaml_extension = str_replace('.json', '.yaml', $extension);
                $dir            = './' . $path;
                $file_path      = "{$dir}/{$name}{$extension}";
                $yaml_file_path = "{$dir}/{$name}{$yaml_extension}";
                if (is_dir($dir) && is_readable($file_path)) {
                    $return = $file_path;
                    break;
                } else {
                    if (is_dir($dir) && is_readable($yaml_file_path)) {
                        $return = $yaml_file_path;
                        break;
                    }
                }
            }
        }

        return $return;
    } else {
        throw new Exception($type . ' is not equal to template, data or schema');
    }
}

/**
 * Create Primary Navigation for pattern library
 *
 * @param $pattern
 *
 * @return array
 */
function getNav($pattern)
{
    global $app;
    $categories   = $app['config']['categories'];
    $schema_paths = array();
    $nav          = array();
    $nav['title'] = $app['config']['title'];

    foreach ($app['config']['paths']['schemas'] as $path) {
        $files = scandir("./" . $path);

        $schema_paths[] = array(
      'location' => $path,
      'files'    => $files,
    );
    }

    if ($categories) {
        foreach ($categories as $category) {
            $value = strtolower(str_replace(' ', '_', $category));

            $nav['categories'][$value]          = array();
            $nav['categories'][$value]['title'] = $category;
            $nav['categories'][$value]['path']  = '/' . $value;
        }
    }


    foreach ($schema_paths as $path) {
        foreach ($path['files'] as $file) {
            if (strpos($file, 'json') !== false) {
                $nav_item = array();
                $contents = json_decode(file_get_contents('./' . $path['location'] . "/" . $file), true);

                $contents['name']  = substr($file, 0, -5);
                $category          = isset($contents['category']) ? $contents['category'] : false;
                $nav_item['title'] = isset($contents['title']) ? $contents['title'] : $contents['name'];
                $nav_item['path']  = $contents['name'];
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



function get_pattern_defaults($pattern)
{
    $seed_path = get_asset_path($pattern, 'data');

    if ($seed_path) {
        $seed_file = file_get_contents('file://' . realpath($seed_path));
        if (($pathinfo = pathinfo($seed_path)) && isset($pathinfo['extension']) && $pathinfo['extension'] == 'yaml') {
            $seed_data = Yaml::parse($seed_file);
        } elseif (!empty($seed_file)) {
            $seed_data = json_decode($seed_file, true);
        } else {
            $seed_data = array();
        }
        data_replace($seed_data);
    } else {
        $seed_data = array();
    }
    return $seed_data;
}


// Mount Routes.
$app->mount('/schema', new PatternKit\SchemaControllerProvider());
$app->mount('/api', new PatternKit\ApiControllerProvider());

// Default route (landing page).
$app->get('/', function () use ($app) {
    $data        = array();
    $data['nav'] = getNav('/');
    return $app['twig']->render("display-schema.twig", $data);
});

return $app;
