# Form component testing steps

## Form component render as expected (functionally and visually)

The server-side pre-rendered `bolt-form` component should look almost identical to the client-side rendered version. To verify:

1. Disable javascript and view the [Form Demo page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-form-10-form-element-demo-input-element/02-components-form-10-form-element-demo-input-element.html).
2. Then, enable javascript and watch as the Form re-renders on the client-side.
3. The layout should not shift, e.g. the input apperance and functionality should be identical before and after the web component re-renders.

# Form component functional testing steps

Functional testing should be performed manually by the QA team across the standard compliment of browsers. In each scenario, browser-type is specified when necessary. If browser type is not specified, the test applies to both "desktop" and "mobile" browsers.

## Feature: form

    In order to present a collection of fieldsets to create a form
    As a UX designer, developer or content administrator
    I need to ensure the "bolt-form" component renders and functions as expected

## Scenario: form input element

1. Given I am viewing the [form input element page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-form-10-form-element-demo-input-element/02-components-form-10-form-element-demo-input-element.html).
2. An input element that spans the entire horizontal screen view.
3. Placeholder text on the far left of the element that reads 'Enter a Title'.
4. On hover over the element the cursor will become a text cursor and the element will have a bottom box-shadow.
5. On focus the border will darken and the overhead text 'Title' will appear.
6. On focus text can be typed into the input.

## Scenario: form input element: disabled search variation

1. Given I am viewing the [disabled search variation page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-form-10-form-element-demo-input-element-disabled-search/02-components-form-10-form-element-demo-input-element-disabled-search.html).
2. A light grey input element that spans the entire horizontal screen view.
3. Placeholder text on the far left of the element that reads 'No searching allowed'.
4. On hover over the element the cursor will include a prohibition sign.
5. On the far right of the element is a magnifying glass icon.
6. Hovering over the icon will change the mouse cursor to a pointer.
7. The icon element will focus on click.

## Scenario: form input element: disabled element variation

1. Given I am viewing the [disabled element variation page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-form-10-form-element-demo-input-element-disabled/02-components-form-10-form-element-demo-input-element-disabled.html).
2. A light grey input element that spans the entire horizontal screen view.
3. Placeholder text on the far left of the element that reads 'Don't try to edit this'.
4. On hover over the element the cursor will include a prohibition sign.

## Scenario: form input element: email element variation

1. Given I am viewing the [email element variation page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-form-10-form-element-demo-input-element-email/02-components-form-10-form-element-demo-input-element-email.html).
2. An input element that spans the entire horizontal screen view.
3. Placeholder text on the far left of the element that reads 'Enter email address'.
4. On hover over the element the cursor will become a text cursor and the element will have a bottom box-shadow.
5. On focus the border will darken and the overhead text 'Email' will appear.
6. On focus text can be typed into the input.
7. Directly beneath the input element there is a line of text.

## Scenario: form input element: password element variation

1. Given I am viewing the [password element variation page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-form-10-form-element-demo-input-element-password/02-components-form-10-form-element-demo-input-element-password.html).
2. An input element that spans the entire horizontal screen view.
3. Placeholder text on the far left of the element that reads 'Enter Password'.
4. On hover over the element the cursor will become a text cursor and the element will have a bottom box-shadow.
5. On focus the border will darken and the overhead text 'Password' will appear.
6. On focus text can be typed into the input.
7. On the far right of the element is a Lastpass Icon.

## Scenario: form input element: search element variation

1. Given I am viewing the [search element variation page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-form-10-form-element-demo-input-element-search/02-components-form-10-form-element-demo-input-element-search.html).
2. An input element that spans the entire horizontal screen view.
3. Placeholder text on the far left of the element that reads 'Enter Search Terms'.
4. On hover over the element the cursor will become a text cursor and the element will have a bottom box-shadow.
5. On focus the border will darken and the overhead text 'Search' will appear.
6. On focus text can be typed into the input.
7. On the far right side of the element is a magnifying glass icon.
8. Hovering over the icon will change the mouse cursor to a pointer.
9. The icon element will focus on click.

## Scenario: form input element: server error variation

1. Given I am viewing the [server error variation page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-form-10-form-element-demo-input-element-server-errors/02-components-form-10-form-element-demo-input-element-server-errors.html).
2. A light red input element that spans the entire horizontal screen view with a red border.
3. Placeholder text on the far left of the element that reads 'Enter Username'.
4. On the far right of the element is red triangle icon with an exclemation point.
5. Directly below the element is a line of red text.
6. On hover over the element the cursor will become a text cursor and the element will have a bottom box-shadow.
7. On focus the background and border of the element will return to it's default colors.
8. On focus the overhead text 'Username' will appear.
9. On focus text can be typed into the input.

## Scenario: form radio button element

1. Given I am viewing the [radio button page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-form-20-form-element-demo-radio/02-components-form-20-form-element-demo-radio.html).
2. A single radio button element on the far left side of the screen view.
3. To the right of the radio button is a line of text that reads 'Single Radio'.
4. On hover over the element the cursor will become a pointer cursor and the button will have a box-shadow.
5. On click the button will be checked have a darker, inner circle to indicate it's checked state.

## Scenario: form radio button element: fieldset variation

1. Given I am viewing the [radio button fieldset variation page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-form-25-form-element-demo-radio-fieldset/02-components-form-25-form-element-demo-radio-fieldset.html).
2. A header at the top far left that reads 'SELECT AN ALIGNMENT'.
3. A vertical list of three radio buttons on the far left of the screen view.
4. On hover over each element the cursor will become a pointer cursor and the button will have a box-shadow.
5. On click the button will be checked and have a darker, inner circle to indicate it's checked state.
6. On click if any other button is checked, that element will uncheck, and the current element will be checked.

## Scenario: form checkbox element

1. Given I am viewing the [checkbox page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-form-30-form-element-demo-checkbox/02-components-form-30-form-element-demo-checkbox.html).
2. A single checkbox element on the far left side of the screen view.
3. To the right of the checkbox is a line of text that reads 'I accept the terms and conditions'.
4. On hover over the element the cursor will become a pointer cursor and the checkbox will have a box-shadow.
5. On click the checkbox will be checked and have a checkmark icon to indicate it's checked state.

## Scenario: form checkbox element: fieldset variation

1. Given I am viewing the [checkbox fieldset variation page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-form-35-form-element-demo-checkbox-fieldset/02-components-form-35-form-element-demo-checkbox-fieldset.html).
2. A header at the top far left that reads 'SELECT TOPPINGS'.
3. Red text beneath header indicating the position of server errors if there were any.
4. Text line beneath red text indicating that two or more checkboxes may be selected.
5. A vertical list of four checkboxes.
6. On hover over each element the cursor will become a pointer cursor and the checkbox will have a box-shadow.
7. On click the checkbox will be checked and have a checkmark icon to indicate it's checked state.

## Scenario: form selection list element

1. Given I am viewing the [selection list page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-form-40-form-element-demo-select/02-components-form-40-form-element-demo-select.html).
2. An input element that spans the entire horizontal screen view.
3. Placeholder text on the far left of the element that reads '-Select an option-'.
4. On hover over the element the cursor will become a pointer cursor and the element will have a bottom box-shadow.
5. On focus the border will darken and the overhead text 'Select' will appear.
6. On click a dark grey pop-up modal will appear with a list of two options.
7. On click of either option the modal will close and the placeholder text will change to reflect the choice.
8. On the far right side of the element is a down facing arrow icon.

## Scenario: form textarea element

1. Given I am viewing the [textarea page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-form-50-form-element-demo-textarea/02-components-form-50-form-element-demo-textarea.html).
2. A textarea element that spans the entire horizontal screen view.
3. Placeholder text on the far left side of the element that reads 'Describe the job'.
4. On hover over the element the cursor will become a text cursor and the element will have a bottom box-shadow.
5. On focus the border will darken and the overhead text 'Job description' will appear.
6. On focus text can be typed into the textarea.
7. On the bottom, far right side of the textarea are two angled lines that indicate the element can be resized.

## Scenario: form: campaign landing

1. Given I am viewing the [campaign landing page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-form-60-form-full-campaign-landing/02-components-form-60-form-full-campaign-landing.html).
2. A combination of input, sections, and button elements to create a full form layout that spans the length of the screen view.
3. A header at the top far left that reads 'Get the Report'.
4. Beneath the header is a line of text indicating that each field is required to be filled.
5. There are five input elements stacked vertically.
6. Each input element has placeholder text on the far left side.
7. On hover over each input a tooltip will appear above the cursor with the text 'please fill out this field'.
8. On hover over each input the cursor will become a text cursor and the input will have a bottom box-shadow.
9. On focus over each input the border will darken and overhead text will appear.
10. On focus text can be typed into each input.
11. If focusing off an input without typing valid text it will appear with a red background and border, warning text, and warning icon.
12. Beneath the inputs is a selection list element.
13. On click of selection list a dark grey modal will appear with a list of options.
14. On click of one of the selection items the modal will disappear and the placeholder text of the selection list will reflect this choice.
15. Beneath the selection list is a checkbox with a text line to the right of it promting a subscription.
16. On click of checkbox a checkmark icon will appear to indicate it's checked state.
17. At the bottom of the form layout is a button with the download icon and text.
18. On hover of the button it's color will lighten and the button will lift slightly of the page.
19. On click the form will open inline validation bubbles for any invalid inputs.

## Scenario: form cards: theme variations

`// This is a purely visual test, use VRT`
