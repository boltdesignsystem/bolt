---
layout: page
title: Typography
intro: Accessible & Responsive
permalink: /settings/typography/
---

Typography is the foundation of any kind of information design, and *Pega* has a world class team in bringing the best web typographic experience to the network of *Pega Sites*.

## Font Family

We are dedicated to creating accessible design, that is why the following fonts are chosen to be included in the *Bolt Design System*.

### Brand Fonts

Studies have shown that *Open Sans* is the most suitable font for user interface design due to its versatility and legibility.

<figure>
  <table>
    <thead>
      <tr>
        <th>Font</th>
        <th>Category</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Open Sans</td>
        <td>Heading text</td>
      </tr>
      <tr>
        <td>Open Sans</td>
        <td>Body text</td>
      </tr>
    </tbody>
  </table>
</figure>

### Fallback Fonts

When our **Brand Fonts** are not available due to funky connections, the following system fonts will be loaded instead:

<figure>
  <table>
    <thead>
      <tr>
        <th>Font</th>
        <th>Device</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>San Francisco</td>
        <td>Mac OS X and iOS</td>
      </tr>
      <tr>
        <td>Segoe UI</td>
        <td>Windows and Windows Phone</td>
      </tr>
      <tr>
        <td>Roboto</td>
        <td>Android and newer Chrome OS</td>
      </tr>
      <tr>
        <td>Oxygen</td>
        <td>KDE</td>
      </tr>
      <tr>
        <td>Ubuntu</td>
        <td>Ubuntu</td>
      </tr>
      <tr>
        <td>Cantarell</td>
        <td>GNOME</td>
      </tr>
      <tr>
        <td>Fira Sans</td>
        <td>Firefox OS</td>
      </tr>
      <tr>
        <td>Droid Sans</td>
        <td>Older versions of Android</td>
      </tr>
    </tbody>
  </table>
</figure>

### Sass Mixin

Call the specific fonts using the following Sass mixins.

{% highlight ruby %}
@include font-family($param);
{% endhighlight %}

<figure>
  <table>
    <thead>
      <tr>
        <th>Param</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>heading</code></td>
        <td>Calls the font being defined for heading text</td>
      </tr>
      <tr>
        <td><code>body</code></td>
        <td>Calls the font being defined for body text</td>
      </tr>
    </tbody>
  </table>
</figure>

## Font Size

The *Bolt Design System* team has gone through vigorous testing to make sure all types are legible on all devices. We have created the following range of sizes to be used for headings and body text. All font sizes are responsive in relation to device screen size.

### Sass Mixin

{% highlight ruby %}
@include font-size($param);
{% endhighlight %}

<figure>
  <table>
    <thead>
      <tr>
        <th>Param</th>
        <th>Size</th>
        <th>Min</th>
        <th>Max</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>xxlarge</code></td>
        <td>3.083 rem</td>
        <td>2.375 rem</td>
        <td>3.083 rem</td>
      </tr>
      <tr>
        <td><code>xlarge</code></td>
        <td>1.781 rem</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td><code>large</code></td>
        <td>1.417 rem</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td><code>medium</code></td>
        <td>1.111 rem</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td><code>base</code></td>
        <td>1 rem</td>
        <td>15 px</td>
        <td>18 px</td>
      </tr>
      <tr>
        <td><code>small</code></td>
        <td>0.9 rem</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td><code>xsmall</code></td>
        <td>0.8 rem</td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  </table>
</figure>

**In addition to scaling according to base, xxlarge has another scaling that takes care of devices with narrow screen.*

## Font Weight

Less is more, that is part of *Bolt's* design principles. As for font weights, we are only using 2 options to create clean and intuitive information architecture.

### Sass Mixin

{% highlight ruby %}
@include font-weight($param);
{% endhighlight %}

<figure>
  <table>
    <thead>
      <tr>
        <th>Param</th>
        <th>Weight</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>regular</code></td>
        <td>400</td>
      </tr>
      <tr>
        <td><code>bold</code></td>
        <td>800</td>
      </tr>
    </tbody>
  </table>
</figure>

## SassDocs

[Tools: Typography](/docs/#tools: typography)
