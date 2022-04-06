const infoSections = document.querySelectorAll('.c-bolt-info-section');

if (infoSections.length) {
  import(/* webpackChunkName: 'bolt-info-section' */ './src/info-section').then(
    ({ BoltInfoSection }) => {
      infoSections.forEach(el => {
        const infoSectionComponent = new BoltInfoSection(el);
      });
    },
  );
}
