const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const clone = require('gulp-clone');
const fs = require('fs');
const path = require('path');

const pkg = require(path.resolve(__dirname, '../package.json'));

const banner = 
`/**
 * ${pkg.name}
 * Cool jQuery datepicker
 *
 * @author ${pkg.author}
 * @link ${pkg.repository.url.replace(/^git\+/, '')}
 * @module ${pkg.name}
 * @version ${pkg.version}
 */
`;

module.exports = function () {
  // Compile only the main file
  const stream = gulp.src('src/sass/main.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(postcss([autoprefixer()]));

  // Non-minimized version
  stream.pipe(clone())
    .pipe(rename('datepicker.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(require('gulp-header')(banner)) 
    .pipe(gulp.dest('dist/css'));

  // Minimized version
  stream.pipe(clone())
    .pipe(cleanCSS({ level: 2 }))
    .pipe(rename('datepicker.min.css'))
    .pipe(require('gulp-header')(banner))
    .pipe(gulp.dest('dist/css'));

  return stream;
};
