var gulp = require('gulp');
var paths = require('../_cfg.json').paths;
var browserSync = require('browser-sync');
var bourbon = require('node-bourbon');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');



gulp.task('css-libs', function(){
	return gulp.src([
			paths.libs.root + 'normalize-css/normalize.css',
			//paths.libs.root + 'bootstrap/dist/css/bootstrap.min.css',
			//paths.libs.root + 'bootstrap/dist/css/bootstrap-grid.min.css',
			//paths.libs.root + 'owl.carousel/dist/assets/owl.carousel.min.css',
			//paths.libs.root + 'owl.carousel/dist/assets/owl.theme.default.min.css',
			//paths.libs.root + 'magnific-popup/dist/magnific-popup.css'
		])
		.pipe(concat('libs.min.css'))
		.pipe(cleanCSS())
		.pipe(gulp.dest(paths.src.css))
		.pipe(gulp.dest(paths.dist.css));
});