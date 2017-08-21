<?php

/*!
 * Console Class
 *
 * Copyright (c) 2014 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 * Handles the set-up of the console commands, options, and documentation
 * Heavily influenced by the symfony/console output format
 *
 */

namespace PatternLab;

use \Colors\Color;
use \PatternLab\Console\Event as ConsoleEvent;
use \PatternLab\Dispatcher;
use \PatternLab\Timer;

class Console {
	
	protected static $commands         = array();
	protected static $commandInstances = array();
	protected static $options          = array();
	protected static $optionsShort     = "";
	protected static $optionsLong      = array();
	private   static $color;
	private   static $self             = "";
	private   static $zTracker         = 1;
	
	public static function init() {
		
		// double-check this is being run from the command line
		if (php_sapi_name() != 'cli') {
			print "The console can only be run from the command line.\n";
			exit;
		}
		
		self::$self = $_SERVER["PHP_SELF"];
		
		// set-up the cli coloring
		self::$color = new Color();
		
		// define the pattern lab color theme
		$colorTheme = array();
		$colorTheme["h1"]       = "bold";
		$colorTheme["h2"]       = "underline";
		$colorTheme["optional"] = "italic";
		$colorTheme["desc"]     = "green";
		$colorTheme["path"]     = "green";
		$colorTheme["enter"]    = "blue";
		$colorTheme["ok"]       = "green";
		$colorTheme["options"]  = "magenta";
		$colorTheme["info"]     = "cyan";
		$colorTheme["warning"]  = "yellow";
		$colorTheme["error"]    = "red";
		$colorTheme["strong"]   = "bold";
		$colorTheme["fire1"]    = "color[196]";
		$colorTheme["fire2"]    = "color[202]";
		$colorTheme["fire3"]    = "color[208]";
		$colorTheme["fire4"]    = "color[214]";
		$colorTheme["fire5"]    = "color[220]";
		$colorTheme["fire6"]    = "color[226]";
		$colorTheme["cool"]     = "color[19]";
		self::$color->setTheme($colorTheme);
		
	}
	
	public static function run() {
		
		// send out an event
		$event = new ConsoleEvent($options = array());
		Dispatcher::getInstance()->dispatch("console.loadCommandsStart",$event);
		
		// loadCommands
		self::loadCommands();
		
		// send out an event
		Dispatcher::getInstance()->dispatch("console.loadCommandsEnd",$event);
		
		// get what was passed on the command line
		self::$options = getopt(self::$optionsShort,self::$optionsLong);
		
		// test and run the given command
		$commandFound = false;
		$commandSent  = self::getCommand();
		foreach (self::$commandInstances as $command) {
			if ($command->test($commandSent)) {
				$command->run();
				$commandFound = true;
			}
		}
		
		// no command was found so just draw the help by default
		if (!$commandFound) {
			
			self::writeHelp();
			
		}
		
	}
	
	/**
	* See if a particular command was passed to the script via the command line and return a boolean. Can either be the short or long version
	* @param  {String}       list of arguments to check
	*
	* @return {Boolean}      if the command has been passed to the script via the command line
	*/
	public static function findCommand($args) {
		$args = explode("|",$args);
		foreach ($args as $arg) {
			if (isset(self::$options[$arg])) {
				return true;
			
			}
		}
		return false;
	}
	
	/**
	* See if a particular command was passed to the script via the command line and return a value. Can either be the short or long version
	* @param  {String}       list of arguments to check
	*
	* @return {String}       the value that was passed via the command line
	*/
	public static function findCommandValue($args) {
		$args = explode("|",$args);
		foreach ($args as $arg) {
			if (isset(self::$options[$arg])) {
				return self::$options[$arg];
			}
		}
		return false;
	}
	
	/**
	* Find the short command for a given long gommand
	* @param  {String}       long command to search for
	*
	* @return {String}       the search command
	*/
	public static function findCommandLong($arg) {
		foreach (self::$commands as $command => $commandOptions) {
			if (($commandOptions["commandLong"] == $arg) || ($commandOptions["commandShort"] == $arg)) {
				return $command;
			}
		}
		return false;
	}
	
	/**
	* Return the command that was given in the command line arguments
	*
	* @return {String}      the command. passes false if no command was found
	*/
	public static function getCommand() {
		foreach (self::$commands as $command => $attributes) {
			if (isset(self::$options[$command]) || isset(self::$options[$attributes["commandShort"]])) {
				return $command;
			}
		}
		return false;
	}
	
	/**
	* Load all of the rules related to Pattern Data
	*/
	public static function loadCommands() {
		foreach (glob(__DIR__."/Console/Commands/*.php") as $filename) {
			$command = str_replace(".php","",str_replace(__DIR__."/Console/Commands/","",$filename));
			if ($command[0] != "_") {
				$commandClass = "\PatternLab\Console\Commands\\".$command;
				self::$commandInstances[] = new $commandClass();
			}
		}
	}
	
	/**
	* Set-up the command so it can be used from the command line
	* @param  {String}       the single character version of the command
	* @param  {String}       the long version of the command
	* @param  {String}       the description to be used in the "available commands" section of writeHelp()
	* @param  {String}       the description to be used in the "help" section of writeHelpCommand()
	*/
	public static function setCommand($long,$desc,$help,$short = "") {
		if (!empty($short)) {
			self::$optionsShort .= $short;
		}
		self::$optionsLong[] = $long;
		$short = str_replace(":","",$short);
		$long  = str_replace(":","",$long);
		self::$commands[$long] = array("commandShort" => $short, "commandLong" => $long, "commandLongLength" => strlen($long), "commandDesc" => $desc, "commandHelp" => $help, "commandOptions" => array(), "commandExamples" => array());
	}
	
	/**
	* Set a sample for a specific command
	* @param  {String}       the long version of the command that this option is related to
	* @param  {String}       the sample to be used in the "sample" section of writeHelpCommand()
	* @param  {String}       the extra info to be used in the example command for the "sample" section of writeHelpCommand()
	*/
	public static function setCommandSample($command,$sample,$extra) {
		$command = str_replace(":","",$command);
		self::$commands[$command]["commandExamples"][] = array("exampleSample" => $sample, "exampleExtra" => $extra);
	}
	
	/**
	* See if a particular option was passed to the script via the command line and return a boolean. Can either be the short or long version
	* @param  {String}      list of arguments to check
	*
	* @return {Boolean}      if the command has been passed to the script via the command line
	*/
	public static function findCommandOption($args) {
		$args = explode("|",$args);
		foreach ($args as $arg) {
			if (isset(self::$options[$arg])) {
				return true;
			}
		}
		return false;
	}

	/**
	* See if a particular option was passed to the script via the command line and return a value. Can either be the short or long version
	* @param  {String}      list of arguments to check
	*
	* @return {String}      the value that was passed via the command line
	*/
	public static function findCommandOptionValue($args) {
		$args = explode("|",$args);
		foreach ($args as $arg) {
			if (isset(self::$options[$arg])) {
				return self::$options[$arg];
			}
		}
		return false;
	}

	/**
	* Set-up an option for a given command so it can be used from the command line
	* @param  {String}       the long version of the command that this option is related to
	* @param  {String}       the long version of the option
	* @param  {String}       the description to be used in the "available options" section of writeHelpCommand()
	* @param  {String}       the sample to be used in the "sample" section of writeHelpCommand()
	* @param  {String}       the single character version of the option
	* @param  {String}       the extra info to be used in the example command for the "sample" section of writeHelpCommand()
	*/
	public static function setCommandOption($command,$long,$desc,$sample,$short = "",$extra = "") {
		if (($short != "") && ($short != "z") && (strpos(self::$optionsShort,$short) === false)) {
			self::$optionsShort .= $short;
		}
		if (!in_array($long,self::$optionsLong)) {
			self::$optionsLong[] = $long;
		}
		$short = str_replace(":","",$short);
		$long  = str_replace(":","",$long);
		if ($short == "z") {
			$short = "z".self::$zTracker;
			self::$zTracker++;
		}
		self::$commands[$command]["commandOptions"][$long] = array("optionShort" => $short, "optionLong" => $long, "optionLongLength" => strlen($long), "optionDesc" => $desc, "optionSample" => $sample, "optionExtra" => $extra);
	}
	
	/**
	* Write out the generic help
	*/
	public static function writeHelp() {
		
		/*
		
		The generic help follows this format:
		
		Pattern Lab Console Options
		
		Usage:
		  php core/console command [options]
		
		Available commands:
		  --build   (-b)    Build Pattern Lab
		  --watch   (-w)    Build Pattern Lab and watch for changes and rebuild as necessary
		  --version (-v)    Display the version number
		  --help    (-h)    Display this help message.
		
		*/
		
		// find length of longest command
		$lengthLong = 0;
		foreach (self::$commands as $command => $attributes) {
			$lengthLong = ($attributes["commandLongLength"] > $lengthLong) ? $attributes["commandLongLength"] : $lengthLong;
		}
		
		// write out the generic usage info
		self::writeLine("");
		self::writeLine("<h1>Pattern Lab Console Options</h1>",true,true);
		self::writeLine("<h2>Usage</h2>:",true,true);
		self::writeLine("  php ".self::$self." command <optional>[options]</optional>",true,true);
		self::writeLine("<h2>Available commands</h2>:",true,true);
		
		// write out the commands
		foreach (self::$commands as $command => $attributes) {
			$spacer = self::getSpacer($lengthLong,$attributes["commandLongLength"]);
			self::writeLine("  --".$attributes["commandLong"].$spacer."  <desc>".$attributes["commandDesc"]."</desc>",true);
		}
		
		// write out how to get more help
		self::writeLine("");
		self::writeLine("<h2>Get options for a specific command:</h2>",true,true);
		self::writeLine("  php ".self::$self." --help --command",true);
		
		self::writeLine("");
		
	}
	
	/**
	* Write out the command-specific help
	* @param  {String}       the single character of the command that this option is related to
	*/
	public static function writeHelpCommand($command = "") {
		
		/*
		
		The command help follows this format:
		
		Build Command Options
		
		Usage:
		  php core/console --build [--patternsonly|-p] [--nocache|-n] [--enablecss|-c]
		
		Available options:
		  --patternsonly (-p)    Build only the patterns. Does NOT clean public/.
		  --nocache      (-n)    Set the cacheBuster value to 0.
		  --enablecss    (-c)    Generate CSS for each pattern. Resource intensive.
		  --help         (-h)    Display this help message.
		
		Help:
		 The build command builds an entire site a single time. It compiles the patterns and moves content from source/ into public/
		
		 Samples:
		
		   To run and generate the CSS for each pattern:
		     php core/console --build -c
		
		   To build only the patterns and not move other files from source/ to public/
		     php core/console --build -p
		
		   To turn off the cacheBuster
		     php core/console --build -n
		*/
		
		// if given an empty command or the command doesn't exist in the lists give the generic help
		if (empty($command)) {
			self::writeHelp();
			return;
		}
		
		$commandLong       = self::$commands[$command]["commandLong"];
		$commandLongUC     = ucfirst($commandLong);
		$commandHelp       = self::$commands[$command]["commandHelp"];
		$commandExtra      = isset(self::$commands[$command]["commandExtra"]) ? self::$commands[$command]["commandExtra"] : "";
		$commandOptions    = self::$commands[$command]["commandOptions"];
		$commandExamples   = self::$commands[$command]["commandExamples"];
		$commandShort      = self::$commands[$command]["commandShort"];
		$commandShortInc   = ($commandShort != "") ? "|-".$commandShort : "";
		
		// write out the option list and get the longest item
		$optionList = "";
		$lengthLong = 0;
		foreach ($commandOptions as $option => $attributes) {
			$optionShort = (!empty($attributes["optionShort"][0]) && (($attributes["optionShort"][0] != "z") || ($attributes["optionShort"] != ""))) ? "|-".$attributes["optionShort"] : "";
			$optionExtra = (!empty($attributes["optionExtra"])) ? " ".$attributes["optionExtra"] : "";
			$optionList .= "[--".$attributes["optionLong"].$optionShort.$optionExtra."] ";
			$lengthLong = ($attributes["optionLongLength"] > $lengthLong) ? $attributes["optionLongLength"] : $lengthLong;
		}
		
		$commandExampleList = "";
		if (count($commandExamples) > 0) {
			foreach ($commandExamples as $example => $attributes) {
				$commandExampleList .= $attributes["exampleExtra"]." ";
			}
		}
		
		// write out the generic usage info
		self::writeLine("");
		self::writeLine("<h1>".$commandLongUC." Command Options</h1>",true,true);
		self::writeLine("<h2>Usage</h2>:",true,true);
		self::writeLine("  php ".self::$self." --".$commandLong.$commandShortInc." ".$optionList,true,true);
		
		// write out the available options
		if (count($commandOptions) > 0) {
			self::writeLine("<h2>Available options</h2>:",true,true);
			foreach ($commandOptions as $option => $attributes) {
				$optionShort = (!empty($attributes["optionShort"]) && (($attributes["optionShort"][0] != "z") || ($attributes["optionShort"] != ""))) ? "(-".$attributes["optionShort"].")" : "    ";
				$spacer = self::getSpacer($lengthLong,$attributes["optionLongLength"]);
				self::writeLine("  --".$attributes["optionLong"].$spacer.$optionShort."    <desc>".$attributes["optionDesc"]."</desc>",true);
			}
			self::writeLine("");
		}
		
		self::writeLine("<h2>Help</h2>:",true,true);
		self::writeLine("  ".$commandHelp,true,true);
		
		// write out the samples
		if ((count($commandOptions) > 0) || (count($commandExamples) > 0)) {
			self::writeLine("<h2>Samples</h2>:",true,true);
		}
		
		if (count($commandExamples) > 0) {
			foreach ($commandExamples as $example => $attributes) {
				self::writeLine(" ".$attributes["exampleSample"],true,true);
				self::writeLine("   <desc>php ".self::$self." --".$commandLong." ".$attributes["exampleExtra"]."</desc>",true,true);
			}
		}
		
		if (count($commandOptions) > 0) {
			foreach ($commandOptions as $option => $attributes) {
				self::writeLine(" ".$attributes["optionSample"],true,true);
				self::writeLine("   <desc>php ".self::$self." --".$commandLong." --".$attributes["optionLong"]." ".$attributes["optionExtra"]."</desc>",true,true);
			}
		}
		
	}
	
	/**
	* Make sure the space is properly set between long command options and short command options
	* @param  {Integer}       the longest length of the command's options
	* @param  {Integer}       the character length of the given option
	*/
	public static function getSpacer($lengthLong,$itemLongLength) {
		$i            = 0;
		$spacer       = " ";
		$spacerLength = $lengthLong - $itemLongLength;
		while ($i < $spacerLength) {
			$spacer .= " ";
			$i++;
		}
		return $spacer;
	}
	
	/**
	* Make a path human readable by dropping the base dir
	* @param  {String}        the path to clean
	*
	* @return {String}        cleaned up path
	*/
	public static function getHumanReadablePath($path) {
		return str_replace(Config::getOption("baseDir"), "./", $path);
	}
	
	/**
	* Modify a line to include the given tag by default
	* @param  {String}        the content to be written out
	*/
	public static function addTags($line,$tag) {
		$lineFinal = "<".$tag.">".preg_replace("/<[A-z0-9-_]{1,}>[^<]{1,}<\/[A-z0-9-_]{1,}>/","</".$tag.">$0<".$tag.">",$line)."</".$tag.">";
		return $lineFinal;
	}
	
	/**
	* Write out a line to the console with error tags. It forces an exit of the script
	* @param  {String}        the content to be written out
	* @param  {Boolean}       if there should be two spaces added to the beginning of the line
	* @param  {Boolean}       if there should be two breaks added to the end of the line
	*/
	public static function writeError($line,$doubleSpace = false,$doubleBreak = false) {
		$lineFinal = self::addTags($line,"error");
		self::writeLine($lineFinal,$doubleSpace,$doubleBreak);
		exit(1);
	}
	
	/**
	* Write out a line to the console with info tags
	* @param  {String}        the content to be written out
	* @param  {Boolean}       if there should be two spaces added to the beginning of the line
	* @param  {Boolean}       if there should be two breaks added to the end of the line
	*/
	public static function writeInfo($line,$doubleSpace = false,$doubleBreak = false) {
		$lineFinal = self::addTags($line,"info");
		self::writeLine($lineFinal,$doubleSpace,$doubleBreak);
	}
	
	/**
	* Alias for writeInfo because I keep wanting to use it
	* @param  {String}        the content to be written out
	* @param  {Boolean}       if there should be two spaces added to the beginning of the line
	* @param  {Boolean}       if there should be two breaks added to the end of the line
	*/
	public static function log($line,$doubleSpace = false,$doubleBreak = false) {
		self::writeInfo($line,$doubleSpace = false,$doubleBreak = false);
	}
	
	/**
	* Write out a line to the console
	* @param  {String}        the content to be written out
	* @param  {Boolean}       if there should be two spaces added to the beginning of the line
	* @param  {Boolean}       if there should be two breaks added to the end of the line
	*/
	public static function writeLine($line,$doubleSpace = false,$doubleBreak = false) {
		$break = ($doubleBreak) ? PHP_EOL.PHP_EOL : PHP_EOL;
		if (strpos($line,"<nophpeol>") !== false) {
			$break = "";
			$line  = str_replace("<nophpeol>","",$line);
		}
		$space = ($doubleSpace) ? "  " : "";
		$c     = self::$color;
		print $space.$c($line)->colorize().$break;
	}
	
	/**
	* Write out a line to the console with a specific tag
	* @param  {String}        the tag to add to the line
	* @param  {String}        the content to be written out
	* @param  {Boolean}       if there should be two spaces added to the beginning of the line
	* @param  {Boolean}       if there should be two breaks added to the end of the line
	*/
	public static function writeTag($tag,$line,$doubleSpace = false,$doubleBreak = false) {
		$lineFinal = self::addTags($line,$tag);
		self::writeLine($lineFinal,$doubleSpace,$doubleBreak);
	}
	
	/**
	* Write out a line to the console with warning tags
	* @param  {String}        the content to be written out
	* @param  {Boolean}       if there should be two spaces added to the beginning of the line
	* @param  {Boolean}       if there should be two breaks added to the end of the line
	*/
	public static function writeWarning($line,$doubleSpace = false,$doubleBreak = false) {
		$lineFinal = self::addTags($line,"warning");
		self::writeLine($lineFinal,$doubleSpace,$doubleBreak);
	}
	
	/**
	* Prompt the user for some input
	* @param  {String}        the text for the prompt
	* @param  {String}        the text for the options
	* @param  {String}        the text for the default option
	* @param  {Boolean}       if we should lowercase the input before sending it back
	* @param  {String}        the tag that should be used when drawing the content
	*
	* @return {String}        trimmed input given by the user
	*/
	public static function promptInput($prompt = "", $options = "", $default = "", $lowercase = true, $tag = "info") {
		
		// check prompt
		if (empty($prompt)) {
			Console::writeError("an input prompt requires prompt text...");
		}
		
		// if there are suggested options add them
		if (!empty($options)) {
			$prompt .= " <options>".$options."</options> >";
		}
		
		// make sure no end-of-line is added
		$prompt .= " <nophpeol>";
		
		// make sure we're not running in no interaction mode. if so just use the default for the input
		if (InstallerUtil::$isInteractive) {
			
			// open the terminal and wait for feedback
			$stdin = fopen("php://stdin", "r");
			Console::writeTag($tag,$prompt);
			$input = trim(fgets($stdin));
			fclose($stdin);
			
		} else {
			
			$input = $default;
			
		}
		
		// check to see if it should be lowercased before sending back
		return ($lowercase) ? strtolower($input) : $input;
		
	}
	
}
