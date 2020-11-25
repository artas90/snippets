var gulp = require('gulp');
var server = require( 'gulp-develop-server' );
var typescript = require('gulp-typescript');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('compile_ts', function() {
    var tsParams = {
        module: 'amd',   // 'commonjs', 'amd', 'system', 'umd' or 'es6'
        target: 'ES3',
        sourceMap: true,
        experimentalDecorators: true,
        logErrors: true
    };

    gulp.src('./static/src/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(tsParams))
        .pipe(sourcemaps.write('sourcemaps'))
        .pipe(gulp.dest('static/lib'));
});


gulp.task('compile_scss', function () {
    var sassParams = {
        outputStyle: 'expanded'
    };

    gulp.src('./static/src/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass(sassParams))
        .pipe(sourcemaps.write('sourcemaps'))
        .pipe(gulp.dest('static/lib'));
});


gulp.task('watch', ['compile_ts', 'compile_scss'], function() {
    gulp.watch('./static/src/**/*.ts', ['compile_ts']);
    gulp.watch('./static/src/**/*.scss', ['compile_scss']);
});


gulp.task('server', function() {
    server.listen({path: './server.js'});
    gulp.watch('./server.js' , server.restart);
});


gulp.task( 'default', ['server', 'watch']);
