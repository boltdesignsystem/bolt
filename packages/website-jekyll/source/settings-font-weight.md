---
layout: page
title: Font Weight
intro: 'npm install @bolt/settings-font-weight'
permalink: /settings/font-weight/
---

Typography is the foundation of any kind of information design, and *Pega* has a world class team in bringing the best web typographic experience to the network of *Pega Sites*.

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
