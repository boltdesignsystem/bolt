<?php

/*!
 * Installer Util Class
 *
 * Copyright (c) 2014 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 * Various functions to be run before and during composer package installs
 *
 */

namespace PatternLab;

use \PatternLab\Config;
use \PatternLab\Console;
use \PatternLab\FileUtil;
use \PatternLab\Timer;
use \Symfony\Component\Filesystem\Filesystem;
use \Symfony\Component\Filesystem\Exception\IOExceptionInterface;
use \Symfony\Component\Finder\Finder;

class InstallerUtil {
	
	public static $isInteractive;
	
	/**
	 * Move the component files from the package to their location in the patternlab-components dir
	 * @param  {String/Array}   the items to create a fileList for
	 *
	 * @return {Array}          list of files destination and source
	 */
	protected static function buildFileList($initialList) {
		
		$fileList = array();
		
		// see if it's an array. loop over the multiple items if it is
		if (is_array($initialList)) {
			foreach ($initialList as $listItem) {
				$fileList[$listItem] = $listItem;
			}
		} else {
			$fileList[$listItem] = $listItem;
		}
		
		return $fileList;
		
	}
	
	/**
	* Common init sequence
	*/
	protected static function init() {
		
		// start the timer
		Timer::start();
		
		// initialize the console to print out any issues
		Console::init();
		
		// initialize the config for the pluginDir
		$baseDir = __DIR__."/../../../../../";
		Config::init($baseDir,false);
		
		// make sure the source dir is set-up
		$sourceDir = Config::getOption("sourceDir");
		if (!is_dir($sourceDir)) {
			FileUtil::makeDir($sourceDir);
		}
		
		// make sure the public dir is set-up
		$publicDir = Config::getOption("publicDir");
		if (!is_dir($publicDir)) {
			FileUtil::makeDir($publicDir);
		}
		
		Dispatcher::init();
		
	}
	
	/**
	* Include StarterKit in an array_filter
	*/
	public static function includeStarterKit($var) {
		
		$result = ($var["type"] == "patternlab-starterkit");
		return $result;
		
	}
	
	/**
	* Exclude StarterKit in an array_filter
	*/
	public static function excludeStarterKit($var) {
		
		$result = ($var["type"] != "patternlab-starterkit");
		return $result;
		
	}
	
	/**
	 * Extract the classes in the given file.
	 *
	 * This method taken from Symfony ClassLoader component.
	 *
	 * @see \Symfony\Component\ClassLoader\ClassMapGenerator::findClasses()
	 * @license http://symfony.com/doc/current/contributing/code/license.html MIT license
	 *
	 * @param string $path The file to check
	 *
	 * @return array The found classes
	 */
	private static function findClasses($path) {
		
		$contents = file_get_contents($path);
		$tokens = token_get_all($contents);
		
		$classes = array();
		
		$namespace = '';
		for ($i = 0; isset($tokens[$i]); ++$i) {
			$token = $tokens[$i];
			
			if (!isset($token[1])) {
				continue;
			}
			
			$class = '';
			
			switch ($token[0]) {
				case T_NAMESPACE:
					$namespace = '';
					// If there is a namespace, extract it
					while (isset($tokens[++$i][1])) {
						if (in_array($tokens[$i][0], array(T_STRING, T_NS_SEPARATOR))) {
							$namespace .= $tokens[$i][1];
						}
					}
					$namespace .= '\\';
					break;
				case T_CLASS:
				case T_INTERFACE:
				case T_TRAIT:
					// Skip usage of ::class constant
					$isClassConstant = false;
					for ($j = $i - 1; $j > 0; --$j) {
						if (!isset($tokens[$j][1])) {
							break;
						}
						
						if (T_DOUBLE_COLON === $tokens[$j][0]) {
							$isClassConstant = true;
							break;
						} elseif (!in_array($tokens[$j][0], array(T_WHITESPACE, T_DOC_COMMENT, T_COMMENT))) {
							break;
						}
					}
					
					if ($isClassConstant) {
						break;
					}
					
					// Find the classname
					while (isset($tokens[++$i][1])) {
						$t = $tokens[$i];
						if (T_STRING === $t[0]) {
							$class .= $t[1];
						} elseif ('' !== $class && T_WHITESPACE === $t[0]) {
							break;
						}
					}
					
					$classes[] = ltrim($namespace.$class, '\\');
					break;
				default:
					break;
			}
		}
		
		return $classes;
	}
	
	/**
	 * Parse the component types to figure out what needs to be moved and added to the component JSON files
	 * @param  {String}    file path to move
	 * @param  {String}    file path to move to
	 * @param  {String}    the name of the package
	 * @param  {String}    the base directory for the source of the files
	 * @param  {String}    the base directory for the destination of the files (publicDir or sourceDir)
	 * @param  {Array}     the list of files to be moved
	 */
	protected static function moveFiles($source,$destination,$packageName,$sourceBase,$destinationBase) {
		
		$fs = new Filesystem();
		
		// make sure the destination base exists
		if (!is_dir($destinationBase)) {
			$fs->mkdir($destinationBase);
		}
		
		// clean any * or / on the end of $destination
		$destination = (($destination != "*") && ($destination[strlen($destination)-1] == "*")) ? substr($destination,0,-1) : $destination;
		$destination = ($destination[strlen($destination)-1] == "/") ? substr($destination,0,-1) : $destination;
		
		// decide how to move the files. the rules:
		// src        ~ dest        -> action
		// *          ~ *           -> mirror all in {srcroot}/ to {destroot}/
		// *          ~ path/*      -> mirror all in {srcroot}/ to {destroot}/path/
		// foo/*      ~ path/*      -> mirror all in {srcroot}/foo/ to {destroot}/path/
		// foo/s.html ~ path/k.html -> mirror {srcroot}/foo/s.html to {destroot}/path/k.html
		
		if (($source == "*") && ($destination == "*")) {
			$result  = self::pathExists($packageName, $destinationBase.DIRECTORY_SEPARATOR);
			$options = ($result) ? array("delete" => true, "override" => true) : array("delete" => false, "override" => false);
			$fs->mirror($sourceBase, $destinationBase.DIRECTORY_SEPARATOR, null, $options);
		} else if ($source == "*") {
			$result  = self::pathExists($packageName, $destinationBase.DIRECTORY_SEPARATOR.$destination);
			$options = ($result) ? array("delete" => true, "override" => true) : array("delete" => false, "override" => false);
			$fs->mirror($sourceBase, $destinationBase.DIRECTORY_SEPARATOR.$destination, null, $options);
		} else if ($source[strlen($source)-1] == "*") {
			$source  = rtrim($source,"/*");
			$result  = self::pathExists($packageName, $destinationBase.DIRECTORY_SEPARATOR.$destination);
			$options = ($result) ? array("delete" => true, "override" => true) : array("delete" => false, "override" => false);
			$fs->mirror($sourceBase.$source, $destinationBase.DIRECTORY_SEPARATOR.$destination, null, $options);
		} else {
			$pathInfo       = explode(DIRECTORY_SEPARATOR,$destination);
			$file           = array_pop($pathInfo);
			$destinationDir = implode(DIRECTORY_SEPARATOR,$pathInfo);
			if (!$fs->exists($destinationBase.DIRECTORY_SEPARATOR.$destinationDir)) {
				$fs->mkdir($destinationBase.DIRECTORY_SEPARATOR.$destinationDir);
			}
			$result   = self::pathExists($packageName, $destinationBase.DIRECTORY_SEPARATOR.$destination);
			$override = ($result) ? true : false;
			$fs->copy($sourceBase.$source, $destinationBase.DIRECTORY_SEPARATOR.$destination, $override);
		}
		
	}
	
	/**
	 * Parse the extra section from composer.json
	 * @param  {Object}     the JSON for the composer extra section
	 */
	public static function parseComposerExtraList($composerExtra, $name, $pathDist) {
		
		// move assets to the base directory
		if (isset($composerExtra["dist"]["baseDir"])) {
			self::parseFileList($name,$pathDist,Config::getOption("baseDir"),$composerExtra["dist"]["baseDir"]);
		}
		
		// move assets to the public directory
		if (isset($composerExtra["dist"]["publicDir"])) {
			self::parseFileList($name,$pathDist,Config::getOption("publicDir"),$composerExtra["dist"]["publicDir"]);
		}
		
		// move assets to the source directory
		if (isset($composerExtra["dist"]["sourceDir"])) {
			self::parseFileList($name,$pathDist,Config::getOption("sourceDir"),$composerExtra["dist"]["sourceDir"]);
		}
		
		// move assets to the scripts directory
		if (isset($composerExtra["dist"]["scriptsDir"])) {
			self::parseFileList($name,$pathDist,Config::getOption("scriptsDir"),$composerExtra["dist"]["scriptsDir"]);
		}
		
		// move assets to the data directory
		if (isset($composerExtra["dist"]["dataDir"])) {
			self::parseFileList($name,$pathDist,Config::getOption("dataDir"),$composerExtra["dist"]["dataDir"]);
		}
		
		// move assets to the components directory
		if (isset($composerExtra["dist"]["componentDir"])) {
			$templateExtension = isset($composerExtra["templateExtension"]) ? $composerExtra["templateExtension"] : "mustache";
			$onready           = isset($composerExtra["onready"]) ? $composerExtra["onready"] : "";
			$callback          = isset($composerExtra["callback"]) ? $composerExtra["callback"] : "";
			$componentDir      = Config::getOption("componentDir");
			self::parseComponentList($name,$pathDist,$componentDir."/".$name,$composerExtra["dist"]["componentDir"],$templateExtension,$onready,$callback);
			self::parseFileList($name,$pathDist,$componentDir."/".$name,$composerExtra["dist"]["componentDir"]);
		}
		
		// see if we need to modify the config
		if (isset($composerExtra["config"])) {
			
			foreach ($composerExtra["config"] as $option => $value) {
				
				// update the config option
				Config::updateConfigOption($option,$value);
				
			}
			
		}
		
	}
	
	/**
	 * Parse the component types to figure out what needs to be added to the component JSON files
	 * @param  {String}    the name of the package
	 * @param  {String}    the base directory for the source of the files
	 * @param  {String}    the base directory for the destination of the files (publicDir or sourceDir)
	 * @param  {Array}     the list of files to be parsed for component types
	 * @param  {String}    template extension for templates
	 * @param  {String}    the javascript to run on ready
	 * @param  {String}    the javascript to run as a callback
	 */
	protected static function parseComponentList($packageName,$sourceBase,$destinationBase,$componentFileList,$templateExtension,$onready,$callback) {
		
		/*
		iterate over a source or source dirs and copy files into the componentdir.
		use file extensions to add them to the appropriate type arrays below. so...
			"patternlab": {
				"dist": {
					"componentDir": {
						{ "*": "*" }
					}
				}
				"onready": ""
				"callback": ""
				"templateExtension": ""
			}
		}
		
		*/
		
		// decide how to type list files. the rules:
		// src        ~ dest        -> action
		// *          ~ *           -> iterate over all files in {srcroot}/ and create a type listing
		// foo/*      ~ path/*      -> iterate over all files in {srcroot}/foo/ and create a type listing
		// foo/s.html ~ path/k.html -> create a type listing for {srcroot}/foo/s.html
		
		// set-up component types store
		$componentTypes = array("stylesheets" => array(), "javascripts" => array(), "templates" => array());
		
		// iterate over the file list
		foreach ($componentFileList as $componentItem) {
			
			// retrieve the source & destination
			$source      = self::removeDots(key($componentItem));
			$destination = self::removeDots($componentItem[$source]);
			
			if (($source == "*") || ($source[strlen($source)-1] == "*")) {
				
				// build the source & destination
				$source      = (strlen($source) > 2)      ? rtrim($source,"/*") : "";
				$destination = (strlen($destination) > 2) ? rtrim($destination,"/*") : "";
				
				// get files
				$finder = new Finder();
				$finder->files()->in($sourceBase.$source);
				
				// iterate over the returned objects
				foreach ($finder as $file) {
					
					$ext = $file->getExtension();
					
					if ($ext == "css") {
						$componentTypes["stylesheets"][] = str_replace($sourceBase.$source,$destination,$file->getPathname());
					} else if ($ext == "js") {
						$componentTypes["javascripts"][] = str_replace($sourceBase.$source,$destination,$file->getPathname());
					} else if ($ext == $templateExtension) {
						$componentTypes["templates"][]   = str_replace($sourceBase.$source,$destination,$file->getPathname());
					}
					
				}
				
			} else {
				
				$bits = explode(".",$source);
				
				if (count($bits) > 0) {
					
					$ext = $bits[count($bits)-1];
					
					if ($ext == "css") {
						$componentTypes["stylesheets"][] = $destination;
					} else if ($ext == "js") {
						$componentTypes["javascripts"][] = $destination;
					} else if ($ext == $templateExtension) {
						$componentTypes["templates"][]   = $destination;
					}
					
				}
				
			}
			
		}
		
		/*
		FOR USE AS A PACKAGE TO BE LOADED LATER
		{
			"name": "pattern-lab-plugin-kss",
			"templates": { "filename": "filepath" }, // replace slash w/ dash in filename. replace extension
			"stylesheets": [ ],
			"javascripts": [ ],
			"onready": "",
			"callback": ""
		}
		*/
		$packageInfo                = array();
		$packageInfo["name"]        = $packageName;
		$packageInfo["templates"]   = array();
		foreach ($componentTypes["templates"] as $templatePath) {
			$templateKey = preg_replace("/\W/","-",str_replace(".".$templateExtension,"",$templatePath));
			$packageInfo["templates"][$templateKey] = $templatePath;
		}
		$packageInfo["stylesheets"] = $componentTypes["stylesheets"];
		$packageInfo["javascripts"] = $componentTypes["javascripts"];
		$packageInfo["onready"]     = $onready;
		$packageInfo["callback"]    = $callback;
		$packageInfoPath            = Config::getOption("componentDir")."/packages/".str_replace("/","-",$packageName).".json";
		
		// double-check the dirs are created
		if (!is_dir(Config::getOption("componentDir"))) {
			mkdir(Config::getOption("componentDir"));
		}
		
		if (!is_dir(Config::getOption("componentDir")."/packages/")) {
			mkdir(Config::getOption("componentDir")."/packages/");
		}
		
		// write out the package info
		file_put_contents($packageInfoPath,json_encode($packageInfo));
		
	}
	
	/**
	 * Move the files from the package to their location in the public dir or source dir
	 * @param  {String}    the name of the package
	 * @param  {String}    the base directory for the source of the files
	 * @param  {String}    the base directory for the destintation of the files (publicDir or sourceDir)
	 * @param  {Array}     the list of files to be moved
	 */
	protected static function parseFileList($packageName,$sourceBase,$destinationBase,$fileList) {
		
		foreach ($fileList as $fileItem) {
			
			// retrieve the source & destination
			$source      = self::removeDots(key($fileItem));
			$destination = self::removeDots($fileItem[$source]);
			
			// depending on the source handle things differently. mirror if it ends in /*
			self::moveFiles($source,$destination,$packageName,$sourceBase,$destinationBase);
			
		}
		
	}
	
	/**
	 * Check to see if the path already exists. If it does prompt the user to double-check it should be overwritten
	 * @param  {String}    the package name
	 * @param  {String}    path to be checked
	 *
	 * @return {Boolean}   if the path exists and should be overwritten
	 */
	protected static function pathExists($packageName,$path) {
		
		$fs = new Filesystem;
		
		if ($fs->exists($path)) {
			
			// set-up a human readable prompt
			$humanReadablePath = str_replace(Config::getOption("baseDir"), "./", $path);
			
			// set if the prompt should fire
			$prompt = true;
			
			// are we checking a directory?
			if (is_dir($path)) {
				
				// see if the directory is essentially empty
				$files = scandir($path);
				foreach ($files as $key => $file) {
					$ignore = array("..",".",".gitkeep","README",".DS_Store");
					$file = explode("/",$file);
					if (in_array($file[count($file)-1],$ignore)) {
						unset($files[$key]);
					}
				}
				
				if (empty($files)) {
					$prompt = false;
				}
				
			}
			
			if ($prompt) {
				
				// prompt for input using the supplied query
				$prompt  = "the path <path>".$humanReadablePath."</path> already exists. merge or replace with the contents of <path>".$packageName."</path> package?";
				$options = "M/r";
				$input   = Console::promptInput($prompt,$options,"M");
				
				if ($input == "m") {
					Console::writeTag("ok","contents of <path>".$humanReadablePath."</path> have been merged with the package's content...", false, true);
					return false;
				} else {
					Console::writeWarning("contents of <path>".$humanReadablePath."</path> have been replaced by the package's content...", false, true);
					return true;
				}
				
			}
			
			return false;
			
		}
		
		return false;
		
	}
	
	/**
	 * Run the PL tasks when Composer runs an install command
	 * @param  {Array}      collected package info
	 * @param  {Object}     a script event object from composer
	 */
	public static function postInstallCmd($installerInfo, $event) {
		
		self::packagesInstall($installerInfo, $event);
		
	}
	
	/**
	 * Run the PL tasks when Composer runs an update command. this also runs after a package is removed.
	 * @param  {Array}      collected package info
	 * @param  {Object}     a script event object from composer
	 */
	public static function postUpdateCmd($installerInfo, $event) {
		
		if (!$installerInfo["packagesRemove"]) {
			self::packagesInstall($installerInfo, $event);
		}
		
	}
	
	/**
	 * Prompt the user to install a starterkit
	 * @param  {Array}     the starterkit suggestions
	 */
	protected static function promptStarterKitInstall($starterKitSuggestions) {
		
		Console::writeLine("");
		
		// suggest starterkits
		Console::writeInfo("suggested starterkits that work with this edition:", false, true);
		foreach ($starterKitSuggestions as $i => $suggestion) {
			$num = $i + 1;
			Console::writeLine($num.": ".$suggestion, true);
		}
		
		// prompt for input on the suggestions
		Console::writeLine("");
		
		$prompt  = "choose an option or hit return to skip:";
		$options = "(ex. 1)";
		$input   = Console::promptInput($prompt,$options,"1");
		$result  = (int)$input - 1;
		
		if (isset($starterKitSuggestions[$result])) {
			
			Console::writeLine("");
			$f = new Fetch();
			$result = $f->fetchStarterKit($starterKitSuggestions[$result]);
			
		}
		
	}
	
	/**
	 * Remove dots from the path to make sure there is no file system traversal when looking for or writing files
	 * @param  {String}    the path to check and remove dots
	 *
	 * @return {String}    the path minus dots
	 */
	protected static function removeDots($path) {
		$parts = array();
		foreach (explode("/", $path) as $chunk) {
			if ((".." !== $chunk) && ("." !== $chunk) && ("" !== $chunk)) {
				$parts[] = $chunk;
			}
		}
		return implode("/", $parts);
	}
	
	/**
	 * Handle some Pattern Lab specific tasks based on what's found in the package's composer.json file on install
	 * @param  {Array}      the info culled from installing various pattern lab-related packages
	 */
	protected static function packagesInstall($installerInfo, $event) {
		
		// mark if this is an interactive call or not
		self::$isInteractive = $event->getIO()->isInteractive();
		
		// initialize a bunch of stuff like config and console
		self::init();
		
		// make sure user is prompted to install starterkit
		if (!empty($installerInfo["suggestedStarterKits"])) {
			self::promptStarterKitInstall($installerInfo["suggestedStarterKits"]);
		}
		
		// reorder packages so the starterkit is first if it's being installed as a package
		if (isset($installerInfo["packages"])) {
			
			$packages = $installerInfo["packages"];
			$packages = array_merge(array_filter($packages, "self::includeStarterKit"), array_filter($packages, "self::excludeStarterKit"));
			
			foreach ($packages as $package) {
				
				// set-up package info
				$extra     = $package["extra"];
				$type      = $package["type"];
				$name      = $package["name"];
				$pathBase  = $package["pathBase"];
				$pathDist  = $package["pathDist"];
				
				// make sure that it has the name-spaced section of data to be parsed. if it exists parse it
				if (!empty($extra)) {
					self::parseComposerExtraList($extra, $name, $pathDist);
				}
				
				// see if the package has a listener
				self::scanForListener($pathBase);
				
				// address other specific needs based on type
				if ($type == "patternlab-patternengine") {
					self::scanForPatternEngineRule($pathBase);
				} else if (($type == "patternlab-styleguidekit") && (strpos($name,"-assets-") === false)) {
					$dir = str_replace(Config::getOption("baseDir"), "", $pathBase);
					$dir = ($dir[strlen($dir)-1] == DIRECTORY_SEPARATOR) ? rtrim($dir, DIRECTORY_SEPARATOR) : $dir;
					Config::updateConfigOption("styleguideKit",$name);
					Config::updateConfigOption("styleguideKitPath",$dir);
				}
				
			}
			
		}
		
		// override any configs that have been set-up
		if (!empty($installerInfo["configOverrides"])) {
			foreach ($installerInfo["configOverrides"] as $option => $value) {
				Config::updateConfigOption($option,$value, true); // forces the update
			}
		}
		
		if ($installerInfo["projectInstall"]) {
			
			Console::writeLine("");
			Console::writeLine("<h1><fire3>Thank you for installing...</fire3></h1>", false, true);
			Console::writeLine("<fire1>(                               (             </fire1>");
			Console::writeLine("<fire2>)\ )        )   )               )\ )         )</fire2>");
			Console::writeLine("<fire3>(()/(   ) ( /(( /(  (  (        (()/(    ) ( /(</fire3>");
			Console::writeLine("<fire4>/(_)| /( )\())\())))\ )(   (    /(_))( /( )\())</fire4>");
			Console::writeLine("<fire5>(</fire5><cool>_</cool><fire5>)) )(_)|</fire5><cool>_</cool><fire5>))(</fire5><cool>_</cool><fire5>))//((_|()\  )\ )(</fire5><cool>_</cool><fire5>))  )(_)|(_)\</fire5>");
			Console::writeLine("<cool>| _ </cool><fire6>((</fire6><cool>_</cool><fire6>)</fire6><cool>_| |_| |_</cool><fire6>(</fire6><cool>_</cool><fire6>))  ((</fire6><cool>_</cool><fire6>)</fire6><cool>_</cool><fire6>(</fire6><cool>_</cool><fire6>/(</fire6><cool>| |  </cool><fire6>((</fire6><cool>_</cool><fire6>)</fire6><cool>_| |</cool><fire6>(</fire6><cool>_</cool><fire6>)</fire6>");
			Console::writeLine("<cool>|  _/ _` |  _|  _/ -_)| '_| ' \</cool><fire6>))</fire6><cool> |__/ _` | '_ \  </cool>");
			Console::writeLine("<cool>|_| \__,_|\__|\__\___||_| |_||_||____\__,_|_.__/  </cool>", false, true);

		}
		
	}
	
	/**
	 * Handle some Pattern Lab specific tasks based on what's found in the package's composer.json file on uninstall
	 * @param  {Array}      the info culled from a pattern lab-related package that's being removed
	 */
	public static function packageRemove($packageInfo) {
		
		// run the console and config inits
		self::init();
		
		// see if the package has a listener and remove it
		self::scanForListener($packageInfo["pathBase"],true);
		
		// see if the package is a pattern engine and remove the rule
		if ($packageInfo["type"] == "patternlab-patternengine") {
			self::scanForPatternEngineRule($packageInfo["pathBase"],true);
		}
		
		// remove the component package file if it exists
		$jsonFile = Config::getOption("componentDir")."/packages/".str_replace("/","-",$packageInfo["name"]).".json";
		if (file_exists($jsonFile)) {
			unlink($jsonFile);
		}
		
	}
	
	/**
	 * Scan the package for a listener
	 * @param  {String}     the path for the package
	 */
	protected static function scanForListener($pathPackage,$remove = false) {
		
		// get listener list path
		$pathList = Config::getOption("configDir")."/listeners.json";
		
		// make sure listeners.json exists. if not create it
		if (!file_exists($pathList)) {
			file_put_contents($pathList, "{ \"listeners\": [ ] }");
		}
		
		// load listener list
		$listenerList = json_decode(file_get_contents($pathList),true);
		
		// set-up a finder to find the listener
		$finder = new Finder();
		$finder->files()->name('PatternLabListener.php')->in($pathPackage);
		
		// iterate over the returned objects
		foreach ($finder as $file) {
			
			// create the name
			$classes      = self::findClasses($file->getPathname());
			$listenerName = "\\".$classes[0];
			
			// check to see what we should do with the listener info
			if (!$remove && !in_array($listenerName,$listenerList["listeners"])) {
				$listenerList["listeners"][] = $listenerName;
			} else if ($remove && in_array($listenerName,$listenerList["listeners"])) {
				$key = array_search($listenerName, $listenerList["listeners"]);
				unset($listenerList["listeners"][$key]);
			}
			
			// write out the listener list
			file_put_contents($pathList,json_encode($listenerList));
			
		}
		
	}
	
	/**
	 * Scan the package for a pattern engine rule
	 * @param  {String}     the path for the package
	 */
	protected static function scanForPatternEngineRule($pathPackage,$remove = false) {
		
		// get listener list path
		$pathList = Config::getOption("configDir")."/patternengines.json";
		
		// make sure patternengines.json exists. if not create it
		if (!file_exists($pathList)) {
			file_put_contents($pathList, "{ \"patternengines\": [ ] }");
		}
		
		// load pattern engine list
		$patternEngineList = json_decode(file_get_contents($pathList),true);
		
		// set-up a finder to find the pattern engine
		$finder = new Finder();
		$finder->files()->name("PatternEngineRule.php")->in($pathPackage);
		
		// iterate over the returned objects
		foreach ($finder as $file) {
			
			// create the name
			$classes           = self::findClasses($file->getPathname());
			$patternEngineName = "\\".$classes[0];
			
			// check what we should do with the pattern engine info
			if (!$remove && !in_array($patternEngineName, $patternEngineList["patternengines"])) {
				$patternEngineList["patternengines"][] = $patternEngineName;
			} else if ($remove && in_array($patternEngineName, $patternEngineList["patternengines"])) {
				$key = array_search($patternEngineName, $patternEngineList["patternengines"]);
				unset($patternEngineList["patternengines"][$key]);
			}
			
			// write out the pattern engine list
			file_put_contents($pathList,json_encode($patternEngineList));
			
		}
		
	}
	
}
