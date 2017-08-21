<?php

/*!
 * File Util Class
 *
 * Copyright (c) 2014 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 * Generic file related functions that are used throughout Pattern Lab
 *
 */

namespace PatternLab;

use \PatternLab\Config;
use \PatternLab\Console;
use \PatternLab\Dispatcher;
use \PatternLab\Timer;
use \Symfony\Component\Filesystem\Filesystem;
use \Symfony\Component\Filesystem\Exception\IOExceptionInterface;

class FileUtil {
	
	/**
	* Check that a dir from the config exists and try to build it if needed
	* @param  {String}       directory to be checked/built
	* @param  {String}       the config path
	* @param  {String}       the config option that would help them
	*/
	public static function checkPathFromConfig($path, $configPath, $configOption = "") {
		
		if (!isset($path)) {
			Console::writeError("please make sure ".$configOption." is set in <path>".Console::getHumanReadablePath($configPath)."</path> by adding '".$configOption."=some/path'. sorry, stopping pattern lab... :(");
		} else if (!is_dir($path)) {
			Console::writeWarning("i can't seem to find the directory <path>".Console::getHumanReadablePath($path)."</path>...");
			self::makeDir($path);
			Console::writeWarning("i created <path>".Console::getHumanReadablePath($path)."</path> just in case. you can edit this in <path>".Console::getHumanReadablePath($configPath)."</path> by editing ".$configOption."...");
		}
		
	}
	
	/**
	* Make a directory
	* @param  {String}       directory to be made
	*/
	public static function makeDir($dir) {
		$fs = new Filesystem();
		try {
			$fs->mkdir($dir);
		} catch (IOExceptionInterface $e) {
			Console::writeError("an error occurred while creating your directory at <path>".$e->getPath()."</path>...");
		}
		unset($fs);
	}
	
	/**
	* Copies a file from the given source path to the given public path.
	* THIS IS NOT FOR PATTERNS
	* @param  {String}       the source file
	* @param  {String}       the public file
	*/
	protected static function moveFile($s,$p) {
		
		// default vars
		$sourceDir = Config::getOption("sourceDir");
		$publicDir = Config::getOption("publicDir");
		
		$fs = new Filesystem();
		$fs->copy($sourceDir.DIRECTORY_SEPARATOR.$s,$publicDir.DIRECTORY_SEPARATOR.$p);
		
	}

	/**
	* Moves static files that aren't directly related to Pattern Lab
	* @param  {String}       file name to be moved
	* @param  {String}       copy for the message to be printed out
	* @param  {String}       part of the file name to be found for replacement
	* @param  {String}       the replacement
	*/
	public static function moveStaticFile($fileName,$copy = "", $find = "", $replace = "") {
		self::moveFile($fileName,str_replace($find, $replace, $fileName));
		Util::updateChangeTime();
		if ($copy != "") {
			Console::writeInfo($fileName." ".$copy."...");
		}
	}

	/**
	* Check to see if a given filename is in a directory that should be ignored
	* @param  {String}       file name to be checked
	*
	* @return {Boolean}      whether the directory should be ignored
	*/
	public static function ignoreDir($fileName) {
		$id = Config::getOption("id");
		foreach ($id as $dir) {
			$pos = strpos(DIRECTORY_SEPARATOR.$fileName,DIRECTORY_SEPARATOR.$dir.DIRECTORY_SEPARATOR);
			if ($pos !== false) {
				return true;
			}
		}
		return false;
	}
	
	/**
	* Taken from Composer: https://github.com/composer/composer/blob/master/src/Composer/Util/Filesystem.php
	*
	* Normalize a path. This replaces backslashes with slashes, removes ending
	* slash and collapses redundant separators and up-level references.
	*
	* @param  string $path Path to the file or directory
	* @return string
	*/
	public static function normalizePath($path) {
		$parts = array();
		$path = strtr($path, '\\', '/');
		$prefix = '';
		$absolute = false;
		
		if (preg_match('{^([0-9a-z]+:(?://(?:[a-z]:)?)?)}i', $path, $match)) {
			$prefix = $match[1];
			$path = substr($path, strlen($prefix));
		}
		
		if (substr($path, 0, 1) === '/') {
			$absolute = true;
			$path = substr($path, 1);
		}
		
		$up = false;
		foreach (explode('/', $path) as $chunk) {
			if ('..' === $chunk && ($absolute || $up)) {
				array_pop($parts);
				$up = !(empty($parts) || '..' === end($parts));
			} elseif ('.' !== $chunk && '' !== $chunk) {
				$parts[] = $chunk;
				$up = '..' !== $chunk;
			}
		}
		
		return $prefix.($absolute ? '/' : '').implode('/', $parts);
		
	}
	
	/**
	* Delete everything in export/
	*/
	public static function cleanExport() {
		
		// default var
		$exportDir = Config::getOption("exportDir");
		
		if (is_dir($exportDir)) {
			
			$files = scandir($exportDir);
			foreach ($files as $file) {
				if (($file == "..") || ($file == ".")) {
					array_shift($files);
				} else {
					$key = array_keys($files,$file);
					$files[$key[0]] = $exportDir.DIRECTORY_SEPARATOR.$file;
				}
			}
			
			$fs = new Filesystem();
			$fs->remove($files);
			
		}
		
	}
	
	/**
	* Delete patterns and user-created directories and files in public/
	*/
	public static function cleanPublic() {
		
		// set-up the dispatcher
		$dispatcherInstance = Dispatcher::getInstance();
		
		// dispatch that the data gather has started
		$dispatcherInstance->dispatch("fileUtil.cleanPublicStart");
		
		// default var
		$patternPublicDir = Config::getOption("patternPublicDir");
		
		// make sure patterns exists before trying to clean it
		if (is_dir($patternPublicDir)) {
			
			// symfony finder doesn't support child first and I don't want to do array crap
			$objects = new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($patternPublicDir), \RecursiveIteratorIterator::CHILD_FIRST);
			
			// make sure dots are skipped
			$objects->setFlags(\FilesystemIterator::SKIP_DOTS);
			
			// for each file figure out what to do with it
			foreach ($objects as $name => $object) {
				
				if ($object->isDir()) {
					// if this is a directory remove it
					rmdir($name);
				} else if ($object->isFile() && ($object->getFilename() != "README")) {
					// if this is a file remove it
					unlink($name);
				}
				
			}
			
		}
		
		// scan source/ & public/ to figure out what directories might need to be cleaned up
		$publicDir  = Config::getOption("publicDir");
		$sourceDir  = Config::getOption("sourceDir");
		$publicDirs = glob($publicDir.DIRECTORY_SEPARATOR."*",GLOB_ONLYDIR);
		$sourceDirs = glob($sourceDir.DIRECTORY_SEPARATOR."*",GLOB_ONLYDIR);
		
		// make sure some directories aren't deleted
		$ignoreDirs = array("styleguide","patternlab-components");
		foreach ($ignoreDirs as $ignoreDir) {
			$key = array_search($publicDir.DIRECTORY_SEPARATOR.$ignoreDir,$publicDirs);
			if ($key !== false){
				unset($publicDirs[$key]);
			}
		}
		
		// compare source dirs against public. remove those dirs w/ an underscore in source/ from the public/ list
		foreach ($sourceDirs as $dir) {
			$cleanDir = str_replace($sourceDir.DIRECTORY_SEPARATOR,"",$dir);
			if ($cleanDir[0] == "_") {
				$key = array_search($publicDir.DIRECTORY_SEPARATOR.str_replace("_","",$cleanDir),$publicDirs);
				if ($key !== false){
					unset($publicDirs[$key]);
				}
			}
		}
		
		// for the remaining dirs in public delete them and their files
		foreach ($publicDirs as $dir) {
			
			// symfony finder doesn't support child first and I don't want to do array crap
			$objects = new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($dir), \RecursiveIteratorIterator::CHILD_FIRST);
			
			// make sure dots are skipped
			$objects->setFlags(\FilesystemIterator::SKIP_DOTS);
			
			foreach($objects as $name => $object) {
				
				if ($object->isDir()) {
					rmdir($name);
				} else if ($object->isFile()) {
					unlink($name);
				}
				
			}
			
			rmdir($dir);
			
		}
		
		$dispatcherInstance->dispatch("fileUtil.cleanPublicEnd");
		
	}
	
	/**
	* moves user-generated static files from public/ to export/
	*/
	public static function exportStatic() {
		
		// default vars
		$exportDir = Config::getOption("exportDir");
		$publicDir = Config::getOption("publicDir");
		$sourceDir = Config::getOption("sourceDir");
		
		if (!is_dir($exportDir)) {
			mkdir($exportDir);
		}
		
		if (is_dir($publicDir)) {
			
			// decide which files in public should def. be ignored
			$ignore = array("annotations","data","patterns","styleguide","index.html","latest-change.txt",".DS_Store",".svn","README");
			
			$files = scandir($publicDir);
			foreach ($files as $key => $file) {
				if (($file == "..") || ($file == ".")) {
					unset($files[$key]);
				} else if (in_array($file,$ignore)) {
					unset($files[$key]);
				} else if (is_dir($publicDir.DIRECTORY_SEPARATOR.$file) && !is_dir($sourceDir.DIRECTORY_SEPARATOR.$file)) {
					unset($files[$key]);
				} else if (is_file($publicDir.DIRECTORY_SEPARATOR.$file) && !is_file($sourceDir.DIRECTORY_SEPARATOR.$file)) {
					unset($files[$key]);
				}
			}
			
			$fs = new Filesystem();
			foreach ($files as $file) {
				if (is_dir($publicDir.DIRECTORY_SEPARATOR.$file)) {
					$fs->mirror($publicDir.DIRECTORY_SEPARATOR.$file,$exportDir.DIRECTORY_SEPARATOR.$file);
				} else if (is_file($publicDir.DIRECTORY_SEPARATOR.$file)) {
					$fs->copy($publicDir.DIRECTORY_SEPARATOR.$file,$exportDir.DIRECTORY_SEPARATOR.$file);
				}
			}
			
		}
		
	}
	
}
