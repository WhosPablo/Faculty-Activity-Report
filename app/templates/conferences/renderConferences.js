'use strict';

var mongoose = require('mongoose');
var Conferences = mongoose.model('Conferences');

var modelClass = require('../modelClass');
var renderModel = new modelClass.RenderModel( Conferences, 'conferences/conferences.tex', 'conferences/na.tex');

var is = require('is-js');

var defaultData = require('../default.json');
var _ = require('underscore');

/*
will explicitly populate the report with
the data you provide
*/
renderModel.setDebugPopulate( false, {
	area: 'State',
	presentation: 'Poster',
	title: 'Test Conference Data',
	date: 'October 12, 2001',
	where: 'Somewhere. Earth.'
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
	renderModel.renderHTML(req, callback);
};

/*
Gets the data from the frontend and
saves it in the database.
*/
module.exports.submit = function(req, callback) {
	if (is.empty(req.body.conferences)) return callback(null, null);

	var arr = [];

	for(var i=0; i<req.body.conferences.length; i++) {
		var path = req.body.conferences[i];
		var subdoc = {
			area: path.area,
			presentation: path.presentation,
			title: path.title,
			date: path.date,
			where: path.where
		};
		arr.push(subdoc);
	}

	var conference = new Conferences({
		sub: arr,
		user: req.user
	});
		
	conference.save(function(err) {
		callback(err, conference);
	});	
};

module.exports.createDefaultData = function(report, user, cb) {
	var save = _.extend(defaultData.conferences, {
		report: report,
		user: user
	});

	var conferences = new Conferences(save);

	conferences.save(function(err) {
		cb(err, conferences);
	});
};

module.exports.createPrevious = function(report, user, prevId, cb) {
	renderModel.createPrevious(Conferences, {conferences: undefined}, report, user, prevId, cb);
};

