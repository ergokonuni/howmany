var gulp = require('gulp');
var paths = require('../_cfg.json').paths;
var browserSync = require('browser-sync');



gulp.task('watch', ['sass', 'css-libs', 'js', 'js-libs', 'pug', 'html', 'img', 'fonts', 'server'], function(){
	gulp.watch(paths.src.sass + '**/*.sass', ['sass']);
	gulp.watch(paths.src.root + '**/*.pug', ['pug']);
	gulp.watch(paths.src.root + '**/*.html', ['html']);
	gulp.watch(paths.src.root + '*.php', browserSync.reload);
	gulp.watch(paths.src.js + '**/*.js', ['js']);
	gulp.watch(paths.src.img + '**/*', ['img']);
	gulp.watch(paths.src.fonts + '**/*', ['fonts']);
});