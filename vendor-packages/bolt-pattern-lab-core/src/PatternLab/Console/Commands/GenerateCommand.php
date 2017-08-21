<?php

/*!
 * Console Generate Command Class
 *
 * Copyright (c) 2014 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 */

namespace PatternLab\Console\Commands;

use \PatternLab\Config;
use \PatternLab\Console;
use \PatternLab\Console\Command;
use \PatternLab\Generator;
use \PatternLab\Timer;

class GenerateCommand extends Command {
	
	public function __construct() {
		
		parent::__construct();
		
		$this->command = "generate";
		
		Console::setCommand($this->command,"Generate Pattern Lab","The generate command generates an entire site a single time. By default it removes old content in <path>public/</path>, compiles the patterns and moves content from <path>source/</path> into <path>public/</path>","g");
		Console::setCommandOption($this->command,"patternsonly","Generate only the patterns. Does NOT clean <path>public/</path>.","To generate only the patterns:","p");
		Console::setCommandOption($this->command,"nocache","Set the cacheBuster value to 0.","To turn off the cacheBuster:","n");
		
	}
	
	public function run() {
		
		// set-up required vars
		$options                  = array();
		$options["moveStatic"]    = (Console::findCommandOption("p|patternsonly")) ? false : true;
		$options["noCacheBuster"] = Console::findCommandOption("n|nocache");
		
		$g = new Generator();
		$g->generate($options);
		$g->printSaying();
		
	}
	
}
