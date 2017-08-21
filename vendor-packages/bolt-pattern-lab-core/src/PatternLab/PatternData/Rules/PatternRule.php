<?php

/*!
 * Pattern Data Pattern Rule Class
 *
 * Copyright (c) 2014 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 * Adds the generic data about a pattern to PatternData::$store
 *
 */

namespace PatternLab\PatternData\Rules;

use \PatternLab\Config;
use \PatternLab\PatternData;
use \PatternLab\Timer;

class PatternRule extends \PatternLab\PatternData\Rule {
	
	public function __construct($options) {
		
		parent::__construct($options);
		
		$this->depthProp  = 3; // 3 means that depth won't be checked
		$this->extProp    = Config::getOption("patternExtension");
		$this->isDirProp  = false;
		$this->isFileProp = true;
		$this->searchProp = "";
		$this->ignoreProp = "";
		
	}
	
	public function run($depth, $ext, $path, $pathName, $name) {
		
		// load default vars
		$patternSubtype      = PatternData::getPatternSubtype();
		$patternSubtypeClean = PatternData::getPatternSubtypeClean();
		$patternSubtypeDash  = PatternData::getPatternSubtypeDash();
		$patternType         = PatternData::getPatternType();
		$patternTypeClean    = PatternData::getPatternTypeClean();
		$patternTypeDash     = PatternData::getPatternTypeDash();
		$dirSep              = PatternData::getDirSep();
		$frontMeta           = PatternData::getFrontMeta();
		
		// should this pattern get rendered?
		$hidden           = ($name[0] == "_");
		$noviewall        = ($name[0] == "-");
		
		// set-up the names
		$patternFull      = in_array($name[0],$frontMeta) ? substr($name,1) : $name;  // 00-colors.mustache
		$pattern          = str_replace(".".$this->extProp,"",$patternFull);          // 00-colors
		$patternState     = "";
		
		// check for pattern state
		if (strpos($pattern,"@") !== false) {
			$patternBits  = explode("@",$pattern,2);
			$pattern      = $patternBits[0];
			$patternState = $patternBits[1];
		}
		
		// finish setting up vars
		$patternDash      = $this->getPatternName($pattern,false);                     // colors
		$patternClean     = str_replace("-"," ",$patternDash);                         // colors (dashes replaced with spaces)
		$patternPartial   = $patternTypeDash."-".$patternDash;                         // atoms-colors
		$patternPath      = str_replace(".".$this->extProp,"",$pathName);              // 00-atoms/01-global/00-colors
		$patternPathDash  = str_replace($dirSep,"-",$patternPath);                     // 00-atoms-01-global-00-colors (file path)
		
		// create a key for the data store
		$patternStoreKey  = $patternPartial;
		
		// collect the data
		$patternStoreData = array("category"         => "pattern",
								  "name"             => $pattern,
								  "partial"          => $patternPartial,
								  "nameDash"         => $patternDash,
								  "nameClean"        => $patternClean,
								  "type"             => $patternType,
								  "typeDash"         => $patternTypeDash,
								  "breadcrumb"       => array("patternType" => $patternTypeClean),
								  "state"            => $patternState,
								  "hidden"           => $hidden,
								  "noviewall"        => $noviewall,
								  "depth"            => $depth,
								  "ext"              => $ext,
								  "path"             => $path,
								  "pathName"         => $patternPath,
								  "pathDash"         => $patternPathDash,
								  "isDir"            => $this->isDirProp,
								  "isFile"           => $this->isFileProp,
								  "partialViewDescAdditions"    => array(),
								  "partialViewExampleAdditions" => array(),
								  "extraHolder"      => array(),
								  "extraOutput"      => array());
		
		// add any subtype info if necessary
		if ($depth > 1) {
			$patternStoreData["subtype"]     = $patternSubtype;
			$patternStoreData["subtypeDash"] = $patternSubtypeDash;
			$patternStoreData["breadcrumb"]  = array("patternType" => $patternTypeClean, "patternSubtype" => $patternSubtypeClean);
		}
		
		// if the pattern data store already exists make sure it is merged and overwrites this data
		$patternStoreData = (PatternData::checkOption($patternStoreKey)) ? array_replace_recursive(PatternData::getOption($patternStoreKey),$patternStoreData) : $patternStoreData;
		PatternData::setOption($patternStoreKey, $patternStoreData);
		
	}
	
}
