# Ordered list testing steps

## Ordered list render as expected

- All elements added to items array are rendered in `bolt-ol` in the same order

  Testing URL: `pattern-lab/patterns/02-components-ordered-list-05-ordered-list/02-components-ordered-list-05-ordered-list.html`
  
- Nested elements of a list have correct numbers, every nesting has own counting from 1

  #### Example of nesting
  1 First level<br>
  2 First level<br>
  3 First level<br>
  &nbsp;&nbsp;&nbsp;&nbsp;1 Second level<br>
  &nbsp;&nbsp;&nbsp;&nbsp;2 Second level<br>
  &nbsp;&nbsp;&nbsp;&nbsp;3 Second level<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1 Third level<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2 Third level<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3 Third level<br>
  
  Testing URL: `pattern-lab/patterns/02-components-ordered-list-15-ordered-list-nested-items/02-components-ordered-list-15-ordered-list-nested-items.html`
  
- On darker background use white color
  
  Testing URL: `pattern-lab/patterns/02-components-ordered-list-10-ordered-list-theme-variation/02-components-ordered-list-10-ordered-list-theme-variation.html`
  
- Attributes passed to element are added to it
  
  Testing URL: `pattern-lab/patterns/02-components-ordered-list-05-ordered-list/02-components-ordered-list-05-ordered-list.html`

## Ordered list as web component render as expected

- All `bolt-li` tags added to `bolt-ol` tag are rendered in the same order
- Nested elements of a list have correct numbers, every nesting has own counting from 1
- On darker background use white color
- Attributes passed in `bolt-ol` are added to it

  Testing URL: `pattern-lab/patterns/02-components-ordered-list-20-ordered-list-with-web-component/02-components-ordered-list-20-ordered-list-with-web-component.html`
