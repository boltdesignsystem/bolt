# Button component testing steps

## Button renders as expected (functionally and visually)

1. Visually, Twig pre-rendered buttons perform a one-time upgrade to being fully client-side rendered as expected (including the `<replace-with-children>` helper element automatically getting removed while retaining nested children / content):
  
- [ ] In JavaScript-only buttons being rendered to the Shadow DOM
- [ ] In JavaScript-only buttons being rendered to the Light DOM
- [ ] Twig-pre-rendered buttons being rendered to the Shadow DOM
- [ ] In Twig-pre-rendered buttons being rendered to the Light DOM (including older browsers + when all components are nested inside a  `<form>`)

2. Like all Bolt components, `<bolt-button>`  will always render to the Light DOM if initially placed inside a `<form>`  tag before booting up — even if the browser natively supports Shadow DOM.

```html
<form>
  <bolt-button>Light DOM inside a <code>&lt;form&gt;</code> tag</bolt-button>
</form>
```

3. Like all Bolt components, any individual `<bolt-button>`  can always be forced to render to the Light DOM (if a `no-shadow` attribute is added to the custom element tag.

```html
<bolt-button no-shadow>Light DOM via the <code>no-shadow</code> attribute</bolt-button>
```

4. `<bolt-button>` renders / re-renders as expected when moved around the page by external JS.

- [ ] In JavaScript-only buttons being rendered to the Shadow DOM
- [ ] In JavaScript-only buttons being rendered to the Light DOM
- [ ] In Twig-pre-rendered buttons being rendered to the Shadow DOM
- [ ] In Twig-pre-rendered buttons being rendered to the Light DOM (including older browsers + when all components are nested inside a  `<form>`)

## Responds to prop changes as expected

1. Changing the button color attribute in the browser (ex. `primary` to `secondary` triggers the component to visually re-render as expected (including the correct class names being used internally):

- [ ] In JavaScript-only buttons being rendered to the Shadow DOM
- [ ] In JavaScript-only buttons being rendered to the Light DOM
- [ ] In Twig-pre-rendered buttons being rendered to the Shadow DOM
- [ ] In Twig-pre-rendered buttons being rendered to the Light DOM (including older browsers + when all components are nested inside a  `<form>`)

## Event handlers work as expected		

1. `<bolt-button>` on-click events are properly attached and work as expected (ex. `<bolt-button>` will toggle the `<bolt-video>` component to start / stop to play when wired up correctly)

2. `<bolt-button>` on-click events are properly attached and work as expected when buttons are added to the page dynamically 

> For example,  a `<bolt-buttons>` that’s inside a nested card injected via Get Smart Content will respond to click events as expected.

3. `<bolt-button>` on-click events are properly detached from the page when the element is removed or moved around the page. 

> For example, this means that a previously attached button  with a click handler that is moved around the page (detached and then re-attached) would only fire a single event when interacted with (vs multiple events getting fired).

```html
<div class="o-bolt-grid">
  <div class="o-bolt-grid__item u-bolt-width-1/2 u-bolt-padding-medium js-first-grid-cell">
    <bolt-button class="js-button-theme-toggle">Toggle Theme</bolt-button>
  </div>

  <div class="o-bolt-grid__item u-bolt-width-1/2 u-bolt-padding-medium js-second-grid-cell">

  </div>
</div>


<script>

  // Fired every time the custom element has rendered.
  var buttonElement = document.querySelector('.js-button-theme-toggle');


  var firstGridCell = document.querySelector('.js-first-grid-cell');
  var secondGridCell = document.querySelector('.js-second-grid-cell');

  var elements = [
    firstGridCell,
    secondGridCell
  ];

  setInterval(function(){
    while (elements[0].childNodes.length > 0) {
      elements[1].appendChild(elements[0].childNodes[0]);
    }
    
    elements.reverse();
  }, 5000);


  var buttonEventAdded = false;
  var alreadyExistingButtonEvent = false;
  var clickEventAdded = false;
  var innerButtonElement;

  if (buttonElement._wasInitiallyRendered === true){
    if (innerButtonElement && alreadyExistingButtonEvent){
      console.log('was already rendered but an event already exists so using that.');
    } else {
      alreadyExistingButtonEvent = true;
      console.log('The button has already been rendered BUT the initially targeted element does not currently exist (likely due to the component re-rendering). Removing old event listener + re-adding an event listener to account for that.');
      buttonElement.removeEventListener('rendered', setupButtonClickEvent, false);
      buttonElement.addEventListener('rendered', setupButtonClickEvent, true);
    }
  } else {
    console.log('waiting for button to be initially rendered');
    alreadyExistingButtonEvent = true;
    buttonElement.addEventListener('rendered', setupButtonClickEvent);
  }

  function setupButtonClickEvent(){
    console.log('handle button click event');
    innerButtonElement = buttonElement.renderRoot.querySelector('button');

    if (clickEventAdded === true){
      clickEventAdded = false;
      console.log('button click event already added -- removing old click event');
      innerButtonElement.removeEventListener('click', buttonClicked, true);
    } else {
      console.log('button click event not yet added -- no need to remove old click event.');
    }

    clickEventAdded = true;
    innerButtonElement.addEventListener('click', buttonClicked, true);
  }

  function buttonClicked(){
    console.log('the button tag inside the rendered xdark bolt-button was clicked!');
    document.body.classList.toggle('t-bolt-xdark');
  }
</script>
```

## Slotted content renders as expected

1. Slotted content nested inside the`<bolt-button>` when initially booting up is placed inside the correct inner container (ex. `c-bolt-button__item` vs `c-bolt-button__icon`) if a slot attribute is used.

```html
<bolt-button>
  Button with slots
  <bolt-icon slot="after" name="chevron-right"></bolt-icon>
</bolt-button>
```

2. Slotted content nested inside the`<bolt-button>` when initially booting up is placed inside the default button slot (ex. `c-bolt-button__item`) if a slot attribute is not specified.

```html
<bolt-button>
  Button with icon inside default slot
  <bolt-icon name="chevron-right"></bolt-icon>
</bolt-button>
```

3. Every  `<bolt-button>` component that contains a top-level `<a>` or `<button>` HTML element inside (when initially booting up) will repurpose this existing element’s HTML attributes (minus any Bolt-specific CSS classes) when setting up the internally rendered button or link markup.

> Note: currently this also means that a nested link without an `href` attribute wouldn't automatically inherit the `url` prop from the parent.

```html
<bolt-button url="google.com">
  <a data-foo="bar">Hello world!</a>
</bolt-button>
```


