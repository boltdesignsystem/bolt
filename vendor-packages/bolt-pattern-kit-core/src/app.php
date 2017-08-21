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
//use Carbon\Carbon;
use Mni\FrontYAML\Parser;

use Symfony\Component\HttpKernel\Debug\ErrorHandler;
use Symfony\Component\HttpKernel\Debug\ExceptionHandler;

// set the error handling
ini_set('display_errors', 1);
error_reporting(-1);




date_default_timezone_set('America/Los_Angeles');

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

// $app['debug'] = false;
$app['debug'] = true;

/*
 * Set Up Twig Template Paths.
 */

// Initialize an empty array to collect the templates.
$twig_template_paths = array();

// array_push($twig_template_paths, ROOT_PATH . '/resources/templates');

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
  )
));


$app->before(function () use ($app) {

  // $twigLoader = new \Twig_Loader_Filesystem($filesystemLoaderPaths);
  // $instance   = new \Twig_Environment($twigLoader, array("debug" => $twigDebug));

  $twig = clone $app['twig'];


  // $loader = $twig->getLoader();


  $fileSystemLoader = new \Twig_Loader_Filesystem($app['config']['paths']['templates']);

  $fileSystemLoader->addPath($app['config']['namespaces']['layouts'], 'layouts');
  $fileSystemLoader->addPath($app['config']['namespaces']['includes'], 'includes');
  $fileSystemLoader->addPath($app['config']['namespaces']['patterns'], 'patterns');
  $fileSystemLoader->addPath($app['config']['namespaces']['bolt'], 'bolt');
  $stringLoader = new \Twig_Loader_String();

  // $twigLoader = new \Twig_Loader_Chain($loaders);

  $loader = new \Twig_Loader_Chain(array(
    $fileSystemLoader,
    $stringLoader
  ));

  // $twig->setLoader(new \Twig_Loader_Filesystem());
  //
  // $twig->addPath('patterns', );
  //
  //
  //
  //
  //
  //
  //
  // $twig = clone $app['twig'];


  //
  //
  // $instance   = new \Twig_Environment($loader, array("autoescape" => false));

  $app['twig']->setLoader($loader);




//
//   // Keep the current loader
//   $oldLoader = $app['twig']->getLoader();
//
//   // Temporarily set a string loader
//   $app['twig']->setLoader(new \Twig_Loader_Filesystem());
//
//
//
//   // Resolve the template - but don't render it yet.
//   // $template = $app['twig']->resolveTemplate($template);
//
//   // Restore the old loader
//   $app['twig']->setLoader($oldLoader);
//
//   $app['twig']->addPath('patterns', $app['config']['paths']['patterns']);

  // $app['twig']->addLoader(new \Twig_Loader_Filesystem());

  // $app['twig']->addPath('patterns', $app['config']['paths']['patterns']);
  //
  // $app['twig']->addPath('layouts', $app['config']['paths']['layouts']);
  //
  // $app['twig']->addPath('includes', $app['config']['paths']['includes']);
});


// print_r($paths);


// namespaces: { 'my-project': 'path/to/views/folder/' }

// $fileSystemLoader = new \Twig_Loader_Filesystem();
// $fileSystemLoader->addPath($includesDir, 'includes');
//
// $stringLoader = new \Twig_Loader_String();
// // $twigLoader = new \Twig_Loader_Chain($loaders);
//
// $twigLoader = new \Twig_Loader_Chain(array(
//   $fileSystemLoader,
//   $stringLoader
//
// // //   new Alias_Loader($options['aliases']),
// //   // new Twig_Loader_Filesystem($rootDir),
// ));
// $instance   = new \Twig_Environment($twigLoader, array("autoescape" => false));

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

/**
 * Create secondary navigation for styleguide.
 *
 * @param $pattern
 *
 * @return array
 */
function getDocNav($pattern)
{
    global $app;
    $nav    = array();
    $parser = new Parser();

    foreach ($app['config']['paths']['sg'] as $path) {
        $files = glob('./' . $path . '/*' . $app['config']['extensions']['sg']);
        foreach ($files as $value) {
            $value_parts       = str_split(basename($value), strpos(basename($value), "."));
            $nav_item          = array();
            $sg_file           = file_get_contents($value);
            $sg_data           = $parser->parse($sg_file);
            $data['sg_yaml']   = $sg_data->getYAML();
            $nav_item['title'] = $data['sg_yaml']['title'];
            $nav_item['order'] = $data['sg_yaml']['order'];
            $nav_item['path']  = $value_parts[0];
            if ($value_parts[0] == $pattern) {
                $nav_item['active'] = true;
            }
            if ($value_parts[0] == 'index') {
                $nav_item['path'] = null;
                array_unshift($nav, $nav_item);
            } else {
                $nav[] = $nav_item;
            }
        }
    }

    return $nav;
}

/**
 * Create list of patterns for REST interface.
 *
 * @return array
 *   Nested array of details for each of the patterns on this system.
 */
function listPatterns()
{
    global $app;
    $schema_paths = array();
    $list         = array();

  // Read configuration and collect the list of schema folders.
  foreach ($app['config']['paths']['schemas'] as $path) {
      $files = scandir("./" . $path);

      $schema_paths[] = array(
      'location' => $path,
      'files'    => $files,
    );
  }

  // Iterate over the schema paths to find all schema.
  foreach ($schema_paths as $path) {
      // For each file in the schema folder(s).
    foreach ($path['files'] as $raw_filename) {
        $file = strtolower($raw_filename);
      // Only look at the JSON files.
      if (strpos($file, 'json') !== false) {
          $pattern  = array();
        // Load the schema and decode for the list.
        $contents = json_decode(file_get_contents('./' . $path['location'] . "/" . $file), true);

          $contents['name']    = substr($file, 0, -5);
          $pattern['category'] = isset($contents['category']) ? $contents['category'] : false;
          $pattern['title']    = isset($contents['title']) ? $contents['title'] : $contents['name'];

        // Default to 1.0 for version of json for legacy support.
        $pattern['version'] = !empty($contents['version']) ? $contents['version'] : '1.0';

          $list[$contents['name']] = (object)$pattern;
      }
    }
  }
    return $list;
}

// Mount Routes.
$app->mount('/schema', new PatternKit\SchemaControllerProvider());
$app->mount('/api', new PatternKit\ApiControllerProvider());
$app->mount('/tests', new PatternKit\TestsControllerProvider());
$app->mount('/', new PatternKit\StyleGuideControllerProvider());

// Default route (landing page).
// $app->get('/', function () use ($app) {
//     $data        = array();
//     $data['nav'] = getNav('/');
//     return $app['twig']->render("display-schema.twig", $data);
// });

return $app;
