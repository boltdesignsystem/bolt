<template>
  <div id="app" class="t-bolt-xdark u-bolt-min-height-screen">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Bolt-powered Vue.js App"/>
    <bolt-button color="primary">Hello Vue.js!</bolt-button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';

import { BoltButton } from '@bolt/components-button/src/button.standalone';

// import { BoltRatio } from '@bolt/global/src/button.standalone';
// customElements.define('bolt-button', BoltButton);

// import styles from '@bolt/global/styles/index.scss';

// console.log(BoltText);

export default {
  name: 'app',
  components: {
    HelloWorld,
    // BoltButton,
  },
};
</script>

<style lang="scss" scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    // color: #2c3e50;
    // margin-top: 60px;
  }
</style>

<style lang="scss">
// @import "@bolt/global/styles/index.scss";
  @import '@bolt/core/styles/index.scss';
  @import '@bolt/global/styles/04-elements/_elements-page.scss';
  @import '@bolt/global/styles/04-elements/_elements-links.scss';
  @import '@bolt/global/styles/06-themes/_themes.all.scss';
  @import '@bolt/global/styles/07-utilities/_utilities-height.scss';
</style>
