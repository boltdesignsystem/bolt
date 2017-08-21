<?php

/*!
 * Pattern Data Class
 *
 * Copyright (c) 2014 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 * Gather together all of the general information related to patterns into one central location
 *
 */

namespace PatternLab;

use \PatternLab\Config;
use \PatternLab\Dispatcher;
use \PatternLab\PatternData\Event as PatternDataEvent;
use \PatternLab\PatternData\Exporters\DataLinkExporter;
use \PatternLab\PatternData\Exporters\DataMergeExporter;
use \PatternLab\PatternData\Exporters\NavItemsExporter;
use \PatternLab\PatternData\Exporters\PatternPathSrcExporter;
use \PatternLab\PatternData\Exporters\ViewAllPathsExporter;
use \PatternLab\PatternData\Helpers\LineageHelper;
use \PatternLab\PatternData\Helpers\PatternCodeHelper;
use \PatternLab\PatternData\Helpers\PatternStateHelper;
use \PatternLab\PatternData\Helpers\RawPatternHelper;
use \PatternLab\Timer;

class PatternData {

	protected static $store               = array();
	protected static $patternSubtype      = "";
	protected static $patternSubtypeClean = "";
	protected static $patternSubtypeDash  = "";
	protected static $patternSubtypeSet   = false;
	protected static $patternType         = "";
	protected static $patternTypeClean    = "";
	protected static $patternTypeDash     = "";
	protected static $rules               = array();
	protected static $dirSep              = DIRECTORY_SEPARATOR;
	protected static $frontMeta           = array("-","_");

	/**
	* Return if a specific option is set
	* @param  {String}     the option to check
	*/
	public static function checkOption($optionName) {

		return isset(self::$store[$optionName]);

	}

	/**
	* Return if a specific option for a pattern is set
	* @param  {String}     the pattern to check
	* @param  {String}     the option to check
	*/
	public static function checkPatternOption($patternStoreKey,$optionName) {

		if (isset(self::$store[$patternStoreKey])) {
			return isset(self::$store[$patternStoreKey][$optionName]);
		}

		return false;

	}

	/**
	* Clear all of the data in the $store
	*/
	public static function clear() {
		self::$store = array();
	}

	/**
	* Check to see if the given pattern type has a pattern subtype associated with it
	* @param  {String}        the name of the pattern
	*
	* @return {Boolean}       if it was found or not
	*/
	public static function hasPatternSubtype($patternType) {
		foreach (self::$store as $patternStoreKey => $patternStoreData) {
			if (($patternStoreData["category"] == "patternSubtype") && ($patternStoreData["typeDash"] == $patternType)) {
				return true;
			}
		}
		return false;
	}

	/**
	* Gather all of the information related to the patterns
	*/
	public static function gather($options = array()) {

		// set default vars
		$exportClean        = (isset($options["exportClean"])) ? $options["exportClean"] : false;
		$exportFiles        = (isset($options["exportClean"])) ? $options["exportFiles"] : false;
		$dispatcherInstance = Dispatcher::getInstance();

		// cleaning the var for use below, i know this is stupid
		$options = array();

		// dispatch that the data gather has started
		$event = new PatternDataEvent($options);
		$dispatcherInstance->dispatch("patternData.gatherStart",$event);

		// load up the rules for parsing patterns and the directories
		self::loadRules($options);

		// dispatch that the rules are loaded
		$event = new PatternDataEvent($options);
		$dispatcherInstance->dispatch("patternData.rulesLoaded",$event);

		// iterate over the patterns & related data and regenerate the entire site if they've changed
		// seems a little silly to use symfony finder here. not really giving me any power
		$patternObjects = new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator(Config::getOption("patternSourceDir")), \RecursiveIteratorIterator::SELF_FIRST);
		$patternObjects->setFlags(\FilesystemIterator::SKIP_DOTS);

		// sort the returned objects
		$patternObjects = iterator_to_array($patternObjects);
		ksort($patternObjects);

		$patternSourceDir = Config::getOption("patternSourceDir");

		foreach ($patternObjects as $name => $object) {

			$ext      = $object->getExtension();
			$isDir    = $object->isDir();
			$isFile   = $object->isFile();

			$path     = str_replace($patternSourceDir.DIRECTORY_SEPARATOR,"",$object->getPath());
			$pathName = str_replace($patternSourceDir.DIRECTORY_SEPARATOR,"",$object->getPathname());
			$name     = $object->getFilename();
			$depth    = substr_count($pathName,DIRECTORY_SEPARATOR);

			// iterate over the rules and see if the current file matches one, if so run the rule
			foreach (self::$rules as $rule) {
				if ($rule->test($depth, $ext, $isDir, $isFile, $name)) {
					$rule->run($depth, $ext, $path, $pathName, $name);
				}
			}

		}

		// dispatch that the data is loaded
		$event = new PatternDataEvent($options);
		$dispatcherInstance->dispatch("patternData.dataLoaded",$event);

		// make sure all of the appropriate pattern data is pumped into $this->d for rendering patterns
		$dataLinkExporter       = new DataLinkExporter();
		$dataLinkExporter->run();

		// make sure all of the appropriate pattern data is pumped into $this->d for rendering patterns
		$dataMergeExporter       = new DataMergeExporter();
		$dataMergeExporter->run();

		// dispatch that the raw pattern helper is about to start
		$event = new PatternDataEvent($options);
		$dispatcherInstance->dispatch("patternData.rawPatternHelperStart",$event);

		// add the lineage info to PatternData::$store
		$rawPatternHelper        = new RawPatternHelper();
		$rawPatternHelper->run();

		// dispatch that the raw pattern helper is ended
		$event = new PatternDataEvent($options);
		$dispatcherInstance->dispatch("patternData.rawPatternHelperEnd",$event);

		// dispatch that the lineage helper is about to start
		$event = new PatternDataEvent($options);
		$dispatcherInstance->dispatch("patternData.lineageHelperStart",$event);

		// add the lineage info to PatternData::$store
		$lineageHelper           = new LineageHelper();
		$lineageHelper->run();

		// dispatch that the lineage helper is ended
		$event = new PatternDataEvent($options);
		$dispatcherInstance->dispatch("patternData.lineageHelperEnd",$event);

		// dispatch that the pattern state helper is about to start
		$event = new PatternDataEvent($options);
		$dispatcherInstance->dispatch("patternData.patternStateHelperStart",$event);

		// using the lineage info update the pattern states on PatternData::$store
		$patternStateHelper      = new PatternStateHelper();
		$patternStateHelper->run();

		// dispatch that the pattern state helper is ended
		$event = new PatternDataEvent($options);
		$dispatcherInstance->dispatch("patternData.patternStateHelperEnd",$event);

		// set-up code pattern paths
		$ppdExporter             = new PatternPathSrcExporter();
		$patternPathSrc          = $ppdExporter->run();
		$options                 = array();
		$options["patternPaths"] = $patternPathSrc;

		// dispatch that the code helper is about to start
		$event = new PatternDataEvent($options);
		$dispatcherInstance->dispatch("patternData.codeHelperStart",$event);

		// render out all of the patterns and store the generated info in PatternData::$store
		$options["exportFiles"]  = $exportFiles;
		$options["exportClean"]  = $exportClean;
		$patternCodeHelper       = new PatternCodeHelper($options);
		$patternCodeHelper->run();

		// dispatch that the pattern code helper is ended
		$event = new PatternDataEvent($options);
		$dispatcherInstance->dispatch("patternData.patternCodeHelperEnd",$event);

		// dispatch that the gather has ended
		$event = new PatternDataEvent($options);
		$dispatcherInstance->dispatch("patternData.gatherEnd",$event);

	}

	/**
	* Get the overall store of PatternData
	*/
	public static function get() {

		return self::$store;

	}

	/**
	* Get the directory separator
	*/
	public static function getDirSep() {
		return self::$dirSep;
	}

	/**
	* GEt the front meta bits (hidden and noviewall)
	*/
	public static function getFrontMeta() {
		return self::$frontMeta;
	}

	/**
	* Get a specific item from the store
	* @param  {String}     the option to check
	*/
	public static function getOption($optionName) {

		if (isset(self::$store[$optionName])) {
			return self::$store[$optionName];
		}

		return false;

	}

	/**
	* Get a specific item from a pattern in the store data
	* @param  {String}        the name of the pattern
	* @param  {String}        the name of the option to get
	*
	* @return {String|Boolean} the value of false if it wasn't found
	*/
	public static function getPatternOption($patternStoreKey,$optionName) {

		if (isset(self::$store[$patternStoreKey][$optionName])) {
			return self::$store[$patternStoreKey][$optionName];
		}

		return false;

	}

	/**
	* Get the pattern sub type
	*/
	public static function getPatternSubtype() {

		if (isset(self::$patternSubtype)) {
			return self::$patternSubtype;
		}

		return false;

	}

	/**
	* Get the pattern sub type clean
	*/
	public static function getPatternSubtypeClean() {

		if (isset(self::$patternSubtypeClean)) {
			return self::$patternSubtypeClean;
		}

		return false;

	}

	/**
	* Get the pattern sub type dash
	*/
	public static function getPatternSubtypeDash() {

		if (isset(self::$patternSubtypeDash)) {
			return self::$patternSubtypeDash;
		}

		return false;

	}

	/**
	* Get the pattern sub type set
	*/
	public static function getPatternSubtypeSet() {

		if (isset(self::$patternSubtypeSet)) {
			return self::$patternSubtypeSet;
		}

		return false;

	}

	/**
	* Get the pattern type
	*/
	public static function getPatternType() {

		if (isset(self::$patternType)) {
			return self::$patternType;
		}

		return false;

	}

	/**
	* Get the pattern type clean
	*/
	public static function getPatternTypeClean() {

		if (isset(self::$patternTypeClean)) {
			return self::$patternTypeClean;
		}

		return false;

	}

	/**
	* Get the pattern type dash
	*/
	public static function getPatternTypeDash() {

		if (isset(self::$patternTypeDash)) {
			return self::$patternTypeDash;
		}

		return false;

	}

	/**
	* Get a particular rule
	* @param  {String}        the name of the pattern
	*/
	public static function getRule($ruleName) {

		if (isset(self::$rules[$ruleName])) {
			return self::$rules[$ruleName];
		}

		return false;

	}

	/**
	* Get all rules
	*/
	public static function getRules() {

		return self::$rules;

	}

	/**
	* Load all of the rules related to Pattern Data
	*/
	public static function loadRules($options) {
		foreach (glob(__DIR__."/PatternData/Rules/*.php") as $filename) {
			$ruleName = str_replace(".php","",str_replace(__DIR__."/PatternData/Rules/","",$filename));
			if ($ruleName[0] != "_") {
				$ruleClass = "\PatternLab\PatternData\Rules\\".$ruleName;
				$rule      = new $ruleClass($options);
				self::setRule($ruleName, $rule);
			}
		}
	}

	/**
	* Set an options value
	* @param  {String}        the name of the option to set
	* @param  {String}        the name of the value to give to it
	*
	* @return {Boolean}       if it was set or not
	*/
	public static function setOption($optionName,$optionValue) {

		if (isset(self::$store)) {
			self::$store[$optionName] = $optionValue;
			return true;
		}

		return false;

	}

	/**
	* Set a pattern option value
	* @param  {String}        the name of the pattern
	* @param  {String}        the name of the option to set
	* @param  {String}        the name of the value to give to it
	*
	* @return {Boolean}       if it was set or not
	*/
	public static function setPatternOption($patternStoreKey,$optionName,$optionValue) {

		if (isset(self::$store[$patternStoreKey])) {

			self::$store[$patternStoreKey][$optionName] = $optionValue;
			return true;

		}

		return false;

	}

	/**
	* Set a pattern option value for an option element that has an array
	* @param  {String}        the name of the pattern
	* @param  {String}        the name of the option to set
	* @param  {String}        the name of the value to give to it
	* @param  {String}        the key to be added to the array
	*
	* @return {Boolean}       if it was set or not
	*/
	public static function setPatternOptionArray($patternStoreKey,$optionName,$optionValue,$optionKey = "") {

		if (isset(self::$store[$patternStoreKey]) && isset(self::$store[$patternStoreKey][$optionName]) && is_array(self::$store[$patternStoreKey][$optionName])) {

			if (empty($optionKey)) {
				self::$store[$patternStoreKey][$optionName][] = $optionValue;
			} else {
				self::$store[$patternStoreKey][$optionName][$optionKey] = $optionValue;
			}

			return true;

		}

		return false;

	}

	/**
	* Set a pattern sub option value
	* @param  {String}        the name of the pattern
	* @param  {String}        the name of the option to check
	* @param  {String}        the name of the pattern sub key
	* @param  {String}        the name of the option to set
	* @param  {String}        the name of the value to give to it
	*
	* @return {Boolean}       if it was set or not
	*/
	public static function setPatternSubOption($patternStoreKey,$optionName,$patternSubStoreKey,$optionSubName,$optionSubValue) {

		if (isset(self::$store[$patternStoreKey]) && isset(self::$store[$patternStoreKey][$optionName]) && isset(self::$store[$patternStoreKey][$optionName][$patternSubStoreKey])) {

			self::$store[$patternStoreKey][$optionName][$patternSubStoreKey][$optionSubName] = $optionSubValue;
			return true;

		}

		return false;

	}

	/**
	* Set the pattern subtype
	* @param  {String}       the option value
	*/
	public static function setPatternSubtype($optionValue) {

		self::$patternSubtype = $optionValue;

	}

	/**
	* Set the pattern subtype clean
	* @param  {String}       the option value
	*/
	public static function setPatternSubtypeClean($optionValue) {

		self::$patternSubtypeClean = $optionValue;

	}

	/**
	* Set the pattern subtype dash
	* @param  {String}       the option value
	*/
	public static function setPatternSubtypeDash($optionValue) {

		self::$patternSubtypeDash = $optionValue;

	}

	/**
	* Set the pattern subtype set
	* @param  {String}       the option value
	*/
	public static function setPatternSubtypeSet($optionValue) {

		self::$patternSubtypeSet = $optionValue;

	}

	/**
	* Set the pattern type
	* @param  {String}       the option value
	*/
	public static function setPatternType($optionValue) {

		self::$patternType = $optionValue;

	}

	/**
	* Set the pattern type clean
	* @param  {String}       the option value
	*/
	public static function setPatternTypeClean($optionValue) {

		self::$patternTypeClean = $optionValue;

	}

	/**
	* Set the pattern type dash
	* @param  {String}       the option value
	*/
	public static function setPatternTypeDash($optionValue) {

		self::$patternTypeDash = $optionValue;

	}

	/**
	* Set a rule
	* @param  {String}       the name of the rule
	* @param  {Object}       the rule properties, guess this is a class too
	*/
	public static function setRule($ruleName, $rule) {

		self::$rules[$ruleName] = $rule;

	}

	/**
	* Update a property for a given rule
	* @param  {String}       the name of the rule to update
	* @param  {String}       the name of the property
	* @param  {String}       the value of the property
	* @param  {String}       the action that should be taken with the new value
	*
	* @return {Boolean}      whether the update was successful
	*/
	public function updateRuleProp($ruleName, $propName, $propValue, $action = "or") {

		if ($rule != self::getRule($ruleName)) {
			return false;
		}

		$rule->updateProp($propName, $propValue, $action);
		self::setRule($ruleName, $rule);

	}

}
