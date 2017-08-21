<?php

/*!
 * Console Version Command Class
 *
 * Copyright (c) 2014 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 */

namespace PatternLab\Console\Commands;

use \PatternLab\Config;
use \PatternLab\Console;
use \PatternLab\Console\Command;
use \PatternLab\Timer;

class VersionCommand extends Command {
	
	public function __construct() {
		
		parent::__construct();
		
		$this->command = "version";
		
		Console::setCommand($this->command,"Print the version number","The version command prints out the current version of Pattern Lab.","v");
		
	}
	
	public function run() {
		
		Console::writeInfo("you're running <desc>v".Config::getOption("v")."</desc> of the PHP version of Pattern Lab...");
		
	}
	
}
