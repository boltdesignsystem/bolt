export function modularJS(ImportClass, importClassString) {
  const dataModules = document.querySelectorAll('[data-module]');
  for (const dataModule of dataModules) {
    if (dataModule.hasAttribute('data-module')) {
      if ((dataModule.dataset.module = importClassString)) {
        const importClass = new ImportClass(dataModule);
      }
    }
  }
}
