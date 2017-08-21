<?php

/*!
 * Zippy Unpack Directory Adapter
 *
 * Copyright (c) 2014 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 * Gives zippy the ability to "unpack" a zip download from GitHub by modifying
 * the default TarGNUTarAdapter options.
 *
 */

namespace PatternLab\Zippy;

use \Alchemy\Zippy\Adapter\BSDTar\TarGzBSDTarAdapter;

class UnpackAdapter extends TarGzBSDTarAdapter {
	
	protected function getExtractOptions() {
		return array('--strip-components=1');
	}
	
	protected function getExtractMembersOptions() {
		return array('--strip-components=1');
	}
	
}
