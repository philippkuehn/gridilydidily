module.exports = function (gulp, config, plugins) {

	'use strict';

	if (typeof config.js == 'undefined') {
		return;
	}

	var jsTasks = Object.keys(config.js);
	jsTasks.forEach(function(i) {

		gulp.task('js:concat:' + i, function() {
			return gulp.src(config.js[i].order, {cwd: config.base + config.js[i].src})
				.pipe(plugins.plumber({errorHandler: config.onError}))
				.pipe(plugins.sourcemaps.init())
				.pipe(plugins.concat(config.js[i].destFile))
				.pipe(plugins.sourcemaps.write())
				.pipe(gulp.dest(config.base + config.js[i].dest));
		});

	});

};