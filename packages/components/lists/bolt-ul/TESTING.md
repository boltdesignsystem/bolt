# Unordered list testing steps

## Unordered list render as expected

- All elements added to items array are rendered in `bolt-ul` in the same order

  Testing URL: `pattern-lab/patterns/02-components-unordered-list-05-unordered-list/02-components-unordered-list-05-unordered-list.html`
  
- Nested elements of a list have correct bullets type like on example below

  ##### Example of nesting when JS is disabled
  &bull; First level<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&cir; Second level<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&FilledSmallSquare; Third level<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&FilledSmallSquare; All subsequent nestings
        
  ##### Example nesting when JS is enabled
  &bull; First level<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&cir; Second level<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&FilledSmallSquare; Third level<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&bull; Fourth level<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&cir; Fifth level<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&FilledSmallSquare; Sixth level<br>
  
  Note: Those three symbols are repeated in every three nestings.\
  Note 2: Symbols are not changing when `ol` is inside `ul` 
  
  Testing URL: `pattern-lab/patterns/02-components-unordered-list-15-unordered-list-nested-items/02-components-unordered-list-15-unordered-list-nested-items.html`
  
- On darker background use white color

  Testing URL: `pattern-lab/patterns/02-components-unordered-list-10-unordered-list-theme-variation/02-components-unordered-list-10-unordered-list-theme-variation.html`
  
- Attributes passed to element are added to it

  Testing URL: `pattern-lab/patterns/02-components-unordered-list-05-unordered-list/02-components-unordered-list-05-unordered-list.html`

## Unordered list as web component render as expected

- All `bolt-li` tags added to `bolt-ul` tag are rendered in the same order
- Nested elements of a list have correct numbers, every nesting has own counting from 1
- On darker background use white color
- Attributes passed in `bolt-ul` are added to it

  Testing URL: `pattern-lab/patterns/02-components-unordered-list-20-unordered-list-with-web-component/02-components-unordered-list-20-unordered-list-with-web-component.html`
