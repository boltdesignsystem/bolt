---
title: Road Runner Rules
---

Follow these [Road Runner](http://mentalfloss.com/article/62035/chuck-jones-rules-writing-road-runner-cartoons) Rules to use Bolt effectively:

1. Avoid writing new CSS
2. DON'T write CSS that contains the word "bolt"
3. DON'T write markup that contains c-bolt-* CSS classes
4. DO write markup that contains u-bolt-* and o-bolt-* CSS classes
5. Add a class prefixed with js- when binding javascript to an element


1. **Avoid writing new CSS**
Simply put, most CSS needed to build a new page based on the design system has already been written.

If you're writing CSS, you're most likely duplicating existing work, which will both take longer and lead to inconsistency.  Instead, focus your effort on finding existing solutions and placing markup on the page to pull in existing CSS.  

2. **Don't write CSS that contains the word "bolt"**
If you do write new CSS outside of Bolt, the presence of the bolt namespace in your classes probably means one of two things:

- You're trying to modify the styling of a Bolt component to do something it doesn't support.  Avoid this if at all possible – it will create design inconsistency, and component classes and markup could change without warning (Bolt doesn't consider such changes breaking).
- You've "forked" a Bolt component by copying its CSS verbatim and then modifying it to suit your needs.  While such forking is the preferred solution if you must make changes to a component (and they can't be made upstream in Bolt), you should change the class names when you do this to remove the bolt namespace a) for clarity and b) to avoid conflicts if the original component is later used.

3. **Don't write markup that contains c-bolt-* CSS classes**
The prefix `c-bolt-` indicates that a CSS class is part of a Bolt component.  As a rule, the markup of a Bolt component should be considered internal to that component, i.e. not something you should ever change or even have to think about unless you're contributing to Bolt.

Instead, use twig to include (or embed) components on a page or in a template.

```
{% include "@bolt/button.twig" with {
	text: "Click Me",
	size: "small"
} only %}
```

4. **Do write markup that contains u-bolt-* and o-bolt-* CSS classes**
Unlike component markup, markup that contains classes with these prefixes (indicating utilities and objects) is designed to be used freely.  These classes are considered stable and are only changed rarely and carefully. 

> Note: Try to use `u-bolt-*` classes sparingly.  Too many of these are an indication that you're "swimming upstream" against the design system.
> Note: some special twig tags such as `{% grid %}` are equivalent to using markup with `o-bolt-*` classes



5. **Add a class prefixed with `js-` when binding javascript to an element**
Of course, always avoid using js selectors that include a `c-bolt-*` class (e.g. document.querySelector('.c-bolt-text')) for the same reason you avoid this in CSS.

However, also avoid any selector that doesn't start with `js-` such as document.querySelector('bolt-button'), `document.querySelector('.c-overlay')`, etc.  Instead, add a new class that starts with `js-` to your markup, then bind your javascript to that.  This accomplishes several things:

- Makes it easy to tell just by looking at the markup that javascript is being attached.
- Separates concerns (since CSS and js will always target different classes—even on the same element—someone editing CSS can change those without worrying about what javascript might be affected, and vice versa for someone editing javascript).

```
{% set attributes = create_attribute() %}
{% include "@bolt/button.twig" with {
  attributes: attributes.addClass('js-popup-button')
  text: "Click Me"
} only %}
```

```
const popupButtons = document.querySelectorAll('.js-popup-button');
if (popupButtons.length) {
  [].forEach.call(popupButtons, function(popupButton) {
     popupButton.addEventListener('click', function (event) {
       // Fire the popup
     });
  });
}
```



