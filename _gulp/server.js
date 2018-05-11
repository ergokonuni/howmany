var gulp = require('gulp');
var paths = require('../_cfg.json').paths;
var browserSync = require('browser-sync');



gulp.task('server', function(){
	browserSync({
		server: {
			baseDir: paths.dist.root,
			proxy: 'domain.name'
		},
		notify: false
	});
});