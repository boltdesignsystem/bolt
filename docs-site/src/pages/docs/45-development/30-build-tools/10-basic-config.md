---
title: Basic Configuration
---

These values can be set in `.boltrc.js` files to configure the build tools:

```
buildDir:
  type: string
  description: The buildDir config specifies where Bolt's compiled files are saved after every build. These are the generated scripts which will be requested by the browser. The build directory should be relative to the wwwDir setting (i.e. inside it).

wwwDir:
  type: string
  title: Path to server root
  description: "Where static files are served from. The wwwDir config specifies the public web distribution directory. This directory is commonly the root directory for a server, where all static files can be served. This directory is built and rebuilt directly from the source files. Note: We recommend this directory is not committed to a repository."

prod:
  type: boolean
  description: Production build, will compress assets.
  default: false

```
