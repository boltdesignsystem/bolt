---
title: Debugging PHP in Pattern Lab using Xdebug
---

## Part I. Install the Xdebug extension

First you need to install the Xdebug PHP extension.  Quickstart steps are summarized below, but the following resources
may help if you get stuck or something is unclear.

- https://xdebug.org/docs/install#pecl
- https://www.jetbrains.com/help/phpstorm/configuring-xdebug.html#downloadAndInstall
- https://www.jetbrains.com/help/phpstorm/configuring-xdebug.html#updatingPhpIni

**Step 1.** Install xdebug globally with PECL.

   ```bash
   pecl install xdebug
   ```
   
   After installation is complete, the output from that command should tell you where to find `xdebug.so`.  Make a note of that.

**Step 2.** Edit your php.ini file
   - Find the php.ini file that's in use
     ```bash
     php --ini
     ```
      
      (the output will provide the path to a 'Loaded Configuration File')
   - Edit that file and add the following, making sure to update the path to xdebug.so with your actual path.
    
     ```
     [Xdebug]
     zend_extension="/path/to/xdebug.so"
     xdebug.remote_enable=1
     xdebug.remote_port="9000"
     ```
    
     Note that your php.ini file may already contain a zend_extension config line-- if so, delete/replace it with the above.
    
**Step 3.** Confirm that the xdebug extension is installed
   ```bash
   php --version
   ```
   You should see something like this in the output
   
   ```bash
   PHP 7.2.12 (cli) (built: Nov  9 2018 11:03:05) ( NTS )
   Copyright (c) 1997-2018 The PHP Group
   Zend Engine v3.2.0, Copyright (c) 1998-2018 Zend Technologies
      with Xdebug v2.6.1, Copyright (c) 2002-2018, by Derick Rethans
      with Zend OPcache v7.2.12, Copyright (c) 1999-2018, by Zend Technologies
   ```


## Part II. Configure PHPStorm for Xdebug

Note: Many IDEs besides PHPStorm support Xdebug-- refer to their documentation for specifics, but the steps
below should still provide helpful high level guidance on what you're doing.

Generic docs can be found at https://www.jetbrains.com/help/phpstorm/configuring-xdebug.html#integrationWithProduct.
Below are quickstart/Pattern Lab-specific instructions:

**Step 1.** In PHPStorm preferences, go to `Languages & Frameworks` > `PHP`
  -  In the CLI Interpreter box, point to your system's PHP executable (i.e. the same version of PHP that will be used
     when you compile Pattern Lab).  If it doesn't sppear in the dropdown, click the `...` to the right of the form
     field to manually enter the path, which you can find it in terminal with:
     ```bash
     which php
     ```
  ![PHPStorm config](/images/docs/debugging-xdebug-phpstorm-config.png)
  -  Confirm that it says "Debugger: Xdebug [version]" and not "Debugger: Not installed" (in which case something went
     wrong with part I).

**Step 2.** In PHPStorm preferences, go to `Languages & Frameworks` > `PHP` > `Debug` 
  - Confirm that the `Debug Port` in the `Xdebug` section is 9000 (or whatever you configured the port to be in part I.
    Unless you have a good reason, leave it as 9000).   


## Part III. Setup the Pattern lab build command as a script you can debug
    
**Step 1.** In PHPStorm's `Edit` menu, go to `Edit Configurations...`.

**Step 2.** Click the plus sign to add a new debug configuration and select `PHP Script` in the dropdown
  - In the `Name` field, put `Pattern Lab`
  - In the `File` field, add the absolute path to `docs-site/core/console`
  - In the `Arguments` field, add `--generate`
  - In the `Custom working directory` field, add the absolute path to the `docs-site` directory
    
  ![Xdebug script](/images/docs/debugging-xdebug-script-configuration.png)
    
  Explanation: you're setting up a terminal command that will execute pattern lab build with the appropriate params for xdebug 
  ```bash
  /usr/local/bin/php -dxdebug.remote_enable=1 -dxdebug.remote_mode=req -dxdebug.remote_port=9000 -dxdebug.remote_host=127.0.0.1 /Users/dentr1/Sites/bolt/docs-site/core/console --generate
  ```

**Step 3.** Open the `docs-site/core/console` PHP file in PHPStorm and set a breakpoint

  Click in the left margin to set a breakpoint.  It should look like this:

  ![Breakpoint in console](/images/docs/debugging-xdebug-breakpoint-in-console.png)

**Step 4.** Click the bug icon in PHPStorm to run pattern lab compile using the debug configuration you set up
    
  If you've done it right, execution should pause on the breakpoint you set.
    
  ![Running script](/images/docs/debugging-xdebug-running.png)
