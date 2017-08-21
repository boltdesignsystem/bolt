<?php

/*!
 * Watcher Class
 *
 * Copyright (c) 2013-2014 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 * Watches the source/ dir for any changes so those changes can be automagically
 * moved to the public/ dir. Watches static files, patterns, and data files
 *
 * This is not the most efficient implementation of a directory watch but I hope
 * it's the most platform agnostic.
 *
 */

namespace PatternLab;

use \PatternLab\Annotations;
use \PatternLab\Builder;
use \PatternLab\Config;
use \PatternLab\Console;
use \PatternLab\Data;
use \PatternLab\Dispatcher;
use \PatternLab\FileUtil;
use \PatternLab\PatternData;
use \PatternLab\Util;
use \PatternLab\Timer;
use \Symfony\Component\Filesystem\Filesystem;
use \Symfony\Component\Filesystem\Exception\IOExceptionInterface;

class Watcher extends Builder {
	
	/**
	* Use the Builder __construct to gather the config variables
	*/
	public function __construct($config = array()) {
		
		// construct the parent
		parent::__construct($config);
		
		$this->options = array();
		
	}
	
	/**
	* Watch the source/ directory for any changes to existing files. Will run forever if given the chance.
	* @param  {Boolean}       decide if the reload server should be turned on
	* @param  {Boolean}       decide if static files like CSS and JS should be moved
	*/
	public function watch($options = array()) {
		
		// double-checks options was properly set
		if (empty($options)) {
			Console::writeError("need to pass options to generate...");
		}
		
		// set default attributes
		$moveStatic    = (isset($options["moveStatic"])) ? $options["moveStatic"] : true;
		$noCacheBuster = (isset($options["noCacheBuster"])) ? $options["noCacheBuster"] : false;
		
		// make sure a copy of the given options are saved for using when running generate
		$this->options = $options;
		
		// set-up the Dispatcher
		$dispatcherInstance = Dispatcher::getInstance();
		$dispatcherInstance->dispatch("watcher.start");
		
		if ($noCacheBuster) {
			Config::setOption("cacheBuster",0);
		}
		
		$c  = false;           // track that one loop through the pattern file listing has completed
		$o  = new \stdClass(); // create an object to hold the properties
		$cp = new \stdClass(); // create an object to hold a clone of $o
		
		$o->patterns = new \stdClass();
		
		Console::writeLine("watching your site for changes...");
		
		// default vars
		$publicDir        = Config::getOption("publicDir");
		$sourceDir        = Config::getOption("sourceDir");
		$patternSourceDir = Config::getOption("patternSourceDir");
		$ignoreExts       = Config::getOption("ie");
		$ignoreDirs       = Config::getOption("id");
		$patternExt       = Config::getOption("patternExtension");
		
		// run forever
		while (true) {
			
			// clone the patterns so they can be checked in case something gets deleted
			$cp = clone $o->patterns;
			
			// iterate over the patterns & related data and regenerate the entire site if they've changed
			$patternObjects  = new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($patternSourceDir), \RecursiveIteratorIterator::SELF_FIRST);
			
			// make sure dots are skipped
			$patternObjects->setFlags(\FilesystemIterator::SKIP_DOTS);
			
			foreach($patternObjects as $name => $object) {
				
				// clean-up the file name and make sure it's not one of the pattern lab files or to be ignored
				$fileName      = str_replace($patternSourceDir.DIRECTORY_SEPARATOR,"",$name);
				$fileNameClean = str_replace(DIRECTORY_SEPARATOR."_",DIRECTORY_SEPARATOR,$fileName);
				
				if ($object->isFile() && (($object->getExtension() == $patternExt) || ($object->getExtension() == "json") || ($object->getExtension() == "md"))) {
					
					// make sure this isn't a hidden pattern
					$patternParts = explode(DIRECTORY_SEPARATOR,$fileName);
					$pattern      = isset($patternParts[2]) ? $patternParts[2] : $patternParts[1];
					
					// make sure the pattern still exists in source just in case it's been deleted during the iteration
					if (file_exists($name)) {
						
						$mt = $object->getMTime();
						if (isset($o->patterns->$fileName) && ($o->patterns->$fileName != $mt)) {
							$o->patterns->$fileName = $mt;
							$this->updateSite($fileName,"changed");
						} else if (!isset($o->patterns->$fileName) && $c) {
							$o->patterns->$fileName = $mt;
							$this->updateSite($fileName,"added");
							if ($object->getExtension() == $patternExt) {
								$patternSrcPath  = str_replace(".".$patternExt,"",$fileName);
								$patternDestPath = str_replace("/","-",$patternSrcPath);
								$render = ($pattern[0] != "_") ? true : false;
								$this->patternPaths[$patternParts[0]][$pattern] = array("patternSrcPath" => $patternSrcPath, "patternDestPath" => $patternDestPath, "render" => $render);
							}
						} else if (!isset($o->patterns->$fileName)) {
							$o->patterns->$fileName = $mt;
						}
						
						if ($c && isset($o->patterns->$fileName)) {
							unset($cp->$fileName);
						}
						
					} else {
						
						// the file was removed during the iteration so remove references to the item
						unset($o->patterns->$fileName);
						unset($cp->$fileName);
						unset($this->patternPaths[$patternParts[0]][$pattern]);
						$this->updateSite($fileName,"removed");
						
					}
					
				}
				
			}
			
			// make sure old entries are deleted
			// will throw "pattern not found" errors if an entire directory is removed at once but that shouldn't be a big deal
			if ($c) {
				
				foreach($cp as $fileName => $mt) {
					
					unset($o->patterns->$fileName);
					$patternParts = explode(DIRECTORY_SEPARATOR,$fileName);
					$pattern = isset($patternParts[2]) ? $patternParts[2] : $patternParts[1];
					
					unset($this->patternPaths[$patternParts[0]][$pattern]);
					$this->updateSite($fileName,"removed");
					
				}
				
			}
			
			// iterate over annotations, data, meta and any other _ dirs
			$watchDirs = glob($sourceDir.DIRECTORY_SEPARATOR."_*",GLOB_ONLYDIR);
			foreach ($watchDirs as $watchDir) {
				
				if ($watchDir != $patternSourceDir) {
					
					// iterate over the data files and regenerate the entire site if they've changed
					$objects = new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($watchDir), \RecursiveIteratorIterator::SELF_FIRST);
					
					// make sure dots are skipped
					$objects->setFlags(\FilesystemIterator::SKIP_DOTS);
					
					foreach($objects as $name => $object) {
						
						$fileName = str_replace($sourceDir.DIRECTORY_SEPARATOR,"",$name);
						$mt = $object->getMTime();
						
						if (!isset($o->$fileName)) {
							$o->$fileName = $mt;
							if ($c) {
								$this->updateSite($fileName,"added");
							}
						} else if ($o->$fileName != $mt) {
							$o->$fileName = $mt;
							if ($c) {
								$this->updateSite($fileName,"changed");
							}
						}
						
					}
					
				}
				
			}
			
			// iterate over all of the other files in the source directory and move them if their modified time has changed
			if ($moveStatic) {
				
				$objects = new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($sourceDir.DIRECTORY_SEPARATOR), \RecursiveIteratorIterator::SELF_FIRST);
				
				// make sure dots are skipped
				$objects->setFlags(\FilesystemIterator::SKIP_DOTS);
				
				foreach($objects as $name => $object) {
					
					// clean-up the file name and make sure it's not one of the pattern lab files or to be ignored
					$fileName = str_replace($sourceDir.DIRECTORY_SEPARATOR,"",$name);
					if (($fileName[0] != "_") && (!in_array($object->getExtension(),$ignoreExts)) && (!in_array($object->getFilename(),$ignoreDirs))) {
						
						// catch directories that have the ignored dir in their path
						$ignoreDir = FileUtil::ignoreDir($fileName);
						
						// check to see if it's a new directory
						if (!$ignoreDir && $object->isDir() && !isset($o->$fileName) && !is_dir($publicDir."/".$fileName)) {
							mkdir($publicDir."/".$fileName);
							$o->$fileName = "dir created"; // placeholder
							Console::writeLine($fileName."/ directory was created...");
						}
						
						// check to see if it's a new file or a file that has changed
						if (file_exists($name)) {
							
							$mt = $object->getMTime();
							if (!$ignoreDir && $object->isFile() && !isset($o->$fileName) && !file_exists($publicDir."/".$fileName)) {
								$o->$fileName = $mt;
								FileUtil::moveStaticFile($fileName,"added");
								if ($object->getExtension() == "css") {
									$this->updateSite($fileName,"changed",0); // make sure the site is updated for MQ reasons
								}
							} else if (!$ignoreDir && $object->isFile() && isset($o->$fileName) && ($o->$fileName != $mt)) {
								$o->$fileName = $mt;
								FileUtil::moveStaticFile($fileName,"changed");
								if ($object->getExtension() == "css") {
									$this->updateSite($fileName,"changed",0); // make sure the site is updated for MQ reasons
								}
							} else if (!isset($o->fileName)) {
								$o->$fileName = $mt;
							}
							
						} else {
							unset($o->$fileName);
						}
						
					}
					
				}
				
			}
			
			
			$c = true;
			
			// taking out the garbage. basically killing mustache after each run.
			if (gc_enabled()) gc_collect_cycles();
			
			// output anything the reload server might send our way
			// DEPRECATED
			/*
			if ($reload) {
				$output = fgets($fp, 100);
				if ($output != "\n") print $output;
			}
			*/
			
			// pause for .05 seconds to give the CPU a rest
			usleep(50000);
			
		}
		
		// close the auto-reload process, this shouldn't do anything
		// DEPRECATED
		// fclose($fp);
		
	}
	
	/**
	* Updates the Pattern Lab Website and prints the appropriate message
	* @param  {String}       file name to included in the message
	* @param  {String}       a switch for decided which message isn't printed
	*
	* @return {String}       the final message
	*/
	private function updateSite($fileName,$message,$verbose = true) {
		
		$watchMessage = "";
		if ($verbose) {
			if ($message == "added") {
				$watchMessage = "<warning>".$fileName." was added to Pattern Lab. reload the website to see this change in the navigation...</warning>";
			} elseif ($message == "removed") {
				$watchMessage = "<warning>".$fileName." was removed from Pattern Lab. reload the website to see this change reflected in the navigation...</warning>";
			} elseif ($message == "hidden") {
				$watchMessage = "<warning>".$fileName." was hidden from Pattern Lab. reload the website to see this change reflected in the navigation...</warning>";
			} else {
				$watchMessage = "<info>".$fileName." changed...</info>";
			}
		}
		
		$options = $this->options;
		
		$options["watchVerbose"] = $verbose;
		$options["watchMessage"] = $watchMessage;
		$options["moveStatic"]   = false;
		
		// clear the various data stores for re-population
		Data::clear();
		PatternData::clear();
		Annotations::clear();
		
		$g = new Generator();
		$g->generate($options);
		
	}
	
	public function watchStarterKit() {
			
		// double-checks options was properly set
		$starterKit = Config::getOption("starterKit");
		if (!$starterKit) {
			Console::writeError("need to have a starterkit set in the config...");
		}
		
		// set-up the full starterkit path
		$starterKitPath = Config::getOption("packagesDir").DIRECTORY_SEPARATOR.$starterKit.DIRECTORY_SEPARATOR."dist";
		if (!is_dir($starterKitPath)) {
			Console::writeError("the starterkit doesn't seem to exist...");
		}
		
		// default vars
		$sourceDir   = Config::getOption("sourceDir");
		$packagesDir = Config::getOption("packagesDir");
		
		$fs = new Filesystem();
		
		$c  = false;           // track that one loop through the pattern file listing has completed
		$o  = new \stdClass(); // create an object to hold the properties
		$cp = new \stdClass(); // create an object to hold a clone of $o
		
		$o->patterns = new \stdClass();
		
		Console::writeLine("watching your starterkit for changes...");
		
		// run forever
		while (true) {
			
			// clone the patterns so they can be checked in case something gets deleted
			$cp = clone $o->patterns;
			
			$objects = new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($starterKitPath), \RecursiveIteratorIterator::SELF_FIRST);
			
			// make sure dots are skipped
			$objects->setFlags(\FilesystemIterator::SKIP_DOTS);
			
			foreach ($objects as $name => $object) {
				
				// clean-up the file name and make sure it's not one of the pattern lab files or to be ignored
				$fileName = str_replace($starterKitPath.DIRECTORY_SEPARATOR,"",$name);
				
				// check to see if it's a new directory
				if ($object->isDir() && !isset($o->$fileName) && !is_dir($starterKitPath."/".$fileName)) {
					mkdir($sourceDir."/".$fileName);
					$o->$fileName = "dir created"; // placeholder
					Console::writeLine($fileName."/ directory was created...");
				}
				
				// check to see if it's a new file or a file that has changed
				if (file_exists($name)) {
					
					$mt = $object->getMTime();
					if ($object->isFile() && !isset($o->$fileName) && !file_exists($sourceDir.DIRECTORY_SEPARATOR.$fileName)) {
						$o->$fileName = $mt;
						$fs->copy($starterKitPath.DIRECTORY_SEPARATOR.$fileName,$sourceDir.DIRECTORY_SEPARATOR.$fileName);
						Console::writeInfo($fileName." added...");
					} else if ($object->isFile() && isset($o->$fileName) && ($o->$fileName != $mt)) {
						$o->$fileName = $mt;
						$fs->copy($starterKitPath.DIRECTORY_SEPARATOR.$fileName,$sourceDir.DIRECTORY_SEPARATOR.$fileName);
						Console::writeInfo($fileName." changed...");
					} else if (!isset($o->fileName)) {
						$o->$fileName = $mt;
					}
					
				} else {
					unset($o->$fileName);
				}
				
			}
			
			$c = true;
			
			// taking out the garbage. basically killing mustache after each run.
			if (gc_enabled()) gc_collect_cycles();
			
			// pause for .05 seconds to give the CPU a rest
			usleep(50000);
			
		}
		
	}
	
}
