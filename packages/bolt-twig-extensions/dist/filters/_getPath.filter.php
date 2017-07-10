	public static function addPaths($filesystemLoader, $patternSourceDir) {
		
		$finder = new Finder();
		$finder->directories()->depth(0)->in($patternSourceDir);
		foreach ($finder as $file) {
			$pattern = $file->getRelativePathName();
			$patternBits = explode("-",$pattern,2);
			$patternTypePath = (((int)$patternBits[0] != 0) || ($patternBits[0] == '00')) ? $patternBits[1] : $pattern;
			$filesystemLoader->addPath($file->getPathName(), $patternTypePath);
		}
		
		return $filesystemLoader;
		
	}
  
  
  
  
  
  
  // load default vars
  $dirSep              = PatternData::getDirSep();
  
  // set-up the names
  $patternType         = $name;                                        // 00-atoms
  $patternTypeDash     = $this->getPatternName($name,false);           // atoms
  $patternTypeClean    = str_replace("-"," ",$patternTypeDash);        // atoms (dashes replaced with spaces)
  
  $patternTypePath     = $pathName;                                    // 00-atoms/02-blocks
  $patternTypePathDash = str_replace($dirSep,"-",$patternTypePath); // 00-atoms-02-blocks (file path)
  
  // create a key for the data store
  $patternStoreKey     = $patternTypeDash."-pltype";
  
  // add a new patternType to the nav
  $patternData = array("category"  => "patternType",
             "name"      => $patternType,
             "nameDash"  => $patternTypeDash,
             "nameClean" => $patternTypeClean,
             "depth"     => $depth,
             "ext"       => $ext,
             "path"      => $path,
             "pathName"  => $patternTypePath,
             "pathDash"  => $patternTypePathDash,
             "isDir"     => $this->isDirProp,
             "isFile"    => $this->isFileProp);
  
  PatternData::setOption($patternStoreKey,$patternData);
  
  // starting a new set of pattern types. it might not have any pattern subtypes
  PatternData::setPatternType($patternType);
  PatternData::setPatternTypeClean($patternTypeClean);
  PatternData::setPatternTypeDash($patternTypeDash);
  
}