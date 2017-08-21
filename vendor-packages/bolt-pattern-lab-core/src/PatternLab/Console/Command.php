<?php

/*!
 * Console Command Class
 *
 * Copyright (c) 2014 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 */

namespace PatternLab\Console;

use \PatternLab\Timer;

class Command {
	
	/**
	* Set-up a default var
	*/
	public function __construct() {
		
		// nothing here yet
		
	}
	
	/**
	* See if a particular command matches the one passed via the command line
	* @param  {String}      the command to check
	*
	* @return {Boolean}     the result of the test
	*/
	public function test($command) {
		return ($command == str_replace(":","",$this->command));
	}
	
}
