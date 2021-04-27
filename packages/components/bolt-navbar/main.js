import { BoltNavbar } from './src/navbar';

const navbars = document.querySelectorAll('bolt-navbar');
navbars.forEach(el => {
  const navbarComponent = new BoltNavbar(el);
});
