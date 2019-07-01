# Button-group component testing steps

## Button-group component render as expected (functionally and visually)

The server-side pre-rendered `bolt-button-group` component should look almost identical to the client-side rendered version. To verify:

1. Disable javascript and view the [Button-group Demo page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-buttons-group-05-button-group/02-components-buttons-group-05-button-group.html).
2. Then, enable javascript and watch as the Button-group re-renders on the client-side.
3. The layout should not shift, e.g. the spacing and coloration of each button-group item should be identical before and after the web component re-renders.

# Button-group component functional testing steps

Functional testing should be performed manually by the QA team across the standard compliment of browsers. In each scenario, browser-type is specified when necessary. If browser type is not specified, the test applies to both "desktop" and "mobile" browsers.

## Feature: button-group

   In order to present buttons, and icon buttons, in groups of two or more
   As a UX designer, developer or content administrator
   I need to ensure the "bolt-button-group" component renders and functions as expected

## Scenario: icon button variations

1. Given I am viewing the [icon button variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-buttons-group-10-button-group-icon-only/02-components-buttons-group-10-button-group-icon-only.html).
2. Two icon buttons in a horizontal group.
3. The first is a colorful, round icon with a white 'x' in the center, and a faint shadow.
4. The second is a white, square icon with a black 'x' in the center, ans a faint shadow.

## Scenario: quantity variations

1. Given I am viewing the [quantity variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-buttons-group-15-button-group-quantity-variations/02-components-buttons-group-15-button-group-quantity-variations.html).
2. A header for '1 button(s)' and a single button example beneath it.
3. A header for '2 button(s)' and two buttons in a horizontal group beneath it.
4. A header for '3 button(s)' and three buttons in a horizontal group beneath it.
5. A header for '4 button(s)' and four buttons in a horizontal group beneath it.
6. A header for '5 button(s)' and five buttons in a horizontal group beneath it.

## Scenario: content item button variations

1. Given I am viewing the [content item button variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-buttons-group-20-button-group-contentItems/02-components-buttons-group-20-button-group-contentItems.html).
2. Two icon buttons in a horizontal group.
3. The first is a colorful, round icon with a white 'x' in the center, and a faint shadow.
4. The second is a white, square icon with a black 'x' in the center, ans a faint shadow.
5. Beneath the buttons is a text sample.
