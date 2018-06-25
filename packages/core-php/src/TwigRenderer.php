<?php

namespace Bolt;
// Twig docs for this: https://twig.symfony.com/doc/1.x/api.html

class TwigRenderer {
  /**
   * @var $twig \Twig_Environment
   */
  private $twig;

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

    $twigLoaders = [
        $boltTwigLoader,
    ];

    if ($extraTwigLoaders) {
      $twigLoaders = array_merge($twigLoaders, $extraTwigLoaders);
    }

    $loaders = new \Twig_Loader_Chain($twigLoaders);

    // Create Twig Environment with the `$loaders` just made and some global settings
    $this->twig = new \Twig_Environment($loaders, [
        'debug' => true,
        'autoescape' => false,
    ]);

    $twigExtensions = [
        '\Bolt\TwigExtensions\BoltCore',
        '\Bolt\TwigExtensions\BoltExtras',
    ];

    if ($extraTwigExtensions) {
      $twigExtensions = array_merge($twigExtensions, $extraTwigExtensions);
    }

    // Add all our Twig Extensions for our custom functions, filters, etc
    foreach ($twigExtensions as $twigExtension) {
      $this->twig->addExtension(new $twigExtension());
    }
  }

  /**
   * Render Twig Template
   * @param string $templatePath - Template Path that can use Namespaces (i.e. `@bolt/thing.twig`)
   * @param array $data - Optional data to get passed to template
   * @return string $html - Renedered HTML string
   */
  public function render($templatePath, $data = []) {
    $template = $this->twig->load($templatePath);
    $html = $template->render($data);
    return $html;
  }

  /**
   * @return \Twig_Environment
   */
  public function getTwig() {
    return $this->twig;
  }
}
