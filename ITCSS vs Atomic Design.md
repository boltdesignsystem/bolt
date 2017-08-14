# ITCSS (Inverted Triangle CSS) vs Atomic Design

TLDR; ITCSS = CSS Architecture. Atomic Design = HTML Architecture. And yes, <a href="https://twitter.com/salem_ghoweri/status/607575527373873153">they ARE different and both compliment eachother</a>.

## CSS Architecture (how things get styled). BEM classes, ITCSS, BEMIT 
1. __settings__: variables and settings. lots of Sass maps.
2. __tools__: Sass mixins and functions; helpers to grab settings.
3. __generic__: global resets (box sizing border box, normalize, etc)
4. __elements__: plain vanilla HTML tags without any classes. Defaults everything is built on top of. Vanilla <input> elements, `<a>` tags, `<ul>` lists, etc.
5. __objects__ (`.o-dash` classes): invisible containers or very generic abstract layout patterns that aren’t really “designed” (grids, wrappers, inline lists, bare lists, etc). Can get used by themselves or combined with a component. Very few and rarely changed (typically around 10 or less objects, in total). `.o-grid`, `.o-wrapper`, `.o-ratio`, and `.o-bare-list` are all common examples in use in PegaKit.
6. __components__ (`.c-dash` classes): vast majority of things that are designed and styled. (expecting 50+ components in total). `.c-card`, `.c-band`, `.c-button`, and `.c-global-header` are all examples of components in PegaKit.
7. __themes__ (`.t-dash` classes): color themes. only affect background color, text color, border color, etc. never layout or position. `.t-navy`, `.t-black`, and `.t-teal` are all examples of theming classes in PegaKit.
8. __utilities__ (`.u-dash` classes): utility classes used to forcefully override a default style. Used sparingly. Reoccurring overrides should be re-evaluated and refactored into component-specific BEM modifiers. `.u-margin-bottom`, `.u-hide@medium`, and `.u-1/2` are all utility classes in PegaKit.

<hr>

## HTML Architecture (how UI gets composed together to build something reusable), aka Atomic Design
1. __atoms__: smallest reusable chunk of UI. text. buttons. icons. lists. input elements. vanilla HTML elements. Grid. Wrapper. Doesn’t require or expect any particular class or classes (or any classes at all).
2. __molecules__: Reusable collection of Atoms. For example, a card = image + headline + paragraph + button
3. __organisms__: Reusable collection of Molecules: ex. A card row (3 cards in a 3 column grid). Or a global footer (nav lists + grid + social icons, etc).
4. __templates__: Low fidelity, reusable layout. Not specific to a particular page — represents overall structure shared by multiple pages. Generic landing page. Search results. Generic homepage. Think of these as lorum ipsum wireframes with gray placeholder images.
5. __pages__: Templates, but with __actual__ representative content poured in. High fidelity and very close approximation to the final page.
