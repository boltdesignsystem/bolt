<?php

/*!
 * Util Class
 *
 * Copyright (c) 2014 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 * Generic utilities for Pattern Lab
 *
 */

namespace PatternLab;

use \PatternLab\Config;
use \PatternLab\Console;
use \PatternLab\Timer;

class Util {

	/**
	* Lowercase the given string. Used in the array_walk() function in __construct as a sanity check
	* @param  {String}       an entry from one of the list-based config entries
	*
	* @return {String}       lowercased version of the given $v var
	*/
	public static function strtolower(&$v) {
		$v = strtolower($v);
	}

	/**
	* Trim a given string. Used in the array_walk() function in __construct as a sanity check
	* @param  {String}       an entry from one of the list-based config entries
	*
	* @return {String}       trimmed version of the given $v var
	*/
	public static function trim(&$v) {
		$v = trim($v);
	}

	/**
	* Write out the time tracking file so the content sync service will work. A holdover
	* from how I put together the original AJAX polling set-up.
	*/
	public static function updateChangeTime() {

		if (is_dir(Config::getOption("publicDir"))) {
			file_put_contents(Config::getOption("publicDir")."/latest-change.txt",time());
		} else {
			Console::writeError("the public directory for Pattern Lab doesn't exist...");
		}

	}

}
