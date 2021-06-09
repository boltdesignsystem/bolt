const navbars = document.querySelectorAll('.c-bolt-navbar');

if (navbars.length) {
  import(/* webpackChunkName: 'bolt-navbar' */ './src/navbar').then(
    ({ BoltNavbar }) => {
      navbars.forEach(el => {
        const navbarComponent = new BoltNavbar(el);
      });
    },
  );
}
