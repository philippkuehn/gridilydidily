module.exports = {
	base: './',
	js: {
		bundle: {
			src: 'assets/js/',
			dest: 'assets/js/dest/',
			destFile: 'bundle.js',
			order: [
				'vendor/*.js',
				'vendor/plugins/*.js',
				'main.js',
				'modules/**/*.js',
			]
		},
		libs: {
			src: 'assets/js/',
			dest: 'assets/js/dest/',
			destFile: 'libs.js',
			order: [
				'libs/*.js'
			]
		}
	},
	scss: {
		src: 'assets/scss/',
		srcFile: 'main.scss',
		dest: 'assets/scss/dest/',
		destFile: 'style.css',
		svgSrc: 'assets/images/svg/',
	},
	browsersync: {
		// Use BrowserSync for static files ...
		server: { baseDir: './' },
		// or as a proxy for dynamic files.
		// proxy: 'domain.de',
		files: [
			'**/*.html',
			'**/*.php',
			'**/*.{jpg,jpeg,png,gif}',
			'**/style.min.css',
			'**/bundle.min.js',
			'**/libs.min.js'
		]
	}
};