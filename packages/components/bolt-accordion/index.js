import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-accordion'], async () => {
  await Promise.all([import('./src/accordion'), import('./src/AccordionItem')]);
});
