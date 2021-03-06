'use strict';

var mongoose = require('mongoose');
var Conferences = mongoose.model('Conferences');

var errorHandler = require('../errors');
var is = require('is-js');
var _ = require('lodash');

var u = require('underscore');
/*
Gets the data from the frontend and
saves it in the database.
*/

exports.create = function(req, res) {
	if (is.empty(req.body.conferences)) {
		return res.jsonp({
			err: 'Post (create): Does not exist',
			message: 'req.body.conferences did not get sent to backend',
			changes: 'No Conferences Created'
		});
	}

	var conferences = new Conferences({
		info: req.body.conferences.info,

		user: req.user,
		report: req.report
	});

	conferences.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(conferences);
		}
	});
};

exports.update = function(req, res) {
	//console.log(require('util').inspect(req.body));
	
	if (is.empty(req.body.conferences)) {
		res.status(400);
		return res.jsonp({
			err: 'Put (update): Does not exist',
			message: 'req.body.conferences did not get send to backend',
			changes: 'No Changes Made'
		});
	}

	var conferences = req.conferences;

	conferences = _.extend(conferences, req.body.conferences);

	conferences.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(conferences);
		}
	});
};

exports.readFromReport = function(req, res) {
	Conferences.findOne({report: req.report})
	.populate('user', 'displayName')
	.populate('report', 'reportName')
	.exec(function(err, result) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		return res.jsonp(result);
	});
};

exports.read = function(req, res) {
	res.jsonp(req.conferences);
};

exports.conferencesById = function(req, res, next, id) {
	Conferences.findById(id)
	.populate('user', 'displayName')
	.populate('report', 'reportName')
	.exec(function(err, conferences) {
		if (err) return next(err);
		if (!conferences) return next(new Error('Failed to load Conferences ' + id));
		req.conferences = conferences;
		next();
	});
};

exports.hasAuthorization = function(req, res, next) {
	if (req.conferences.user.id !== req.user.id && !u.contains(req.user.roles, 'admin')) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}

	next();
};