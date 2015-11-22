module.exports = function (gulp, config, plugins) {

	'use strict';

	if (typeof config.js == 'undefined') {
		return;
	}

	var jsTasks = Object.keys(config.js);
	jsTasks.forEach(function(i) {

		gulp.task('js:minify:' + i, function() {
			return gulp.src(config.base + config.js[i].dest + config.js[i].destFile)
				.pipe(plugins.plumber({errorHandler: config.onError}))
				.pipe(plugins.uglify())
				.pipe(plugins.rename({suffix: '.min'}))
				.pipe(plugins.size({
					'showFiles': true,
					'gzip': false
				}))
				.pipe(plugins.size({
					'showFiles': true,
					'gzip': true
				}))
				.pipe(gulp.dest(config.base + config.js[i].dest));
		});

	});

};