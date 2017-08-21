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

class PatternCodeHelper extends \PatternLab\PatternData\Helper {
	
	public function __construct($options = array()) {
		
		parent::__construct($options);
		
		$this->exportFiles  = $options["exportFiles"];
		$this->exportClean  = $options["exportClean"];
		$this->patternPaths = $options["patternPaths"];
		
	}
	
	public function run() {
		
		// default vars
		$options                 = array();
		$options["patternPaths"] = $this->patternPaths;
		$patternExtension        = Config::getOption("patternExtension");
		$patternSourceDir        = Config::getOption("patternSourceDir");
		$htmlHead                = Template::getHTMLHead();
		$htmlFoot                = Template::getHTMLFoot();
		$patternHead             = Template::getPatternHead();
		$patternFoot             = Template::getPatternFoot();
		$stringLoader            = Template::getStringLoader();
		
		// re-load the pattern data since we modified it
		$store = PatternData::get();
		
		// load the pattern loader
		$patternEngineBasePath   = PatternEngine::getInstance()->getBasePath();
		$patternLoaderClass      = $patternEngineBasePath."\Loaders\PatternLoader";
		$patternLoader           = new $patternLoaderClass($options);
		
		// iterate to process each pattern
		foreach ($store as $patternStoreKey => $patternStoreData) {
			
			if (($patternStoreData["category"] == "pattern") && isset($patternStoreData["hidden"]) && !$patternStoreData["hidden"]) {
				
				$data = Data::getPatternSpecificData($patternStoreKey);
				
				// add the pattern data so it can be exported
				$patternData = array();
				//$patternFooterData["patternFooterData"]["cssEnabled"]      = (Config::$options["enableCSS"] && isset($this->patternCSS[$p])) ? "true" : "false";
				$patternData["cssEnabled"]        = false;
				$patternData["lineage"]           = isset($patternStoreData["lineages"])  ? $patternStoreData["lineages"] : array();
				$patternData["lineageR"]          = isset($patternStoreData["lineagesR"]) ? $patternStoreData["lineagesR"] : array();
				$patternData["patternBreadcrumb"] = $patternStoreData["breadcrumb"];
				$patternData["patternDesc"]       = (isset($patternStoreData["desc"])) ? $patternStoreData["desc"] : "";
				$patternData["patternExtension"]  = $patternExtension;
				$patternData["patternName"]       = $patternStoreData["nameClean"];
				$patternData["patternPartial"]    = $patternStoreData["partial"];
				$patternData["patternState"]      = $patternStoreData["state"];
				
				// extra copy for the code view
				$patternData["extraOutput"]       = isset($patternStoreData["extraOutput"]) ? $patternStoreData["extraOutput"] : array();
				
				// add the pattern lab specific mark-up
				// set a default var
				$exportClean                      = (isset($options["exportClean"])) ? $options["exportClean"] : false;
				$data["patternLabHead"]           = (!$this->exportFiles) ? $stringLoader->render(array("string" => $htmlHead, "data" => array("cacheBuster" => $data["cacheBuster"]))) : "";
				$data["patternLabFoot"]           = (!$this->exportFiles) ? $stringLoader->render(array("string" => $htmlFoot, "data" => array("cacheBuster" => $data["cacheBuster"], "isPattern" => true, "patternData" => json_encode($patternData)))) : "";
				
				if (isset($patternStoreData["patternRaw"])) {
					
					$header  = (!$this->exportClean) ? $stringLoader->render(array("string" => $patternHead, "data" => $data)) : "";
					$code    = $patternLoader->render(array("pattern" => $patternStoreData["patternRaw"], "data" => $data));
					$footer  = (!$this->exportClean) ? $stringLoader->render(array("string" => $patternFoot, "data" => $data)) : "";
					
					PatternData::setPatternOption($patternStoreKey,"header",$header);
					PatternData::setPatternOption($patternStoreKey,"code",$code);
					PatternData::setPatternOption($patternStoreKey,"footer",$footer);
					
				}
				
			}
			
		}
		
	}
	
}
