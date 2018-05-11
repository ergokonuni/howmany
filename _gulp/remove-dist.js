var gulp = require('gulp');
var paths = require('../_cfg.json').paths;
var browserSync = require('browser-sync');
var del = require('del');



gulp.task('remove-dist', function(){
	return del.sync(paths.dist.root);
});