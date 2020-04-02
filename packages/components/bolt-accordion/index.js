import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-accordion'], async () => {
  await Promise.all([
    import(/* webpackChunkName: "bolt-accordion" */ './src/accordion'),
    import(/* webpackChunkName: "bolt-accordion-item" */ './src/AccordionItem'),
  ]);
});
