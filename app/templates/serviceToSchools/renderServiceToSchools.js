'use strict';

var mongoose = require('mongoose');
var serviceToSchools = mongoose.model('serviceToSchools');

var modelClass = require('../modelClass');
var renderModel = new modelClass.RenderModel(serviceToSchools, 'serviceToSchools/serviceToSchools.tex', 'serviceToSchools/na.tex');

var is = require('is-js');

/*
will explicitly populate the report with
the data you provide
*/
renderModel.setDebugPopulate( false, {
	service: 'Service to schools goes here...'
});

/*
will explicitly print the N/A latex
to the screen for debugging purposes
*/
renderModel.isDebugNull = false;

/*
render function that finds the obj in the database
and converts it into latex.
*/
module.exports.render = function(req, callback) {
	renderModel.render(req, callback);
};

/*
Gets the data from the frontend and
saves it in the database.
*/
module.exports.submit = function(req, callback) {
	console.log(require('util').inspect(req.body));

	if (is.empty(req.body.serviceToSchools)) return callback(null, null);

	var service = new serviceToSchools({
		service: req.body.serviceToSchools.service,
		user: req.user
	});

	service.save(function(err) {
		callback(err, service);
	});
};

