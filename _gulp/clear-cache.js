var gulp = require('gulp');
var paths = require('../_cfg.json').paths;
var browserSync = require('browser-sync');
var cache = require('gulp-cache');



gulp.task('clear-cache', function(){
	return cache.clearAll();
});