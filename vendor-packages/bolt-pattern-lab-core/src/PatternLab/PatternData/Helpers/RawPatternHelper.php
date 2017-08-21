<?php

/*!
 * Pattern Data Pattern Code Helper Class
 *
 * Copyright (c) 2014 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 * Renders patterns and stores the rendered code in PatternData::$store
 *
 */

namespace PatternLab\PatternData\Helpers;

use \PatternLab\Config;
use \PatternLab\Console;
use \PatternLab\Data;
use \PatternLab\Dispatcher;
use \PatternLab\PatternData;
use \PatternLab\PatternEngine;
use \PatternLab\Template;
use \PatternLab\Timer;

class RawPatternHelper extends \PatternLab\PatternData\Helper {
	
	public function __construct($options = array()) {
		
		parent::__construct($options);
		
	}
	
	public function run() {
		
		// load default vars
		$patternExtension = Config::getOption("patternExtension");
		$patternSourceDir = Config::getOption("patternSourceDir");
		
		// load the pattern data
		$store = PatternData::get();
		
		// iterate to get raw data loaded into the PatternData Store
		foreach ($store as $patternStoreKey => $patternStoreData) {
			
			if (($patternStoreData["category"] == "pattern") && isset($patternStoreData["hidden"]) && !$patternStoreData["hidden"]) {
				
				// figure out the source path for the pattern to render
				$srcPath = (isset($patternStoreData["pseudo"])) ? PatternData::getPatternOption($patternStoreData["original"],"pathName") : $patternStoreData["pathName"];
				
				// load the raw data so it can be modified/rendered
				$path = $patternSourceDir.DIRECTORY_SEPARATOR.$srcPath.".".$patternExtension;
				if (file_exists($path)) {
					PatternData::setPatternOption($patternStoreKey,"patternRaw",file_get_contents($path));
				} else {
					Console::writeError($patternStoreData["partial"]." wasn't found for loading. the given path: ".$path);
				}
				
			}
			
		}
		
	}
	
}
