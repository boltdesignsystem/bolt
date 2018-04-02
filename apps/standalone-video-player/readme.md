# Bolt Site (Storefront)

```bash
npm run compile # compiles it all
npm start # compiles, then start server and watches
```

## Content

Content goes in `./content/` and can be either `.md` or `.html` files with Yaml front matter like so:

```
---
title: About
weight: 90
nav: main
---

All about this all. [More info](https://github.com/bolt-design-system/bolt) on GitHub.
```

All that's necessary is `title`. Adding `nav: main` puts it in main menu; and is sorted via ascending `weight`.

## Templates

All templates are in `./templates/`. If a piece of content declares `template: foo` in yaml front matter, then it's data will get passed to `./templates/foo.twig`, otherwise it'll go to `./templates/default.twig`. 

To see what data is available, just open your console on any page. Here's the basic breakdown though:

```js
const data = {
  page: {
    url: '', // relative path to file 
    srcPath: '', // original file
    meta: {}, // All yaml front matter
    body: '', // Body content, if markdown file, it's turned to HTML
  },
  site: {
    pages: [], // All page objects (besides `page.body`)
  },
};
```
