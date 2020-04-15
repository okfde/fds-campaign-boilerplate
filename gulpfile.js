const { src, dest, watch, series, parallel } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const replace = require('gulp-replace');
const notify = require('gulp-notify')
const connect = require('gulp-connect')

const paths = {
  src: { 
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js',
    html: 'src/*.html',
    img: 'src/img/**/*.{gif,jpg,png,svg}'
  },
  dist: { 
    css: 'dist/css',
    js: 'dist/js',
    html: 'dist',
    img: 'dist/img'
  }
}

function webserver () {
  connect.server({
    livereload: true,
    port: 8000,
    host: 'localhost',
    root: 'dist'
  })
}

function scssTask () {
  return src(paths.src.scss)
    .pipe(sourcemaps.init()) // initialize sourcemaps first
    .pipe(
      sass()
        .on('error', notify.onError({
          message: "Error: <%= error.message %>", title: "Error in SCSS"
          }))
    ) // compile SCSS to CSS
    .pipe(postcss([ autoprefixer(), cssnano() ])) // PostCSS plugins
    .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
    .pipe(dest(paths.dist.css))
    .pipe(connect.reload())
}

function jsTask () {
  return src([paths.src.js])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(dest(paths.dist.js))
    .pipe(connect.reload())
}

function htmlTask () {
  // Cachebusting
  var cbString = new Date().getTime();
  return src([
    paths.src.html
  ])
    .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
    .pipe(dest(paths.dist.html))
    .pipe(connect.reload())
}

function imgTask () {
  return src([
    paths.src.img
  ])
    .pipe(dest(paths.dist.img))
    .pipe(connect.reload())
}

function watchTask () {  
  watch(paths.src.scss, scssTask)
  watch(paths.src.js, jsTask)
  watch(paths.src.img, imgTask)
  watch(paths.src.html, htmlTask)
}

// Export the default Gulp task so it can be run
exports.default = parallel(
  series(
    scssTask,
    jsTask,
    imgTask,
    htmlTask,
    watchTask
  ),
  webserver
);