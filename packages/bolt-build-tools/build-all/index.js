// import gulp from 'gulp';
import { server, bar } from '@bolt/build-server';
// import { compileJekyll, watchJekyll } from '@bolt/build-jekyll';
import { compileCSS, watchCSS, lintCSS, cleanCSS, sassDoc } from '@bolt/build-styles';
// import { compilePatternLab, recompilePatternLab, watchPatternLab } from '@bolt/build-patternlab';
// import { createSymlinks, cleanSymlinks, watchSymlinks } from '@bolt/build-symlinks';
import slackNotification from '@bolt/build-slack';
import lerna from '@bolt/build-lerna';

export {
  server, bar,
  // compileJekyll, watchJekyll,
  compileCSS, watchCSS, lintCSS, cleanCSS, sassDoc,
  // compilePatternLab, recompilePatternLab, watchPatternLab,
  // createSymlinks, cleanSymlinks, watchSymlinks,
  slackNotification as slack,
  lerna
};
