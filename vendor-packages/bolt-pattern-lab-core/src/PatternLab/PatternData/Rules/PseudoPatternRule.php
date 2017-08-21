<?php

/*!
 * Pattern Data Pseudo-Pattern Rule Class
 *
 * Copyright (c) 2014 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 * If it's a JSON or YAML file with a ~ add the pseudo-pattern info to the PatternData::$store
 *
 */

namespace PatternLab\PatternData\Rules;

use \PatternLab\Config;
use \PatternLab\PatternData;
use \PatternLab\JSON;
use \PatternLab\Timer;
use \Symfony\Component\Yaml\Exception\ParseException;
use \Symfony\Component\Yaml\Yaml;

class PseudoPatternRule extends \PatternLab\PatternData\Rule {

	public function __construct($options) {

		parent::__construct($options);

		$this->depthProp  = 3; // 3 means that depth won't be checked
		$this->extProp    = "json||yaml||yml";
		$this->isDirProp  = false;
		$this->isFileProp = true;
		$this->searchProp = "~";
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
		$hidden             = ($name[0] == "_");
		$noviewall          = ($name[0] == "-");

		// set-up the names
		$patternFull        = in_array($name[0],$frontMeta) ? substr($name,1) : $name;         // 00-colors~foo.mustache
		$patternState       = "";

		// check for pattern state
		if (strpos($patternFull,"@") !== false) {
			$patternBits    = explode("@",$patternFull,2);
			$patternState   = str_replace(".".$ext,"",$patternBits[1]);
			$patternFull    = preg_replace("/@(.*?)\./",".",$patternFull);
		}

		// finish setting up vars
		$patternBits         = explode("~",$patternFull);
		$patternBase         = $patternBits[0].".".Config::getOption("patternExtension");       // 00-homepage.mustache
		$patternBaseDash     = $this->getPatternName($patternBits[0],false);                    // homepage
		$patternBaseOrig     = $patternTypeDash."-".$patternBaseDash;                           // pages-homepage
		$patternBaseData     = $patternBits[0].".".$ext;                                        // 00-homepage.json
		$stripJSON           = str_replace(".".$ext,"",$patternBits[1]);
		$patternBitClean     = preg_replace("/@(.*?)/","",$patternBits[0]);
		$pattern             = $patternBitClean."-".$stripJSON;                                 // 00-homepage-00-emergency
		$patternInt          = $patternBitClean."-".$this->getPatternName($stripJSON, false);   // 00-homepage-emergency
		$patternDash         = $this->getPatternName($patternInt,false);                        // homepage-emergency
		$patternClean        = str_replace("-"," ",$patternDash);                               // homepage emergency
		$patternPartial      = $patternTypeDash."-".$patternDash;                               // pages-homepage-emergency
		$patternPath         = str_replace(".".$ext,"",str_replace("~","-",$pathName));         // 00-atoms/01-global/00-colors
		$patternPathDash     = str_replace($dirSep,"-",$patternPath);                           // 00-atoms-01-global-00-colors (file path)

		// check the original pattern path. if it doesn't exist make a guess
		$patternPathOrig     = PatternData::getPatternOption($patternBaseOrig,"pathName");      // 04-pages/00-homepage
		$patternPathOrigDash = PatternData::getPatternOption($patternBaseOrig,"pathDash");      // 04-pages-00-homepage
		if (!$patternPathOrig) {
			$patternPathOrigBits = explode("~",$pathName);
			$patternPathOrig     = $patternPathOrigBits[0];                                     // 04-pages/00-homepage
			$patternPathOrigDash = str_replace($dirSep,"-",$patternPathOrig);                   // 04-pages-00-homepage
		}

		// create a key for the data store
		$patternStoreKey     = $patternPartial;

		// collect the data
		$patternStoreData   = array("category"     => "pattern",
									"name"         => $pattern,
									"partial"      => $patternPartial,
									"nameDash"     => $patternDash,
									"nameClean"    => $patternClean,
									"type"         => $patternType,
									"typeDash"     => $patternTypeDash,
									"breadcrumb"   => array("patternType" => $patternTypeClean),
									"state"        => $patternState,
									"hidden"       => $hidden,
									"noviewall"    => $noviewall,
									"depth"        => $depth,
									"ext"          => $ext,
									"path"         => $path,
									"pathName"     => $patternPath,
									"pathDash"     => $patternPathDash,
									"isDir"        => $this->isDirProp,
									"isFile"       => $this->isFileProp,
									"pseudo"       => true,
									"original"     => $patternBaseOrig,
									"pathOrig"     => $patternPathOrig,
									"pathOrigDash" => $patternPathOrigDash);

		// add any subtype info if necessary
		if ($depth > 1) {
			$patternStoreData["subtype"]     = $patternSubtype;
			$patternStoreData["subtypeDash"] = $patternSubtypeDash;
			$patternStoreData["breadcrumb"]  = array("patternType" => $patternTypeClean, "patternSubtype" => $patternSubtypeClean);
		}

		$patternDataBase = array();
		if (file_exists(Config::getOption("patternSourceDir").DIRECTORY_SEPARATOR.$path.DIRECTORY_SEPARATOR.$patternBaseData)) {
			$data = file_get_contents(Config::getOption("patternSourceDir").DIRECTORY_SEPARATOR.$path.DIRECTORY_SEPARATOR.$patternBaseData);
			if ($ext == "json") {
				$patternDataBase = json_decode($data,true);
				if ($jsonErrorMessage = JSON::hasError()) {
					JSON::lastErrorMsg($patternBaseJSON,$jsonErrorMessage,$data);
				}
			} else {

				try {
					$patternDataBase = YAML::parse($data);
				} catch (ParseException $e) {
					printf("unable to parse ".$pathNameClean.": %s..\n", $e->getMessage());
				}

				// single line of text won't throw a YAML error. returns as string
				if (gettype($patternDataBase) == "string") {
					$patternDataBase = array();
				}

			}

		}

		// get the data for the pseudo-pattern
		$data = file_get_contents(Config::getOption("patternSourceDir").DIRECTORY_SEPARATOR.$pathName);
		if ($ext == "json") {
			$patternData = json_decode($data,true);
			if ($jsonErrorMessage = JSON::hasError()) {
				JSON::lastErrorMsg($name,$jsonErrorMessage,$data);
			}
		} else {

			try {
				$patternData = YAML::parse($data);
			} catch (ParseException $e) {
				printf("unable to parse ".$pathNameClean.": %s..\n", $e->getMessage());
			}

			// single line of text won't throw a YAML error. returns as string
			if (gettype($patternData) == "string") {
				$patternData = array();
			}

		}

		// make sure the pattern data is an array before merging the data
		$patternStoreData["data"] = is_array($patternData) ? array_merge($patternDataBase, $patternData) : $patternDataBase;

		// if the pattern data store already exists make sure it is merged and overwrites this data
		$patternStoreData = (PatternData::checkOption($patternStoreKey)) ? array_merge(PatternData::getOption($patternStoreKey),$patternStoreData) : $patternStoreData;
		PatternData::setOption($patternStoreKey, $patternStoreData);

	}

}
