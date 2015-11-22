module.exports = function (gulp, config, plugins) {

	'use strict';

	if (typeof config.browsersync == 'undefined') {
		return;
	}

	var extend = require('extend');
	var browserSync = require('browser-sync').create();
	var browserSyncDefaults = {
		watchTask: true,
		open: false,
		browser: ['google chrome'],
		notify: true,
		injectChanges: true,
		ghostMode: {
		  clicks: true,
		  forms: true,
		  scroll: true
		},
		tunnel: false,
		online: false,
		files: []
	};

	var browserSyncOptions = extend(browserSyncDefaults, config.browsersync);
	browserSyncOptions.files.push('!./node_modules/**');

	browserSync.init(browserSyncOptions);

};