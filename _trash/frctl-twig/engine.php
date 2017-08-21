<?php 
require __DIR__ . '/vendor/autoload.php';

if(!function_exists ('render')){
	function render($entry, $options = array()) {
		return "The composer package does not include a render function.";
	}
}