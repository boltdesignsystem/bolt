// import gulp from 'gulp';
import { server, bar } from '@bolt/build-server';
import { compileCSS, watchCSS, lintCSS } from '@bolt/build-styles';
import { compilePatternLab, recompilePatternLab, watchPatternLab } from '@bolt/build-patternlab';
import { createSymlinks, cleanSymlinks, watchSymlinks } from '@bolt/build-symlinks';
import { slack } from '@bolt/build-slack';
import { default as lerna } from '@bolt/build-lerna';

export {
  server, bar,
  compileCSS, watchCSS, lintCSS,
  compilePatternLab, recompilePatternLab, watchPatternLab,
  createSymlinks, cleanSymlinks, watchSymlinks,
  slack,
  lerna
};
