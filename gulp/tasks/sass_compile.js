module.exports = function (gulp, config, plugins) {

	'use strict';

	if (typeof config.scss == 'undefined') {
		return;
	}

	gulp.task('sass:compile', function() {
		return gulp.src(config.base + config.scss.src + config.scss.srcFile)
			.pipe(plugins.plumber({errorHandler: config.onError}))
			.pipe(plugins.sourcemaps.init())
			.pipe(plugins.sass())
			.pipe(plugins.postcss([
				plugins.autoprefixer({browsers: ['last 4 versions', 'ie >= 8']}),
				plugins.postcssSvg({
					paths: [config.base + config.scss.svgSrc],
					defaults: "[fill]: #000000",
				}),
			]))
			.pipe(plugins.sourcemaps.write())
			.pipe(plugins.rename(config.scss.destFile))
			.pipe(gulp.dest(config.base + config.scss.dest));
	});

};