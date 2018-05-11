var gulp = require('gulp');
var paths = require('../_cfg.json').paths;
var browserSync = require('browser-sync');



gulp.task('fonts', function(){
	return gulp.src(paths.src.fonts + '**/*')
		.pipe(gulp.dest(paths.dist.fonts))
		.pipe(browserSync.reload({stream: true}));
});