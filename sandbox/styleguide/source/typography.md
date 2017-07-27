---
layout: page
title: Typography
intro: Accessible & Responsive
permalink: /typography/
---

Typography is the foundation of any kind of information design, and *Pega* has a world class team in bringing the best web typographic experience to the network of *Pega Sites*.

## Font Family

We are dedicated to creating accessible design, that is why the following fonts are chosen to be included in the *Bolt Design System*.

### Brand Fonts

Studies have shown that *Open Sans* is the most suitable font for user interface design due to its versatility and legibility.

1. Heading: Open Sans 800
2. Body: Open Sans 400

### Fallback Fonts

When our **Brand Fonts** are not available due to funky connections, the following system fonts will be loaded instead:

1. San Francisco
2. Segoe UI
3. Roboto
4. Oxygen
5. Ubuntu
6. Cantarell
7. Fira Sans
8. Droid Sans

### Sass Mixin

Call the specific fonts using the following Sass mixins.

#### Params

* heading
* body

{% highlight ruby %}
@include font-family($param);
{% endhighlight %}

## Font Size

The *Bolt Design System* team has gone through vigorous testing to make sure all types are legible on all devices. We have created the following range of sizes to be used for headings and body text.

### Params

* xxlarge - 3.083rem
* xlarge - 1.781rem
* large - 1.417rem
* medium - 1.111rem
* **base - min: 15px; max: 18px.***
* small - 0.9rem
* xsmall - 0.8rem

**All font sizes are responsive in relation to device screen size. Base has min and max values, while others scale according to base.*

### Sass Mixin

{% highlight ruby %}
@include font-size($param);
{% endhighlight %}

## Font Weight

Less is more, that is part of *Bolt's* design principles. As for font weights, we are only using 2 options to create clean and intuitive information architecture.

### Params

* regular - 400
* bold - 800

### Sass Mixin

{% highlight ruby %}
@include font-weight($param);
{% endhighlight %}
