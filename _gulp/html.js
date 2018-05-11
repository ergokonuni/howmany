var gulp = require('gulp');
var paths = require('../_cfg.json').paths;
var browserSync = require('browser-sync');
var rigger = require('gulp-rigger');



gulp.task('html', function(){
	return gulp.src(paths.src.root + '*.html')
		.pipe(rigger())
		.pipe(gulp.dest(paths.dist.root))
		.pipe(browserSync.reload({stream: true}));
});