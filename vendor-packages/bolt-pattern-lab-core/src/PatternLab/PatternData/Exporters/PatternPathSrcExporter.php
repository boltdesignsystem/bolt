<?php

/*!
 * Pattern Data Pattern Path Source Exporter Class
 *
 * Copyright (c) 2014 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 * Generates an array of the source paths (e.g. to mustache) of the patterns
 *
 */


namespace PatternLab\PatternData\Exporters;

use \PatternLab\Config;
use \PatternLab\PatternData;
use \PatternLab\Timer;

class PatternPathSrcExporter extends \PatternLab\PatternData\Exporter {
	
	public function __construct($options = array()) {
		
		parent::__construct($options);
		
	}
	
	public function run() {
		
		$patternPathDests = array();
		
		$store = PatternData::get();
		foreach ($store as $patternStoreKey => $patternStoreData) {
			
			if (($patternStoreData["category"] == "pattern") && isset($patternStoreData["nameDash"])) {
				
				$nameDash = $patternStoreData["nameDash"];
				$typeDash = $patternStoreData["typeDash"];
				
				if (!isset($patternPathDests[$typeDash])) {
					$patternPathDests[$typeDash] = array();
				}
				
				$patternPathDests[$typeDash][$nameDash] = $patternStoreData["pathName"];
				
			}
			
		}
		
		return $patternPathDests;
		
	}
	
}
