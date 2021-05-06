import { BoltNavbar } from '@bolt/components-navbar';

export const Behaviors = {
  bolt_navbar: {
    attach: context => {
      const navbars = context.querySelectorAll('.c-bolt-navbar');
      navbars.forEach(el => {
        const navbarComponent = new BoltNavbar(el);
      });
    },
  },
};
