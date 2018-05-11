var gulp = require('gulp');
var paths = require('../_cfg.json').paths;
var browserSync = require('browser-sync');
var changed = require('gulp-changed');
var pug = require('gulp-pug');
var pugInherit = require('gulp-pug-inheritance');



gulp.task('pug', function(){
	return gulp.src(paths.src.root + '**/*.pug')
		.pipe(changed(paths.dist.root, { extension: '.html' }))
		.pipe(pugInherit({ basedir: paths.src.root, skip: 'node_modules' }))
		.pipe(pug({ pretty: true }))
		.pipe(gulp.dest(paths.dist.root))
		.pipe(browserSync.reload({stream: true}));
});