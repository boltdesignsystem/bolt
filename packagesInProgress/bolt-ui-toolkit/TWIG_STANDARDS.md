# [Proposed] Pattern Lab + Drupal Twig Template Standards &amp; Conventions

![Maintainable Pattern Library](https://www.dropbox.com/s/59uwejibmww1cdx/maintainable_pattern_library.jpg?raw=1)

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [[Proposed] Pattern Lab + Drupal Twig Template Standards &amp; Conventions](#proposed-pattern-lab-drupal-twig-template-standards-amp-conventions)
	- [Simplify and Standardize Drupal + Pattern Lab Integration](#simplify-and-standardize-drupal-pattern-lab-integration)
		- [1. Don't Break Drupal](#1-dont-break-drupal)
		- [2. Don't Reinvent The Wheel](#2-dont-reinvent-the-wheel)
		- [3. Use `{{ attributes }}`](#3-use-attributes-)
		- [4. Set Default Template Data Inside Twig Template](#4-set-default-template-data-inside-twig-template)
		- [5. Twig Templates Should Include Separate `ui_patterns.yml` File](#5-twig-templates-should-include-separate-uipatternsyml-file)
		- [6. Custom Pattern Lab Twig Extensions = Create D8 Counterpart](#6-custom-pattern-lab-twig-extensions-create-d8-counterpart)
	- [Template Maintainability, Stability, and Consistancy](#template-maintainability-stability-and-consistancy)
		- [6. Document template variables](#6-document-template-variables)
		- [7. Avoid Directly Passing In CSS Classes: Use a Pattern API](#7-avoid-directly-passing-in-css-classes-use-a-pattern-api)
		- [8. Template API Consistancy](#8-template-api-consistancy)
		- [9. Namespace / Scope Template Data Based On Component Name](#9-namespace-scope-template-data-based-on-component-name)
		- [10. Be Careful About Overriding / Updating Template Data (In Progress)](#10-be-careful-about-overriding-updating-template-data-in-progress)
		- [11. Don't Hard-code Content in Twig Templates](#11-dont-hard-code-content-in-twig-templates)
	- [Template Organization](#template-organization)
		- [12. Keep Template Logic Together](#12-keep-template-logic-together)
		- [13. Clear Distinction Between Base Templates vs Examples Using Base Templates](#13-clear-distinction-between-base-templates-vs-examples-using-base-templates)
		- [14. Limit Nesting Templates Inside Extra Folders](#14-limit-nesting-templates-inside-extra-folders)
		- [15. Unique Templates = Separate Folder. Similar Templates = Shared Folder](#15-unique-templates-separate-folder-similar-templates-shared-folder)
		- [16. Don't Hard Code 'Vanilla' HTML](#16-dont-hard-code-vanilla-html)
		- [17. Twig File Names Should be Lowercase](#17-twig-file-names-should-be-lowercase)
		- [18. Don't Number Drupal-bound Twig Templates](#18-dont-number-drupal-bound-twig-templates)
		- [19. Avoid Using Pattern Lab 'Short' Names](#19-avoid-using-pattern-lab-short-names)
		- [20. Use snake_case In Twig Templates](#20-use-snakecase-in-twig-templates)
	- [Resources](#resources)
		- [Twig Resources:](#twig-resources)
		- [Research:](#research)

<!-- /TOC -->


Based on how Twig templating work has progressed over the past 9 months, in addition to feedback and observations from actually integrating our templates to Drupal 8, there are a few guidelines &amp; recommendations I'm looking to have the team adopt:


## Simplify and Standardize Drupal + Pattern Lab Integration

### 1. Don't Break Drupal 
  Don't break standard Drupal behavior (ex. we need to make sure Drupalisms like `{{ children }}` are accounted for) in PL templates. Even if Pattern Lab isn't going to directly use those values itself, we should still make sure we're the templates we create are setting the Drupal-side of things up for success.


### 2. Don't Reinvent The Wheel
  When possible, reference an existing D8 theme template as a starting point (ex. the Classy base theme, Phase 2's Starter Theme, Bear Skin, Forum One's Gesso theme, the vanilla D8 Bootstrap theme, etc) *before* we update our default PegaKit templates with our standard conventions for writing CSS / JS selectors.


### 3. Use `{{ attributes }}`
  Plain and simple: all Twig templates in Pattern Lab that are going to be integrated with Drupal **need** to adopt the D8 attributes model for handling HTML attributes / classes. Existing templates we need wired up to D8 should be updated to accept `{{ attributes }}` or something similarly named by default.
  
  Thankfully, most PK work has added the ability for us to use the `create_attribute()` Twig function in Pattern Lab by porting over the logic used in the upcoming Drupal 8.3 [Drupal 8.3](https://www.drupal.org/docs/8/theming-drupal-8/using-attributes-in-templates) release. 
  
  Simply put, we shouldn't be hard coding our classes... set them to an array and `addClass()` them!


### 4. Set Default Template Data Inside Twig Template
  As a general rule of thumb, we should also be defining the data we want to see end up in Drupal inside the Twig template itself, not in Pattern Lab's JSON / Yaml data, etc, especially things like CSS classes or default values we want to set

  Note. If a template needs to pull in external data, provide a Twig function that exposes it (ex. A Twig function that pulls in and exposes JSON file data)


### 5. Twig Templates Should Include Separate `ui_patterns.yml` File 
  By default, moving forward, we should be creating and including a `ui_patterns.yml` sidecar file along with every PL Twig template (ex. `button.ui_patterns.yml`) we create, mapping out the fields that are available.

  For example, this `button.twig` template is expecting two values to get passed in, `title` and `url`:
  ```
  <a href="{{ url }}" target="_blank" class="btn btn-primary button">{{ title }}</a>
  ```
  
  Therefore, our button.ui_patterns.yml file should let Drupal (via the UI Patterns module) know about those available fields:
  ```
  button:
  label: Button
  description: A simple button.
  fields:
    title:
      type: text
      label: Label
      description: The button label
      preview: Submit
    url:
      type: text
      label: URL
      description: The button URL
      preview: http://example.com
  ```
  
### 6. Custom Pattern Lab Twig Extensions = Create D8 Counterpart
  This should be a pretty obvious one but this should still get mentioned just in case. Simply put, any custom Twig extensions, functions, tags, filters, etc that we add to Pattern Lab's Twig instance and are getting used by Twig templates used by Drupal 8 **must** be separately ported over to Drupal so the same Twig templates render properly. Nuff said.
  
  For example: the custom grid system tags used in PegaKit needed to get ported over separately when we first wired up D8 to PK.
  ```
  {% grid %}
    {% cell %}
      Column 1
    {% endcell %}
    ...
  {% endgrid %}
  ```

  The majority of these that need to get ported have already been wired up however there's a few remaining ones that will almost certainly need to get ported over very shortly (ex. the deep_merge function mentioned in the 'Namespace' section down below)


## Template Maintainability, Stability, and Consistancy
### 6. Document template variables
  We should document all available template-specific variables via comments at the top of each Pattern Lab Twig template we create. For example:

```
{#
/**
 * @file
 * Theme suggestion for the PegaKit button component.
 *
 * Available button variables:
 * - button:
 *   - attributes: HTML attributes to add to the button component.
 *   - text: The text displayed inside the button. D8 sets this to the `label` variable by default.
 *   - icon_only: (optional) flag to only display the icon and not the button text. Default ('false'). 
 *     Accepts 'true' or 'false'
 *   - icon_position: (optional) Position the icon should be displayed. Default ('left'). Accepts 'left' or 'right'. 
 ...
 ```

### 7. Avoid Directly Passing In CSS Classes: Use a Pattern API
  We should try to avoid passing in actual CSS class values from Drupal to PL whenever possible — this should really only be used as a last resort! Instead, we should focus on having each component be configurable via a simple set of options we provide. 

  Note: This will not only allow us to change / update CSS classes without requiring HTML or template changes but will probably keep the door open for evaluating how we actual use the templates we build. Ex. If we end up using a particular utility class on a component 90% of the time, perhaps we should change the default way a component is styled. Or at least provide an official option for setting that particular style without having to resort to using a utility class.
  
  ## DO 👍:
  ```
  {% include '@atoms/buttons/button.twig' with {
    button: {
      text: 'View Schedule',
      style: 'positive',
      width: 'full'
    }
  %}
  ```
  ## DON'T 👎:
  ```
  {% include '@atoms/buttons/button.twig' with {
    button: {
      text: 'View Schedule',
      attributes: {
        class: [
          'c-button--positive',
          'c-button--full'
        ]
      }
    }
  %}
  ```
  Note: this also includes passing in utility class overrides.
  

### 8. Template API Consistancy 
  When possible, we should try to reuse any API conventions we come up with for consistancy and efficiency using the templates we build. 
  
  As a practical example, if the icon component, `icon.twig`, accepts the `icon.name` and `icon.size` values by default, more complex components which include the icon component should accept icon-specific data in a similar format.
  
  Given the default button and icon templates:
  ```
  {% include '@atoms/buttons/button.twig' with {
    button: {
      text: 'View Schedule'
    }
  %}
  
  ...
  
  {% include '@atoms/icons/icon.twig' with {
    icon: {
      name: 'Calendar'
    }
  %}
  ```
  
  A button containing an icon should probably accept data structured this way:
  ```
  {% include '@atoms/buttons/button.twig' with {
    button: {
      text: 'View Schedule'
    },
    icon: {
      name: 'Calendar'
    }
  %}
  ```
  
  
  
### 9. Namespace / Scope Template Data Based On Component Name
  Because of #8 (Template API Consistancy), all Twig templates created should scope (ie. namespace) the data being passed along by nesting everything under the template-specific variable / namespace. This namespace is based after the name of the base template file itself, using snake_case instead of dashes if need be.
  
  Quite simple, if a template file was named `button.twig`, we should pass along data under the 'button' object. Or if the template filename was search-facets.twig, the data passed along would be under the `search_facets` (snake_case) object.
  
  Example 1:
  ```
  {% include '@atoms/buttons/button.twig' with {
    button: {
      ...
    }
  %}
  ```
  
  Example 2:
  ```
  {% include '@molecules/search-facets/search-facets.twig' with {
    search_facets: {
      ...
    }
  %}
  ```
  
### 10. Be Careful About Overriding / Updating Template Data (In Progress)
  Because of this nested, namespaced data, we need to be careful about overriding / extending templates that are already getting extended / overwritten in nested templates.
  
  Short version (for now till this is updated): we've added in a `deep_merge` Twig function in Pattern Lab to better allow patterns to internally handle getting included / extended several times over without having to hard code every original value that was passed along.
  
<!--  For example:
  If we wanted to add some classes on top of our default button.twig template (which already sets some default classes onto itself), we'd just pull the button template in and add the classes we wanted to add 
  {% set updated_button = {
    attributes: {
      class: ['js-fr-dialogmodal-open'],
      'aria-controls': modalUUID,
      type: 'button'
    }
  } %}

  {% set extended_button = deep_merge(updated_button, button) %}

  {% include "@atoms/buttons/button.v2.twig" with {
    button: extended_button
  } %} -->
  
  

  
### 11. Don't Hard-code Content in Twig Templates
  PegaKit Twig templates should **NOT** include hard-coded content inside the main Twig template, even if that content is just dummy content for PL. See #4



## Template Organization
### 12. Keep Template Logic Together
  When possible & practical, we should try to keep template logic and setup work (class manipulations, etc) all in a single place in our base Twig templates, before we actually render anything. __For example__:

    __First document template variables.__
    ```
    {#
    /**
     * @file
     * Theme suggestion for button component.
    * ...
    */
    #}
    ```

    __Then do any upfront prep work, pre-processing, etc.__
    ```
    {% set button_classes = [
        'c-button',
        '...'
    ] %}
    ```

    __And finally, render the markup with as little logic as possible.__
    ```
    <button{{ attributes.addClass(button_classes) }}>...</button>
    ```
    

### 13. Clear Distinction Between Base Templates vs Examples Using Base Templates
  When we want to include content in, say, a Pattern Lab page prototype, we should pass it in as JSON / YAML data (using the standard PL conventions) OR, if we'd need to extend / embed something for demo or example purposes, we should store the template doing the extending / embedding in a separate examples folder.

  ```
  _patterns
  └───01-atoms
      └───buttons
          │   button.twig
          |   ...
          └───examples
              │   request-a-demo.twig
              |   ...
  ```

### 14. Limit Nesting Templates Inside Extra Folders
  When organizing our Twig templates in Pattern Lab, we should try to minimize the number of  the number of folder levels  keep the number of folder levels a Twig template is organized in to an absolute minimum to shorten include paths. 
  
  3 levels deep seems to be around the max number of levels we should be aiming for.

  ```
  _patterns
  └───01-atoms // --> L1
      └───typography // --> L2
          └───headings // --> L3
              │   h1.twig
              │   h2.twig
              |   ...
  ```
  
### 15. Unique Templates = Separate Folder. Similar Templates = Shared Folder
  In general, try to organize each unique Twig template into its own standalone folder *unless* the template is part of a collection that should be maintained as a whole AND/OR the set of templates share a common related base that gets extended (ex. a `<button>` input and `<textarea>` input template that both extend a generic input base).


### 16. Don't Hard Code 'Vanilla' HTML
  As a general rule of thumb, we should try to avoid hard-coding vanilla HTML in *any* of our Twig templates and should default to using an include instead. This applies even if it's *just* a vanilla `<p>` tag or if we expect the markup we're writing to be WYSIWYG content. 
  
  We never know when we might need to globally manage a pierce of markup or when something might go from being a vanilla HTML tag to being something coming from a D8 Paragraph.


### 17. Twig File Names Should be Lowercase
  Make sure our Twig file names are always lowercase. Generally, we should try to only use single dashes to separate out the different words in a template name (our template file names shouldn't look like BEM classes). That said, we SHOULD separate out the different words in our file names to make things easier to read.

  ## DO 👍:
  ```
  button.twig
  my-awesome-button.twig
  systems-architect.twig
  ```
  ## DON'T 👎:
  ```
  Button.twig
  myAwesomeButton.twig
  my_awesome_buttom.twig
  myawesomebutton.twig
  ```

### 18. Don't Number Drupal-bound Twig Templates
  We should **avoid** the temptation to use number prefixes on the **base Twig templates** we're expecting to pull into Drupal. 
  
  Even though this Pattern Lab-specific feature is super convienent when we want to control how thing are reordered in Pattern Lab, this number prefix ends up getting included in the D8 Twig template path, potentially causing troubles down the road if / when the number convention we picked needs to get updated without the cooresponding Drupal updates.
  
  For example, we should name our templates `button.twig` and `button-primary.twig` vs `00-button.twig` or `01-button-primary.twig`
  

### 19. Avoid Using Pattern Lab 'Short' Names
  Twig templates being included / extended / embedded in Pattern Lab **MUST** spell out the full Twig path used. 
  
  Technically this isn't a requirement if the template this is used in isn't one of the 'base' component templates Drupal directly pulls in HOWEVER out of consistancy and just to play it safe, we should try to avoid using this pattern shortname in general (at least until we can have Drupal play nicely with this)
  
  **DO 👍: Works in Pattern Lab and Drupal (with the Components Module Enabled)**
  ```
  {% include '@atoms/buttons/button.twig' with {
    button: {
      text: 'View Schedule',
      style: 'positive',
      width: 'full'
    }
  %}
  ```
  **DON'T 👎: Only works in PL, broken in Drupal** 
  ```
  {% include "atoms-buttom" with {
    button: {
      text: 'View Schedule',
      style: 'positive',
      width: 'full'
    }
  %}
  ```

### 20. Use snake_case In Twig Templates
  Twig variable names should be snake case out of consistancy and to help simplify writing Twig template includes.  



## Resources
### Twig Resources:
- #### Drupal's official [Twig coding standards](https://www.drupal.org/docs/develop/coding-standards/twig-coding-standards) guide
  #### Sensio Lab's [Twig coding standards](http://twig.sensiolabs.org/doc/2.x/coding_standards.html)

### Research:
- [Drupal Component Libraries module](https://www.drupal.org/project/components)
- [Drupal UI Patterns module](https://www.drupal.org/project/ui_patterns)
- [Post: Using UI Patterns Module in a Components Based Drupal 8 Theme](http://www.aleksip.net/using-ui-patterns-module-in-a-component-based-drupal-8-theme)
- [Post: Introducing the UI Patterns module: use atomic UI components everywhere in Drupal 8](http://nuvole.org/blog/2017/jan/23/ui-patterns-module-re-use-ui-components-everywhere-in-drupal-8)
- [Video: Reducing Complexity with a Component API](https://www.youtube.com/watch?v=XNoX1FRZ8kE)
- [Post: A Maintainable Styleguide](http://engineering.lonelyplanet.com/2014/05/18/a-maintainable-styleguide.html)
- [Maintainable Pattern Libraries Presentation](https://speakerdeck.com/bermonpainter/maintainable-pattern-libraries): pages 25-35
- [Component API Strategy](https://github.com/kevinSuttle/component-api-strategy)

