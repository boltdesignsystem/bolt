<?php

/*!
 * Timer Class
 *
 * Copyright (c) 2014 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 * Records how long it takes for Pattern Lab to run as well as how much memory it used
 *
 */

namespace PatternLab;

use \PatternLab\Console;

class Timer {
	
	protected static $startTime;
	protected static $checkTime;
	
	/**
	* Check the current timer
	*/
	public static function check($text = "") {
		
		// make sure start time is set
		if (empty(self::$startTime)) {
			Console::writeError("the timer wasn't started...");
		}
		
		// make sure check time is set
		if (empty(self::$checkTime)) {
			self::$checkTime = self::$startTime;
		}
		
		// format any extra text
		$insert = "";
		if (!empty($text)) {
			$insert = "<info>".$text." >> </info>";
		}
		
		// get the current time
		$checkTime = self::getTime();
		
		// get the data for the output
		$totalTime = ($checkTime - self::$startTime);
		$mem       = round((memory_get_peak_usage(true)/1024)/1024,2);
		
		// figure out what tag to show
		$timeTag = "info";
		if (($checkTime - self::$checkTime) > 0.2) {
			$timeTag = "error";
		} else if (($checkTime - self::$checkTime) > 0.1) {
			$timeTag = "warning";
		}
		
		// set the checkTime for the next check comparison
		self::$checkTime = $checkTime;
		
		// write out time/mem stats
		Console::writeLine($insert."currently taken <".$timeTag.">".$totalTime."</".$timeTag."> seconds and used <info>".$mem."MB</info> of memory...");
		
	}
	
	/*
	* Get the time stamp
	*/
	protected static function getTime() {
		$mtime = microtime();
		$mtime = explode(" ",$mtime); 
		$mtime = $mtime[1] + $mtime[0]; 
		return $mtime;
	}
	
	/**
	* Start the timer
	*/
	public static function start() {
		
		// get the current time
		self::$startTime = self::getTime();
		
	}
	
	/**
	* Stop the timer
	*/
	public static function stop() {
		
		// make sure start time is set
		if (empty(self::$startTime)) {
			Console::writeError("the timer wasn't started...");
		}
		
		// get the current time
		$endTime = self::getTime();
		
		// get the data for the output
		$totalTime = ($endTime - self::$startTime);
		$mem = round((memory_get_peak_usage(true)/1024)/1024,2);
		
		// figure out what tag to show
		$timeTag = "info";
		if ($totalTime > 0.5) {
			$timeTag = "error";
		} else if ($totalTime > 0.3) {
			$timeTag = "warning";
		}
		
		// write out time/mem stats
		Console::writeLine("site generation took <".$timeTag.">".$totalTime."</".$timeTag."> seconds and used <info>".$mem."MB</info> of memory...");
		
	}
	
}
