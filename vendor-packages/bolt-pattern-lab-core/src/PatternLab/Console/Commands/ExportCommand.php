<?php

/*!
 * Console Export Command Class
 *
 * Copyright (c) 2014 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 * Exports patterns w/out pattern lab-specific mark-up. Also moves user-generated static
 * assets from public/ to export/
 *
 */

namespace PatternLab\Console\Commands;

use \PatternLab\Config;
use \PatternLab\Console;
use \PatternLab\Console\Command;
use \PatternLab\FileUtil;
use \PatternLab\Generator;
use \PatternLab\Timer;

class ExportCommand extends Command {
	
	public function __construct() {
		
		parent::__construct();
		
		$this->command = "export";
		
		Console::setCommand($this->command,"Export Pattern Lab patterns & assets","The export command generates your patterns without Pattern Lab's CSS & JS, copies static assets from <path>public/</path>, and puts all of it in <path>export/</path>.","e");
		Console::setCommandOption($this->command,"clean","Don't add any header or footer mark-up to the exported patterns.","To generate clean versions of your patterns:");
		
	}
	
	public function run() {
		
		// set-up required vars
		$options                = array();
		$options["exportFiles"] = true;
		$options["exportClean"] = Console::findCommandOption("clean");
		$options["moveStatic"]  = false;
		
		FileUtil::cleanExport();
		
		$g = new Generator();
		$g->generate($options);
		
		FileUtil::exportStatic();
		
	}
	
}
