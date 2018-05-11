var gulp = require('gulp');
var paths = require('../_cfg.json').paths;
var browserSync = require('browser-sync');
var fileinclude = require('gulp-file-include');
var gulpRemoveHtml = require('gulp-remove-html');



gulp.task('build-html', function(){
  gulp.src([paths.dist.root + '*.php'])
    .pipe(fileinclude({
      prefix: '@@'
    }))
    .pipe(gulpRemoveHtml())
    .pipe(gulp.dest(paths.dist.root));
});