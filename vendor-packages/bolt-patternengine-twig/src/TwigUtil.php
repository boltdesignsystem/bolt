<?php

/*!
 * Twig Util Class
 *
 * Copyright (c) 2015 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 * Various utility methods for the Twig PatternEngine
 *
 */

namespace PatternLab\PatternEngine\Twig;

use \PatternLab\Config;
use \PatternLab\Console;
use \Symfony\Component\Finder\Finder;

class TwigUtil {
	
	protected static $instance = '';
	protected static $loaders = array();

	/**
	* Get an instance of the Twig environment
	*
	* @return {Instance}       an instance of the Twig environment
	*/
	public static function getInstance() {
		
		if (empty(self::$instance)) {
			return false;
		}
		
		return self::$instance;
		
	}
	
	/**
	* Set an instance of the Twig environment
	* @param  {Instance}       an instance of the Twig environment
	*/
	public static function setInstance($instance = "") {
		
		if (empty($instance) || !method_exists($instance,'addGlobal')) {
			Console::writeError("please set the instance");
		}
		
		self::$instance = $instance;

	}

	/**
	* Get an instance of the Twig loaders
	*
	* @return {Array}       List of Twig Loaders
	*/
	public static function getLoaders() {

		if (empty(self::$loaders)) {
			return false;
		}

		return self::$loaders;

	}

	/**
	* Set an instance of the Twig loaders
	* @param  {Array}       List of Twig Loaders
	*/
	public static function setLoaders($loaders = array()) {

		if (empty($loaders)) {
			Console::writeError("please set the loaders");
		}

		self::$loaders = $loaders;

	}

	/**
	* Add a loader to the Twig Loaders array
	* @param  {Loader}       A Twig Loader
	*/
	public static function addLoader($loader) {

		self::$loaders[] = $loader;

	}
	
	/**
	* Registering each directory under `_patterns/` as a namespace. For example, `_patterns/00-atoms/` as `@atoms`
	* @param  {Instance}       an instance of the filesystem Loader
	* @param  {String}         the path to the pattern directory
	*
	* @return {Instance}       an instance of the filesystem Loader
	*/
	public static function addPaths($filesystemLoader, $patternSourceDir) {
		
		$finder = new Finder();
		$finder->directories()->depth(0)->in($patternSourceDir);
		foreach ($finder as $file) {
			$pattern = $file->getRelativePathName();
			$patternBits = explode("-",$pattern,2);
			$patternTypePath = (((int)$patternBits[0] != 0) || ($patternBits[0] == '00')) ? $patternBits[1] : $pattern;
			$filesystemLoader->addPath($file->getPathName(), $patternTypePath);
		}
		
		return $filesystemLoader;
		
	}
	
	/**
	* Load custom date formats for Twig
	*/
	public static function loadDateFormats() {
		
		$dateFormat     = Config::getOption("twigDefaultDateFormat");
		$intervalFormat = Config::getOption("twigDefaultIntervalFormat");
		
		if ($dateFormat && $intervalFormat && !empty($dateFormat) && !empty($intervalFormat)) {
			self::$instance->getExtension("core")->setDateFormat($dateFormat, $intervalFormat);
		}
		
	}
	
	/**
	* Enable the debug options for Twig
	*/
	public static function loadDebug() {
		
		if (Config::getOption("twigDebug")) {
			self::$instance->addExtension(new \Twig_Extension_Debug());
		}
		
	}
	
	/**
	* Load filters for the Twig PatternEngine
	*/
	public static function loadFilters() {
		
		// load defaults
		$filterDir = Config::getOption("sourceDir").DIRECTORY_SEPARATOR."_twig-components/filters";
		$filterExt = Config::getOption("twigFilterExt");
		$filterExt = $filterExt ? $filterExt : "filter.php";
		
		if (is_dir($filterDir)) {
			
			// loop through the filter dir...
			$finder = new Finder();
			$finder->files()->name("*\.".$filterExt)->in($filterDir);
			$finder->sortByName();
			foreach ($finder as $file) {
				
				// see if the file should be ignored or not
				$baseName = $file->getBasename();
				if ($baseName[0] != "_") {
					
					include($file->getPathname());
					
					// $filter should be defined in the included file
					if (isset($filter)) {
						self::$instance->addFilter($filter);
						unset($filter);
					}
					
				}
				
			}
			
		}
		
	}
	
	/**
	* Load functions for the Twig PatternEngine
	*/
	public static function loadFunctions() {
		
		// load defaults
		$functionDir = Config::getOption("sourceDir").DIRECTORY_SEPARATOR."_twig-components/functions";
		$functionExt = Config::getOption("twigFunctionExt");
		$functionExt = $functionExt ? $functionExt : "function.php";
		
		if (is_dir($functionDir)) {
			
			// loop through the function dir...
			$finder = new Finder();
			$finder->files()->name("*\.".$functionExt)->in($functionDir);
			$finder->sortByName();
			foreach ($finder as $file) {
				
				// see if the file should be ignored or not
				$baseName = $file->getBasename();
				if ($baseName[0] != "_") {
					
					include($file->getPathname());
					
					// $function should be defined in the included file
					if (isset($function)) {
						self::$instance->addFunction($function);
						unset($function);
					}
					
				}
				
			}
			
		}
		
	}
	
	/**
	* Load macros for the Twig PatternEngine
	*/
	public static function loadMacros() {
		
		// load defaults
		$macroDir = Config::getOption("sourceDir").DIRECTORY_SEPARATOR."_macros";
		$macroExt = Config::getOption("twigMacroExt");
		$macroExt = $macroExt ? $macroExt : "macro.twig";
		
		if (is_dir($macroDir)) {
			
			// loop through some macro containing dir and run...
			$finder = new Finder();
			$finder->files()->name("*.".$macroExt)->in($macroDir);
			$finder->sortByName();
			foreach ($finder as $file) {
				
				// see if the file should be ignored
				$baseName = $file->getBasename();
				if ($baseName[0] != "_") {
					
					// add the macro to the global context
					self::$instance->addGlobal($file->getBasename(".".$macroExt), self::$instance->loadTemplate($baseName));
					
				}
				
			}
			
		}
		
	}
	
	/**
	* Load tags for the Twig PatternEngine
	*/
	public static function loadTags() {
		
		// load defaults
		$tagDir = Config::getOption("sourceDir").DIRECTORY_SEPARATOR."_twig-components/tags";
		$tagExt = Config::getOption("twigTagExt");
		$tagExt = $tagExt ? $tagExt : "tag.php";
		
		if (is_dir($tagDir)) {
			
			// loop through the tags and instantiate the class...
			$finder = new Finder();
			$finder->files()->name("*\.".$tagExt)->in($tagDir);
			$finder->sortByName();
			foreach ($finder as $file) {
				
				// see if the file should be ignored or not
				$baseName = $file->getBasename();
				if ($baseName[0] != "_") {
					
					include($file->getPathname());
					
					// Project_{filenameBase}_TokenParser should be defined in the include
					$className = "Project_".$file->getBasename(".".$tagExt)."_TokenParser";
					self::$instance->addTokenParser(new $className());
					
				}
				
			}
			
		}
		
	}
	
	/**
	* Load functions for the Twig PatternEngine
	*/
	public static function loadTests() {
		
		// load defaults
		$testDir = Config::getOption("sourceDir").DIRECTORY_SEPARATOR."_twig-components/tests";
		$testExt = Config::getOption("twigTestExt");
		$testExt = $testExt ? $testExt : "test.php";
		
		if (is_dir($testDir)) {
			
			// loop through the test dir...
			$finder = new Finder();
			$finder->files()->name("*\.".$testExt)->in($testDir);
			$finder->sortByName();
			foreach ($finder as $file) {
				
				// see if the file should be ignored or not
				$baseName = $file->getBasename();
				if ($baseName[0] != "_") {
					
					include($file->getPathname());
					
					// $test should be defined in the included file
					if (isset($test)) {
						self::$instance->addTest($test);
						unset($test);
					}
					
				}
				
			}
			
		}
		
	}
	
}
