![themify](https://i.imgur.com/JZyjWm6.png)

[![Build Status](https://travis-ci.org/datorama/themify.svg?branch=master)](https://travis-ci.org/datorama/themify)
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)
[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

> *CSS Themes Made Easy*

Themify lets you manage your application’s themes in realtime, using a robust solution that’s easily configurable.

Themify is a PostCSS plugin that generates your theme during the build phase. 
The main concept behind it is to provide two palettes, one light and one dark (resembles the inverse of the light palette).

Under the hood, `themify` will replace your CSS colors with CSS variables, and also take care to provide a fallback for unsupported browsers (such as IE11).

[Introducing Themify: CSS Themes Made Easy](https://netbasal.com/introducing-themify-css-themes-made-easy-711a05813f3b)

## 🤓 Features

* 🖌 **Light &  Dark palettes** - define your theme using a simple JSON format

* 🎨 **Replace your colors in runtime** - provide your clients with  **white-labeling** capabilities. Let them choose their own colors and replace them instantly

* :pencil2: **Use it inside your CSS** - use your theme directly in your SASS files, no JavaScript is required

* 🏃 **Runtime replacement** - change the active palette at runtime, either for the entire application or for a specific HTML container

* 🔥 **Legacy Browser Support** - support for all major browsers including IE11

## Installation
`npm install @datorama/themify --save`

## Usage

#### Options

|Input|Type|Default|Description|
|---|---|---|---|
|createVars|boolean|`true`|Determines whether CSS variables are automatically generated. This should kept as true, unless you want to inject them yourself.|
|palette|`{light: [key: string]: string, dark: [key: string]: string}`|`{}`|Palette colors|
|classPrefix|string|`''`|A class prefix to append to each generated theme class.|
|screwIE11|boolean|`true`|Whether to generate a fallback for legacy browsers that do not supports CSS Variables.|
|fallback|`{cssPath: string \| null, dynamicPath: string \| null}`|`{}`|`cssPath`: An absolute path to the fallback CSS. <br>`dynamicPath`: An absolute path to the fallback JSON.|

#### Add themify to your build pipe: 

```js
const themifyOptions = {  
  palette : {
    light: {
      'primary-100': '#f2f2f4',
      'primary-200': '#cccece',
      'accent-100': '#e6f9fc',
      'accent-200': '#96e1ed'
    },
    dark: {
      'primary-100': '#505050',
      'primary-200': '#666a6b',
      'accent-100': '#096796',
      'accent-200': '#0a87c6'
    }
  },
  screwIE11 : false,  
  fallback : {  
    cssPath : './dist/theme_fallback.css', // use checksum 
    dynamicPath: './dist/theme_fallback.json'  
  }  
};
```

##### Gulp

```js
gulp.src('./main.scss')  
    .pipe(postcss([  
	initThemify(themifyOptions),  
	sass(),  
	themify(themifyOptions)  
     ]))  
    .pipe(rename("bundle.css"))  
    .pipe(gulp.dest('dist'));
```

##### Webpack

```js
const isProd = process.env.ENV === 'production';
const basePath = isProd ? './dist' : './src';
const cssPath = `${basePath}/theme_fallback.css`;
const dynamicPath = `${basePath}/theme_fallback.json`;

{
  test: /\.scss$/,
  use: [{loader: "style-loader"}].concat(getLoaders())
}
      
const getLoaders = () => [{
  loader: "css-loader"
},
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss2',
      plugins: () => [
        require('@datorama/themify').themify(themifyOptions)
      ]
    }
  },
  {
    loader: "sass-loader"
  },
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss1',
      plugins: () => [
        require('@datorama/themify').initThemify(themifyOptions)
      ]
    }
  }
]
```


#### Add themify to SASS

In order to use the `themify` function and other SASS helpers, you need to import the `themify` library from your main SASS file:

```sass
@import 'node_modules/datorama/themify/dist/themify';
```

The themify function receives as parameters the name of the color defined in the palette map and an optional opacity parameter. Themify will generate CSS selectors for each palette — one for the light and one for the dark.

```scss
.my-awesome-selector {
  // color-key: a mandatory key from your palette. For example: primary-100
  // opacity: an optional opacity. Valid values between 0 - 1. Defaults 1.
  background-color: themify(color-key, opacity);

  // Define a different color for dark and light.
  color: themify((dark: color-key-1, light: color-key-2));
}
```

#### Basic usage

```scss
button {
  background-color: themify(primary-100);
  color: themify(accent-200);
  &:hover {
    background-color: themify(primary-100, 0.5);	
  }
}
```

The above example will produce the following CSS:

```css
.dark button, button {
  background-color: rgba(var(--primary-100), 1);
  color: rgba(var(--accent-200), 1);
}
.dark button:hover, button:hover {
  background-color: rgba(var(--primary-100), 0.5);	
}
```

And the following fallback for IE11:

```css
button {
  background-color: #f2f2f4;
  color: #666a6b;
}
 
.dark button {
  background-color: #505050;
  color: #0a87c6;
}

button:hover {
  background-color: rgba(242, 242, 244, 0.5);	
}

.dark button:hover {
  background-color: rgba(80, 80, 80, 0.5);	
}
```

#### A different color for each palette

Sometimes we need more control over the colors so it's possible to specify explicitly one color for **light** and another color for **dark**:

```scss
button {
  background-color: themify((dark: primary-100, light: accent-200));
}
```

The above example will produce the following CSS:

```css
.button {
  background-color: rgba(var(--accent-200), 1);
}

.dark button {
  background-color: rgba(var(--primary-100), 1);
}
```

#### Advanced usage

`themify` can be combined with every valid CSS:

```scss
button {
  border: 1px solid themify(primary-100);
  background: linear-gradient(themify(accent-200), themify(accent-100));
}
```

Even in your animations:

```scss
.element {  
  animation: pulse 5s infinite;  
}  
  
@keyframes pulse {
  0% {  
    background-color: themify(accent-100);  
  }  
  100% {  
    background-color: themify(accent-200);  
  }  
}
```

#### Runtime replacement

First, we'll create our own theme service.

```ts
import {loadCSSVariablesFallback, replaceColors, Theme} from '@datorama/themify/utils';
const palette = require('path_to_my_json_pallete');

/** fallback for CSS variables support */
const themeCSSFallback = 'path/theme_fallback.css';
const themeJSONFallback = 'path/theme_fallback.json';

export class MyThemeService {
	
  constructor(){
    /**
    * load the CSS fallback file, in case the browser do not support CSS Variables.
    * Required only if you set screwIE11 option to false. 
    *
    * callback - load event for the CSS file
    */
    loadCSSVariablesFallback(themeCSSFallback, callback);	
  }

  /**  
   * Replace the theme colors at runtime 
   * @param partialTheme a partial theme configuration.  
   */
   setColors(partialTheme: Theme){
     replaceColors(themeJSONFallback, partialTheme, palette);
   }

}
```

Now let's use this service in our web application:

```ts
const themeService = new MyThemeService();

/** replace the colors at runtime **/
themeService.setColors({
  light: {
    'primary-100': '#0c93e4'
  }
});

```

 
#### Changing the active palette

In order to switch between the dark and light palettes, simply add the appropriate class to the desired HTML element.

```scss
p {
  /** #96e1ed in light and #0a87c6 in dark */
  color: themify(accent-200);
}
```

```html
<p>I'm from the light palette</p>
<div class="dark">
  <p>I'm from the dark palette</p>	
</div>
```
### Theme class helpers
You can take advantage of your themes not just in your CSS, but also directly in your HTML, by generating a CSS class for each color you define.

In order to achieve this, use the `generateThemeHelpers` mixin, and pass the CSS properties you want to generate. For example:

```scss
// generates the following predefined classes, for each color  
$themeRules: (  
  'color',  
  'border-top-color',  
  'border-bottom-color',  
  'border-right-color',  
  'border-left-color',  
  'background-color',  
  'fill',  
  'stroke',  
  // PSEUDO_CLASSES  
  'color:h:f:a:vi'  
);  
@include generateThemeHelpers($themeRules);
```

This will generate the following CSS:

```css
.dark .primary-100-color, .primary-100-color {  
  color: rgba(var(--primary-100), 1)  
}

.dark .primary-200-color, .primary-200-color {  
  color: rgba(var(--primary-100), 1)  
}

.dark .primary-100-color\:vi:visited, .primary-100-color\:vi:visited {  
  color: rgba(var(--primary-100), 1)  
}
```
and so on..

As you see, you can pass any CSS property, including pseudo classes.
The following SASS map details the pseudo class keys and their values:

```sass
$PSEUDO_CLASSES: (  
  ':a': ':active',  
  ':c': ':checked',  
  ':d': ':default',  
  ':di': ':disabled',  
  ':e': ':empty',  
  ':en': ':enabled',  
  ':fi': ':first',  
  ':fc': ':first-child',  
  ':fot': ':first-of-type',  
  ':fs': ':fullscreen',  
  ':f': ':focus',  
  ':h': ':hover',  
  ':ind': ':indeterminate',  
  ':ir': ':in-range',  
  ':inv': ':invalid',  
  ':lc': ':last-child',  
  ':lot': ':last-of-type',  
  ':l': ':left',  
  ':li': ':link',  
  ':oc': ':only-child',  
  ':oot': ':only-of-type',  
  ':o': ':optional',  
  ':oor': ':out-of-range',  
  ':ro': ':read-only',  
  ':rw' : ':read-write',  
  ':req': ':required',  
  ':r': ':right',  
  ':rt' : ':root',  
  ':s': ':scope',  
  ':t' : ':target',  
  ':va': ':valid',  
  ':vi': ':visited'  
);
```

<br>
Now you can use the generated CSS classes directly in your HTML:

```html
<a class="primary-100-color primary-200-color:a">
	The default color is primary-100
	The active color will be primary-200
</a>
```

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars1.githubusercontent.com/u/6745730?v=4" width="100px;"/><br /><sub><b>Netanel Basal</b></sub>](https://www.netbasal.com)<br />[📖](https://github.com/datorama/themify/commits?author=NetanelBasal "Documentation") [💻](https://github.com/datorama/themify/commits?author=NetanelBasal "Code") [🤔](#ideas-NetanelBasal "Ideas, Planning, & Feedback") | [<img src="https://avatars2.githubusercontent.com/u/78281?v=4" width="100px;"/><br /><sub><b>bh86</b></sub>](https://github.com/bh86)<br />[📖](https://github.com/datorama/themify/commits?author=bh86 "Documentation") [💻](https://github.com/datorama/themify/commits?author=bh86 "Code") [🤔](#ideas-bh86 "Ideas, Planning, & Feedback") |
| :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## License

Apache &copy; [datorama](https://github.com/datorama)
