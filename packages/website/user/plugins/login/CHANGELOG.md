# v2.3.2
## 06/22/2017

1. [](#bugfix)
    * Grav plugin cli error on password change [#120](https://github.com/getgrav/grav-plugin-login/issues/120)

# v2.3.1
## 05/16/2017

1. [](#improved)
    * Added routes to the Admin blueprints

# v2.3.0
## 04/19/2017

1. [](#new)
    * Added new built-in profile page support
    * Added optional flood protection for password resets and login attempts [#91](https://github.com/getgrav/grav-plugin-login/issues/91)
1. [](#improved)
    * Use new system configuration entries for username and password format
    * Use initialized form object in Twig templates rather than array from page.header
    * Improved alert styling in login templates
    * Added `appends` for number field
    * Added missing `route` options in admin options (blueprints)
1. [](#bugfix)
    * Set cookie path to `/` if `base_url_relative` is empty [#102](https://github.com/getgrav/grav-plugin-login/issues/102)
    * Fixed some redirect logic
    
# v2.2.1
## 01/24/2017

1. [](#bugfix)
    * Fix login form/status templates displaying user as logged in even if he's not authenticated
    * Use email validation instead of text validation in the forgot password form [https://github.com/gantry/gantry5/issues/1813](https://github.com/gantry/gantry5/issues/1813)

# v2.2.0
## 12/13/2016

1. [](#new)
    * RC released as stable

# v2.2.0-rc.5
## 12/07/2016

1. [](#improved)
    * Added support for hiding `Remember me` checkbox and and `Forgot` button (for Offline functionality)
1. [](#bugfix)
    * Fixed redirect issue in admin plugin

# v2.2.0-rc.4
## 12/04/2016

1. [](#improved)
    * Improved logic for redirect after login to not include login-related pages.

# v2.2.0-rc.3
## 11/26/2016

1. [](#improved)
    * Added some validity checks in the reset password form
1. [](#bugfix)
    * Correctly redirect to the last page visited after login, unless `redirect_after_login` is defined

# v2.2.0-rc.2
## 11/17/2016

1. [](#new)
    * Allow to set permissions using nested array syntax [#96](https://github.com/getgrav/grav-plugin-login/issues/96)
1. [](#improved)
    * Use the same feedback message when resetting the password if the email exists or not. Remove email in the message as we now recover via email, useless
1. [](#bugfix)
    * Fix registration form, fields were not visible [#97](https://github.com/getgrav/grav-plugin-login/issues/97)
    * Do not initialize the user session if the user exists but has no `site.login` permission

# v2.2.0-rc.1
## 11/09/2016

1. [](#new)
    * Allow login via `username` or `email`
    * Only allow password recovery via `email` address

# v2.1.2
## 10/01/2016

1. [](#bugfix)
    * Fixed an old reference to `LoginUtils` and replaced with new `EmailUtils`

# v2.1.1
## 09/08/2016

1. [](#improved)
    * Use better detection for admin allowing multi-site setup with subfolders

# v2.1.0
## 09/07/2016

1. [](#improved)
    * Added support for Grav's autoescape twig setting
    * Dropped unused variable reference
    * Moved Email Utils to Email plugin
    * Updated vendor libraries
    * Allow explicitly showing the login page on pages that are not the Login form template [#11](https://github.com/getgrav/grav-plugin-maintenance/issues/11)

# v2.0.1
## 08/10/2016

1. [](#improved)
    * Added Romanian

# v2.0.0
## 07/14/2016

1. [](#improved)
    * Optimized nonce creation
    * Point account path to core's account stream [#85](https://github.com/getgrav/grav-plugin-login/issues/85)

# v2.0.0-rc.2
## 06/21/2016

1. [](#new)
    * Add an option to login protect a login-protected page media accessed through the page route [#45](https://github.com/getgrav/grav-plugin-login/issues/45)
1. [](#improved)
    * Fixed some language keys
1. [](#bugfix)
    * Correctly show an error message when the reset password form does not provide the correct nonce

# v2.0.0-rc.1
## 06/01/2016

1. [](#improved)
    * French updated
1. [](#bugfix)
    * Enable twig processing in a page #75
    * Deny access to registration when user registration is disabled #72

# v2.0.0-beta.3
## 05/23/2016

1. [](#improved)
    * Added a redirect after activation
    * Changed hardcoded redirect routes to config-based
1. [](#bugfix)
    * Fix a redirect issue #74
    * Don't error if missing a HTTP_USER_AGENT browser string

# v2.0.0-beta.2
## 05/03/2016

1. [](#improved)
    * Improved the login form page once logged in
    * Translate welcome and logout strings
1. [](#bugfix)
    * Fixed logging out on the homepage
    * Fixed an issue in processing user registration

# v2.0.0-beta.1
## 04/20/2016

1. [](#new)
    * Introduce a more flexible Login plugin architecture, which allows separate authentication plugins to hook into the Login events. Separated OAuth to its own plugin.
    * OAuth has been separated to its own plugin, needs to be installed separately and configured. The users account filename format has changed too, to fix an issue that involved people with the same name on a service.
    * The `redirect` option  has been changed to `redirect_after_login`. Make sure you update your configuration file.
1. [](#improved)
    * Add a proper 'Access levels' config section for Login.
    * Various underlying improvements
    * Updated french, added german
1. [](#bugfix)
    * Make username field autofocus
    * Add validation to the password reset form
    * Fixed an issue that allowed a user logged in, without access to the actual permissions set to view a page, to see its content, and the login form again even if already logged in.

# v1.3.1
## 02/05/2016

1. [](#new)
    * Add translations for Username and Password (placeholders are not translated)
1. [](#improved)
    * Improve registration, forgot, reset and login forms accessibility by setting the id attribute
    * Improved french translation
    * Add the correct message type when raising a form processing error
1. [](#bugfix)
    * Show the correct error message when the user is not authorized to view a page
    * Fix showing the OAuth links in the login form

# v1.3.0
## 01/06/2016

1. [](#new)
    * Added a new CLI command to change a user's password
    * Added a new CLI command to edit the user state
1. [](#improved)
    * Improved french translation

# v1.2.1
## 12/18/2015

1. [](#new)
    * Croatian translation
1. [](#improved)
    * Use type `email` in registration form
    * Drop manual validation in registration

# v1.2.0
## 12/11/2015

1. [](#new)
    * Added account activation email upon registration
    * Added forgot password functionality
    * Support ACL from parent page
    * Allow login immediately after account activation
1. [](#improved)
    * Handle admin login page if available
    * Example registration form now provided by plugin
    * Better error handling of registration
    * Tab-based plugin configuration
    * Updated translations
1. [](#bugfix)
    * Prevent failing when no default values are set

# v1.1.0
## 12/01/2015

1. [](#new)
    * Support new **User Registration**
1. [](#improved)
    * Use new security salt for newer and fallback otherwise
    * Composer update of libraries
    * Check for session existence else throw a runtime error
1. [](#bugfix)
    * Fix remember-me functionality
    * Check page exists so as not to fail hard
    * Fix for static Inflector references #17


# v1.0.1
## 11/23/2015

1. [](#improved)
    * Hardening cookies with user-agent and system cache key instead of deprecated system hash
    * Set a custom route for login only if it's not an admin path

# v1.0.0
## 11/21/2015

1. [](#new)
    * Added OAuth login support for _Facebook_, _Google_, _GitHub_ and _Twitter_
    * Added **Nonce** form security support
    * Added option to "redirect after login"
    * Added "remember me" functionality
    * Added Hungarian translation
2. [](#improved)
    * Added blueprints for Grav Admin plugin (multi-language support!)

# v0.3.3
## 09/11/2015

1. [](#improved)
    * Changed authorise to authorize
1. [](#bugfix)
    * Fix denied string

# v0.3.2
## 09/01/2015

1. [](#improved)
    * Broke out login form into its own partial

# v0.3.1
## 08/31/2015

1. [](#improved)
    * Added username field autofocus

# v0.3.0
## 08/24/2015

1. [](#new)
    * Added simple CSS styling
    * Added simple login status with logout
1. [](#improved)
    * Improved README documentation
    * More strings translated
    * Updated blueprints

# v0.2.0
## 08/11/2015

1. [](#improved)
    * Disable `enable` in admin

# v0.1.0
## 08/04/2015

1. [](#new)
    * ChangeLog started...

# v1.3.1
## 02/05/2016

1. [](#new)
    * Add translations for Username and Password (placeholders are not translated)
1. [](#improved)
    * Improve registration, forgot, reset and login forms accessibility by setting the id attribute
    * Improved french translation
    * Add the correct message type when raising a form processing error
1. [](#bugfix)
    * Show the correct error message when the user is not authorized to view a page
    * Fix showing the OAuth links in the login form

# v1.3.0
## 01/06/2016

1. [](#new)
    * Added a new CLI command to change a user's password
    * Added a new CLI command to edit the user state
1. [](#improved)
    * Improved french translation

# v1.2.1
## 12/18/2015

1. [](#new)
    * Croatian translation
1. [](#improved)
    * Use type `email` in registration form
    * Drop manual validation in registration

# v1.2.0
## 12/11/2015

1. [](#new)
    * Added account activation email upon registration
    * Added forgot password functionality
    * Support ACL from parent page
    * Allow login immediately after account activation
1. [](#improved)
    * Handle admin login page if available
    * Example registration form now provided by plugin
    * Better error handling of registration
    * Tab-based plugin configuration
    * Updated translations
1. [](#bugfix)
    * Prevent failing when no default values are set

# v1.1.0
## 12/01/2015

1. [](#new)
    * Support new **User Registration**
1. [](#improved)
    * Use new security salt for newer and fallback otherwise
    * Composer update of libraries
    * Check for session existence else throw a runtime error
1. [](#bugfix)
    * Fix remember-me functionality
    * Check page exists so as not to fail hard
    * Fix for static Inflector references #17


# v1.0.1
## 11/23/2015

1. [](#improved)
    * Hardening cookies with user-agent and system cache key instead of deprecated system hash
    * Set a custom route for login only if it's not an admin path

# v1.0.0
## 11/21/2015

1. [](#new)
    * Added OAuth login support for _Facebook_, _Google_, _GitHub_ and _Twitter_
    * Added **Nonce** form security support
    * Added option to "redirect after login"
    * Added "remember me" functionality
    * Added Hungarian translation
2. [](#improved)
    * Added blueprints for Grav Admin plugin (multi-language support!)

# v0.3.3
## 09/11/2015

1. [](#improved)
    * Changed authorise to authorize
1. [](#bugfix)
    * Fix denied string

# v0.3.2
## 09/01/2015

1. [](#improved)
    * Broke out login form into its own partial

# v0.3.1
## 08/31/2015

1. [](#improved)
    * Added username field autofocus

# v0.3.0
## 08/24/2015

1. [](#new)
    * Added simple CSS styling
    * Added simple login status with logout
1. [](#improved)
    * Improved README documentation
    * More strings translated
    * Updated blueprints

# v0.2.0
## 08/11/2015

1. [](#improved)
    * Disable `enable` in admin

# v0.1.0
## 08/04/2015

1. [](#new)
    * ChangeLog started...
