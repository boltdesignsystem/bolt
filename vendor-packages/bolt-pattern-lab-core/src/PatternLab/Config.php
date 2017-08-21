<?php

/*!
 * Config Class
 *
 * Copyright (c) 2014 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 * Configures Pattern Lab by checking config files and required files
 *
 */

namespace PatternLab;

use \PatternLab\Console;
use \PatternLab\FileUtil;
use \PatternLab\Timer;
use \Shudrum\Component\ArrayFinder\ArrayFinder;
use \Symfony\Component\Yaml\Yaml;
use \Symfony\Component\Yaml\Exception\ParseException;

class Config {
	
	protected static $options            = array();
	protected static $userConfig         = "config.yml";
	protected static $userConfigDir      = "";
	protected static $userConfigDirClean = "config";
	protected static $userConfigDirDash  = "_config";
	protected static $userConfigPath     = "";
	protected static $plConfigPath       = "config/config.yml.default";
	protected static $dirAdded           = false;
	
	/**
	* Clean a given dir from the config file
	* @param  {String}       directory to be cleaned
	*
	* @return {String}       cleaned directory
	*/
	protected static function cleanDir($dir) {
		
		if (isset($dir[0])) {
			$dir = trim($dir);
			$dir = ($dir[0] == DIRECTORY_SEPARATOR) ? ltrim($dir, DIRECTORY_SEPARATOR) : $dir;
			$dir = ($dir[strlen($dir)-1] == DIRECTORY_SEPARATOR) ? rtrim($dir, DIRECTORY_SEPARATOR) : $dir;
		}
		
		return $dir;
		
	}
	
	/**
	* Get the value associated with an option from the Config
	* @param  {String}       the name of the option to be checked
	*
	* @return {String/Boolean} the value of the get or false if it wasn't found
	*/
	public static function getOption($key = "") {
		
		if (!empty($key)) {
			$arrayFinder = new ArrayFinder(self::$options);
			return $arrayFinder->get($key);
		}
		
		return false;
		
	}
	
	/**
	* Get the options set in the config
	*
	* @return {Array}        the options from the config
	*/
	public static function getOptions() {
		return self::$options;
	}
	
	/**
	* Review the given styleguideKitPath to handle pre-2.1.0 backwards compatibility
	* @param  {String}       styleguideKitPath from config.yml
	*
	* @return {String}       the final, post-2.1.0-style styleguideKitPath
	*/
	protected static function getStyleguideKitPath($styleguideKitPath = "") {
		
		$styleguideKitPathFinal = "";
		if (isset($styleguideKitPath[0]) && ($styleguideKitPath[0] == DIRECTORY_SEPARATOR)) {
			if (strpos($styleguideKitPath, DIRECTORY_SEPARATOR."vendor".DIRECTORY_SEPARATOR === 0)) {
				$styleguideKitPathFinal = $styleguideKitPath; // mistaken set-up, pass to final for clean-up
			} else if (strpos($styleguideKitPath, self::$options["baseDir"]) === 0) {
				$styleguideKitPathFinal = str_replace(self::$options["baseDir"], "", $styleguideKitPath); // just need to peel off the base
			} else if (strpos($styleguideKitPath, DIRECTORY_SEPARATOR."vendor") !== false) {
				$parts = explode(DIRECTORY_SEPARATOR."vendor".DIRECTORY_SEPARATOR, $styleguideKitPath); // set on another machine's config.yml? try to be smart about it
				$styleguideKitPathFinal = "vendor".DIRECTORY_SEPARATOR.$parts[1];
				Console::writeInfo("Please double-check the styleguideKitPath option in <path>./config/config.yml</path>. It should be a path relative to the root of your Pattern Lab project...");
			}
		} else {
			$styleguideKitPathFinal = $styleguideKitPath; // fingers crossed everything is fine
		}
		
		return $styleguideKitPathFinal;
		
	}
	
	/**
	* Adds the config options to a var to be accessed from the rest of the system
	* If it's an old config or no config exists this will update and generate it.
	* @param  {Boolean}       whether we should print out the status of the config being loaded
	*/
	public static function init($baseDir = "", $verbose = true) {
		
		// make sure a base dir was supplied
		if (empty($baseDir)) {
			Console::writeError("need a base directory to initialize the config class...");
		}
		
		// normalize the baseDir
		$baseDir = FileUtil::normalizePath($baseDir);
		
		// double-check the default config file exists
		if (!is_dir($baseDir)) {
			Console::writeError("make sure ".$baseDir." exists...");
		}
		
		// set the baseDir option
		self::$options["baseDir"] = ($baseDir[strlen($baseDir)-1] == DIRECTORY_SEPARATOR) ? $baseDir : $baseDir.DIRECTORY_SEPARATOR;
		
		// set-up the paths
		self::$userConfigDirClean  = self::$options["baseDir"].self::$userConfigDirClean;
		self::$userConfigDirDash   = self::$options["baseDir"].self::$userConfigDirDash;
		self::$userConfigDir       = (is_dir(self::$userConfigDirDash)) ? self::$userConfigDirDash : self::$userConfigDirClean;
		self::$userConfigPath      = self::$userConfigDir.DIRECTORY_SEPARATOR.self::$userConfig;
		self::$plConfigPath        = self::$options["baseDir"]."vendor/pattern-lab/core/".self::$plConfigPath;
		
		// can't add __DIR__ above so adding here
		if (!is_dir(self::$userConfigDir)) {
			mkdir(self::$userConfigDir);
		}
		
		// check to see if the user config exists, if not create it
		if ($verbose) {
			Console::writeLine("configuring pattern lab...");
		}
		
		// make sure migrate doesn't happen by default
		$migrate        = false;
		$diffVersion    = false;
		$defaultOptions = array();
		$userOptions    = array();
		
		// double-check the default config file exists
		if (!file_exists(self::$plConfigPath)) {
			Console::writeError("the default options for Pattern Lab don't seem to exist at <path>".Console::getHumanReadablePath(self::$plConfigPath)."</path>. please check on the install location of pattern lab...");
		}
		
		// set the default config using the pattern lab config
		try {
			$defaultOptions = Yaml::parse(file_get_contents(self::$plConfigPath));
			self::$options  = array_merge(self::$options, $defaultOptions);
		} catch (ParseException $e) {
			Console::writeError("Config parse error in <path>".Console::getHumanReadablePath(self::$plConfigPath)."</path>: ".$e->getMessage());
		}
		
		// double-check the user's config exists. if not mark that we should migrate the default one
		if (file_exists(self::$userConfigPath)) {
			try {
				$userOptions   = Yaml::parse(file_get_contents(self::$userConfigPath));
				self::$options = array_merge(self::$options, $userOptions);
			} catch (ParseException $e) {
				Console::writeError("Config parse error in <path>".Console::getHumanReadablePath(self::$userConfigPath)."</path>: ".$e->getMessage());
			}
		} else {
			$migrate = true;
		}
		
		// compare version numbers
		$diffVersion = (isset($userOptions["v"]) && ($userOptions["v"] == $defaultOptions["v"])) ? false : true;
		
		// run an upgrade and migrations if necessary
		if ($migrate || $diffVersion) {
			if ($verbose) {
				Console::writeInfo("upgrading your version of pattern lab...");
			}
			if ($migrate) {
				if (!@copy(self::$plConfigPath, self::$userConfigPath)) {
					Console::writeError("make sure that Pattern Lab can write a new config to ".self::$userConfigPath."...");
					exit;
				}
			} else {
				self::$options = self::writeNewConfigFile(self::$options, $defaultOptions);
			}
		}
		
		// making sure the config isn't empty
		if (empty(self::$options) && $verbose) {
			Console::writeError("a set of configuration options is required to use Pattern Lab...");
			exit;
		}
		
		// set-up the various dirs
		self::$options["configDir"]        = self::$userConfigDir;
		self::$options["configPath"]       = self::$userConfigPath;
		self::$options["coreDir"]          = is_dir(self::$options["baseDir"]."_core") ? self::$options["baseDir"]."_core" : self::$options["baseDir"]."core";
		self::$options["exportDir"]        = isset(self::$options["exportDir"])        ? self::$options["baseDir"].self::cleanDir(self::$options["exportDir"])   : self::$options["baseDir"]."exports";
		self::$options["publicDir"]        = isset(self::$options["publicDir"])        ? self::$options["baseDir"].self::cleanDir(self::$options["publicDir"])   : self::$options["baseDir"]."public";
		self::$options["scriptsDir"]       = isset(self::$options["scriptsDir"])       ? self::$options["baseDir"].self::cleanDir(self::$options["scriptsDir"])  : self::$options["baseDir"]."scripts";
		self::$options["sourceDir"]        = isset(self::$options["sourceDir"])        ? self::$options["baseDir"].self::cleanDir(self::$options["sourceDir"])   : self::$options["baseDir"]."source";
		self::$options["componentDir"]     = isset(self::$options["componentDir"])     ? self::$options["publicDir"].DIRECTORY_SEPARATOR.self::cleanDir(self::$options["componentDir"]) : self::$options["publicDir"].DIRECTORY_SEPARATOR."patternlab-components";
		self::$options["dataDir"]          = isset(self::$options["dataDir"])          ? self::$options["sourceDir"].DIRECTORY_SEPARATOR.self::cleanDir(self::$options["dataDir"]) : self::$options["sourceDir"].DIRECTORY_SEPARATOR."_data";
		self::$options["patternExportDir"] = isset(self::$options["patternExportDir"]) ? self::$options["exportDir"].DIRECTORY_SEPARATOR.self::cleanDir(self::$options["patternExportDir"]) : self::$options["exportDir"].DIRECTORY_SEPARATOR."patterns";
		self::$options["patternPublicDir"] = isset(self::$options["patternPublicDir"]) ? self::$options["publicDir"].DIRECTORY_SEPARATOR.self::cleanDir(self::$options["patternPublicDir"]) : self::$options["publicDir"].DIRECTORY_SEPARATOR."patterns";
		self::$options["patternSourceDir"] = isset(self::$options["patternSourceDir"]) ? self::$options["sourceDir"].DIRECTORY_SEPARATOR.self::cleanDir(self::$options["patternSourceDir"]) : self::$options["sourceDir"].DIRECTORY_SEPARATOR."_patterns";
		self::$options["metaDir"]          = isset(self::$options["metaDir"])          ? self::$options["sourceDir"].DIRECTORY_SEPARATOR.self::cleanDir(self::$options["metaDir"]) : self::$options["sourceDir"].DIRECTORY_SEPARATOR."_meta/";
		self::$options["annotationsDir"]   = isset(self::$options["annotationsDir"])   ? self::$options["sourceDir"].DIRECTORY_SEPARATOR.self::cleanDir(self::$options["annotationsDir"]) : self::$options["sourceDir"].DIRECTORY_SEPARATOR."_annotations/";
		
		// handle a pre-2.1.0 styleguideKitPath before saving it
		if (isset(self::$options["styleguideKitPath"])) {
			self::$options["styleguideKitPath"] = self::$options["baseDir"].self::cleanDir(self::getStyleguideKitPath(self::$options["styleguideKitPath"]));
		}
		
		// double-check a few directories are real and set-up
		FileUtil::checkPathFromConfig(self::$options["sourceDir"], self::$userConfigPath, "sourceDir");
		FileUtil::checkPathFromConfig(self::$options["publicDir"], self::$userConfigPath, "publicDir");
		
		// make sure styleguideExcludes is set to an array even if it's empty
		if (is_string(self::$options["styleGuideExcludes"])) {
			self::$options["styleGuideExcludes"] = array();
		}
		
		// set the cacheBuster
		self::$options["cacheBuster"] = (self::$options["cacheBusterOn"] == "false") ? 0 : time();
		
		// provide the default for enable CSS. performance hog so it should be run infrequently
		self::$options["enableCSS"] = false;
		
		// which of these should be exposed in the front-end?
		self::$options["exposedOptions"] = array();
		self::setExposedOption("cacheBuster");
		self::setExposedOption("defaultPattern");
		self::setExposedOption("defaultShowPatternInfo");
		self::setExposedOption("ishFontSize");
		self::setExposedOption("ishMaximum");
		self::setExposedOption("ishMinimum");
		self::setExposedOption("patternExtension");
		
	}
	
	/**
	* Check to see if the given array is an associative array
	* @param  {Array}        the array to be checked
	*
	* @return {Boolean}      whether it's an associative array
	*/
	protected static function isAssoc($array) {
		return (bool) count(array_filter(array_keys($array), 'is_string'));
	}
	
	/**
	* Add an option and associated value to the base Config
	* @param  {String}       the name of the option to be added
	* @param  {String}       the value of the option to be added
	*
	* @return {Boolean}      whether the set was successful
	*/
	public static function setOption($optionName = "", $optionValue = "") {
		
		if (empty($optionName) || empty($optionValue)) {
			return false;
		}
		
		$arrayFinder = new ArrayFinder(self::$options);
		$arrayFinder->set($optionName, $optionValue);
		self::$options = $arrayFinder->get();
		
	}
	
	/**
	* Add an option to the exposedOptions array so it can be exposed on the front-end
	* @param  {String}       the name of the option to be added to the exposedOption arrays
	*
	* @return {Boolean}      whether the set was successful
	*/
	public static function setExposedOption($optionName = "") {
		
		if (!empty($optionName) && isset(self::$options[$optionName])) {
			if (!in_array($optionName,self::$options["exposedOptions"])) {
				self::$options["exposedOptions"][] = $optionName;
			}
			return true;
		}
		
		return false;
		
	}
	
	/**
	* Update a single config option based on a change in composer.json
	* @param  {String}       the name of the option to be changed
	* @param  {String}       the new value of the option to be changed
	* @param  {Boolean}      whether to force the update of the option
	*/
	public static function updateConfigOption($optionName,$optionValue, $force = false) {
		
		if (is_string($optionValue) && strpos($optionValue,"<prompt>") !== false) {
			
			// prompt for input using the supplied query
			$options = "";
			$default = "";
			$prompt  = str_replace("</prompt>","",str_replace("<prompt>","",$optionValue));
			if (strpos($prompt, "<default>") !== false) {
				$default = explode("<default>",$prompt);
				$default = explode("</default>",$default[1]);
				$default = $default[0];
			}
			
			$input = Console::promptInput($prompt,$options,$default,false);
			
			self::writeUpdateConfigOption($optionName,$input);
			Console::writeTag("ok","config option ".$optionName." updated...", false, true);
			
		} else if (!isset(self::$options[$optionName]) || (self::$options["overrideConfig"] == "a") || $force) {
			
			// if the option isn't set or the config is always to override update the config
			self::writeUpdateConfigOption($optionName,$optionValue);
			
		} else if (self::$options["overrideConfig"] == "q") {
			
			// standardize the values for comparison
			$currentOption      = self::getOption($optionName);
			$currentOptionValue = is_array($currentOption) ? implode(", ",$currentOption) : $currentOption;
			$newOptionValue     = is_array($optionValue) ? implode(", ",$optionValue) : $optionValue;
			
			if ($currentOptionValue != $newOptionValue) {
				
				// prompt for input
				$prompt  = "update the config option <desc>".$optionName." (".$currentOptionValue.")</desc> with the value <desc>".$newOptionValue."</desc>?";
				$options = "Y/n";
				$input   = Console::promptInput($prompt,$options,"Y");
				
				if ($input == "y") {
					self::writeUpdateConfigOption($optionName,$optionValue);
					Console::writeInfo("config option ".$optionName." updated...", false, true);
				} else {
					Console::writeWarning("config option <desc>".$optionName."</desc> not  updated...", false, true);
				}
				
			}
			
		}
		
	}
	
	/**
	* Add an option and associated value to the base Config. BC wrap for setOption
	* @param  {String}       the name of the option to be added
	* @param  {String}       the value of the option to be added
	*
	* @return {Boolean}      whether the set was successful
	*/
	public static function updateOption($optionName = "", $optionValue = "") {
		
		return self::setOption($optionName, $optionValue);
		
	}
	
	/**
	* Write out the new config option value
	* @param  {String}       the name of the option to be changed
	* @param  {String}       the new value of the option to be changed
	*/
	protected static function writeUpdateConfigOption($optionName,$optionValue) {
		
		// parse the YAML options
		try {
			$options = Yaml::parse(file_get_contents(self::$userConfigPath));
		} catch (ParseException $e) {
			Console::writeError("Config parse error in <path>".self::$userConfigPath."</path>: ".$e->getMessage());
		}
		
		// set this option for the current running of the app
		self::setOption($optionName, $optionValue);
		
		// modify the yaml file results
		$arrayFinder = new ArrayFinder($options);
		$arrayFinder->set($optionName, $optionValue);
		$options = $arrayFinder->get();
		
		// dump the YAML
		$configOutput = Yaml::dump($options, 3);
		
		// write out the new config file
		file_put_contents(self::$userConfigPath,$configOutput);
		
	}
	
	/**
	* Use the default config as a base and update it with old config options. Write out a new user config.
	* @param  {Array}        the old configuration file options
	* @param  {Array}        the default configuration file options
	*
	* @return {Array}        the new configuration
	*/
	protected static function writeNewConfigFile($oldOptions,$defaultOptions) {
		
		// iterate over the old config and replace values in the new config
		foreach ($oldOptions as $key => $value) {
			if ($key != "v") {
				$defaultOptions[$key] = $value;
			}
		}
		
		// dump the YAML
		$configOutput = Yaml::dump($defaultOptions, 3);
		
		// write out the new config file
		file_put_contents(self::$userConfigPath,$configOutput);
		
		return $defaultOptions;
		
	}
	
}
