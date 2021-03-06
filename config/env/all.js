'use strict';

module.exports = {
	app: {
		title: 'UF Faculty Activity Report',
		description: 'A web app to create UF faculty activity reports',
		keywords: 'Webb, app, UF, University, Florida, Faculty, Activity, Report, Create'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				/*'public/lib/bootstrap/dist/css/bootstrap-theme.css',*/
			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-cookies/angular-cookies.js', 
				'public/lib/angular-animate/angular-animate.js', 
				'public/lib/angular-touch/angular-touch.js', 
				'public/lib/angular-sanitize/angular-sanitize.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',


				'public/lib/tinymce/tinymce.min.js',
				'public/lib/angular-ui-tinymce/src/tinymce.js',

				'public/lib/ng-pdfviewer/ng-pdfviewer.js',
				'public/lib/ng-pdfviewer/lib/pdf.js',
				'public/lib/ng-pdfviewer/lib/compatibility.js',

				'public/lib/ng-file-upload-shim/angular-file-upload-shim.js',
				'public/lib/ng-file-upload/angular-file-upload.js',

				'public/lib/x2js/xml2json.js',
				'public/lib/angular-x2js/src/x2js.js',

				'public/lib/spin.js/spin.js',
				'public/lib/angular-spinner/angular-spinner.js'
			]
		},
		css: [
			'public/modules/**/css/*.css',
            //'public/modules/reports/css/activity.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};