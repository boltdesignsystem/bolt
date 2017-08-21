<?php

/*!
 * Twig Pattern Engine Loader Class - String
 *
 * Copyright (c) 2014 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 * Sets an instance of Twig to deal with rendering of strings
 *
 */

namespace PatternLab\PatternEngine\Twig\Loaders;

use \PatternLab\Config;
use \PatternLab\Dispatcher;
use \PatternLab\PatternEngine\Loader;
use \PatternLab\PatternEngine\Twig\TwigUtil;

class StringLoader extends Loader {
	
	/**
	* Load a new Twig instance that is just a vanilla Twig rendering engine for strings
	*/
	public function __construct($options = array()) {
		
		// set-up the defaults
		$twigDebug = Config::getOption("twigDebug");
		
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
		
		// set-up the loader list
		$loaders = array();
		// add the paths to the filesystem loader if the paths existed
		if (count($filesystemLoaderPaths) > 0) {
			$loaders[] = new \Twig_Loader_Filesystem($filesystemLoaderPaths);
		}
		$loaders[] = new \Twig_Loader_String();
		
		// set-up Twig
		$twigLoader = new \Twig_Loader_Chain($loaders);
		$instance   = new \Twig_Environment($twigLoader, array("debug" => $twigDebug));
		
		// customize Twig
		TwigUtil::setInstance($instance);
		TwigUtil::loadFilters();
		TwigUtil::loadFunctions();
		TwigUtil::loadTags();
		TwigUtil::loadTests();
		TwigUtil::loadDateFormats();
		TwigUtil::loadDebug();
		TwigUtil::loadMacros();
		
		// set-up the dispatcher
		$dispatcherInstance = Dispatcher::getInstance();
		$dispatcherInstance->dispatch("twigLoader.customize");
		$dispatcherInstance->dispatch("twigStringLoader.customize");

		// get the instance
		$this->instance = TwigUtil::getInstance();
		
	}
	
	/**
	* Render a string
	* @param  {Array}        the options to be rendered by Twig
	*
	* @return {String}       the rendered result
	*/
	public function render($options = array()) {
		
		return $this->instance->render($options["string"], $options["data"]);
		
	}
	
}
