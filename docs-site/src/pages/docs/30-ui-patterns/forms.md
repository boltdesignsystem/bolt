---
title: Forms
---

Forms are used to submit data to the system. Common examples include event or site registration, contact forms, or search interfaces. 

For a complete accounting of form elements, see the [Bolt forms examples in Pattern Lab](/pattern-lab/?p=viewall-components-form). 

## Best practices

An effective form is easy to understand and fill out, doesn’t ask for more information than needed, and makes it clear what the next action is. In addition to these considerations, follow the guidelines below to successfully create forms:

### Use the right element for the job

Checkboxes should be used if someone can select multiple options from a list. If the list has more than 7 options, use a multi-select drop-down instead. Radio buttons are used when only one option can be chosen from a list. If the list has only 2 options, use a toggle instead. 

### Help people diagnose and recover from errors

Keep error messages specific, concise, and adjacent to the field they pertain to. Provide adequate helper text and field labels to make the purpose and guidelines for form elements clear. When writing error messages, maintain a polite and helpful tone. Never blame the user for an error.

### Don’t ask for more info than you need

When designing a form, aim to be as concise as possible. Ensure that each piece of information you are asking for is either necessary to qualify a lead or to complete the task successfully. Removing unnecessary fields is [one way to increase conversions](https://conversionxl.com/blog/reduce-form-fields/). 

## Form Elements

All form elements include a Dark Blue focus state, usually as a 1px outline, along with a slight drop shadow. When inputting text, the label appears at the top of the form field to provide context. Some other helpful considerations: 

- label text should be short, direct and in sentence case
- avoid colons at the end of labels
- labels should be associated with form fields using the `for` attribute
- if you do ask for optional information, mark the labels of optional fields with ‘(optional)’
- don’t mark mandatory fields with asterisks

Below are the most common elements and their considerations.

### Text inputs

Use a text input for a single line of text that doesn’t require formatting. Input data displays as plain text. Example uses include asking for names or inputting the title of a post.

<figure>
<iframe src="/pattern-lab/patterns/02-components-form-form-element-demo-input-element/02-components-form-form-element-demo-input-element.html" frameborder="0" width="100%"></iframe>
<figcaption>A static input contains helper text within the field.</figcaption>
</figure>

<figure>
<img src="/images/docs/forms-text-input-focus.png" />
<figcaption>On focus, the field label moves to the top of the input.</figcaption>
</figure>

### Textareas

Use a textarea for longer passages of text, such as blog posts, descriptions or comments. Textareas generally support WYSIWYG editors, in-line images and standard formatting such as bold or italic text.

<figure>
<iframe src="/pattern-lab/patterns/02-components-form-form-element-demo-textarea/02-components-form-form-element-demo-textarea.html" frameborder="0" width="100%"></iframe>
<figcaption>Static input</figcaption>
</figure>

<figure>
<img src="/images/docs/forms-textarea-focused.png" />
<figcaption>Focused input</figcaption>
</figure>

### Checkboxes and Radio buttons

Use checkboxes and radio buttons to allow people to select from a predetermined list. If more than 7 items exist in the list, use a Select element instead. 

<figure><img src="/images/docs/forms-checkbox.png" /><figcaption>Checkboxes allow people to select more than one item.</figcaption></figure><figure><img src="/images/docs/forms-radio.png" /><figcaption>Use radio buttons when only one item should be selected.</figcaption></figure>

### Select Lists

Use a select list whenever you have a list longer than 7 items to choose from. Bolt does not currently support multi-select lists.

<figure>
<img src="/images/docs/forms-select.png" />
<figcaption>Select lists allow users to pick from a predetermined list of options.</figcaption>
</figure>

## Disabled states

When disabled, form fields take on the `xlight` color as their background and lose the ability to interact with it.

<figure>
<iframe src="/pattern-lab/patterns/02-components-form-form-element-demo-input-element-disabled/02-components-form-form-element-demo-input-element-disabled.html" frameborder="0" width="100%"></iframe>
<figcaption>Form fields that are disabled take on a light background.</figcaption>
</figure>

## Validation

Effective form validation is critical to helping people identify and recover from errors. As a general best practice, we recommend validating text fields prior to form submission, after the user leaves the field. Error messages should appear inline with the field, to call attention to what needs to be fixed.

<figure>
<img src="/images/docs/forms-text-input-error.png" />
<figcaption>Form errors should be placed next to the field that needs correction. The field takes on a red border and background.</figcaption>
</figure>

When writing error messages and other interface copy, focus on being concise, clear, and grammatically correct. Avoid jargon and abbreviations wherever possible, and never blame the user for the error. 

A good error message gives someone an immediate sense of what the problem is, followed by concise instruction on how to correct it. See the examples below for guidelines: 

| **Good**                                                         | **Bad**                                                           |
| ---------------------------------------------------------------- | ----------------------------------------------------------------- |
| The username you entered is already taken.                       | Username already exists                                           |
| That doesn’t appear to be a valid email address.                 | You entered an invalid email address.                             |
| Those passwords don’t match.                                     | Passwords must match                                              |
| We can't find that email/password combination. Please try again. | You have either been locked out, or your credentials don’t match. |


