module.exports = function (gulp, config, plugins) {

	'use strict';

	if (typeof config.scss == 'undefined') {
		return;
	}

	gulp.task('sass:minify', function() {
		return gulp.src(config.base + config.scss.dest + config.scss.destFile)
		.pipe(plugins.plumber({errorHandler: config.onError}))
		.pipe(plugins.cssmin({
			restructuring: false
		}))
		.pipe(plugins.rename({suffix: '.min'}))
		.pipe(plugins.size({
			'showFiles': true,
			'gzip': false
		}))
		.pipe(plugins.size({
			'showFiles': true,
			'gzip': true
		}))
		.pipe(gulp.dest(config.base + config.scss.dest));
	});

};