module.exports = function (gulp, config, plugins) {

	'use strict';

	if (typeof config.scss == 'undefined') {
		return;
	}

	var fs = require('fs');
	var path = require('path');

	gulp.task('sass:import', function(callback) {

		var indexFileName = 'index.scss';
		plugins.glob.sync(config.base + config.scss.src + '**/' + indexFileName).forEach(function (sourceFile) {
			fs.writeFileSync(sourceFile, '// This is a dynamically generated file \n\n');
			plugins.glob.sync(path.dirname(sourceFile) + '/*.scss').forEach(function (file) {
				if (path.basename(file) !== indexFileName) {
					fs.appendFileSync(sourceFile, '@import "' + path.basename(file) + '";\n');
				}
			});
		});

		var indexSubFileName = 'index_sub.scss';
		plugins.glob.sync(config.base + config.scss.src + '**/' + indexSubFileName).forEach(function (sourceFile) {
			fs.writeFileSync(sourceFile, '// This is a dynamically generated file \n\n');
			plugins.glob.sync(path.dirname(sourceFile) + '/**/*.scss').forEach(function (file) {
				if (path.basename(file) !== indexSubFileName) {
					var importPath = (path.dirname(sourceFile) === path.dirname(file)) ? path.basename(file) : file;
					importPath = importPath.replace(path.dirname(sourceFile) + '/', '');
					fs.appendFileSync(sourceFile, '@import "' + importPath + '";\n');
				}
			});
		});

		callback();

	});

};