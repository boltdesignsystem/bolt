import { BoltNavbar } from './src/navbar';

document.querySelectorAll('.c-bolt-navbar').forEach(el => {
  const navbarComponent = new BoltNavbar(el);
});
