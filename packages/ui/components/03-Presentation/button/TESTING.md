# Button component developer testing steps

## Button renders as expected (functionally and visually)

1. Visually, Twig pre-rendered buttons perform a one-time upgrade to being fully client-side rendered as expected (including the `<replace-with-children>` helper element automatically getting removed while retaining nested children / content):

- [ ] In JavaScript-only buttons being rendered to the Shadow DOM
- [ ] In JavaScript-only buttons being rendered to the Light DOM
- [ ] Twig-pre-rendered buttons being rendered to the Shadow DOM
- [ ] In Twig-pre-rendered buttons being rendered to the Light DOM (including older browsers + when all components are nested inside a `<form>`)

2. Like all Bolt components, `<bolt-button>` will always render to the Light DOM if initially placed inside a `<form>` tag before booting up — even if the browser natively supports Shadow DOM.

```html
<form>
  <bolt-button>Light DOM inside a <code>&lt;form&gt;</code> tag</bolt-button>
</form>
```

3. Like all Bolt components, any individual `<bolt-button>` can always be forced to render to the Light DOM if a `no-shadow` attribute is added to the custom element tag.

```html
<bolt-button no-shadow
  >Light DOM via the <code>no-shadow</code> attribute</bolt-button
>
```

4. `<bolt-button>` renders / re-renders as expected when moved around the page by external JS.

- [ ] In JavaScript-only buttons being rendered to the Shadow DOM
- [ ] In JavaScript-only buttons being rendered to the Light DOM
- [ ] In Twig-pre-rendered buttons being rendered to the Shadow DOM
- [ ] In Twig-pre-rendered buttons being rendered to the Light DOM (including older browsers + when all components are nested inside a `<form>`)

## Responds to prop changes as expected

1. Changing the button `color` attribute in the browser (ex. `primary` to `secondary`) triggers the component to visually re-render as expected (including the correct class names being used internally):

- [ ] In JavaScript-only buttons being rendered to the Shadow DOM
- [ ] In JavaScript-only buttons being rendered to the Light DOM
- [ ] In Twig-pre-rendered buttons being rendered to the Shadow DOM
- [ ] In Twig-pre-rendered buttons being rendered to the Light DOM (including older browsers + when all components are nested inside a `<form>`)

## Event handlers work as expected

1. `<bolt-button>` on-click events are properly attached and work as expected (ex. `<bolt-button>` will toggle the `<bolt-video>` component to start / stop to play when wired up correctly).

2. `<bolt-button>` on-click events are properly attached and work as expected when buttons are added to the page dynamically.

> For example, a `<bolt-buttons>` that’s inside a nested card injected via Get Smart Content will respond to click events as expected.

3. `<bolt-button>` on-click events are properly detached from the page when the element is removed or moved around the page.

> For example, this means that a previously attached button with a click handler that is moved around the page (detached and then re-attached) would only fire a single event when interacted with (vs multiple events getting fired).

```html
<div class="o-bolt-grid">
  <div
    class="o-bolt-grid__item u-bolt-width-1/2 u-bolt-padding-medium js-first-grid-cell"
  >
    <bolt-button class="js-button-theme-toggle">Toggle Theme</bolt-button>
  </div>

  <div
    class="o-bolt-grid__item u-bolt-width-1/2 u-bolt-padding-medium js-second-grid-cell"
  ></div>
</div>

<script>
  // Fired every time the custom element has rendered.
  var buttonElement = document.querySelector('.js-button-theme-toggle');

  var firstGridCell = document.querySelector('.js-first-grid-cell');
  var secondGridCell = document.querySelector('.js-second-grid-cell');

  var elements = [firstGridCell, secondGridCell];

  setInterval(function() {
    while (elements[0].childNodes.length > 0) {
      elements[1].appendChild(elements[0].childNodes[0]);
    }

    elements.reverse();
  }, 5000);

  var buttonEventAdded = false;
  var alreadyExistingButtonEvent = false;
  var clickEventAdded = false;
  var innerButtonElement;

  if (buttonElement._wasInitiallyRendered === true) {
    if (innerButtonElement && alreadyExistingButtonEvent) {
      console.log(
        'was already rendered but an event already exists so using that.',
      );
    } else {
      alreadyExistingButtonEvent = true;
      console.log(
        'The button has already been rendered BUT the initially targeted element does not currently exist (likely due to the component re-rendering). Removing old event listener + re-adding an event listener to account for that.',
      );
      buttonElement.removeEventListener(
        'rendered',
        setupButtonClickEvent,
        false,
      );
      buttonElement.addEventListener('rendered', setupButtonClickEvent, true);
    }
  } else {
    console.log('waiting for button to be initially rendered');
    alreadyExistingButtonEvent = true;
    buttonElement.addEventListener('rendered', setupButtonClickEvent);
  }

  function setupButtonClickEvent() {
    console.log('handle button click event');
    innerButtonElement = buttonElement.renderRoot.querySelector('button');

    if (clickEventAdded === true) {
      clickEventAdded = false;
      console.log(
        'button click event already added -- removing old click event',
      );
      innerButtonElement.removeEventListener('click', buttonClicked, true);
    } else {
      console.log(
        'button click event not yet added -- no need to remove old click event.',
      );
    }

    clickEventAdded = true;
    innerButtonElement.addEventListener('click', buttonClicked, true);
  }

  function buttonClicked() {
    console.log(
      'the button tag inside the rendered xdark bolt-button was clicked!',
    );
    document.body.classList.toggle('t-bolt-xdark');
  }
</script>
```

## Slotted content renders as expected

1. Slotted content nested inside the `<bolt-button>` when initially booting up is placed inside the correct inner container (ex. `c-bolt-button__item` vs `c-bolt-button__icon`) if a slot attribute is used.

```html
<bolt-button>
  Button with slots
  <bolt-icon slot="after" name="chevron-right"></bolt-icon>
</bolt-button>
```

2. Slotted content nested inside the `<bolt-button>` when initially booting up is placed inside the default button slot (ex. `c-bolt-button__item`) if a slot attribute is not specified.

```html
<bolt-button>
  Button with icon inside default slot
  <bolt-icon name="chevron-right"></bolt-icon>
</bolt-button>
```

3. Every `<bolt-button>` component that contains a top-level `<a>` or `<button>` HTML element inside (when initially booting up) will repurpose this existing element’s HTML attributes (minus any Bolt-specific CSS classes) when setting up the internally rendered button or link markup.

> Note: currently this also means that a nested link without an `href` attribute wouldn't automatically inherit the `url` prop from the parent.

```html
<bolt-button url="google.com"> <a data-foo="bar">Hello world!</a> </bolt-button>
```

---

---

# Button component functional testing steps

Functional testing should be performed manually by the QA team across the standard compliment of browsers. Instructions are divided into desktop and mobile browser categories. If browser type is not specified, the test applies to both browser types.

## Feature: Button

    In order to communicate a call-to-action on a Pega web property appropriate to the placement context
    As a UX designer, developer or content administrator
    I need to ensure the "bolt-button" component renders and functions as expected

## Scenario: Component page performance in desktop browser

1. Given I am using a "desktop" browser
1. And I am viewing the URL "[https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-button/index.html](https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-button/index.html)"
1. Then I should see the text "Bolt Button"
1. When I refresh the page
1. And I immediately begin clicking the scroll bar at the side of the browser
1. Then the page should scroll smoothly with less than "1" second of delay
   ![Scroll-bar check](images/performance.png)

## Scenario: Component page performance in mobile browser

1. Given I am using a "mobile" browser
1. And I am viewing the URL "[https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-button/index.html](https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-button/index.html)"
1. Then I should see the text "Bolt Button"
1. When I refresh the page
1. And I immediately begin swiping up to scroll the page
1. Then the page should scroll smoothly with less than "1" second of delay

## Scenario: Button Border Radii

`// This is a purely visual test, use VRT`

## Scenario: Button Sizes

`// This is a purely visual test, use VRT`

## Scenario: Button Styles

![Button styles, desktop](images/button_styles.png)

    // Note: Interaction mode varies between desktop and mobile.
    // For mobile hover, tap and hold.
    // Mobile devices have no cursor.

1. Given I am viewing the URL "[https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-button/index.html](https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-button/index.html)"
1. And I am looking at the page section "Button Styles"
1. Then I should see the text "Primary Button States"
1. And I should see a group of "5" buttons
1. When I interact with the buttons
1. Then I should see
1. | button text       | background color | text color | shadow/no-hover | moves/hover | shadow/hover | cursor      |
   | ----------------- | ---------------- | ---------- | --------------- | ----------- | ------------ | ----------- |
   | Button (Default)  | indigo           | white      | very slight     | slightly up | larger       | pointer     |
   | Button (Disabled) | cool light gray  | cool gray  | very slight     | no          | no change    | not allowed |
   | Button (Hover)    | light indigo     | white      | large           | no          | no change    | pointer     |
   | Button (Focus)    | dark indigo      | white      | very slight     | slightly up | larger       | pointer     |
   | Button (Active)   | darker indigo    | white      | very slight     | slightly up | larger       | pointer     |

1. And I should see the text "Secondary Button States"
1. And I should see a group of "5" buttons
1. When I interact with the buttons
1. Then I should see
1. | button text       | background color     | text color     | shadow/no-hover | moves/hover | shadow/hover | cursor      |
   | ----------------- | -------------------- | -------------- | --------------- | ----------- | ------------ | ----------- |
   | Button (Default)  | white                | very dark gray | very slight     | slightly up | larger       | pointer     |
   | Button (Disabled) | cool light gray      | cool gray      | very slight     | no          | no change    | not allowed |
   | Button (Hover)    | white                | very dark gray | large           | no          | no change    | pointer     |
   | Button (Focus)    | very light warm gray | very dark gray | very slight     | slightly up | larger       | pointer     |
   | Button (Active)   | light warm gray      | very dark gray | very slight     | slightly up | larger       | pointer     |
1. And I should see the text "Text Button States"
1. And I should see a group of "5" buttons
1. When I interact with the buttons
1. Then I should see
1. | button text       | background color | text color | text color/hover | cursor      |
   | ----------------- | ---------------- | ---------- | ---------------- | ----------- |
   | Button (Default)  | transparent      | indigo     | lighter indigo   | pointer     |
   | Button (Disabled) | cool light gray  | cool gray  | no change        | not allowed |
   | Button (Hover)    | transparent      | indigo     | lighter indigo   | pointer     |
   | Button (Focus)    | transparent      | indigo     | lighter indigo   | pointer     |
   | Button (Active)   | transparent      | indigo     | lighter indigo   | pointer     |

## Scenario: Button Themes

    // This is a purely visual test, use VRT.

## Scenario: Button Widths in desktop browser

![Button Widths](images/button_widths.png)

1. Given I am using a "desktop" browser
1. And I am viewing the URL "[https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-button/index.html](https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-button/index.html)"
1. And I am looking at the page section "Button Widths"
1. Then I should see the button "Example full Button"
1. And the button should have a "full screen" button width
1. And I should see the button "Example full@small Button"
1. And the button should have a "full screen" button width

## Scenario: Button Widths in mobile browser

![Button Widths, mobile](images/button_widths_mobile.png)

1. Given I am using a "mobile" browser
1. And I am viewing the URL "[https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-button/index.html](https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-button/index.html)"
1. And I am looking at the page section "Button Widths"
1. Then I should see the button "Example full Button"
1. And the button should have a "full screen" button width
1. And I should see the button "Example full@small Button"
1. And the button should have a "normal" button width

## Scenario: Button Tags

![Button Tags](images/button_tags.png)

    // Note: Interaction mode varies between desktop and mobile.
    // For mobile hover, tap and hold.
    // Mobile devices have no cursor.

1. Given I am viewing the URL "[https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-button/index.html](https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-button/index.html)"
1. And I am looking at the page section "Button Tags"
1. When I interact with the buttons
1. Then the background color of all the buttons should be the same
1. And the text color of all the buttons should be the same
1. And the shadow of all the buttons should be the same
1. And the cursor of all the buttons should be the same

## Scenario: Button Align Items

    // This is a purely visual test, use VRT.

## Scenario: Button Transform

    // This is a purely visual test, use VRT.

## Scenario: Button With Icon

    // This is a purely visual test, use VRT.

## Scenario: Button With Icon

    // This is a purely visual test, use VRT.

## Scenario: Custom Element Buttons

![Custom Element Buttons](images/button_custom.png)

    // Note: Interaction mode varies between desktop and mobile.
    // For mobile hover, tap and hold.
    // Mobile devices have no cursor.

1. Given I am viewing the URL "[https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-button/index.html](https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-button/index.html)"
1. And I am looking at the page section "Custom Element Buttons"
1. When I interact with the buttons
1. Then I should see
1. | button text                | background color | text color     | shadow/no-hover | moves/hover | shadow/hover | cursor      |
   | -------------------------- | ---------------- | -------------- | --------------- | ----------- | ------------ | ----------- |
   | Simple primary button      | indigo           | white          | very slight     | slightly up | larger       | pointer     |
   | Simple secondary button    | white            | very dark gray | very slight     | slightly up | larger       | pointer     |
   | Simple text button         | transparent      | indigo         | none            | no          | none         | pointer     |
   | Simple primary button-link | indigo           | white          | very slight     | slightly up | larger       | pointer     |
   | Secondary disabled         | cool light gray  | cool gray      | very slight     | no          | no change    | not allowed |
1. And I should see the button "Button with 1 slotted icon"
1. And the button's background color should be "indigo"
1. And the button's text color should be "white"
1. And the button should have a "left arrow" icon
1. And the "left arrow" icon should be to the "left" of the button's text
1. And I should see a "very slight" shadow on the button
1. When I mouse over the button "Button with 1 slotted icon"
1. Then the cursor should change to "pointer"
1. And the button should move vertically slightly
1. And the button's shadow should get larger
1. And I should see the button "Button with 2 slotted icons"
1. And the button's background color should be "indigo"
1. And the button's text color should be "white"
1. And the button should have a "left arrow" icon
1. And the "left arrow" icon should be to the "left" of the button's text
1. And the button should have a "right chevron" icon
1. And the "right chevron" icon should be to the "right" of the button's text
1. And I should see a "very slight" shadow on the button
1. When I mouse over the button "Button with 2 slotted icons"
1. Then the cursor should change to "pointer"
1. And the button should move vertically slightly
1. And the button's shadow should get larger

## Scenario: Button With 3rd Party Js

![Toggled state of button](images/button_js.png)

1. Given I am viewing the URL "[https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-button/index.html](https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-button/index.html)"
1. And I am looking at the page section "Button With 3rd Party Js"
1. Then I should see the button "XDark Button w/ External JS Example"
1. And the background color of the button should be "indigo"
1. When I click or tap the button "XDark Button w/ External JS Example"
1. Then the background color of the page should be "dark royal blue"
1. And the background color of the button should be "gold"
1. When I click or tap the button "XDark Button w/ External JS Example"
1. Then the background color of the page should be "white"
1. And the background color of the button should be "indigo"
