// import gulp from 'gulp';
import { server, bar } from '@bolt/build-server';
import { compileCSS, watchCSS, lintCSS, cleanCSS } from '@bolt/build-styles';
import { compilePatternLab, recompilePatternLab, watchPatternLab } from '@bolt/build-patternlab';
import { createSymlinks, cleanSymlinks, watchSymlinks } from '@bolt/build-symlinks';
import slackNotification from '@bolt/build-slack';
import lerna from '@bolt/build-lerna';

export {
  server, bar,
  compileCSS, watchCSS, lintCSS, cleanCSS,
  compilePatternLab, recompilePatternLab, watchPatternLab,
  createSymlinks, cleanSymlinks, watchSymlinks,
  slackNotification as slack,
  lerna
};
