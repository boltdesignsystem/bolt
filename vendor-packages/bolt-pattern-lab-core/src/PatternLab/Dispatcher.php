<?php

/*!
 * Dispatcher Class
 *
 * Copyright (c) 2014 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 * Dispatches events for Pattern Lab that can be listened to by plug-ins
 *
 */

namespace PatternLab;

use \PatternLab\Config;
use \PatternLab\Timer;
use \Symfony\Component\EventDispatcher\EventDispatcher;

class Dispatcher {
	
	protected static $instance;
	
	/**
	* Get instance when requested
	*/
	public static function getInstance() {
		return self::$instance;
	}
	
	/**
	* Check to see if the given pattern type has a pattern subtype associated with it
	* @param  {String}        the name of the pattern
	*
	* @return {Boolean}       if it was found or not
	*/
	public static function init() {
		
		self::$instance = new EventDispatcher();
		self::loadListeners();
		
	}
	
	/**
	* Load listeners that may be a part of plug-ins that should be notified by the dispatcher
	*/
	protected static function loadListeners() {
		
		// default var
		$configDir = Config::getOption("configDir");
		
		// make sure the listener data exists
		if (file_exists($configDir."/listeners.json")) {
			
			// get listener list data
			$listenerList = json_decode(file_get_contents($configDir."/listeners.json"), true);
			
			// get the listener info
			foreach ($listenerList["listeners"] as $listenerName) {
				
				if ($listenerName[0] != "_") {
					$listener  = new $listenerName();
					$listeners = $listener->getListeners();
					foreach ($listeners as $event => $eventProps) {
						$eventPriority = (isset($eventProps["priority"])) ? $eventProps["priority"] : 0;
						self::$instance->addListener($event, array($listener, $eventProps["callable"]), $eventPriority);
					}
				}
				
			}
			
		}
		
	}
	
}
