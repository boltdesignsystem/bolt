<?php

/*!
 * Console Event Class
 *
 * Copyright (c) 2014 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 * Passes event data from Console to plug-ins
 *
 */

namespace PatternLab\Console;

use Symfony\Component\EventDispatcher;

class Event extends EventDispatcher\Event {
	
	protected $options;
	
	public function __construct($options = array()) {
		$this->options = $options;
	}
	
	public function getOptions() {
		return $this->options;
	}
	
}
