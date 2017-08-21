<?php

/*!
 * Listener Class
 *
 * Copyright (c) 2014 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 * Adds items to the listener array. Related to plug-ins and how they act
 * on the hooks in Pattern Lab
 *
 */

namespace PatternLab;

use \PatternLab\Timer;

class Listener {
	
	protected $listeners = array();
	
	/**
	* Add listeners to an array that can be iterated over and added to the dispatcher
	* @param  {String}        the name of the event the callable is related to
	* @param  {String}        the callable function
	* @param  {Integer}       the priority for the event. default is 0.
	*/
	protected function addListener($eventName,$callable, $priority = 0) {
		
		$this->listeners[$eventName] = array("callable" => $callable, "priority" => $priority);
		
	}
	
	/**
	* Get the list of listeners
	*/
	public function getListeners() {
		return $this->listeners;
	}
	
}
