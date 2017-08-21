<?php

/*!
 * Twig Pattern Engine Rule Class
 *
 * Copyright (c) 2014 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 * If the test matches "twig" it will return an instance of the Twig Pattern Engine
 *
 */

namespace PatternLab\PatternEngine\Twig;

use \PatternLab\PatternEngine\Rule;

class PatternEngineRule extends Rule {
	
	public function __construct() {
		
		parent::__construct();
		
		$this->engineProp = "twig";
		$this->basePath   = "\PatternLab\PatternEngine\Twig";
		
	}
	
}
