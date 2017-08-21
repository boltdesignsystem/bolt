// tasks/files.js

module.exports = ( gulp, options, plugins, errorHandling ) => {
    // Concatenate bower libraries
    gulp.task( "bower_concat", () => {
        return gulp.src( [
                "./bower_components/jquery/*",
                "./bower_components/eq.js/*"
            ] )
            .pipe( plugins.vendor( "vendor.js" ) )
            .pipe( gulp.dest( options.paths.dist + "/js" ) );
    } );
    // JSON linting
    gulp.task( "jsonlint", () => {
        return gulp.src( [
                options.paths.src + "/library/**/*.json",
                options.fixtures + "/schemas/**/*.json"
            ] )
            .pipe( plugins.jsonlint() )
            .pipe( plugins.jsonlint.reporter() );
    } );
    // Delete all dist assets
    gulp.task( "clean:assetsDist", () => {
        return plugins.del.sync( options.paths.dist + "/*" );
    } );
    // Delete all sass globbing
    gulp.task( "clean:sassGlobbing", () => {
        return plugins.del.sync( options.paths.src + "/**/__*" );
    } );
    // Delete all test shots
    gulp.task( "clean:shots", () => {
        return plugins.del.sync( [
            options.paths.test + "/visual/shots/*.png",
            "!" + options.paths.test + "/visual/shots/*.baseline.png"
        ] );
    } );
    // Copy all twig templates to the dist directory
    gulp.task( "templates", () => {
        return gulp.src( options.paths.src + "/library/**/api/*.twig" )
            .pipe( plugins.flatten() )
            .pipe( gulp.dest( options.paths.dist + "/library/templates/" ) )
            .pipe( plugins.browserSync.reload( {
                stream: true
            } ) );
    } );
    // Copy all the test data to the dist directory
    gulp.task( "data", () => {
        return gulp.src( [
                options.paths.src + "/library/**/docs/*.{json,yaml}",
                options.paths.src + "/library/**/tests/*.json"
            ] )
            .pipe( plugins.flatten() )
            .pipe( gulp.dest( options.paths.dist + "/library/data/" ) )
            .pipe( plugins.browserSync.reload( {
                stream: true
            } ) );
    } );
    // Copy all schemas to the dist directory
    gulp.task( "schemas", () => {
        return gulp.src( [ options.paths.src + "/library/**/api/*.json" ] )
            .pipe( plugins.flatten() )
            .pipe( gulp.dest( options.paths.dist + "/library/schemas/" ) )
            .pipe( plugins.browserSync.reload( {
                stream: true
            } ) );
    } );
    // Copy all documentation to the dist directory
    gulp.task( "docs", () => {
        return gulp.src( [ options.paths.src + "/library/**/docs/*.md" ] )
            .pipe( plugins.flatten() )
            .pipe( gulp.dest( options.paths.dist + "/library/docs/" ) )
            .pipe( plugins.browserSync.reload( {
                stream: true
            } ) );
    } );
    // Copy all images to the dist directory
    gulp.task( "images", () => {
        return gulp.src( [ options.paths.src + "/images/*.{png,jpg,jpeg,gif,svg}" ] )
            .pipe( plugins.cache( plugins.imagemin( {
                interlaced: true
            } ) ) )
            .pipe( plugins.flatten() )
            .pipe( gulp.dest( options.paths.dist + "/images/" ) )
            .pipe( plugins.browserSync.reload( {
                stream: true
            } ) );
    } );
};
