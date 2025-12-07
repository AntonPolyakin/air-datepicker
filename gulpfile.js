const gulp = require('gulp');
const watch = require('gulp-watch');
const livereload = require('gulp-livereload');

const css = require('./tasks/css');
const js = require('./tasks/js');
const i18n = require('./tasks/i18n');
const cssPage = require('./tasks/cssPage');
const jade = require('./tasks/jade');
const gzip = require('./tasks/gzip');

gulp.task('css', css);
gulp.task('js', js);
gulp.task('i18n', i18n);
gulp.task('cssPage', cssPage);
gulp.task('jade-ru', jade.ru);
gulp.task('jade-en', jade.en);
gulp.task('gzip', gzip);

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('src/sass/*.scss', gulp.series('css')).on('change', livereload.changed);
  gulp.watch('src/js/**/*.js', gulp.series('js')).on('change', livereload.changed);
  gulp.watch('docs/sass/*.scss', gulp.series('cssPage')).on('change', livereload.changed);
  gulp.watch('docs/jade/**/*.jade', gulp.series('jade-ru', 'jade-en')).on('change', livereload.changed);
});

gulp.task('dev', gulp.series('css', 'js', 'i18n', 'cssPage', 'jade-ru', 'jade-en', 'watch'));
gulp.task('build', gulp.series('css', 'js', 'i18n', 'jade-ru', 'jade-en'));
