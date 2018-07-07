"use strict";

var gulp = require('gulp'),
    compass = require('gulp-compass'),
    minifyCSS = require('gulp-clean-css'),
    rename = require("gulp-rename"),
    pug = require('gulp-pug'),
    watch = require('gulp-watch'),
    notify = require("gulp-notify"),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    jsImport = require('gulp-js-import'),
    imagemin = require('gulp-imagemin');


// server connect
gulp.task('connect', function() {
    connect.server({
        port: 1618,
        root: 'dist',
        livereload: true
    });
});



// templates
gulp.task('templates', function() {
    gulp.src('./app/pug/index.pug')
        .pipe(pug({
            pretty: false,
            data: {
                debug: false
            }
        }))
        .pipe(gulp.dest('./dist/'))
        .pipe(notify('html собран! '))
        .pipe(connect.reload());
});


// Compile Our Sass
gulp.task('compass', function() {
    gulp.src('./app/sass/**/*.+(scss|sass)')

        .pipe(compass({
            config_file: 'config.rb',
            css: './dist/css',
            sass: './app/sass',
            sourcemap: true
        }))
        .on('error', function(err) {
            console.log(err);
            this.emit('end');
        })
        .pipe(minifyCSS())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(notify('css собран! '))
        .pipe(connect.reload());
});


// Concatenate & Minify JS
gulp.task('jsImport', function() {
    return gulp.src('./app/js/main.js')
        .pipe(jsImport({ hideConsole: true }))
        .pipe(uglify())
        .pipe(rename('main-min.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(notify('js собран! '))
        .pipe(connect.reload());
});


// imagemin
gulp.task('compress', function() {
    return gulp.src('./app/images/**/*.+(png|jpg|gif|svg|ico)')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
        ]))
        .pipe(gulp.dest('./dist/images'))
});


// fonts
gulp.task('fonts', function() {
    return gulp.src('./app/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'))
});


// watch
gulp.task('watch', function() {
    gulp.watch(('./app/**/*.pug'), ['templates']);
    gulp.watch(('./app/**/*.+(scss|sass)'), ['compass']);
    gulp.watch(('./app/**/*.js'), ['jsImport']);
    gulp.watch(('./app/images/*'), ['compress']);
});

// default
gulp.task('default', ['connect', 'templates', 'compass', 'jsImport', 'fonts', 'watch']);

// compress img
gulp.task('img', ['compress']);
