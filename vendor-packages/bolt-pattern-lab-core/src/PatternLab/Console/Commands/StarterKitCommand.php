<?php

/*!
 * Console StarterKit Command Class
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
use \PatternLab\InstallerUtil;
use \PatternLab\JSON;
use \PatternLab\Timer;

class StarterKitCommand extends Command {
	
	public function __construct() {
		
		parent::__construct();
		
		$this->command = "starterkit";
		
		Console::setCommand($this->command,"Initialize or fetch a specific StarterKit","The StarterKit command downloads StarterKits.","k");
		Console::setCommandOption($this->command,"init","Initialize with a blank StarterKit based on the active PatternEngine.","To initialize your project with a base StarterKit:","i");
		Console::setCommandOption($this->command,"install:","Fetch a specific StarterKit from GitHub.","To fetch a StarterKit from GitHub:","j:","<starterkit-name>");
		Console::setCommandOption($this->command,"suggestions","Show suggested StarterKits for this Edition. Offer install prompt.","To show suggested StarterKits for this Edition:");
		
	}
	
	public function run() {
		
		// find the value given to the command
		$init        = Console::findCommandOption("i|init");
		$starterkit  = Console::findCommandOptionValue("f|install");
		$suggestions = Console::findCommandOption("suggestions");
		
		if ($suggestions) {
			
			$this->starterKitSuggestions();
			
		} else if ($init || $starterkit) {
			
			$this->starterKitInstall($starterkit, $init);
			
		} else {
			
			Console::writeHelpCommand($this->command);
			
		}
		
	}
	
	protected function starterKitInstall($starterkit, $init) {
		
		// set-up the base starterkit
		if ($init) {
			$patternEngine = Config::getOption("patternExtension");
			$starterkit    = "pattern-lab/starterkit-".$patternEngine."-base";
		}
		
		// download the starterkit
		$f = new Fetch();
		$f->fetchStarterKit($starterkit);
		
	}
	
	protected function starterKitSuggestions() {
		
		Console::writeLine("");
		
		$composerPath = Config::getOption("baseDir")."/composer.json";
		if (file_exists($composerPath)) {
			
			$json = file_get_contents($composerPath);
			$data = json_decode($json,true);
			if ($jsonErrorMessage = JSON::hasError()) {
				JSON::lastErrorMsg(Console::getHumanReadablePath($oldStyleAnnotationsPath),$jsonErrorMessage,$data);
			}
			
			if (isset($data["extra"]) && isset($data["extra"]["patternlab"]) && isset($data["extra"]["patternlab"]["starterKitSuggestions"])) {
				
				$starterKitSuggestions = $data["extra"]["patternlab"]["starterKitSuggestions"];
				
				Console::writeInfo("suggested starterkits that work with this edition:", false, true);
				foreach ($starterKitSuggestions as $i => $suggestion) {
					$num = $i + 1;
					Console::writeLine($num.": ".$suggestion, true);
				}
				
				// hack around installer util feature in Console::promptInput
				InstallerUtil::$isInteractive = true;
				
				// prompt for input on the suggestions
				Console::writeLine("");
				
				$prompt  = "choose an option or hit return to cancel:";
				$options = "(ex. 1)";
				$input   = Console::promptInput($prompt,$options,"1");
				$result  = (int)$input - 1;
				
				if (isset($starterKitSuggestions[$result])) {
					
					Console::writeLine("");
					$f = new Fetch();
					$result = $f->fetchStarterKit($starterKitSuggestions[$result]);
					
				}
				
			} else {
				
				Console::writeWarning("this edition has no starterkits to suggested...", false, true);
				
			}
			
		} else {
			
			Console::writeError("can't find composer.json to get suggestions...", false, true);
			
		}
		
		
		
	}
	
}
