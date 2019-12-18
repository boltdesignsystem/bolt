<template>
  <div class="hello">
    <bolt-text tag="h1" font-size="xxxlarge" font-weight="semibold" headline>
      {{ msg }}
    </bolt-text>

    <bolt-text tag="p" font-size="medium">
      For guide and recipes on how to configure / customize this project,
      <br />check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
        >vue-cli documentation</a
      >.
    </bolt-text>

    <bolt-text tag="h3" font-size="large" font-weight="semibold" headline>
      Installed CLI Plugins
    </bolt-text>

    <bolt-inline-list class="u-bolt-margin-bottom-medium">
      <ul class="o-bolt-inline-list o-bolt-inline-list--medium">
        <li class="o-bolt-inline-list__item">
          <a
            href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
            target="_blank"
            rel="noopener"
            >babel</a
          >
        </li>
        <li class="o-bolt-inline-list__item">
          <a
            href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa"
            target="_blank"
            rel="noopener"
            >pwa</a
          >
        </li>
        <li class="o-bolt-inline-list__item">
          <a
            href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
            target="_blank"
            rel="noopener"
            >eslint</a
          >
        </li>
        <li class="o-bolt-inline-list__item">
          <a
            href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-unit-jest"
            target="_blank"
            rel="noopener"
            >unit-jest</a
          >
        </li>
        <li class="o-bolt-inline-list__item">
          <a
            href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-e2e-nightwatch"
            target="_blank"
            rel="noopener"
            >e2e-nightwatch</a
          >
        </li>
      </ul>
    </bolt-inline-list>

    <bolt-text tag="h3" font-size="large" font-weight="semibold" headline>
      Essential Links
    </bolt-text>

    <bolt-inline-list class="u-bolt-margin-bottom-medium">
      <ul class="o-bolt-inline-list o-bolt-inline-list--medium">
        <li class="o-bolt-inline-list__item">
          <a href="https://vuejs.org" target="_blank" rel="noopener"
            >Core Docs</a
          >
        </li>
        <li class="o-bolt-inline-list__item">
          <a href="https://forum.vuejs.org" target="_blank" rel="noopener"
            >Forum</a
          >
        </li>
        <li class="o-bolt-inline-list__item">
          <a href="https://chat.vuejs.org" target="_blank" rel="noopener"
            >Community Chat</a
          >
        </li>
        <li class="o-bolt-inline-list__item">
          <a href="https://twitter.com/vuejs" target="_blank" rel="noopener"
            >Twitter</a
          >
        </li>
        <li class="o-bolt-inline-list__item">
          <a href="https://news.vuejs.org" target="_blank" rel="noopener"
            >News</a
          >
        </li>
      </ul>
    </bolt-inline-list>

    <bolt-text tag="h3" font-size="large" font-weight="semibold" headline>
      Ecosystem
    </bolt-text>

    <bolt-inline-list class="u-bolt-margin-bottom-medium">
      <ul class="o-bolt-inline-list o-bolt-inline-list--medium">
        <li class="o-bolt-inline-list__item">
          <a href="https://router.vuejs.org" target="_blank" rel="noopener"
            >vue-router</a
          >
        </li>
        <li class="o-bolt-inline-list__item">
          <a href="https://vuex.vuejs.org" target="_blank" rel="noopener"
            >vuex</a
          >
        </li>
        <li class="o-bolt-inline-list__item">
          <a
            href="https://github.com/vuejs/vue-devtools#vue-devtools"
            target="_blank"
            rel="noopener"
            >vue-devtools</a
          >
        </li>
        <li class="o-bolt-inline-list__item">
          <a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener"
            >vue-loader</a
          >
        </li>
        <li class="o-bolt-inline-list__item">
          <a
            href="https://github.com/vuejs/awesome-vue"
            target="_blank"
            rel="noopener"
            >awesome-vue</a
          >
        </li>
      </ul>
    </bolt-inline-list>
  </div>
</template>

<script>
import '@bolt/components-text';

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@bolt/core-v3.x/styles/index.scss';
@import '@bolt/global/styles/05-objects/objects-inline-list/_objects-inline-list.scss';
</style>
