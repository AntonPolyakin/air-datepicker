var gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    clone = require('gulp-clone'),
    wrap = require('gulp-wrap'),
    concat = require('gulp-concat'),
    header = require('gulp-header'),
    pkg = require('../package.json');

var banner = 
`/**
 * <%= pkg.name %>
 * Cool jQuery datepicker
 *
 * @author <%= pkg.author %>
 * @link <%= pkg.homepage %>
 * @module <%= pkg.name %>
 * @version <%= pkg.version %>
 */
`;

module.exports = function () {
    var stream = gulp.src([
        'src/js/datepicker.js',
        'src/js/body.js',
        'src/js/navigation.js',
        'src/js/timepicker.js'
    ])
        .pipe(concat('datepicker.js'))
        .pipe(wrap(';(function (window, $, undefined) { <%= contents %> })(window, jQuery);'))
        .pipe(header(banner, { pkg }));

    // Standard version
    stream
        .pipe(clone())
        .pipe(gulp.dest('dist/js'));

    // Minified version
    stream
        .pipe(clone())
        .pipe(uglify())
        .pipe(header(banner, { pkg }))
        .pipe(rename('datepicker.min.js'))
        .pipe(gulp.dest('dist/js'));

    return stream;
};
