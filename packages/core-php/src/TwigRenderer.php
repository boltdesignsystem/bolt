<?php

namespace Bolt;

use Bolt;
use Webmozart\PathUtil\Path;
use RecursiveIteratorIterator;
use RecursiveDirectoryIterator;
use Symfony\Component\Finder\Finder;

// Twig docs for this: https://twig.symfony.com/doc/1.x/api.html

class TwigRenderer {
  /**
   * @var $twig \Twig\Environment
   */
  private $twig;
  private $twigLoaders;
  private $loaders;
  private $twigExtensions;

  private $relativePathRoot;

  /**
   * TwigRenderer constructor.
   * @param string $twigNamespaceConfigPath - Relative path to `twig-namespaces.json`
   * @param string $relativePathRoot - Directory path where above path is relative from
   * @param Twig_Loader_Filesystem[] $extraTwigLoaders - (optional) Array of extra Twig Loaders created with `new Twig_Loader_Filesystem()` to get added.
   * @param string[] $extraTwigExtensions - (optional) Extra Twig Extensions strings of callables that will get passed as `$extra` to `$twig->addExtension(new $extra())` and then added to Twig Environment
   */
  function __construct(string $twigNamespaceConfigPath, $relativePathRoot, $extraTwigLoaders = [], $extraTwigExtensions = []) {
    $twigNamespaceConfig = \BasaltInc\TwigTools\Utils::getData($twigNamespaceConfigPath);
    $twigLoaderConfig = \BasaltInc\TwigTools\Namespaces::buildLoaderConfig($twigNamespaceConfig, $relativePathRoot);
    $boltTwigLoader = \BasaltInc\TwigTools\Namespaces::addPathsToLoader($twigLoaderConfig);


    $this->relativePathRoot = $relativePathRoot;

    $buildLoaderPaths = $this->buildLoaderPaths($twigNamespaceConfig, $relativePathRoot);

    $twigLoaders = [
      $boltTwigLoader,
    ];

    // Recursively add known Twig directories so none-namespaced Twig references like `./my-template.twig` still work!
    foreach ($buildLoaderPaths as $path) {
      $loader = new \Twig_Loader_Filesystem(dirname(Path::makeAbsolute($path, $this->relativePathRoot)));
      $twigLoaders[] = $loader;
    }

    if ($extraTwigLoaders) {
      $twigLoaders = array_merge($twigLoaders, $extraTwigLoaders);
    }

    $loaders = new \Twig_Loader_Chain($twigLoaders);

    // Create Twig Environment with the `$loaders` just made and some global settings
    $this->twig = new \Twig\Environment($loaders, [
      'debug' => true,
      'autoescape' => false,
    ]);

    $this->twigExtensions = [
      '\Bolt\TwigExtensions\BoltCore',
      '\Bolt\TwigExtensions\BoltExtras',
    ];

    if ($extraTwigExtensions) {
      $twigExtensions = array_merge($this->twigExtensions, $extraTwigExtensions);
    }

    // Add all our Twig Extensions for our custom functions, filters, etc
    foreach ($this->twigExtensions as $twigExtension) {
      $this->twig->addExtension(new $twigExtension());
    }
    $this->twig->addExtension(new \Twig_Extension_Debug());

  }

  public static function buildLoaderPaths($config, $pathRoot) {
    $paths = [];
    foreach ($config as $item => $settings) {
      foreach ($settings['paths'] as $path) {
        $fullPath = Path::join($pathRoot, $path);

        if (isset($settings['recursive']) && $settings['recursive']) {
          $finder = new Finder();
          $finder->files()->in($fullPath)->name('*.twig');

          foreach ($finder as $file) {
            $paths[] = $file->getRealPath();
          }
        } else {
          $paths[] = $fullPath;
        }
      }
    }
    return $paths;
  }

  /**
   * Render Twig Template
   * @param string $templatePath - Template Path that can use Namespaces (i.e. `@bolt/thing.twig`)
   * @param array $data - Optional data to get passed to template
   * @return string $html - Renedered HTML string
   */
  public function render($path, $data = []) {
    $template = '';

    if (strpos($path, '@') !== false) {
      // Namespace path
      $template = $this->twig->load($path);

    } else if (preg_match("/({{|{%)/i", $path)){
      // Inlined template
      $template = $this->twig->createTemplate($path);

    } else {
      // Everything else (ie local file path)
      $templatePath = Path::makeAbsolute($path, $this->relativePathRoot);

      $newTemplate = file_get_contents($templatePath);

      $template = $this->twig->createTemplate($newTemplate);
    }

    $html = $template->render($data);
    return $html;

    // Work in Progress Web Component Server-side Rendering (SSR) -- ignore for now!
    // $tag_templates = ['bolt-button' => '@bolt-components-button/button-inner.twig'];
    // $renderer = new Bolt\TwigRendererSSR($tag_templates, $this->twig);
    // $elements = array('bolt-button');

    // foreach($elements as $element){
    //   if (strpos($html, $element) !== false) {
    //     $rendered_html = $renderer->render($html);
    //     return $rendered_html;
    //   } else {
    //     return $html;
    //   }
    // }
  }

  /**
   * @return \Twig\Environment
   */
  public function getTwig() {
    return $this->twig;
  }
}