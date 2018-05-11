var gulp = require('gulp');
var paths = require('../_cfg.json').paths;
var browserSync = require('browser-sync');



gulp.task('js', function(){
	return gulp.src(paths.src.js + '**/*')
		.pipe(gulp.dest(paths.src.js))
		.pipe(gulp.dest(paths.dist.js))
		.pipe(browserSync.reload({stream: true}));
});