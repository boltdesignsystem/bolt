---
title: Architecture Principles
---

# Bolt Frontend Architecture Principles

**Part 1. Component Reuse and Composition**
1. Frequently used components should be the easiest ones to reuse and extend.
2. JavaScript components (and any underlying functionality) should be sharable and extendable.
3. Solve problems ~once~. Components rarely have to solve problems that other components / UI patterns don’t also have to solve.

**Part 2. Component Consistency, Maintainability, & Emerging Standards**
1. Components should be authored consistently. 
2. Emerging patterns should be discussed and shared.
3. Components should visually render and —whenever possible— include basic functionality and interactivity when JavaScript is disabled.
4. Components should support being used via a Twig include (which pulls in the web component’s custom element) or via the web component’s custom element directly.
5. Components should be encapsulated. If a totally separate component gets an API change, your component shouldn’t care.
6. Component composition > component inheritance.
7. Don’t repeat yourself.
8. Use the web component rendering engine best suited for a component’s needs (Preact vs Lit-HTML)

**Part 3. People-friendly API + Reasonable Defaults**
1. Components should work with the smallest number of config options — ideally none if possible!
2. Use appropriate default prop values for different situations.
3. Batch together “either/or” props that shouldn’t be mixed and matched.
4. Component props that aren’t unique should be broken down and shared.
5. Use consistent, easy to remember prop names.
6. Rarely used component props < utility classes which do the exact same thing.

**Part 4. Design System Feedback Loop**
1. Capture and discuss reoccurring pain-points.
2. Identify gaps in the Design System.
3. Refactor, Release, or Merge and Iterate?


---

## Part 1. Component Reuse and Composition

### Frequently used components should be the easiest ones to reuse and extend.

* Is it reasonable to assume that this a lower-level “core” component that’ll get frequently composed with (or functionality extended by) other higher level components in the design system?
* Or does this component primarily live on it’s own (limited composition expected) and/or doesn’t include underlying functionality or behavior that would reasonably need to get reused or extended by other components?

The more frequent a component is expected to be reused (as a whole + reusing and sharing the underlying pieces / functionality that make up that component), the greater the importance of making a component can get easily reused and extended!


### JavaScript components (and any underlying functionality) should be sharable and extendable.

Where does the majority of a component’s logic live? In the render method? In external helper functions? In exported functions that other components could pull in?

- Can the component’s logic and behavior be easily extended / shared via one of the following methods?
	- A. Extending the component’s base Class (logic primarily exists as standalone methods that are NOT baked into the render method)
	- B. Importing component-specific functions that are exported as standalone JS standalone functions (functionality worth sharing isn’t directly baked into the component)
	- C. Importing helper functions used by the component (but aren’t exclusive to the component itself) 


### Solve problems ~once~. Components rarely have to solve problems that other components / UI patterns don’t also have to solve.

- Does this component have logic that ONLY applies to this one component or is there any core functionality, behavior, or logic that applies more broadly to a range of components in the design system (especially components that already exist)?

---

## Part 2. Component Consistency, Maintainability, & Emerging Standards

### Components should be authored consistently.  
- Does this component feel right at home with other recently authored components? 
- Are the approaches, coding style, libraries, architectural patterns, etc in line with work that has been done elsewhere in the design system?

### Emerging patterns should be discussed and shared.
- Or does anything (new technique, different / alternative approach, unexplored territory, experimental work, etc) stand out? 
- If so, those things should get spelled out, documented and demoed with the team — not to get buy-in mind you, but to educate on how the system is evolving and growing!

### Components should visually render and —whenever possible— include basic functionality and interactivity when JavaScript is disabled.
- The more essential and highly visible a component is, the more important the component looks —and when appropriate, behaves— when JavaScript is disabled, takes a long time to load or is unexpectedly broken.

### Components should support being used via a Twig include (which pulls in the web component’s custom element) or via the web component’s custom element directly.
- Components being pre-rendered in Twig should automatically hydrate using the initial data passed along by the server and take over once the JavaScript kicks in.

### Components should be encapsulated. If a totally separate component gets an API change, your component shouldn’t care.
- Is this component tied at the hip to one or more (“related but technically standalone”) nested components / “behaviors” in the design system OR does this component “just work” if any nested components have their APIs updated?

> As a gut check, let’s say we added a new “isFancy” boolean prop to one of the component’s “related but technically separate” components, say, an icon. Do we need to update this component’s API every time the API of a nested component (the icon in this case) changes? If so, this means our two components are 

Examples we should be looking out for include icons, links, text and buttons — all of which are commonly used together but are nonetheless separate standalone components / component behaviors with their own separate API.


### Component composition > component inheritance.

A component’s API needs to *primarily* focus on passing along data to the component itself (which can include how nested components are positioned / behave) + whatever nested children should get passed along. 

Shorthand API config options to nested components are ok for frequently nested subcomponents *however* aren’t a replacement for the full “longhand” version of nesting something. 


- In components that include a shorthand way to pre-configure nested subcomponents and behavior (ex. nested icons or linkable behavior), how are we handling additional subcomponent options that are out of scope for what a ‘shorthand” API should reasonably handle?


*Probably* Reasonable:
```
<!-- for example, the `icon` shorthand should ONLY cover 1 or 2 use cases at most! -->

<!-- icon name only, icon defaults to "suffix" slot -->
<bolt-headline icon=“chevron-right”>
	Hello world
</bolt-headline>


<!-- icon name + icon slot? ... not great... -->
<bolt-headline icon=“chevron-left” icon-slot="prefix">
	Hello world
</bolt-headline>
```

*Probably* **Not** Reasonable:
```
<!-- Don't Do This! -->
<bolt-headline 
	icon=“chevron-right”
	icon-size="large"
	icon-color="blue"
	icon-background="circle"
	icon-slot="suffix"
>
	Hello world
</bolt-headline>


<!-- Instead Do This! -->
<bolt-headline>
	Hello world

	<bolt-icon name=“chevron-right” icon-size="large" icon-color="blue" icon-background="circle"></bolt-icon>
</bolt-headline>
```


> When in doubt, it’s better to avoid including a shorthand API for a nested sub-component entirely if it’ll mean having a component with a smaller, more consistent, easier to maintainable API.


### Don’t repeat yourself.
Look at the component’s Twig, Sass and JavaScript files independently.

- Are there any patterns or logic that stick out as occurring multiple times?
- Could a loop or helper function *significantly* cut back on the amount of code getting written?
- Does adding a new value to a list of already available options involve more than updating an array?
- Does adding a new prop type require copying and pasting the same couple lines of code over and over again? 



### Use the web component rendering engine best suited for a component’s needs (Preact vs Lit-HTML)
Currently there are two different component rendering engines available in Bolt to handle different use cases (each with their pros and cons — see below), Preact (JSX) and Lit-HTML (Template Literals).

While both are great choices and would both work great in many situations (and in those cases, which engine to use is really up to the author’s personal preference), there are 2 important use cases that must get considered when settling on one renderer over the other.


**1. Dynamic Template Tags**
Do you need dynamic template tags in your HTML (ex. dynamically switch between an `<h1>` or a `<p>` depending on a prop passed along)? 

If so, currently **only** Preact has this use case figured out (but this could change down the road). Currently, the only known way to have dynamic tags in Lit-HTML involves lots of “if / else” statements and manually doing the work yourself.

**Dynamic <slot> Support**
On the flip side, does the component need to support conditionally rendered `<slot>` tags in the template based on native Shadow DOM support? If not, would a heavy handed `this.innerHTML` JavaScript call potentially break any event bindings?

If so, currently **only** Lit-HTML has this use case figured out (however as with Dynamic Tags, this could ultimately change down the road).


### Preact vs Lit-HTML Renderers

**Option A. [Preact](https://github.com/bolt-design-system/bolt/blob/master/packages/core/renderers/renderer-preact.js)**
- **Pros**
	- JSX templates = POWERFUL
	- **Tons** of examples out there for Preact / React
	- Relatively straightforward to port React components over from NPM
	- Ability to import and nest JSX components in other components (ex. `<Button /> `)
	- Supports dynamic template tags (ex. dynamically swap between H1, H2, p, etc)
	- Not the simplest syntax however probably one of THE most popular JS templating syntaxes out in the wild currently
	- …children = SUPER easy to pass props to children
	- Debug mode available (once we wire it up)
- **Cons**
	- More complex / finicky than Lit-HTML
	- Conditional syntax in templates can be clunky and isn’t always all that forgiving
	- No system-wide solution in the Design System is currently in place for handling `<slot>` fallback (however solutions in another VDOM and JSX-friendly rendering engine, Snabbdom, DO exist)



**Option B. [Lit-HTML](https://github.com/bolt-design-system/bolt/blob/master/packages/core/renderers/renderer-Lit-HTML.js)**
- **Pros**
	- Uses JavaScript template literals = familiar syntax 
	- Easy to write simple templates and basic logic
	- Similar to Lit-HTML and Lit-Element (what Polymer and Google are switching to)
	- Works with our `<slot>` dynamic fallback solution shipping in our base `BoltComponent` class.
	- Doesn’t require messy `this.innerHTML` or `this.dangerouslySetInnerhtml` hacks (which can potentially break JavaScript event listeners from 3rd party code)
	- No extra overhead of having a VDOM
	- Better cross browser support of IE11 for the time being (Lit-Element only just added it but some kinks are still getting worked out)
- **Cons**
	- ~**Really**~ not ideal at dynamic template tags (impossible?)
	- Not as powerful as JSX / React / Preact
	- Fewer resources out there compared to React / Preact
	- Syntax can get a little tricky with the  `this.hyper.html` vs `this.hyper.wire()` differences
	- Not quite as extensible compared to React / Preact / Lit-HTML 

---

## Part 3. People-friendly API + Reasonable Defaults
We should be striving to build things for the design system that are as simple and as easy to use as possible, but no simpler!

### Components should work with the smallest number of config options — ideally none if possible!
- Out of all the props that can get passed along to a component, which ones are absolutely MUST HAVE (ie. ~need~ to be required) vs “nice to have”, “really should have” (but not **must** have), optional, etc? Does the component’s schema accurately represent this hard line in the sand?
- When a component prop *isn’t* included, is there a reasonable default value we could fall back to internally (unless / until this prop is specified)? For example, if a button component doesn’t specify a size, we automatically default to “medium”.


### Use appropriate default prop values for different situations.
Some things are safe to assume as a default in certain situations however would be wildly out of place in others.

- Are the default props values being set *appropriate* for every situation? If not, do these defaults shift in different contexts?

> If we were a cake shop baking and selling `<bolt-cake>`s, it would be fairly reasonable to assume a cake with it’s `type` set to `birthday` could get sprinkles by default if the `sprinkles` prop type wasn’t set or specified. Reasonable, right? 
> 
> *However*, what if this wasn’t a birthday cake but instead was a wedding cake… does that “reasonable” `sprinkles` default prop value still apply? ;-)



### Batch together “either/or” props that shouldn’t be mixed and matched.
- Are any component props “either/or” and not “both”? Does the component’s API account for this in as simple a way as possible?

> Back to the cake shop analogy: is the cake `type` something that can get mixed and matched or is this prop type something that ~only one~ value should ever be set to? Which sounds more reasonable?
> 
> Option A. 
> `<bolt-cake type=“wedding”>Congrats!</bolt-cake>` and  
> `<bolt-cake type=“birthday”>Happy Birthday!</bolt-cake>`?
>  
> or Option B.
>  `<bolt-cake wedding>Congrats!</bolt-cake>` and  
> `<bolt-cake birthday>Happy Birthday!</bolt-cake>`, but also reasonable things like `<bolt-checkbox checked></bolt-checkbox>`
> 
> Just keep in mind that Option B technically allows us to ALSO do:
> `<bolt-cake wedding birthday>AHHHHH</bolt-cake>`



### Component props that aren’t unique should be broken down and shared.
- Does your component include prop names shared by other components? And do those prop names ~also~ do the exact same thing? On top of that, do the available values of the component prop names ALSO match?


### Use consistent, easy to remember prop names.
- Are the component’s props names simple, easy to spell, clear, reasonably short, and most importantly, consistent across component to component? 

- Does this component have a prop that handles the exact same design / functionality / behavior as another existing component’s prop? If so, are the two component prop names the same?

> Rule of thumb: the API we’re using across component to component should be ~consistant~ and ~predictable~. The best documentation is no documentation so any reoccurring patterns and predictable naming conventions will go a long way to help with the usability of the design system!


###  Rarely used component props < utility classes which do the exact same thing.
- It’s the 80/20 rule. Ask yourself this: out of all the component config options available, are there any that are only ever used once in a very, very great while?
- Are the ones that go rarely (but still occasionally) used only apply to a specific variation of a component? If so, could, that variation simply use a utility class and omit the prop entirely?

---

## Part 4. Design System Feedback Loop
### Capture and discuss reoccurring pain-points.
- Does this component uncover or illustrate thorny issues or reoccurring patterns yet to be sufficiently accounted for by the design system? Composition? Inheritance? A kitchen stock full of component examples? Underbaked functionality? Missing documentation?


### Identify gaps in the Design System.
- Are there gaps in our tools, reusable helper functions, go-to examples, coding standards, topical guides, best practices etc that this component work sheds some light on? What could the design system do better to help reduce any friction or ambiguity encountered when authoring this component?


### Refactor, Release, or Merge and Iterate?
- Based on the above questions we should be asking ourselves, what’s the reasonable next step we should take?
- A. Recommend additional changes to be made (refactor)
- B. Merge and release
- C. Merge and iterate (hold off on releasing)





