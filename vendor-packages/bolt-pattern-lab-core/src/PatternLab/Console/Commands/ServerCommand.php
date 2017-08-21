<?php

/*!
 * Console Server Command Class
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

class ServerCommand extends Command {
	
	public function __construct() {
		
		parent::__construct();
		
		$this->command = "server";
		
		Console::setCommand($this->command,"Start the PHP-based server","The server command will start PHP's web server for you.","s");
		Console::setCommandOption($this->command,"host:","Provide a custom hostname. Default value is <path>localhost</path>.","To use a custom hostname and the default port:","","<host>");
		Console::setCommandOption($this->command,"port:","Provide a custom port. Default value is <path>8080</path>.","To use a custom port and the default hostname:","","<port>");
		Console::setCommandOption($this->command,"quiet","Turn on quiet mode for the server.","To turn on quiet mode:");
		Console::setCommandSample($this->command,"To provide both a custom hostname and port:","--host <host> --port <port>");

	}
	
	public function run() {
		
		if (version_compare(phpversion(), '5.4.0', '<')) {
			
			Console::writeWarning("you must have PHP 5.4.0 or greater to use this feature. you are using PHP ".phpversion()."...");
			
		} else {
			
			// set-up defaults
			$publicDir = Config::getOption("publicDir");
			$coreDir   = Config::getOption("coreDir");
			
			$host = Console::findCommandOptionValue("host");
			$host = $host ? $host : "localhost";
			
			$port = Console::findCommandOptionValue("port");
			$host = $port ? $host.":".$port : $host.":8080";
			
			$null = Console::findCommandOption("quiet");
			$null = $null ? " >& /dev/null" : "";
			
			$php  = isset($_SERVER["_"]) ? $_SERVER["_"] : Config::getOption("phpBin");
			
			if (!$php) {
				$configPath = Console::getHumanReadablePath(Config::getOption("configPath"));
				Console::writeError("please add the option `phpBin` with the path to PHP to <path>".$configPath."</path> before running the server...");
			}
			
			// start-up the server with the router
			Console::writeInfo("server started on http://".$host." - use ctrl+c to exit...");
			
			passthru("cd ".$publicDir." && ".$php." -S ".$host." ".$coreDir."/server/router.php".$null);
			
		}
		
	}
	
}
