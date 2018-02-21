---
title: Sass 
---


## Mixins and functions:


```scss
$family: heading, body
@include bolt-font-family($family);
```

---

```scss
$size: xsmall, small, medium, large, xlarge, xxlarge, xxxlarge
@include bolt-font-size($size);
```

---

```scss
$weight: regular, semibold, bold
@include bolt-font-weight($weight);
```

---

```scss
$breakpoint: xxsmall, xsmall, small, medium, large, xlarge, xxlarge, xxxlarge
@include respond-to($breakpoint);
```

---

```scss
$size: xsmall, small, medium, large, xlarge
direction: top, right, bottom, left
@include bolt-margin($size);
@include bolt-margin-{direction}($size);
@include bolt-padding($size);
@include bolt-padding-{direction}($size);

```

Special spacing:

```scss
@include bolt-padding($size, squished);
@include bolt-padding($size, stretched);
```

---

```scss
$color: indigo, teal, yellow, black, white
$shade: xlight, light, medium, dark, xdark

color: bolt-color($color, $shade);
```


## Utility classes

```
spacing: margin, padding
direction: top, right, bottom, left
size: xsmall, small, medium, large, xlarge

.u-bolt-{spacing}-{size}

.u-bolt-{spacing}-{direction}-{size}
```

```
.u-bolt-visuallyhidden
```

---

```
alignment: right, left, center
.u-bolt-text-align-{alignment}
```

---

```
.u-bolt-flex-grow

.u-bolt-flex-shrink

.u-bolt-flex-basis-auto

column: 1 ~ 12
breakpoint: xxsmall, xsmall, small, medium, large, xlarge, xxlarge, xxxlarge

.u-bolt-width-{column}/12 

.u-bolt-width-{column}/12@{breakpoint} 
```
