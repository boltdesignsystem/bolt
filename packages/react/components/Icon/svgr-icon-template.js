function defaultTemplate(
  { template },
  opts,
  { imports, interfaces, componentName, props, jsx, exports },
) {
  const plugins = ['jsx'];
  if (opts.typescript) {
    plugins.push('typescript');
  }
  const typeScriptTpl = template.smart({ plugins });
  return typeScriptTpl.ast`${imports}
import getIconClasses from '../lib';

${interfaces}

function ${componentName}(props) {
  const classes = getIconClasses(props);
  return ${jsx};
}
${exports}
  `;
}

module.exports = defaultTemplate;
