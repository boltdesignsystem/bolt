---
title: Extras 
---

These values can be set in `.boltrc.js` files to configure the build tools:

```
srcDir:
  type: string
  title: Source Directory

plConfigFile:
  type: string
  title: Pattern Lab Config File Path

openServerAtStart:
  type: boolean
  default: false
  description: If, after starting `npm start`, a Browser opens.

quick:
  type: boolean
  default: false
  description: Try to be quicker by skipping some steps that might not be needed if everything is recently built and in good working order.
 
verbosity:
  type: integer
  default: 2
  description: Logging level (Range of 0 to 5) How 'loud' or 'quiet' do you want the console output to be?
  enum:
    - 0
    - 1
    - 2
    - 3
    - 4
    - 5

extraTwigNamespaces:
  type: object
  title: Extra Twig Namespaces
  description: "These will be joined with others created programatically. Creates a file in the `dataDir` that can be read by things that register the Twig Namespaces in a way that is appropriate for that environment. Follows the conventions from [this plugin](https://packagist.org/packages/evanlovely/plugin-twig-namespaces)."

images:
  type: object
  description: Image resizing options, which can handle multiple sets.
  properties:
    sets:
      type: array
      items:
        type: object
        properties:
          base:
            type: string
            description: The base path, which is combined with `glob` to indicate the source file. The directories used here will *not* be used to construct the output path.
          glob:
            type: string
            description: The glob pattern, which can include plain directories, and is used to create the output path along with `dist`.
          dist:
            type: string
            description: The output path, which is combined with what `glob` returns.

dataDir:
  type: string
  description: This is the directory where generated json data files exist with information about the overall build. Defaults to `data` inside `buildDir`
  
startPath:
  type: string
  title: Local server start path
  description: This is the `path/to/file.html` in `http://localhost:3000/path/to/file.html`
  default: ''


```
