// Load plugins
const gulp = require('gulp');
const notify = require("gulp-notify");
const browsersync = require("browser-sync").create();
const pug = require('gulp-pug');
const compass = require('gulp-compass');
const minifyCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const jsImport = require('gulp-js-import');
const uglify = require('gulp-uglify');


// BrowserSync (Static server)
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./dist"
    },
    port: 3000
  });

  done();
}


// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Templates
function templates() {
    return gulp
        .src('./app/pug/*.pug')
        .pipe(pug({
            pretty: false,
            data: {
                debug: false
            }
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(notify('html собран! '))
        .pipe(browsersync.stream());
}

// Compile Our Sass
function css() {
    return gulp
        .src('./app/sass/**/*.+(scss|sass)')
        .pipe(compass({
            config_file: 'config.rb',
            sass: './app/sass',
            css: './dist/css',
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
        .pipe(browsersync.stream());
}

// Concatenate & Minify JS
function js() {
    return gulp
        .src('./app/js/main.js')
        .pipe(jsImport({ hideConsole: true }))
        .pipe(uglify())
        .pipe(rename('main-min.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(notify('js собран! '))
        .pipe(browsersync.stream());   
}

// Fonts
function fonts() {
    return gulp
        .src('./app/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'));
}


// Watch files
function watchFiles() {
    gulp.watch('./app/**/*.pug', templates);
    gulp.watch('./app/**/*.+(scss|sass)', css);
    gulp.watch('./app/**/*.js', js); 
}


// define complex tasks
const build = gulp.parallel(templates, css, js);
const watch = gulp.parallel(watchFiles, browserSync);

// export tasks
exports.default = build;
exports.watch = watch;
exports.pug = templates;
exports.css = css;
exports.js = js;
exports.fonts = fonts;

