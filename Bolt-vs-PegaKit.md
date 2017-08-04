



## What is Bolt?

Bolt is the next **evolution** of PegaKit, our first generation Design System at Pega, not a total departure. We're still using Gulp, still providing Twig templates, still using an ITCSS-based CSS Architecture, still providing a module-based JavaScript architecture, still recommending CSS prefixes to class selectors, etc.

### So then what's different?

In short, we're taking the feedback we've received over the past year, the things we've learned rolling PegaKit out on our pega.com, accounts.pega.com, blog.pega.com, and accounts.pega.com, and the growing needs of our growing team to iterate and improve upon v1 of our existing design system.

That's precisely why things like having the ability to version and publish individual components, documenting new additions to the system as they become available, server-side front-end builds, and incorporating continuous testing coverage are some of the very first new things being actively worked on.


### Drupal 8 Theming vs Bolt

Unlike PegaKit, Bolt in of itself is not a Drupal theme. And for good reason -- Bolt isn't trying to solve for all the nuances and technical considerations that might go into building out a site theme from a Drupal developer's point of view.

Rather, Bolt is meant to help solve for a lot of the front-end and design-related needs a designer, developer or content author might have when building a brand new site or updating and maintaining an existing one.

At a high level, these include:
- A collection of front-end Gulp-based build tools
- an ITCSS-based CSS Framework (ex. Colors, Font Size Options, Utility Classes, etc)
- a toolkit of composable UI Components, including the Twig templates, Sass, and JavaScript needed to build out some of our most commonly used patterns
- Services to help build and test out your code (ex. Travis CI testing)
- Downloadable design assets such as icons, fonts, and image assets
- Documentation, examples, guidelines, and recommendations on front-end architecture, accessibility, web performance, and coding best practices, among others.
