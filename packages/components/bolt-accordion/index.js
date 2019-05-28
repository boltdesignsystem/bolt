import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import('./src/accordion');
  import('./src/AccordionItem');
});
