var gulp = require('gulp');
var paths = require('../_cfg.json').paths;
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var bourbon = require('node-bourbon');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');



gulp.task('sass', function(){
	return gulp.src(paths.src.sass + '**/*.sass')
		.pipe(sass({
			includePaths: bourbon.includePaths
		}).on('error', sass.logError))
		//.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(autoprefixer(['last 2 versions'], { cascade: true }))
		//.pipe(cleanCSS())
		.pipe(gulp.dest(paths.src.css))
		.pipe(gulp.dest(paths.dist.css))
		.pipe(browserSync.reload({stream: true}));
});