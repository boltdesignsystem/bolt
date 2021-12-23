const satellites = document.querySelectorAll('.c-bolt-satellite');

if (satellites.length) {
  import(/* webpackChunkName: 'bolt-satellite' */ './src/satellite').then(
    ({ BoltSatellite }) => {
      satellites.forEach(el => {
        const satelliteComponent = new BoltSatellite(el);
      });
    },
  );
}
