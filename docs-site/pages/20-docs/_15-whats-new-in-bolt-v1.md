---
title: What’s New in Bolt 1.x?
---

- Docs Improvements
- Code Improvements
- Testing Coverage
- Brand New `@bolt/build-tools`, CLI Tool
- Component Schemas
- Continuous Integration & Publishing Improvements
- Twig Templates & Drupal Integration
- Source of Truth Separate from `Apps`

<hr>

## Docs Improvements
- Brand new [Bolt site](https://boltdesignsystem.com)!
- [Quick Start Guide](/docs/guides/quick-start-guide.html) now available
- Pattern Lab Docs Reinvented
  - Component-specific docs now baked into Pattern Lab, powered by the component’s `README.md`
  - Edit Markdown docs in Github directly from Pattern Lab

<br>

## Code Improvements
### Package Consolidation
- Many many many packages merged together: went from around ~130 packages down to around 50
	* Polyfill loader now targets features more closely

### New and updated components:
- Refactored navbar / nav / navlink
- Dropdown
- Tooltip
- Share
- Video component refactored: options for autoplay, loop and hiding controls now added
- Major refactor of the Image component
- Band, button, device viewer, dropdown, nav, navlink, and ratio object components now all powered by the same internal base component class
- Forms

 ### New utility classes
- Opacity
- Display
- Height
- z-index
- Box Shadow 

### New Twig extensions added
- Schema validate function (see Schemas)
- Assets (inline and reference assets from Webpack)
- `console_log` 
- Bolt maninfest

### Major Refactor of Twig Extensions 
- Broken out into separate Bolt Core PHP package
- Twig extensions broken down into PHP Classes
- Pick and choose twig extensions (including overriding) in PL

### Bolt Data
- Global Bolt data is now console logged for debugging
- `get_data` Twig extension added
 
<br>

## Testing Coverage
- 1st set of PHP unit tests added for Bolt Core PHP
- End to End Integration Tests
- Linting v2: starting to programmatically enforce coding standards
- New publishing preflight check for Lerna

<br>

## Build Tools, Setup and Bolt CLI
- Significantly faster setup, compile, and build times
- Bolt CLI much less noisy by default; global verbosity setting now available
- No more pre-built Bolt CSS and JS — DIY builds with Bolt Build Tools
- Moved from npm to Yarn

<br>

## Component Schemas
- Yaml Schemas + schema validation
- Component defaults and available options now starting to get powered by schema data (button component already using this!)
- Demos in PL showing component variations are now based on component schemas
- Validate schema extension added, allowing for Twig templates to be validated regardless on the backend implementation (currently a PL feature)

<br>

## Continuous Integration & Publishing Improvements
- Bolt Bot with Netlify URL
- Faster Travis build times
- Publishing workflow adjusted: release/1.x branch
- Drupal Lab staged instance (coming soon)

<br>

## Twig Templates & Drupal Integration
- Twig template paths have a new `@bolt-components-button/file-name.twig` path aunts 
- Bolt Connect module released

<br>

## Source of Truth Separate from `Apps`
- Static site generator (similar to Jekyll) powered by Twig, Node and Bolt Components
- Drupal Lab
- Decoupled Pattern Lab from Components
  - Components now live on their own. 
	- Pattern Lab pulls in components the exact same way as 



  
