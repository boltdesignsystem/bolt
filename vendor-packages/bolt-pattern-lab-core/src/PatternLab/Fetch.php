<?php

/*!
 * Fetch Class
 *
 * Copyright (c) 2014 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 * Copy a package from GitHub and put it in it's appropriate location
 *
 */

namespace PatternLab;

use \Alchemy\Zippy\Zippy;
use \PatternLab\Config;
use \PatternLab\Console;
use \PatternLab\InstallerUtil;
use \PatternLab\Timer;
use \PatternLab\Zippy\UnpackFileStrategy;
use \Symfony\Component\Filesystem\Filesystem;
use \Symfony\Component\Filesystem\Exception\IOExceptionInterface;

class Fetch {
	
	/**
	 * Fetch a package using Composer
	 * @param  {String}    the path to the package to be downloaded
	 *
	 * @return {String}    the modified file contents
	 */
	public function fetchPackage($package = "") {
		
		if (empty($package)) {
			Console::writeError("please provide a path for the package before trying to fetch it...");
		}
		
		// run composer
		$composerPath = Config::getOption("coreDir").DIRECTORY_SEPARATOR."bin/composer.phar";
		passthru("php ".$composerPath." require ".$package);
		
	}
	
	/**
	 * Fetch a package from GitHub
	 * @param  {String}    the command option to provide the rule for
	 * @param  {String}    the path to the package to be downloaded
	 *
	 * @return {String}    the modified file contents
	 */
	public function fetchStarterKit($starterkit = "") {
		
		// double-checks options was properly set
		if (empty($starterkit)) {
			Console::writeError("please provide a path for the starterkit before trying to fetch it...");
		}

		// figure out the options for the GH path
		list($org,$repo,$tag) = $this->getPackageInfo($starterkit);

		// set default attributes
		$sourceDir        = Config::getOption("sourceDir");
		$tempDir          = sys_get_temp_dir().DIRECTORY_SEPARATOR."pl-sk";
		$tempDirSK        = $tempDir.DIRECTORY_SEPARATOR."pl-sk-archive";
		$tempDirDist      = $tempDirSK.DIRECTORY_SEPARATOR.$repo."-".$tag.DIRECTORY_SEPARATOR."dist";
		$tempComposerFile = $tempDirSK.DIRECTORY_SEPARATOR.$repo."-".$tag.DIRECTORY_SEPARATOR."composer.json";
		
		//get the path to the GH repo and validate it
		$tarballUrl = "https://github.com/".$org."/".$repo."/archive/".$tag.".tar.gz";
		
		Console::writeInfo("downloading the starterkit...");
		
		// try to download the given package
		if (!$package = @file_get_contents($tarballUrl)) {
			$error = error_get_last();
			Console::writeError("the starterkit wasn't downloaded because:\n\n  ".$error["message"]);
		}

		// Create temp directory if doesn't exist
		$fs = new Filesystem();
		try {
		    $fs->mkdir($tempDir, 0775);
		} catch (IOExceptionInterface $e) {
			Console::writeError("Error creating temporary directory at " . $e->getPath());
		}
		
		// write the package to the temp directory
		$tempFile = tempnam($tempDir, "pl-sk-archive.tar.gz");
		file_put_contents($tempFile, $package);
		
		Console::writeInfo("finished downloading the starterkit...");
		
		// make sure the temp dir exists before copying into it
		if (!is_dir($tempDirSK)) {
			mkdir($tempDirSK);
		}
		
		// extract, if the zip is supposed to be unpacked do that (e.g. stripdir)
		$zippy = Zippy::load();
		$zippy->addStrategy(new UnpackFileStrategy());
		$zippy->getAdapterFor('tar.gz')->open($tempFile)->extract($tempDirSK);

		if (!is_dir($tempDirDist)) {
			// try without repo dir
			$tempDirDist  = $tempDirSK.DIRECTORY_SEPARATOR."dist";
		}
		// thrown an error if temp/dist/ doesn't exist
		if (!is_dir($tempDirDist)) {
			Console::writeError("the starterkit needs to contain a dist/ directory before it can be installed...");
		}
		
		// check for composer.json. if it exists use it for determining things. otherwise just mirror dist/ to source/
		if (file_exists($tempComposerFile)) {
			
			$tempComposerJSON = json_decode(file_get_contents($tempComposerFile), true);
			
			// see if it has a patternlab section that might define the files to move
			if (isset($tempComposerJSON["extra"]) && isset($tempComposerJSON["extra"]["patternlab"])) {
				Console::writeInfo("installing the starterkit...");
				InstallerUtil::parseComposerExtraList($tempComposerJSON["extra"]["patternlab"], $starterkit, $tempDirDist);
				Console::writeInfo("installed the starterkit...");
			} else {
				$this->mirrorDist($sourceDir, $tempDirDist);
			}
			
		} else {
			
			$this->mirrorDist($sourceDir, $tempDirDist);
			
		}
		
		// remove the temp files
		Console::writeInfo("cleaning up the temp files...");
		$fs = new Filesystem();
		$fs->remove($tempFile);
		$fs->remove($tempDirSK);
		
		Console::writeInfo("the starterkit installation is complete...");
		
		return true;
		
	}
	
	/**
	 * Break up the package path
	 * @param  {String}    path of the GitHub repo
	 *
	 * @return {Array}     the parts of the package path
	 */
	protected function getPackageInfo($package) {
		
		$org  = "";
		$repo = "";
		$tag  = "master";
		
		if (strpos($package, "#") !== false) {
			list($package,$tag) = explode("#",$package);
		}
		
		if (strpos($package, "/") !== false) {
			list($org,$repo) = explode("/",$package);
		} else {
			Console::writeError("please provide a real path to a package...");
		}
		
		return array($org,$repo,$tag);
		
	}
	
	/**
	 * Force mirror the dist/ folder to source/
	 * @param  {String}    path to the source directory
	 * @param  {String}    path to the temp dist directory
	 */
	protected function mirrorDist($sourceDir, $tempDirDist) {
		
		// set default vars
		$fsOptions = array();
		$emptyDir = true;
		$validFiles = array("README",".gitkeep",".DS_Store","styleguide");
		
		// see if the source directory is empty
		if (is_dir($sourceDir)) {
			$objects  = new \DirectoryIterator($sourceDir);
			foreach ($objects as $object) {
				if (!$object->isDot() && !in_array($object->getFilename(),$validFiles)) {
					$emptyDir = false;
					break;
				}
			}
		}
		
		// if source directory isn't empty ask if it's ok to nuke what's there
		if (!$emptyDir) {
			
			$prompt    = "a starterkit is already installed. merge the new files with it or replace it?";
			$options   = "M/r";
			$input     = Console::promptInput($prompt,$options,"M");
			$fsOptions = ($input == "r") ? array("delete" => true, "override" => true) : array("delete" => false, "override" => false);
			
		}
		
		// mirror dist to source
		Console::writeInfo("installing the starterkit files...");
		$fs = new Filesystem();
		$fs->mirror($tempDirDist, $sourceDir, null, $fsOptions);
		Console::writeInfo("starterkit files have been installed...");
		
	}
	
}
