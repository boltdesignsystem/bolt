<?php
namespace Grav\Plugin;

use Grav\Common\Plugin;
use RocketTheme\Toolbox\Event\Event;
use Symfony\Component\Finder\Finder;

/**
 * Class TwigExtensionsPlugin
 * @package Grav\Plugin
 */
class PatternLabTwigNamespacesPlugin extends Plugin
{
    /**
     * @return array
     *
     * The getSubscribedEvents() gives the core a list of events
     *     that the plugin wants to listen to. The key of each
     *     array section is the event that the plugin listens to
     *     and the value (in the form of an array) contains the
     *     callable (or function) as well as the priority. The
     *     higher the number the higher the priority.
     */
    public static function getSubscribedEvents()
    {
        return [
            'onPluginsInitialized' => ['onPluginsInitialized', 0]
        ];
    }

    /**
     * Initialize the plugin
     */
    public function onPluginsInitialized()
    {
        // Don't proceed if we are in the admin plugin
        if ($this->isAdmin()) {
            return;
        }

        // Enable the main event we are interested in
        $this->enable([
            'onTwigLoader' => ['onTwigLoader', -100],
        ]);
    }

    public function onTwigLoader()
    {
      // $theme_dir = $this->grav['locator']->findResources('theme://')[0];
      $patternLabPatternsDir = ROOT_DIR . '../' . 'pattern-lab/source';
      // $patternLabPatternsDir = $theme_dir . '/pattern-lab/source/_patterns';

      // $patternLabSourceDir = $theme_dir . '/pattern-lab/source';

      $finder = new Finder();
	    $finder->directories()->depth(0)->in($patternLabPatternsDir);
	    foreach ($finder as $file) {
			  $pattern = $file->getRelativePathName();
			    $patternBits = explode("-",$pattern,2);
          $patternTypePath = (((int)$patternBits[0] != 0) || ($patternBits[0] == '00')) ? $patternBits[1] : $pattern;

          // echo $file->getPathName();

			    //    $filesystemLoader->addPath($file->getPathName(), $patternTypePath);
$this->grav['twig']->addPath($file->getPathName(), $patternTypePath);
      // }
		}


    // $pattern = $file->getRelativePathName();

    $patternFinder = new Finder();
    $patternFinder->files()->name('*.twig')->in($patternLabPatternsDir);

    foreach ($patternFinder as $file) {
      $pattern = basename($file->getRealPath());
      $patternBits = explode("-", $pattern, 2);
      $patternTypePath = (((int)$patternBits[0] != 0) || ($patternBits[0] == '00')) ? $patternBits[1] : $pattern;
      $patternNameBits = explode(".",$patternTypePath);
      $path = pathinfo($file->getRealPath());
      $this->grav['twig']->addPath($path['dirname'], 'bolt');
    }
  }
}
      // $patternName = (((int)$patternBits[0] != 0) || ($patternBits[0] == '00')) ? $patternNameBits[1] : $pattern;

      // print $file->getPathName();
      // print $patternName;
      // print_r($patternNameBits[0]);



      // print $path['dirname'];

        // echo $file->getPathName();

        //    $filesystemLoader->addPath($file->getPathName(), $patternTypePath);

    // }


		// return $filesystemLoader;



        //  $this->grav['twig']->addPath($theme_dir . '/pattern-lab/source/_patterns/00-atoms', 'atoms');
