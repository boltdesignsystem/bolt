<?php

/*!
 * Pattern Data Info Rule Class
 *
 * Copyright (c) 2014 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 * If it's a *.json or *.yaml file without a ~ it adds the data to PatternData::$store
 *
 */

namespace PatternLab\PatternData\Rules;

use \PatternLab\Config;
use \PatternLab\PatternData;
use \PatternLab\JSON;
use \PatternLab\Timer;
use \Symfony\Component\Yaml\Exception\ParseException;
use \Symfony\Component\Yaml\Yaml;

class PatternInfoRule extends \PatternLab\PatternData\Rule {
	
	public function __construct($options) {
		
		parent::__construct($options);
		
		$this->depthProp  = 3; // 3 means that depth won't be checked
		$this->extProp    = "json||yaml||yml";
		$this->isDirProp  = false;
		$this->isFileProp = true;
		$this->searchProp = "";
		$this->ignoreProp = "~||listitems";
		
	}
	
	public function run($depth, $ext, $path, $pathName, $name) {
		
		// load default vars
		$patternTypeDash = PatternData::getPatternTypeDash();
		
		// should this pattern get rendered?
		$hidden          = ($name[0] == "_");
		
		// set-up the names, $name == foo.json
		$pattern         = str_replace(".".$ext,"",$name);        // foo
		$patternDash     = $this->getPatternName($pattern,false); // foo
		$patternPartial  = $patternTypeDash."-".$patternDash;     // atoms-foo
		
		if (!$hidden) {
			
			$patternStoreData = array("category" => "pattern");
			
			$file = file_get_contents(Config::getOption("patternSourceDir")."/".$pathName);
			
			if ($ext == "json") {
				$data = json_decode($file,true);
				if ($jsonErrorMessage = JSON::hasError()) {
					JSON::lastErrorMsg($name,$jsonErrorMessage,$data);
				}
			} else {
				
				try {
					$data = YAML::parse($file);
				} catch (ParseException $e) {
					printf("unable to parse ".$pathNameClean.": %s..\n", $e->getMessage());
				}
				
				// single line of text won't throw a YAML error. returns as string
				if (gettype($data) == "string") {
					$data = array();
				}
				
			}
			
			$patternStoreData["data"] = $data;
			
			// create a key for the data store
			$patternStoreKey = $patternPartial;
			
			// if the pattern data store already exists make sure it is merged and overwrites this data
			$patternStoreData = (PatternData::checkOption($patternStoreKey)) ? array_replace_recursive(PatternData::getOption($patternStoreKey),$patternStoreData) : $patternStoreData;
			PatternData::setOption($patternStoreKey, $patternStoreData);
			
		}
		
	}
	
}
