<?php

/*!
 * Pattern Engine Rule Class
 *
 * Copyright (c) 2014 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 * Tests the engine property of the rule agains the pattern extension in the config
 *
 */

namespace PatternLab\PatternEngine;

use \PatternLab\Config;
use \PatternLab\Timer;

class Rule {
	
	protected $engineProp;
	protected $basePath;
	
	public function __construct() {
		
		// nothing here yet
		
	}
	
	public function getBasePath() {
		
		return $this->basePath;
		
	}
	
	public function test($patternExtension) {
		
		return ($this->engineProp === $patternExtension);
		
	}
	
}
