module.exports = function (gulp, config, plugins) {

	'use strict';

	var tasks = [
		'sass:import',
		'sass:compile',
		'sass:minify'
	];

	var jsTasks = Object.keys(config.js);
	jsTasks.forEach(function(i) {
		tasks.push('js:concat:' + i);
		tasks.push('js:minify:' + i);
	});

	gulp.task('build', tasks);

};