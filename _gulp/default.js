var gulp = require('gulp');
var paths = require('../_cfg.json').paths;



gulp.task('default', function(){
	console.log('worked');
	console.log(paths.dist.root);
});