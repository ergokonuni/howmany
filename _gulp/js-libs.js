var gulp = require('gulp');
var paths = require('../_cfg.json').paths;
var browserSync = require('browser-sync');
var bourbon = require('node-bourbon');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');



gulp.task('js-libs', function(){
	return gulp.src([
		paths.libs.root + 'jquery/dist/jquery.slim.min.js',
		//paths.libs.root + 'current-device/src/index.js',
		//paths.libs.root + 'popper.js/dist/umd/popper.min.js',
		//paths.libs.root + 'bootstrap/dist/js/bootstrap.min.js',
		//paths.libs.root + 'bootstrap/dist/js/bootstrap.bundle.min.js',
		//paths.libs.root + 'owl.carousel/dist/owl.carousel.js',
		//paths.libs.root + 'magnific-popup/dist/jquery.magnific-popup.min.js'
		])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(paths.src.js))
		.pipe(gulp.dest(paths.dist.js))
		.pipe(browserSync.reload({stream: true}));
});