<?php

/*!
 * Pattern Data Pattern State Helper Class
 *
 * Copyright (c) 2014 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 * Goes through all patterns, evaluates their pattern state and adds appropriate pattern
 * states to other patterns in their reverse lineage
 *
 */

namespace PatternLab\PatternData\Helpers;

use \PatternLab\Config;
use \PatternLab\PatternData;
use \PatternLab\Timer;

class PatternStateHelper extends \PatternLab\PatternData\Helper {
	
	public function __construct($options = array()) {
		
		parent::__construct($options);
		
	}
	
	public function run() {
		
		// check on the states of the patterns
		$patternStates    = Config::getOption("patternStates");
		$patternStateLast = count($patternStates) - 1;
		
		// run through each item in the store and only look at patterns
		$store = PatternData::get();
		foreach ($store as $patternStoreKey => $patternStoreData) {
			
			if (($patternStoreData["category"] == "pattern") && isset($patternStoreData["state"])) {
				
				$patternState = $patternStoreData["state"];
				
				// make sure the pattern has a given state
				if ($patternState != "") {
					
					$patternStateDigit = array_search($patternState,$patternStates);
					
					// if this is a true pattern state update various patterns
					if ($patternStateDigit !== false) {
						
						$storeTake2 = PatternData::get();
						foreach ($storeTake2 as $patternStoreKey2 => $patternStoreData2) {
							
							if (($patternStoreData2["category"] == "pattern") && isset($patternStoreData2["lineagesR"])) {
								
								foreach ($patternStoreData2["lineagesR"] as $patternCheckInfo) {
									
									$lineagePatternPartial = $patternCheckInfo["lineagePattern"];
									
									// if the found pattern's lineage is empty and the pattern state isn't the last (e.g. complete) add the pattern state
									// otherwise, if the pattern state is less than the one being checked update the pattern
									if ((PatternData::getPatternOption($lineagePatternPartial,"state") == "") && ($patternStateDigit != $patternStateLast)) {
										
										PatternData::setPatternOption($lineagePatternPartial,"state",$patternState);
										
									} else {
										
										$patternStateCheck = array_search(PatternData::getPatternOption($lineagePatternPartial,"state"), $patternStates);
										if ($patternStateDigit < $patternStateCheck) {
											PatternData::setPatternOption($lineagePatternPartial,"state",$patternState);
										}
										
									}
									
								}
								
							}
							
						}
						
					}
					
				}
				
			}
			
		}
		
		// make sure we update the lineages with the pattern state if appropriate
		$store = PatternData::get();
		foreach ($store as $patternStoreKey => $patternStoreData) {
			
			if ($patternStoreData["category"] == "pattern") {
				
				if (isset($patternStoreData["lineages"]) && !empty($patternStoreData["lineages"])) {
					
					foreach ($patternStoreData["lineages"] as $patternLineageKey => $patternLineageInfo) {
						
						$lineagePattern = $patternLineageInfo["lineagePattern"];
						$patternState   = PatternData::getPatternOption($lineagePattern,"state");
						if (($patternState != "") && ($patternState != null)) {
							PatternData::setPatternSubOption($patternStoreKey,"lineages",$patternLineageKey,"lineageState",$patternState);
						}
						
					}
					
				}
				
				if (isset($patternStoreData["lineagesR"]) && !empty($patternStoreData["lineagesR"])) {
					
					foreach ($patternStoreData["lineagesR"] as $patternLineageKey => $patternLineageInfo) {
						
						$lineagePattern = $patternLineageInfo["lineagePattern"];
						$patternState   = PatternData::getPatternOption($lineagePattern,"state");
						if (($patternState != "") && ($patternState != null)) {
							PatternData::setPatternSubOption($patternStoreKey,"lineagesR",$patternLineageKey,"lineageState",$patternState);
						}
						
					}
					
				}
				
			}
			
		}
		
	}
	
}
