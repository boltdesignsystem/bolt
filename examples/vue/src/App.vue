<template>
  <div
    id="app"
    class="t-bolt-xdark u-bolt-min-height-screen u-bolt-text-align-center"
  >
    <bolt-image src="./assets/logo.png" />

    <HelloWorld msg="Welcome to Your Bolt-powered Vue.js App" />
    <bolt-button color="primary">
      Hello Vue.js!
    </bolt-button>
  </div>
</template>

<script>
import BoltImage from './components/BoltImage.vue';
import HelloWorld from './components/HelloWorld.vue';
import '@bolt/components-button';

export default {
  name: 'App',
  components: {
    HelloWorld,
    'bolt-image': BoltImage,
  },
};
</script>

<style lang="scss">
@import '@bolt/core/styles/index.scss';
@import '@bolt/global/styles/04-elements/_elements-page.scss';
@import '@bolt/global/styles/04-elements/_elements-links.scss';
@import '@bolt/global/styles/05-objects/objects-ratio/ratio.scss';
@import '@bolt/components-button';
@import '@bolt/components-text';
@import '@bolt/global/styles/06-themes/_themes.all.scss';
@import '@bolt/global/styles/07-utilities/_utilities-height.scss';
@import '@bolt/global/styles/07-utilities/_utilities-display.scss';
@import '@bolt/global/styles/07-utilities/_utilities-text-align.scss';
@import '@bolt/global/styles/07-utilities/_utilities-spacing.scss';
@import '@bolt/global/styles/07-utilities/_utilities-widths.scss';
</style>
