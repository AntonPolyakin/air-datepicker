const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const clone = require('gulp-clone');

module.exports = function () {
  // Compile all SCSS files separately
  const stream = gulp.src('src/sass/datepicker.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(postcss([autoprefixer()]));

  // Minified version
  stream.pipe(clone())
    .pipe(cleanCSS({ level: 2 }))
    .pipe(rename('datepicker.min.css'))
    .pipe(gulp.dest('dist/css'));

  // Standard version
  stream.pipe(clone())
    .pipe(rename('datepicker.css'))
    .pipe(gulp.dest('dist/css'));

  return stream;
};
