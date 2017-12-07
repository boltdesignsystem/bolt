# v2.9.1
## 09/14/2017

1. [](#bugfix)
    * Fixed backwards compatibility issue with conditional field [#188](https://github.com/getgrav/grav-plugin-form/pull/188)

# v2.9.0
## 09/07/2017

1. [](#new)
    * Added **Refresh Prevention** capabilities (Not enabled by default) [#184](https://github.com/getgrav/grav-plugin-form/issues/184)
    * Added support for field `attributes` [#176](https://github.com/getgrav/grav-plugin-form/pull/176)
    * Added global variables for setting form classes
    * Added support for new `select_optgroup` form field [#165](https://github.com/getgrav/grav-plugin-form/issues/165)
1. [](#improved)
    * Moved messages output into partial to allow style overriding
    * Logic cleanup
    * Updated Italian and Russian translations
1. [](#bugfix)
    * Fixed an issue with conditional field not always displaying properly
    * Only add Twig form variable if not already set
    * Fixed issue with multiple forms on a page failing on Captcha client-side validation [#182](https://github.com/getgrav/grav-plugin-form/issues/182)
    * Fixed issue with Ajax forms return full form HTML on error [#163](https://github.com/getgrav/grav-plugin-form/issues/163)
    
# v2.8.2
## 08/18/2017

1. [](#new)
    * Added new `columns` and `column` fields for controlled form layout

# v2.8.1
## 08/15/2017

1. [](#improved)
    * Added extra class support to the default field for more flexible styling 

# v2.8.0
## 07/16/2017

1. [](#bugfix)
    * Fixed a typo in the spanish translation [#167](https://github.com/getgrav/grav-plugin-form/pull/167)

# v2.8.0-rc.2
## 06/22/2017

1. [](#improved)
    * Add default client-side validation for captcha, with error popup [#139](https://github.com/getgrav/grav-plugin-form/issues/139)
    * Added key observe for select
    * Added Czech translation
1. [](#bugfix)
    * Bug fix for radio type form field [#154](https://github.com/getgrav/grav-plugin-form/pull/154)
    * Remove double escaping [#155](https://github.com/getgrav/grav-plugin-form/issues/154)

# v2.8.0-rc.1
## 05/22/2017

1. [](#new)
    * Bundled as RC release for Grav/Admin RC releases

# v2.7.1
## 05/22/2017

1. [](#improved)
    * Force modular sub-pages with forms to set `$never_cache_twig = true` to improve form processing reliability [#153](https://github.com/getgrav/grav-plugin-form/issues/153)
    * Use new `Utils::getPagePathFromToken()` method

# v2.7.0
## 05/16/2017

1. [](#bugfix)
    * Fix issue with dynamically added forms (Registration, Profile, Comments, etc) not processed [#149](https://github.com/getgrav/grav-plugin-form/issues/149)
    * Fixed issue with nested values not being repopulated on form error [#140](https://github.com/getgrav/grav-plugin-form/issues/140)

# v2.6.0
## 05/04/2017

1. [](#new)
    * Allow form item replacement in redirect location [#144](https://github.com/getgrav/grav-plugin-form/issues/144)
1. [](#bugfix)
    * Fix regression with file uploads introduced in 2.5.0

# v2.5.0
## 04/24/2017

1. [](#new)
    * Support proper form handling with nested fields [#141](https://github.com/getgrav/grav-plugin-form/issues/141)
1. [](#bugfix)
    * Added check for valid Grav forms before trying to create a form object

# v2.4.0
## 04/19/2017

1. [](#new)
    * Added the ability for front-end forms to use advanced blueprint features such as `data-*@` and `config-*@`
    * Added support for dynamically added pages to process forms properly
    * Added a new avatar field for displaying account avatar
    * Added method to get all `data` from a form
    * Support `task` in button types
1. [](#improved)
    * Added `step` to range field [#136](https://github.com/getgrav/grav-plugin-form/issues/136)
    * Added a new default ajax handler twig template
    * Moved twig events to always process even if forms are not defined
    * Some code cleanup
    * Handle `null` with session-based form
    * Added support for append/prepend to number field
1. [](#bugfix)
    * Always process form events as long as a `$_POST` exists [login #101](https://github.com/getgrav/grav-plugin-login/issues/101)
    * Various fixes for `file` field
    * Allow manually added pages to process forms and upload files
    * Fixed issue with nested fileds not showing up in `data.*.twig` templates

# v2.3.1
## 03/23/2017

1. [](#bugfix)
    * Only include `outerclasses` DIV if defined [#135](https://github.com/getgrav/grav-plugin-form/issues/135)

# v2.3.0
## 03/17/2017

1. [](#new)
    * Ability to process any form on any page via `action:`.  Super useful if you want to handle form processing on some other non-form page (or Ajax)
    * Added the ability for the form to set the `template:` to use to render the form processing response.
1. [](#bugfix)
    * Fix `number` field so it works with min value `0` [#130](https://github.com/getgrav/grav-plugin-form/issues/130)

# v2.2.0
## 03/13/2017

1. [](#new)
    * Added new `fieldset` form field [#125](https://github.com/getgrav/grav-plugin-form/issues/125)
    * Added new `conditional form field` to show fields only if some `condition` is set
1. [](#improved)
    * Added the option to have outer-classes on buttons [#124](https://github.com/getgrav/grav-plugin-form/issues/124)
    * Added the option to disable fields label if not defined [#126](https://github.com/getgrav/grav-plugin-form/issues/126)

# v2.1.1
## 02/17/2017

1. [](#improved)
    * Better default output for select, checkbox and checkboxes fields in the form destination page and in the emails sent via form submit [#121](https://github.com/getgrav/grav-plugin-form/issues/121)


# v2.1.0
## 02/10/2017

1. [](#improved)
    * Reworked logic so form caching is based on `Pages::getPagesCacheId()`
    * Added `url` option for button field
1. [](#bugfix)
    * Fixed issue with `honeypot` field not throwing exception properly

# v2.0.10
## 02/08/2017

1. [](#improved)
    * Optimistically set 'status' to `success` when requesting a form via Ajax. Form processing listeners should take care of setting status to something else
1. [](#bugfix)
    * File uploads are now adding a `__form-file-uploader__` POST field to better allow identifying them with Ajax
    * Require jQuery when using the File field, as it's needed by the form.min.js file required in the file upload functionality

# v2.0.9
## 01/24/2017

1. [](#bugfix)
    * Translate the labels in data.html.twig [https://github.com/getgrav/grav-plugin-comments/issues/38](https://github.com/getgrav/grav-plugin-comments/issues/38)
    * Fixed file input when `System` > `Twig` > `Autoescape` is set to `Yes`

# v2.0.8
## 12/13/2016

1. [](#new)
    * RC released as stable
    * Added a new `honeypot` field for form anti-spam protection

# v2.0.8-rc.1
## 11/26/2016

1. [](#bugfix)
    * Fixed Forms 2.0 changes for registration form [#101](https://github.com/getgrav/grav-plugin-form/issues/101)
    * Fixed errant reference to Grav DI container in Form#getPagePathFromToken [#105](https://github.com/getgrav/grav-plugin-form/issues/105)
    * Fixed issue with spacer fields being displayed first, not in order [#104](https://github.com/getgrav/grav-plugin-form/issues/104)

# v2.0.7
## 11/17/2016

1. [](#improved)
    * Added method to set all data in a form
    * Added params to form action URL
    * Added ability to add ids to buttons and to set them disabled
1. [](#bugfix)
    * Moved Files Upload GC logic to function in front-end only

# v2.0.6
## 10/19/2016

1. [](#bugfix)
    * Fixed translations for `display` field
    * Fixed [#95](https://github.com/getgrav/grav-plugin-form/issues/95) multilanguage forms submission
    * Fixed duplicate textarea class tag [#98](https://github.com/getgrav/grav-plugin-form/issues/98)

# v2.0.5
## 09/15/2016

1. [](#bugfix)
    * Fix passing updating the header through event, no need for return value

# v2.0.4
## 09/15/2016

1. [](#improved)
    * Allow filling the page header form dynamically (e.g. use case: Comments plugin)

# v2.0.3
## 09/12/2016

1. [](#improved)
    * Use `Page::slug()` for form name if not set in the form itself (better backwards compatibility)

# v2.0.2
## 09/08/2016

1. [](#improved)
    * Added support for Grav's autoescape twig setting
    * Allow to add additional markup fields in form and field twig overrides
    * Updated the french language translation

# v2.0.1
## 09/07/2016

1. [](#bugfix)
    * Fixed a backwards compatibility issue with Admin forms

# v2.0.0
## 09/07/2016

1. [](#new)
    * Forms now supports multiple forms per page!
    * Access forms from any other page within the current page
    * Instantiate forms directly in page content with Twig processing enabled
    * New Twig function to get forms data from any other page
    * Ability to use Twig in saved filename
    * Reworked the `file` field. All files get uploaded via Ajax and are stored upon Submit. Fully backward compatible, `file` field now includes also a `limit` and `filesize` option. The former determines how many files are allowed to be uploaded when in combination with `multiple: true` (default: 10), the latter determines the file size limit (in MB) allowed for each file (default: 5MB)
1. [](#improved)
    * Added several missing HTML5 form input field types [#87](https://github.com/getgrav/grav-plugin-form/issues/87)
    * Added Support for CSS id in form definition

# v1.3.2
## 08/10/2016

1. [](#improved)
    * Added Romanian translation
1. [](#bugfix)
    * Fixed an issue with Recaptcha secret throwing errors [#84](https://github.com/getgrav/grav-plugin-form/pull/84)

# v1.3.1
## 07/27/2016

1. [](#improved)
    * Added support for multiple emails in `email` field (add `multiple: true` to enable)
1. [](#bugfix)
    * Fixed backward incompatibility with forms submission and data retrieval [getgrav/grav#933](https://github.com/getgrav/grav/issues/933)

# v1.3.0
## 07/14/2016

1. [](#improved)
    * When uploading a file through a form, if the file is already existing prepend the current day and time to the filename instead of overwriting it.

# v1.3.0-rc.4
## 06/21/2016

1. [](#bugfix)
    * Fixed running on Grav 1.0.x

# v1.3.0-rc.3
## 06/17/2016

1. [](#new)
    * Set hints for checkboxes options and allow field descriptions

# v1.3.0-rc.2
## 06/08/2016

1. [](#new)
    * Allow to process Twig in a hidden field, by setting `evaluate: true`

# v1.3.0-rc.1
## 06/01/2016

1. [](#improved)
    * French updated

# v1.3.0-beta.6
## 05/23/2016

1. [](#new)
    * Added support for advanced blueprint functionality in forms
    * Added site-wide form options to set Google Captcha site + secret keys [#34](https://github.com/getgrav/grav-plugin-form/pull/34)
    * Session-based 'flash' storage of form for redirects [#48](https://github.com/getgrav/grav-plugin-form/issues/48)
    * Added ability to **append** to file if you include a `process: save: body:` template attribute [#65](https://github.com/getgrav/grav-plugin-form/issues/65)
1. [](#improved)
    * Support `keyname` form format like admin forms
    * Added backwards compatibility for Captcha field
    * Added 'markdown-notices' style output for better errors
    * Added `Forms::getValue()` method to retrieve values programatically
    * Changed `datetime` form field to simply extend `text` until implemented
    * Updated french language
1. [](#bugfix)
    * Refactored the files upload logic
    * Missing Language string
    * Fixed errors not getting output

# v1.3.0-beta.5
## 05/12/2016

1. [](#improved)
    * Moved form/field.html.twig file to the default folder, to be more easily extended in themes

# v1.3.0-beta.4
## 05/04/2016

1. [](#new)
    * Added support for `prepend` and `append` field attributes for Text input

# v1.3.0-beta.3
## 05/03/2016

1. [](#bugfix)
    * Fix for select field admin translation

# v1.3.0-beta.2
## 04/27/2016

1. [](#bugfix)
    * Fix for autoescape in spacer and display form fields
    * Fix issue with form reset action [#66](https://github.com/getgrav/grav-plugin-form/pull/66)

# v1.3.0-beta.1
## 04/20/2016

1. [](#new)
    * Added the HTML5 `range` input field with `min` and `max` parameters
1. [](#improved)
    * Allow to override classes in Form definition for the form element
    * Add more blocks in the Form twig template, so classes can be overridden more easily in themes
    * Reworked some fields to fit the new Admin
    * Use `scope` for form fields to allow fields to be excluded from the data by adding `input@: false` to their definition
    * Added german translation
    * Allow to add inline Twig to the form message definition
1. [](#bugfix)
    * Fixed the form action URL for home page forms
    * Fix stopping form events propagation, correctly stop when one event is stopped
    * Allow to translate the fields placeholders and the form message
    * Fix captcha javascript function ordering. Also, render it in the site active language
    * Support attribute `for="id"` on label for checkbox
    * Fix select fields with the multiple option enabled
    * Fixed select options escaping with autoescape on - [#502](https://github.com/getgrav/grav-plugin-admin/issues/502)

# v1.2.2
## 02/11/2016

1. [](#bugfix)
    * Fixed case issue when including form file.

# v1.2.1
## 02/11/2016

1. [](#new)
    * Allow placeholder for **select** field
1. [](#improved)
    * Use common language strings in blueprints
    * Use `for` attribute in labels
    * Improved `README.md`
    * Code lint
1. [](#bugfix)
    * Moved `nl2br` to correct place or will break for arrays

# v1.2.0
## 01/06/2016

1. [](#bugfix)
    * Correctly merge the file field configuration
    * restore full file information save

# v1.1.0
## 12/18/2015

1. [](#new)
    * Croatian translation
    * Added id, style, and disabled options to select fields
1. [](#improved)
    * Allow adding form labels and help text as lang strings
    * Allow translating field content
    * Allow translating button and checkbox labels
    * Allow adding classes to the form field container with `field.outerclasses`
    * Updated French translation
1. [](#bugfix)
    * Fixed error message on file upload
    * Fixed overriding defaults for the file type in forms

# v1.0.3
## 12/11/2015

1. [](#improved)
    * Updated languages
    * Allow an action to stop processing
1. [](#bugfix)
    * Fix captcha validation
    * Fix issue where Form was unsetting valid page

# v1.0.2
## 12/01/2015

1. [](#bugfix)
    * Fixed merge of defaults settings
    * Support for arrays in `data.txt.twig`
    * Fixed blueprint for admin

# v1.0.1
## 12/01/2015

1. [](#new)
    * New **file upload** field
    * Added modular form template
    * Spanish translation
    * Hungarian translation
    * Italian translation

# v1.0.0
## 11/21/2015

1. [](#new)
    * Server-side validation of forms #11
    * Added french translation
    * Added **nonce** form security
1. [](#improved)
    * Show a more meaningful error when the display page is not found
    * Added links to learn site for form examples
    * Label can be omitted
    * Allow user to set the CSS class for buttons
1. [](#bugfix)
    * Fixed multi-language forms
    * Checkbox is translatable
    * Minor fixes

# v0.6.0
## 10/21/2015

1. [](#bugfix)
    * Fixed for missing attributes in textarea field
    * Fixed checkbox inputs

# v0.5.0
## 10/15/2015

1. [](#new)
    * New `operation` param to allow different file saving strategies
    * Ability to add new file saving strategies
    * Now calls a `process()` method during form processing
1. [](#improved)
    * Added server-side captcha validation and removed front-end validation
    * Allow `filename` instead of `prefix`, `format` + `extension`
1. [](#bugfix)
    * Fixed radio inputs

# v0.4.0
## 9/16/2015

1. [](#new)
    * PHP server-side form validation
    * Added new Google Catpcha field with front-end validation
1. [](#improved)
    * Add defaults for forms, moved from the themes to the Form plugin
    * Store multi-line fields with line endings converted to HTML

# v0.3.0
## 9/11/2015

1. [](#improved)
    * Refactored all the forms fields

# v0.2.1
## 08/24/2015

1. [](#improved)
    * Translated tooltips

# v0.2.0
## 08/11/2015

1. [](#improved)
    * Disable `enable` in admin

# v0.1.0
## 08/04/2015

1. [](#new)
    * ChangeLog started...
