const profiles = document.querySelectorAll('.c-bolt-profile');

if (profiles.length) {
  import(/* webpackChunkName: 'bolt-profile' */ './src/profile').then(
    ({ BoltProfile }) => {
      profiles.forEach(el => {
        const profileComponent = new BoltProfile(el);
      });
    },
  );
}
