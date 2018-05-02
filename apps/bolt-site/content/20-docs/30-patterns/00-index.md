---
title: Patterns
---

Our [reusable components](../pattern-lab/) provide flexible combinations of interface elements that enable designers and content authors to create web pages. Patterns are consistent combinations of components and elements that are frequently used across Pega websites.

## Anatomy of a pattern

A completed layout pattern consists of a few essential ingredients: 

- Core elements from our [visual language](/docs/visual-language/index.html), such as spacing, color or shadow;
- Layout components, such as images, text, etc.;
- Interaction components, as needed, such as animation or links;
- A wrapper to contain them, such as a card or a band.

These ingredients can be combined and shuffled in a variety of ways depending on your specific use case.

### Example: Share component

The share component is constructed of three separate larger components: a button (to contain the action), a block list (which contains the links/icons), and a tooltip (which provides the container for the block list). Additionally, the share component uses the following items from Bolt: 

- **Visual language**: colors, spacing, shadow;
- **Layout components:** text styles, icons;
- **Interaction**: links, animation, "copy to clipboard" functionality.

<figure>
<img src="../../../images/sharing.png" />
<figcaption>The share component allows visitors to post a piece of content across various social media options.</figcaption>
</figure>

| Label | Component(s)                                   |
| ----- | ---------------------------------------------- |
| 1.0   | button (rounded), shadow, spacing, button text |
| 1.1   | icon, color: orange                            |
| 1.2   | tooltip, spacing                               |
| 1.3   | icon, link                                     |
| 1.4   | block-list                                     |
| 1.5   | "copy to clipboard" functionality              |

