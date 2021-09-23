const {{ camelCase name }}s = document.querySelectorAll('.c-bolt-{{ kebabCase name }}');

if ({{ camelCase name }}s.length) {
  import(/* webpackChunkName: 'bolt-{{ kebabCase name }}' */ './src/{{ kebabCase name }}').then(
    ({ Bolt{{ pascalCase name }} }) => {
      {{ camelCase name }}s.forEach(el => {
        const {{ camelCase name }}Component = new Bolt{{ pascalCase name }}(el);
      });
    },
  );
}
