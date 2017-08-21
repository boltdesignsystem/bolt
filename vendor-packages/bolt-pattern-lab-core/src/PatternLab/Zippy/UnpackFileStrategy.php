<?php

/*!
 * Unpack Directory Strategy
 *
 * Copyright (c) 2014 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 * Gives zippy the ability to "unpack" a zip download from GitHub by modifying
 * the default TarGNUTarAdapter options.
 *
 */

namespace PatternLab\Zippy;

use \Alchemy\Zippy\Adapter\AdapterContainer;
use \Alchemy\Zippy\FileStrategy\FileStrategyInterface;
use \PatternLab\Zippy\UnpackAdapter;

class UnpackFileStrategy implements FileStrategyInterface {
	
	public function __construct() {
		$this->container = AdapterContainer::load();
	}
	
	public function getAdapters() {
		return array(UnpackAdapter::newInstance($this->container['executable-finder'],$this->container['resource-manager'],$this->container['gnu-tar.inflator'],$this->container['gnu-tar.deflator']));
	}
	
	public function getFileExtension() {
		return 'tar.gz';
	}
	
}
