---
layout: page
title: Font Family
intro: 'npm install @bolt/settings-font-family'
permalink: /settings/font-family/
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

## SassDocs

[Tools: Typography](/docs/#tools: typography)
