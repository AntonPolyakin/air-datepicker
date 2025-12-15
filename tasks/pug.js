var gulp = require('gulp');
var plumber = require('gulp-plumber');
var pug = require('gulp-pug');

function shortError(err) {
    const file = err.filename || '';
    const line = err.line || '';
    const col = err.column || '';
    const msg = err.msg || err.message || 'Unknown Pug error';

    console.error(`\n[PUG ERROR] ${file}:${line}:${col}\n${msg}\n`);

    this.emit('end');
}

module.exports = {
    ru: function () {
        return gulp.src('docs/pug/pages/index-ru.pug')
            .pipe(plumber({ errorHandler: shortError }))
            .pipe(pug({
                data: { lang: 'ru' }
            }))
            .pipe(gulp.dest('docs/'));
    },

    en: function () {
        return gulp.src('docs/pug/pages/index.pug')
            .pipe(plumber({ errorHandler: shortError }))
            .pipe(pug({
                data: { lang: 'en' }
            }))
            .pipe(gulp.dest('docs/'));
    }
};
