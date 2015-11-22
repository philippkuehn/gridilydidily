'use strict';

var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')({
		pattern: ['*']
	}),
	configPath = './gulp/config.js',
	config = require(configPath),
	taskDir = './gulp/tasks/',
	taskList = require('fs').readdirSync(taskDir);

config.onError = function(err) {
	plugins.notify.onError({
		title: 'Error',
		message: '<%= error.message %>',
		sound: 'Basso',
	})(err);
	this.emit('end');
};

taskList.forEach(function (taskFile) {
 	require(taskDir + taskFile)(gulp, config, plugins);
});