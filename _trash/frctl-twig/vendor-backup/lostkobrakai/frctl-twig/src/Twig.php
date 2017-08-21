<?php
/**

The MIT License (MIT)

Copyright (c) 2015 Bitmade

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


 * Calculate the relative path from the template directory to the actual template file.
 *
 * Twig uses a root directory and all includes are based upon that directory.
 * The following examples clarify why it's necessary to specify he root directory independently
 * from the template file that should be rendered.
 *
 * Including partials/_partial.twig from index.twig at the root level would be fine when
 * rendering index.twig.
 *
 * Rendering partials/_partial.twig from sections/_section.twig would break because the root
 * directory is sections and Twig would try to incude sections/partials/_partial.twig.
 *
 * @param string $rootDir
 *    Path to the root directory where all templates live in.
 * @param string $fileDir
 *    Path to the template file that should be rendered.
 * @return string
 *    The relative path from the root directory to the template file's directory.
 */
function _getFilepathPrefix($rootDir, $fileDir) {
  // Get the path segments for each path.
  $rootChunks = explode('/', $rootDir);
  $fileChunks = explode('/', $fileDir);

  $prefixChunks = array_diff($fileChunks, $rootChunks);

  return $prefixChunks ? implode('/', $prefixChunks) . '/' : '';
}

/**
 * Renders a Twig template.
 *
 * @param string $entry
 *    The full path to the template.
 * @param array $options
 *    An optional array of options. Valid options can be found in the NPM package's README file.
 * @return string
 *    The rendered template.
 */
function render($entry, $options = array()) {
  $fileInfo = pathinfo($entry);

  $options = array_merge(array(
    'aliases' => array(),
    'context' => array(),
    'staticRoot' => ''
  ), $options);

  // Get the root template directory either from the given file or specified in the options.
  $isRootOption = array_key_exists('root', $options) && $options['root'];
  $rootDir = $isRootOption ? $options['root'] : $fileInfo['dirname'];

  $prefix = _getFilepathPrefix($rootDir, $fileInfo['dirname']);
  $staticRoot = $options['staticRoot'];

  $loader = new Twig_Loader_Chain(array(
    new Alias_Loader($options['aliases']),
    new Twig_Loader_Filesystem($rootDir),
  ));

  $twig = new Twig_Environment($loader, array('autoescape' => false));

  $filter = new Twig_SimpleFilter('path', function ($path) use($staticRoot) {
    return rtrim($staticRoot, '/') . '/' . ltrim($path, '/');
    // return rtrim($staticRoot, '/') . '/' . ltrim($path, '/');
  });
  $twig->addFilter($filter);

//   $filesystemLoaderPaths = array();
//   $filesystemLoader = new \Twig_Loader_Filesystem($filesystemLoaderPaths);
//
// $filesystemLoader->addPath($file->getPathName(), $patternTypePath);
//   framework/components



  $twig->addFunction(new Twig_SimpleFunction('static', function ($path) use($staticRoot) {
    return rtrim($staticRoot, '/') . '/' . ltrim($path, '/');
  }));




  try {
    return $twig->render($prefix . $fileInfo['basename'], $options['context']);
  }
  catch (\Exception $e) {
    return _createPrettyError($e->getMessage());
  }
}

/**
 * Creates a pretty looking page that displays the error message.
 *
 * @param string $message
 *    The error message to display.
 *
 * @return string
 */
function _createPrettyError($message = '') {
  return <<<EOT
    <html>
      <head>
        <title>Twig Error</title>
        <style>
          @import 'https://fonts.googleapis.com/css?family=Roboto+Mono';
          body {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #0b0c12;
          }
          .error {
            color: #fff;
            padding: 10px 20px;
            font-size: 18px;
            border-left: 3px solid #a4d233;
            font-family: "Roboto Mono", monospace;
            margin: 20px;
          }
        </style>
      </head>
      <body>
        <div class="error">{$message}</pre>
      </body>
    </html>
EOT;
}
