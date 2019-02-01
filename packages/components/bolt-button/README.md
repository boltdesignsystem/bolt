Button is a branded component to convey call to action. Part of the Bolt “Components” CSS framework that powers the [Bolt Design System](https://www.boltdesignsystem.com).

###### Install via NPM

```
npm install @bolt/components-button
```

## Description

Buttons are the core of our action components. Their affordance is immediate and can be use for most actions and allow users to access the target with a single interaction. Buttons clearly provide a next step for the user.

Our Buttons depend on the theme they are contained in and change in appearance based on said theme. The themes and button colors were designed together to ensure the proper amount affordance and clarity.

### Xlight and light themes

- Primary: Light Indigo container with white text
- Secondary: white button with indigo text
- Text button: Light indigo text with chevron

### Dark and xdark themes

- Primary: Yellow container with default indigo text
- Secondary: white button with indigo text
- Text button: white text with chevron

* Currently only have one defined size (though other options can and will be defined in the future)
* Can be 100% width of the wrapper for mobile or card instances
* Can optionally be 100% width. For example, the button has default width of 2 rem on either side on larger screens but full width on smaller screens

## Dos

* CTAs must be clearly and succinctly labeled with a next step
* CTA should lead with strong action verbs
* The primary CTA should be the most important action.
* Be consistent in placement based on the screen size and device
* Fall back to the text button in secondary and tertiary content areas where you can. For example, cards with a button use the text style so that a filled button doesn't become overwhelming and redundant.
* Follow theming rules

## Don'ts

* Don't clutter the page with too many buttons
* Don't mix and match themes and their button colors. For example, do not use the indigo button on dark and xdark themes as the indigo button does not stand out enough.
* Don't mix and match colors outside the theme, see button groups.
