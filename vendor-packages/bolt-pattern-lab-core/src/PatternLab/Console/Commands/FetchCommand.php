<?php

/*!
 * Console Fetch Command Class
 *
 * Copyright (c) 2014 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 */

namespace PatternLab\Console\Commands;

use \PatternLab\Config;
use \PatternLab\Console;
use \PatternLab\Console\Command;
use \PatternLab\Fetch;
use \PatternLab\Timer;

class FetchCommand extends Command {
	
	public function __construct() {
		
		parent::__construct();
		
		$this->command = "fetch";
		
		Console::setCommand($this->command,"Fetch a package or StarterKit","The fetch command downloads packages and StarterKits.","f");
		Console::setCommandOption($this->command,"package:","Fetch a package from Packagist.","To fetch a package from Packagist:","p:","<package-name>");
		
	}
	
	public function run() {
		
		// find the value given to the command
		$package    = Console::findCommandOptionValue("p|package");
		
		if ($package) {
			
			// if <prompt> was passed ask the user for the package name
			if ($package == "prompt") {
				$prompt  = "what is the name of the package you want to fetch?";
				$options = "(ex. pattern-lab/plugin-kss)";
				$package = Console::promptInput($prompt,$options);
			}
			
			// make sure it looks like a valid package
			if (strpos($package,"/") === false) {
				Console::writeError("that wasn't a valid package name. it should look like <info>pattern-lab/plugin-kss</info>...");
			}
			
			// run composer via fetch
			$f = new Fetch();
			$f->fetchPackage($package);
			
		} else {
			
			Console::writeHelpCommand($this->command);
			
		}
		
	}
	
}
