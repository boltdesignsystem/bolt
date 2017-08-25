// import './packages/bolt-build-tools/index.js';

const gulp = require('gulp');
const server = require('./packages/bolt-build-tools/tasks/browsersync');

// import { server, bar } from '@bolt/build-server';
// import { compileJekyll, watchJekyll } from '@bolt/build-jekyll';
// import { compileCSS, watchCSS, lintCSS, cleanCSS, sassDoc } from '@bolt/build-styles';
// import { compilePatternLab, recompilePatternLab, watchPatternLab } from '@bolt/build-patternlab';
// import { createSymlinks, cleanSymlinks, watchSymlinks } from '@bolt/build-symlinks';
// import slackNotification from '@bolt/build-slack';
// import lerna from '@bolt/build-lerna';


// module.exports = {
//   var boltServer = server({
//     server: 'boltdesignsystem.com'
//   });
//   boltServer.displayName = 'browsersync:serve';
//   boltServer.description = 'Serve local Bolt site';
//   gulp.task(boltServer);
// }


gulp.task('browsersync:serve', () => {
  console.log('hi');
  // return gulp.src(paths.src)
  //   .pipe(sourcemaps.init())
  //   .pipe(sass.sync().on('error', plugins.sass.logError))
  //   .pipe(autoprefixer())
  //   .pipe(sourcemaps.write('.'))
  //   .pipe(gulp.dest(paths.dest));
});
