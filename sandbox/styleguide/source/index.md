---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: home
---
<div class="o-golden-two-column o-golden-two-column--center">
  <div class="o-golden-two-column__main">
    <header role="banner">
      <div class="c-heading-group">
        <h1 class="c-heading c-heading--xxlarge">
          <span class="c-heading__text">
            Bolt Design System
          </span>
        </h1>
        <h2 class="c-heading c-heading--xlarge">
          <span class="c-heading__text">
            Bolt provides tools, patterns, services, and guidelines that systematically improve quality, timeliness, and consistency to the Pega ecosystem so that you can focus on what really matters.
          </span>
        </h2>
      </div>
      <p>
        <strong>
        {% for post in site.posts %}
          <a href="{{ post.url | relative_url }}">Explore the System (v0.1) &raquo;</a>
        {% endfor %}
        </strong>
      </p>
    </header>
  </div>
  <div class="o-golden-two-column__aside">
    <section role="region">
      <h3 class="c-heading c-heading--small">
        <span class="c-heading__text">
          Speed
        </span>
      </h3>
      <p>
        Design and develop faster.
      </p>
      <h3 class="c-heading c-heading--small">
        <span class="c-heading__text">
          Stable
        </span>
      </h3>
      <p>
        Predictable, automated testing coverage, and scalable.
      </p>
      <h3 class="c-heading c-heading--small">
        <span class="c-heading__text">
          Stunning
        </span>
      </h3>
      <p>
        On brand, consistent, elegant.
      </p>
    </section>
  </div>
</div>
