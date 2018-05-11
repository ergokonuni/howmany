var gulp = require('gulp');
var paths = require('../_cfg.json').paths;
var browserSync = require('browser-sync');
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');



gulp.task('img', function(){
	return gulp.src(paths.src.img + '**/*')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest(paths.dist.img))
		.pipe(browserSync.reload({stream: true}));
});