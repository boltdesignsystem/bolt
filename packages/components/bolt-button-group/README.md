Button-group can contain multiple buttons. Part of the Bolt “Components” CSS framework that powers the [Bolt Design System](https://www.boltdesignsystem.com).

###### Install via NPM

```
npm install @bolt/components-button-group
```

## Description

Button groups are a  horizontal set of actions with a hierarchy that defines the spacing and their relationship between each other. This set of actions help people under stand their options with potential next steps.

Button padding left is 1rem when there are multiple buttons in a horizontal row.

## Dos

* Follow the button component guidelnes
* Separate buttons by 1rem
* Make sure the CTAs have a relationship with each other. If they don't reevaluate the content structure.
* Be sure to consider the horizontal group of actions in smaller, less optimal sizes.
* Be sure to determine the hierarchy of the CTAs in the group. These patterns are good:
  * Primary + secondary + text button
  * Secondary + text button
  * Primary + text button

## Don'ts

* Don't have multiple primary buttons grouped together
* Don't have LESS than 1rem separating buttons
* Don't have MORE than 1rem separating buttons
* Don't have CTAs grouped together that do not relate to one another.

NOTE: We currently do not have joined buttons (eg, no gap, single button with two sides), but this is something to consider moving forward.
