# Breadcrumb testing steps

## Breadcrumb render as expected

- Component is rendered as `bolt-breadcrumb` with four text items seperated by a chevron (">"). The first three are inline links and the last one is the "Current Page".

  Testing URL: `pattern-lab/patterns/02-components-breadcrumb-05-breadcrumb/02-components-breadcrumb-05-breadcrumb.html`
  
- Breadcrumb's last item is a link that includes the attribute `aria-current`
  
  Testing URL: `pattern-lab/patterns/02-components-breadcrumb-10-breadcrumb-current-page-aria-variation/02-components-breadcrumb-10-breadcrumb-current-page-aria-variation.html`
  
- Attributes passed to element are added to it
  
  Testing URL: `pattern-lab/patterns/02-components-breadcrumb-05-breadcrumb/02-components-breadcrumb-05-breadcrumb.html`
  
## Icon as web component render as expected

- Component is rendered as `bolt-breadcrumb` with rendered text
- By adding `url` attribute we can add link to breadcrumb
- Attributes passed to element are added to it

  Testing URL: `pattern-lab/patterns/02-components-breadcrumb-10-breadcrumb-with-web-component/02-components-breadcrumb-10-breadcrumb-with-web-component.html`
