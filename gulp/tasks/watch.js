module.exports = function (gulp, config, plugins) {

	'use strict';

	gulp.task('watch', function() {

		// sass
		plugins.watch(
			[
				config.base + '**/!(index|index_sub).scss',
				'!./node_modules/**'
			],
			function() {
				gulp.start(['sass:import', 'sass:compile']);
			}
		);

		plugins.watch(
			config.base + config.scss.dest + config.scss.destFile,
			function() {
				gulp.start('sass:minify');
			}
		);

		// js
		var jsTasks = Object.keys(config.js);
		jsTasks.forEach(function(i) {

			plugins.watch(
				config.js[i].order,
				{cwd: config.base + config.js[i].src},
				function() {
					gulp.start('js:concat:' + i);
				}
			);

			plugins.watch(
				config.base + config.js[i].dest + config.js[i].destFile,
				function() {
					gulp.start('js:minify:' + i);
				}
			);

		});

	});

};