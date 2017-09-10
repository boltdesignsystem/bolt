# Blaze Elements

<img alt="Blaze Elements Logo" src="https://wc-catalogue.github.io/blaze-elements/blaze-elements-logo.svg" width="400">

[Blaze CSS](http://blazecss.com/) wrapped using [Web Component](http://webcomponents.org/)

[PROJECT STATUS](https://github.com/wc-catalogue/blaze-elements/milestones)

[![Build Status](https://travis-ci.org/wc-catalogue/blaze-elements.svg?branch=master)](https://travis-ci.org/wc-catalogue/blaze-elements)
[![npm version](https://badge.fury.io/js/blaze-elements.svg)](https://badge.fury.io/js/blaze-elements)

[![Build Status](https://saucelabs.com/browser-matrix/elmariofredo.svg)](https://saucelabs.com/beta/builds/de2a9d3d2222445290dd8e29ba80de84)


## Quick start

You can install whole blaze-elements suite or just specific component/packages.

Install the library

`yarn add blaze-elements`.

From user perspective you can use whole lib or separate packages in 2 modes:

1. traditional widget style ( standalone web component )
2. in SPA ( raw Web component with peerDependency on Skate )

### 1. Widget Style ( pure Web Component + all dependecies bundled )

Then simply include the correct files, write some HTML, and you are done!

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Blaze Elements for the web</title>
    <script src="node_modules/blaze-elements/dist/index-with-deps.min.js"></script>
  </head>
  <body>
    <bl-app-layout>

      <div slot="app-drawer">
        <bl-nav>
          <bl-nav-content><h2>Blaze App</h2></bl-nav-content>
          <bl-nav-item>Home</bl-nav-item>
          <bl-nav-item>About</bl-nav-item>
        </bl-nav>
      </div>

      <div slot="app-toolbar"></div>

      <main>
        <div>
          <label for="demo-input">Tell us how you feel!</label>
          <bl-input id="demo-input" value="">
        </div>
      </main>
    </bl-app-layout>

  </body>
</html>
```

### 2. SPA

> @TODO

## Installing individual components

Blaze-elements is modular by design. Each component lives within its own packages

`yarn add bl-button bl-card bl-textfield bl-typography`

All our components can be found in the [packages](https://github.com/wc-catalogue/blaze-elements/tree/master/packages) directory.
Each component has a *README* documenting installation and usage.

So let's say you just want to use blaze buttons

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Blaze Elements for the web</title>
    <script src="node_modules/bl-button/dist/index-with-deps.min.js"></script>
  </head>
  <body>
    <bl-button color="brand">Click me</bl-button>
  </body>
</html>
```

---

## Frameworks interop

**NOTE:**
`<Button.is></Button.is>` is the same as `<bl-button></bl-button>`

### React

```ts
import {Button} from 'bl-button';
import {Input} from 'bl-input';

import * as React from 'react';
import {Component} from 'react';
import {render} from 'react-dom';

const mountPoint = document.getElementById('app');

type AppState = {name:string, color: string}
class App extends Component<void,AppState> {
  state = {
    name: 'Jim Raynor',
    color: 'brand'
  }

  private blInputRef: Input;
  private blButtonRef: Button;

  render(){
    return (
      <form onSubmit={e=>console.log('submitted')}>
        <Input.is ref={node=>this.blInputRef=node}></Input.is>
        <Button.is ref={node=>this.blButtonRef=node} type="submit" >Submit</Button.is>
      </form>
    )
  }
  componentDidMount(){
     this.setRefsProps();
     this.setRefsListeners();
  }
  componentDidUpdate(){
    this.setRefsProps();
  }

  private setRefsProps(){
    this.blButtonRef.color = this.state.color;
    this.blInputRef.value = this.state.name;
  }
  private setRefsListeners(){
    this.blInputRef.addEventListener(Button.events.change, (event: CustomEvent)=>{
        this.setState({
          name: event.target.detail.value
        })
    })
  }
}

render(<App/>,mountPoint)
```

### Preact >= 7

```ts
import {Button} from 'bl-button';
import {Input} from 'bl-input';
import {h,render,Component} from 'preact';

const mountPoint = document.getElementById('app');

type AppState = {name:string, color: string}
class App extends Component<void,AppState> {
  state = {
    name: 'Jim Raynor',
    color: 'brand'
  }
  render(){
    return (
      <form onSubmit={e=>console.log('submitted')}>
        <Input.is
          value={this.state.name}
          on-change={(event:CustomEvent)=>this.setState({name:event.target.detail.value})}
        ></Input.is>
        <Button.is type="submit" color={this.state.color}>Submit</Button.is>
      </form>
    )
  }
}

render(<App/>,mountPoint)
```

### Angular >= 2

```ts
import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'my-app',
  template: `
    <${Input.is}
      [value]="name"
      (change)="name=$event.target.detail.value"
    ></${Input.is}>
    <${Button.is} type="submit" [color]="color">Submit</${Button.is}>
  `
})
class AppComponent {
  name = 'Jim Raynor';
  color = 'brand';
}

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})


platformBrowserDynamic().bootstrapModule(AppModule);
```

---

## [Development](docs/DEVELOPER.md)

---

## Packaging and Usage

### `bl-button`

#### Installing

`yarn add bl-button`

will contain 2 bundles:

1. `index-with-dependecies.min.js` - minified and bundled all `dependencies` of bl-button + skatejs ( without polyfills )
2. `index.min.js` - just minified implementation of `bl-button` , skatejs and all dependecies should be loaded via specific `imports` ( without polyfills )

and generated type definitions with JSX.Intrinsic element plugin for specific custom element

So shiped package structure should look like:

```
bl-button/
 |-- index.min.js  * compiled Button with customElements.define
 |-- index.min.js.map
 |-- index.d.ts
 |-- index-with-deps.min.js * compiled Button bundled with Skate and all `dependencies` and `customElements.define`
 |-- index-with-deps.min.js.map
 |-- Button.js * compiled Button for custom WC registration
 |-- Button.d.ts
 |-- README.md
 |-- package.json
```

#### Usage:

1. within any app ( PHP, Ruby, JSP, plain HTML, whatever... )

```html
<html>
<head>
  <script src="node_modules/skatejs-web-components/dist/index-with-deps.min.js"></script>
  <script src="node_modules/bl-button/index-with-deps.min.js"></script>
  <script src="node_modules/bl-calendar/index-with-deps.min.js"></script>
</head>
<body>
  <bl-button>Hello</bl-button>
  <bl-calendar></bl-calendar>
</body>
</html>
```

2. within SPA with bundler ( webpack )
```html
<html>
<head>
  <script src="bundle.min.js"></script>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```

```ts
// CustomButton.tsx
import {Button, ButtonProps} from 'bl-button/Button';

declare global {
  namespace JSX {
    interface IntrinsicElement {
      'my-button': ButtonProps & Partial<HTMLElement>
    }
  }
}
customElements.define('my-button',Button);

// main.ts
import 'skatejs-web-components';
import 'skate';

import 'bl-button';
import 'bl-calendar';
import 'bl-input';

import * as React from 'react';
import {render} from 'react-dom';

// add custom namespaced button button
import './CustomButton';

const mountPoint = document.getElementById('app');
const App = () => (
  <div>
    <h1>Hello world</h1>
    <form>
      <bl-input value="hello" onInput={console.log}></bl-input>
      <bl-calendar></bl-calendar>
      <bl-button type="submit">Submit</bl-button>
      <my-button>Im custom yo!</my-button>
    </form>
  </div>
)

render(<App/>, mountPoint);
```
