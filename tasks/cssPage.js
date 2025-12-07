var gulp = require('gulp'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass')(require('sass')),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer')(),
    clone = require('gulp-clone'),
    minify = require('gulp-minify-css'),
    concat = require('gulp-concat');

module.exports = function () {
    gulp.src('docs/sass/init.scss')
        .pipe(concat('style.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer]))
        .pipe(minify())
        .pipe(gulp.dest('docs/css'))
};