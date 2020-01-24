## `BoltAction`

`BoltAction` is a base class that can be extended to create "actionable" components, ones that either function as `<a>` or `<button>` elements or support `onClick` and `onClickTarget` props for handling click events.

At this point `BoltAction` is not a renderable element itself. It just consolidates the shared parts of "actionable" components into a single base class.

For example, the `BoltLink` component will extend `BoltAction` like so:

```js
...

@define
class BoltLink extends BoltAction {
  static is = 'bolt-link';

...
```
