---
title: Homepage
layout: homepage
order: 1
---

<div class="o-grid o-grid--center o-grid--large o-grid--middle">
  <div class="o-grid__item u-width-1/1 u-width-8/12@medium">
    <header role="banner">

      <div class="c-page-intro">

        <div class="c-page-intro__header">
          <p class="c-page-intro__label">{{ site.version }}</p>

          <h1 class="c-page-intro__title">
            <span class="c-page-intro__title-text">
              Bolt Design System
            </span>
          </h1>
        </div>

        <h2 class="c-page-intro__subtitle">
          <span class="c-page-intro__subtitle-text">
            Bolt provides tools, patterns, services, and guidelines that systematically improve quality, timeliness, and consistency to the Pega ecosystem so that you can focus on what really matters.
          </span>
        </h2>

        {% include "@bolt/button.twig" with {
          text: "Explore the System",
          attributes: {
            class: [
              "c-page-intro__link"
            ],
            href: '/getting-started'
          }
        } %}

        <!-- <a href="/getting-started" class="c-page-intro__link">
          <!-- <span class="c-page-intro__link-text">

          </span>
           <span class="c-page-intro__link-icon">
            &raquo;
          </span>
        </a> -->

      </div>
    </header>

  </div>


  <div class="o-grid__item u-width-1/1 u-width-4/12@medium">
    <section role="region">
      <ul class="o-ui-list o-ui-list--borderless">
        <li class="o-ui-list__item">
          <h3 class="c-heading c-heading--small c-heading--uppercase u-margin-bottom-xxsmall">
            <span class="c-heading__text">
              Speed
            </span>
          </h3>
          <p>Design and develop faster.</p>
        </li>

        <li class="o-ui-list__item">
          <h3 class="c-heading c-heading--small c-heading--uppercase u-margin-bottom-xxsmall">
            <span class="c-heading__text">Stable</span>
          </h3>
          <p>Predictable, automated testing coverage, and scalable.</p>
        </li>

        <li class="o-ui-list__item">
          <h3 class="c-heading c-heading--small c-heading--uppercase u-margin-bottom-xxsmall">
            <span class="c-heading__text">Stunning</span>
          </h3>
          <p>On brand, consistent, elegant.</p>
        </li>
      </ul>
    </section>
  </div>
</div>

<!--
You can mix __markdown__ with <em>html tags</em>

You can do `inline code blocks`

```
as well as multi-line
code blocks
```

## You can even do images

![Alt Text Here](https://s-media-cache-ak0.pinimg.com/236x/2a/8a/68/2a8a68072363dc8ee548d9568ef17ee3.jpg)


## Or links to other pages

[See our brand colors](colors)-->
