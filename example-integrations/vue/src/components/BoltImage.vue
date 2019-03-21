<template>
  <div style="max-width: 200px;" class="u-bolt-width-1/1 u-bolt-inline-block">
    <bolt-ratio aspect-ratio-width="1" aspect-ratio-height="1">
      <img
        :data-src="src"
        alt="Vue logo"
        class="js-lazyload c-bolt-image__lazyload c-bolt-image__lazyload--fade"
        src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
      />
    </bolt-ratio>
  </div>
</template>

<script>
import '@bolt/global';
import '@bolt/components-image';

export default {
  name: 'BoltImage',
  props: {
    src: {
      type: String,
      default:
        'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
    },
  },
};
</script>

<style lang="scss">
@import '@bolt/components-image/src/image.scss';
</style>
