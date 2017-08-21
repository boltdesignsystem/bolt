<?php

/*!
 * Twig Pattern Engine Loader Class - Patterns
 *
 * Copyright (c) 2014 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 * Sets an instance of Twig to deal with patterns. Tries to find
 * files on system first. If not tries to load them as strings.
 *
 */

namespace PatternLab\PatternEngine\Twig\Loaders;

use \PatternLab\Config;
use \PatternLab\Dispatcher;
use \PatternLab\PatternEngine\Twig\Loaders\Twig\PatternPartialLoader as Twig_Loader_PatternPartialLoader;
use \PatternLab\PatternEngine\Twig\Loaders\Twig\PatternStringLoader as Twig_Loader_PatternStringLoader;
use \PatternLab\PatternEngine\Loader;
use \PatternLab\PatternEngine\Twig\TwigUtil;

class PatternLoader extends Loader {
	
	/**
	* Load a new Twig instance that uses the Pattern Loader
	*/
	public function __construct($options = array()) {
		
		// set-up default vars
		$twigDebug      = Config::getOption("twigDebug");
		$twigAutoescape = Config::getOption("twigAutoescape");
		
		// go through various places where things can exist
		$filesystemLoaderPaths = array();
		
		// see if source/_macros exists
		$macrosPath = Config::getOption("sourceDir").DIRECTORY_SEPARATOR."_macros";
		if (is_dir($macrosPath)) {
			$filesystemLoaderPaths[] = $macrosPath;
		}
		
		// see if source/_layouts exists. if so add it to be searchable
		$layoutsPath = Config::getOption("sourceDir").DIRECTORY_SEPARATOR."_layouts";
		if (is_dir($layoutsPath)) {
			$filesystemLoaderPaths[] = $layoutsPath;
		}

		// add source/_patterns subdirectories for Drupal theme template compatibility
		$patternSourceDir = Config::getOption("sourceDir").DIRECTORY_SEPARATOR."_patterns";
		$patternObjects = new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($patternSourceDir), \RecursiveIteratorIterator::SELF_FIRST);
		$patternObjects->setFlags(\FilesystemIterator::SKIP_DOTS);

		// sort the returned objects
		$patternObjects = iterator_to_array($patternObjects);
		ksort($patternObjects);

		foreach ($patternObjects as $name => $object) {
			if ($object->isDir()) {
				$filesystemLoaderPaths[] = $object->getPathname();
			}
		}
		
		// set-up the loader list in order that they should be checked
		// 1. Patterns 2. Filesystem 3. String
		$loaders   = array();
		// 1. add Patterns
		$loaders[] = new Twig_Loader_PatternPartialLoader(Config::getOption("patternSourceDir"),array("patternPaths" => $options["patternPaths"]));

		// 2. add the paths to the filesystem loader if the paths existed
		if (count($filesystemLoaderPaths) > 0) {
			$filesystemLoader = new \Twig_Loader_Filesystem($filesystemLoaderPaths);
			$loaders[] = TwigUtil::addPaths($filesystemLoader, $patternSourceDir);
		}

		// Setting loaders and giving plugins a chance to manipulate them
		TwigUtil::setLoaders($loaders);
		// set-up the dispatcher
		$dispatcherInstance = Dispatcher::getInstance();
		$dispatcherInstance->dispatch("twigLoaderPreInit.customize");
		// getting the loaders back
		$loaders = TwigUtil::getLoaders();

		// 3. add String loader
		// This *must* go last or no loaders after will work ~ https://github.com/symfony/symfony/issues/10865
		// @todo Remove `Twig_Loader_String` - if a Twig include path is wrong, this outputs the string anyway with no error ~ https://github.com/symfony/symfony/issues/10865
		$loaders[] = new \Twig_Loader_String();
		
		// set-up Twig
		$twigLoader = new \Twig_Loader_Chain($loaders);
		$instance   = new \Twig_Environment($twigLoader, array("debug" => $twigDebug, "autoescape" => $twigAutoescape));
		
		// customize Twig
		TwigUtil::setInstance($instance);
		TwigUtil::loadFilters();
		TwigUtil::loadFunctions();
		TwigUtil::loadTags();
		TwigUtil::loadTests();
		TwigUtil::loadDateFormats();
		TwigUtil::loadDebug();
		TwigUtil::loadMacros();

		$dispatcherInstance->dispatch("twigLoader.customize");
		$dispatcherInstance->dispatch("twigPatternLoader.customize");

		// get the instance
		$this->instance = TwigUtil::getInstance();
		
	}
	
	/**
	* Render a pattern
	* @param  {Array}        the options to be rendered by Twig
	*
	* @return {String}       the rendered result
	*/
	public function render($options = array()) {
		
		$result = $this->instance->render($options["pattern"], $options["data"]);
		// This error handler catches files that didn't render using any of the loaders.
		// The most common scenario is when a file's contents get passed to and through `Twig_Loader_String` and
		// outputs the raw Twig file contents like `@atoms/buttons/button.twig`.
		// @todo Remove this once `Twig_Loader_String` is removed.
		if (strpos($result, "@") === 0) {
			echo "Twig file not found: " . $result . "\n";
			exit(1);
		} else {
			return $result;
		}
		
	}
	
}
