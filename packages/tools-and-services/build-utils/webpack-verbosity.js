// Map out the global config verbosity setting to the 6 preset levels of Webpack stats: https://webpack.js.org/configuration/stats/#stats + https://github.com/webpack/webpack/blob/b059e07cf90db871fe9497f5c14b9383fc71d2ad/lib/Stats.js#L906

const webpackStats = {
  0: 'none', // Output nothing
  1: 'errors-only', // only output when errors happen
  2: 'minimal', // only output when errors or new compilation happen
  3: 'normal', // standard output
  4: 'detailed',
  5: 'verbose', // output everything
};

function statsPreset(name) {
  /**
   * Accepted values: none, errors-only, minimal, normal, detailed,
   * verbose. Any other falsy value will behave as 'none', truthy
   * values as 'normal'
   */
  const pn = (typeof name === 'string' && name.toLowerCase()) || name || 'none';

  switch (pn) {
    case 'none':
      return {
        all: false,
      };
    case 'verbose':
      return {
        entrypoints: true,
        modules: false,
        colors: true,
        chunks: true,
        chunkModules: true,
        chunkOrigins: true,
        depth: true,
        env: true,
        reasons: true,
        usedExports: true,
        providedExports: true,
        optimizationBailout: true,
        errorDetails: true,
        publicPath: true,
        exclude: () => false,
        maxModules: Infinity,
      };
    case 'detailed':
      return {
        entrypoints: true,
        chunks: true,
        colors: true,
        chunkModules: false,
        chunkOrigins: true,
        depth: true,
        usedExports: true,
        providedExports: true,
        optimizationBailout: true,
        errorDetails: true,
        publicPath: true,
        exclude: () => false,
        maxModules: Infinity,
      };
    case 'minimal':
      return {
        all: false,
        colors: true,
        modules: true,
        maxModules: 0,
        errors: true,
        warnings: true,
      };
    case 'errors-only':
      return {
        all: false,
        colors: true,
        errors: true,
        moduleTrace: true,
      };
    default:
      return {
        colors: true,
      };
  }
}

module.exports = {
  webpackStats,
  statsPreset,
};
