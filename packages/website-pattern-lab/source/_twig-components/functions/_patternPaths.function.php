<?php

use \Symfony\Component\Finder\Finder;
use \Symfony\Component\Yaml\Exception\ParseException;
use \Symfony\Component\Yaml\Yaml;


$function = new Twig_SimpleFunction('patternPaths', function ($string) {
  
  $MAIN_NAMESPACE = '__main__';
	
	$paths        = array();
	$cache        = array();
	$patternPaths = array();
	$extension    = '.twig';
  
  
  if (function_exists('normalizeName') == false) {
    function normalizeName($name) {
      return preg_replace('#/{2,}#', '/', strtr((string) $name, '\\', '/'));
    }
  }
  
  
  if (function_exists('validateName') == false) {
    function validateName($name) {
  		
  		if (false !== strpos($name, "\0")) {
  			throw new \Twig_Error_Loader('A template name cannot contain NUL bytes.');
  		}
  		
  		$name = ltrim($name, '/');
  		$parts = explode('/', $name);
  		$level = 0;
  		foreach ($parts as $part) {
  			if ('..' === $part) {
  				--$level;
  			} elseif ('.' !== $part) {
  				++$level;
  			}
  			
  			if ($level < 0) {
  				throw new \Twig_Error_Loader(sprintf('Looks like you try to load a template outside configured directories (%s).', $name));
  			}
  		}
  		
  	}
  }
  
  
  
  if (function_exists('findTemplate') == false) {
    function findTemplate($name) {
  		
  		// list($partialName,$styleModifier,$parameters) = $patternUtil->getPartialInfo($name);
  		
  		// $name = $patternUtil->getFileName($partialName,$extension);
  		
  		$name = normalizeName($name);
  		
  		if (isset($cache[$name])) {
  			return $cache[$name];
  		}
  		
  		validateName($name);
  		
  		// $namespace = $MAIN_NAMESPACE;
  		$shortname = $name;
  		if (isset($name[0]) && '@' == $name[0]) {
  			if (false === $pos = strpos($name, '/')) {
  				throw new \Twig_Error_Loader(sprintf('Malformed namespaced template name "%s" (expecting "@namespace/template_name").', $name));
  			}
  			
  			$namespace = substr($name, 1, $pos - 1);
  			$shortname = substr($name, $pos + 1);
  		}
  		
  		if (!isset($paths[$shortname])) {
        
        echo $shortname;
        
        // $finder = new Finder();
        // $finder->files()->in(__DIR__);
        // 
        // $test = $finder->files()->name('*.twig');
        // 
        // echo $test;
      //   foreach ($finder as $file) {
      //     // Dump the absolute path
      //     var_dump($file->getRealPath());
      // 
      //     // Dump the relative path to the file, omitting the filename
      //     var_dump($file->getRelativePath());
      // 
      //     // Dump the relative path to the file
      //     var_dump($file->getRelativePathname());
      // }
        
        
  			// throw new \Twig_Error_Loader(sprintf('There are no registered paths for namespace "%s".', $namespace));
  		}
  		
  		// foreach ($paths[$namespace] as $path) {
  		// 	if (is_file($path.'/'.$shortname)) {
  		// 		return $cache[$name] = $path.'/'.$shortname;
  		// 	}
  		// }
  		// 
  		// 
  		// throw new \Twig_Error_Loader(sprintf('Unable to find template "%s" (looked into: %s).', $partialName, implode(', ', $paths[$namespace])));
  	}
  }
  

  
  
  
  
  
  $documentRoot = getcwd();
  if (strpos($documentRoot, 'pattern-lab')) {
    $documentRoot = trim($documentRoot, "pattern-lab");
  }
  $documentRoot = rtrim($documentRoot, '/') . '/';
  $patternSourceDir = $documentRoot . 'source/_patterns';
  
	$finder = new Finder();
	$finder->directories()->depth(0)->in($patternSourceDir);
  
  
	foreach ($finder as $file) {
		$pattern = $file->getRelativePathName();
		$patternBits = explode("-",$pattern,2);
		$patternTypePath = (((int)$patternBits[0] != 0) || ($patternBits[0] == '00')) ? $patternBits[1] : $pattern;
		
    // print $patternTypePath;
    //->addPath($file->getPathName(), $patternTypePath);
	}
  
  
  
  $name = normalizeName($string);
  
  // echo $name;
  
  $path = findTemplate($name);
  // 
  // echo $name;
  // if (isset($cache[$name])) {
  //   return true;
  // }
  
  // try {
  //   
  //   
  //   return true;
  // } catch (\Twig_Error_Loader $exception) {
  //   return false;
  // }
  
  
  
  
  
  // return '';
  		
  		//return $filesystemLoader;
  		
  // if ($string === '<front>') {
  //   return '/';
  // } else {
  //   return $string;
  // }
});
